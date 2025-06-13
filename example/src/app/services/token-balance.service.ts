// src/app/services/session-kit.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { SessionService } from '@app/services/session-kit.service';
import { TokenListService } from '@app/services/token-list.service';
import { Token, Balance } from '@app/types';
import { W3oContextFactory } from '@vapaee/w3o-core';

const logger = new W3oContextFactory('TokenBalanceService');

@Injectable({
    providedIn: 'root'
})
export class TokenBalanceService {
    private balances$ = new BehaviorSubject<Balance[]>([]);

    constructor(
        private sessionService: SessionService,
        private tokenListService: TokenListService
    ) {
        combineLatest([this.sessionService.session$, this.tokenListService.tokens$])
            .subscribe(([session, tokens]) => {
                if (!!session?.address) {
                    this.updateAllBalances();
                } else {
                    this.balances$.next([]); // Clear balances on logout
                }
            });
    }

    /** Returns the observable balances$ */
    getAllBalances() {
        return this.balances$.asObservable();
    }

    /** Fetches and updates a single token balance */
    async updateSingleBalance(token: Token) {
        try {
            const balance = await this.fetchSingleBalance(token);
            this.addSingleBalanceToState(balance);
        } catch (error) {
            console.error(`❌ Error updating single balance for ${token.symbol}:`, error);
        }
    }

    /** Fetches and updates all token balances */
    async updateAllBalances() {
        try {
            const balances = await this.fetchAllBalances();
            this.addAllBalancesToState(balances);
        } catch (error) {
            console.error('❌ Error updating all balances:', error);
        }
    }

    /** Waits until the token balance changes and resolves the promise, or rejects if the timeout is reached */
    waitUntilBalanceChanges(token: Token, delay = 1, maxSeconds = 10): Promise<Balance> {
        return new Promise((resolve, reject) => {
            const startTime = Date.now();

            const checkBalance = async () => {
                const balance = await this.fetchSingleBalance(token);
                const currentBalance = this.balances$.getValue().find(b => b.token.symbol === token.symbol);

                if (balance.amount.value !== currentBalance?.amount.value) {
                    this.addSingleBalanceToState(balance);
                    resolve(balance);
                } else if ((Date.now() - startTime) / 1000 >= maxSeconds) {
                    reject(new Error('Timeout: Balance did not change within the specified time.'));
                } else {
                    setTimeout(checkBalance, 1000);
                }
            };

            setTimeout(checkBalance, delay * 1000);
        });
    }

    /** Fetches a specific token balance from the blockchain handling multiple tokens per contract */
    private async fetchSingleBalance(token: Token): Promise<Balance> {
        const context = logger.method('fetchSingleBalance', { token });
        const session = this.sessionService.current;
        if (!session?.address) {
            context.error('No active session.');
            throw new Error('No valid session.');
        }

        if (!session?.network) {
            context.error('No valid network.');
            throw new Error('No valid network.');
        }

        try {
            const params = {
                json: true,
                code: token.account, // Token contract
                scope: session.address.toString(), // Account name
                table: 'accounts', // EOSIO token table
                limit: 100, // Fetch up to 100 token entries
            };
            return new Promise<Balance>((resolve, reject) => {
                session.network.queryContract(params).subscribe((result: any) => {
                    if (!result?.rows?.length) {
                        console.warn(`⚠️ No balance found for ${token.symbol}. Returning zero balance.`);
                        resolve({ amount: { value: 0, formatted: this.formatBalance(0, token) }, token });
                    }

                    // Search for the token with the matching symbol in the list of rows
                    const matchingRow = result.rows.find((row: any) => {
                        if (row.balance) {
                            const [amountStr, symbol] = row.balance.split(' ');
                            return symbol === token.symbol;
                        }
                        return false;
                    });

                    if (!matchingRow) {
                        console.warn(`⚠️ No balance found for ${token.symbol}. Returning zero balance.`);
                        resolve({ amount: { value: 0, formatted: this.formatBalance(0, token) }, token });
                    }

                    const [amountStr, symbol] = matchingRow.balance.split(' ');
                    const rawAmount = parseFloat(amountStr) * Math.pow(10, token.precision);
                    resolve({ amount: { value: rawAmount, formatted: this.formatBalance(rawAmount, token) }, token });
                });
           });
        } catch (error) {
            console.error(`❌ Error fetching balance for ${token.symbol}:`, error);
            return { amount: { value: 0, formatted: this.formatBalance(0, token) }, token };
        }
    }

    /** Fetches all token balances from blockchain */
    private async fetchAllBalances(): Promise<Balance[]> {
        const session = this.sessionService.current;
        if (!session?.address) throw new Error('No active session.');

        if (!session.authenticator.isLogged()) {
            console.warn('⚠️ User is not logged in. Cannot fetch balances.');
            return [];
        }

        const tokens = this.tokenListService.getTokensValue();

        // Group tokens by contract account to avoid duplicate queries
        const tokensByContract = tokens.reduce((acc, token) => {
            if (!acc[token.account]) {
                acc[token.account] = [];
            }
            acc[token.account].push(token);
            return acc;
        }, {} as Record<string, Token[]>);

        // Query each contract once for up to 100 tokens
        const contractQueries = Object.keys(tokensByContract).map(async (contract) => {
            const params = {
                json: true,
                code: contract,
                scope: session.address,
                table: 'accounts',
                limit: 100,
            };

            const result = await session.network.queryContract(params).toPromise();

            // Map each token in the current contract to its balance by searching the result rows
            const balances = tokensByContract[contract].map(token => {
                const matchingRow:{balance:string} = result?.rows?.find((row: any) => {
                    if (row.balance) {
                        const [amountStr, symbol] = row.balance.split(' ');
                        return symbol === token.symbol;
                    }
                    return false;
                });
                if (!matchingRow) {
                    console.warn(`⚠️ No balance found for ${token.symbol} in contract ${contract}. Returning zero balance.`);
                    return { amount: { value: 0, formatted: this.formatBalance(0, token) }, token };
                }
                const [amountStr, symbol] = matchingRow.balance.split(' ');
                const rawAmount = parseFloat(amountStr) * Math.pow(10, token.precision);
                return { amount: { value: rawAmount, formatted: this.formatBalance(rawAmount, token) }, token };
            });
            return balances;
        });

        const balancesGrouped = await Promise.all(contractQueries);
        const allBalances = balancesGrouped.flat();

        return allBalances;
    }

    /** Adds or updates a single balance in balances$ state */
    private addSingleBalanceToState(balance: Balance) {
        const currentBalances = this.balances$.getValue();
        const index = currentBalances.findIndex(b => b.token.symbol === balance.token.symbol);

        if (index !== -1) {
            if (currentBalances[index].amount.value !== balance.amount.value) {
                currentBalances[index] = balance;
                this.balances$.next([...currentBalances]); // Trigger UI update
            } else {
                console.log(`⚠️ No change detected in balance for ${balance.token.symbol}.`);
            }
        } else {
            currentBalances.push(balance);
            this.balances$.next([...currentBalances]); // Trigger UI update
        }
    }

    /** Updates the entire balances$ state */
    private addAllBalancesToState(balances: Balance[]) {
        this.balances$.next(balances);
    }

    /** Formats a raw balance amount into a readable string */
    private formatBalance(rawAmount: number, token: Token): string {
        const precision = token.precision;
        const factor = Math.pow(10, precision);
        return (rawAmount / factor).toFixed(precision);
    }
}
