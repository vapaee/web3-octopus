// w3o-antelope/src/classes/AntelopeTokensService.ts

import {
    W3oContext,
    W3oContextFactory,
    W3oInstance,
    W3oService,
    W3oModule,
    W3oBalance,
    W3oAuthenticator,
    W3oToken,
    W3oTransferStatus,
    W3oTransferSummary,
    W3oError,
    W3oTokensService,
} from "@vapaee/w3o-core";
import { BehaviorSubject, combineLatest, Observable, of, Subject, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { AntelopeTransferSummary } from "../types";

const logger = new W3oContextFactory('AntelopeTokensService');

/**
 * Service responsible for managing token balances and transfers on Antelope networks.
 */
export class AntelopeTokensService extends W3oService implements W3oTokensService {

    constructor(path: string, parent: W3oContext) {
        const context = logger.method('constructor', { path }, parent);
        super(path, context);
    }

    /**
     * Returns the current version of this service.
     */
    get w3oVersion(): string {
        return '1.0.0';
    }

    /**
     * Returns the service name used for module identification.
     */
    get w3oName(): string {
        return 'antelope.service.tokens';
    }

    /**
     * Returns the list of module requirements for this service.
     */
    get w3oRequire(): string[] {
        return [
            'antelope.chain.support@1.0.0',
            'antelope.network.support@1.0.0',
        ];
    }

    /**
     * Initializes the service with provided octopus instance and requirements.
     */
    override init(octopus: W3oInstance, requirements: W3oModule[], parent: W3oContext): void {
        const context = logger.method('init', { octopus, requirements }, parent);
        logger.info('AntelopeTokensService OK!', super.w3oId);
        super.init(octopus, requirements, context);
    }

    /**
     * Returns or creates the shared BehaviorSubject of balances.
     */
    public getBalances$(auth: W3oAuthenticator, parent: W3oContext): BehaviorSubject<W3oBalance[]> {
        const context = logger.method('getBalances$', { auth }, parent);
        let balances$ = auth.session.storage.get('balances$') as BehaviorSubject<W3oBalance[]>;
        if (!balances$) {
            logger.info('Creating new balances observable: Observable<W3oBalance[]>', { auth });
            balances$ = this.fetchAllBalances(auth, context);
        }
        return balances$;
    }

    /**
     * Fetches all balances grouped by token contract and returns a BehaviorSubject.
     */
    private fetchAllBalances(auth: W3oAuthenticator, parent: W3oContext): BehaviorSubject<W3oBalance[]> {
        const context = logger.method('fetchAllBalances', { auth }, parent);
        const tokens$ = auth.network.tokens$;
        let balances$ = auth.session.storage.get('balances$') as BehaviorSubject<W3oBalance[]>;
        if (!balances$) {
            logger.info('Creating new balances observable: BehaviorSubject<W3oBalance[]>', { auth });
            balances$ = new BehaviorSubject<W3oBalance[]>([]);
            auth.session.storage.set('balances$', balances$);
        }

        tokens$.subscribe(tokens => {
            const tokensByContract = tokens.reduce((acc, token) => {
                if (!acc[token.account]) {
                    acc[token.account] = [];
                }
                acc[token.account].push(token);
                return acc;
            }, {} as Record<string, W3oToken[]>);

            const queries = Object.keys(tokensByContract).map(contract => {
                const params = {
                    json: true,
                    code: contract,
                    scope: auth.session.address?.toString(),
                    table: 'accounts',
                    limit: 100,
                };
                return auth.network.queryContract(params, context).pipe(
                    map((result: {rows?: {balance: string}[]}) => {
                        return tokensByContract[contract].map(token => {
                            if (!result?.rows?.length) {
                                console.warn(`⚠️ No balance found for ${token.symbol}. Returning zero balance.`);
                                return { amount: { value: 0, formatted: this.formatBalance(0, token) }, token };
                            }
                            const matchingRow = result.rows.find(row => {
                                if (row.balance) {
                                    const [ , symbol ] = row.balance.split(' ');
                                    return symbol === token.symbol;
                                }
                                return false;
                            });
                            if (!matchingRow) {
                                console.warn(`⚠️ No balance found for ${token.symbol}. Returning zero balance.`);
                                return { amount: { value: 0, formatted: this.formatBalance(0, token) }, token };
                            }
                            const [amountStr] = matchingRow.balance.split(' ');
                            const value = parseFloat(amountStr) * Math.pow(10, token.precision);
                            return { amount: { value, formatted: this.formatBalance(value, token) }, token };
                        });
                    }),
                    catchError(err => {
                        context.error('Error querying contract for ' + contract, err);
                        return of(tokensByContract[contract].map(token => ({
                            amount: { value: 0, formatted: this.formatBalance(0, token) },
                            token
                        })));
                    })
                );
            });

            if (queries.length) {
                combineLatest(queries).subscribe(balancesArrays => {
                    this.addAllBalancesToState(balances$, balancesArrays.flat(), context);
                }, error => {
                    context.error('Error combining contract queries', error);
                });
            } else {
                balances$.next([]);
            }
        });

        return balances$;
    }

    /**
     * Updates the balance for a single token.
     */
    public updateSingleBalance(auth: W3oAuthenticator, token: W3oToken, parent: W3oContext): void {
        const context = logger.method('updateSingleBalance', { auth, token }, parent);
        const balances$ = this.getBalances$(auth, context);
        this.fetchSingleBalance(auth, token, context).subscribe(balance => {
            this.addSingleBalanceToState(balances$, balance, context);
        }, error => {
            context.error(`❌ Error updating single balance for ${token.symbol}:`, error);
        });
    }

    /**
     * Forces update of all token balances.
     */
    public updateAllBalances(auth: W3oAuthenticator, parent: W3oContext): void {
        const context = logger.method('updateAllBalances', { auth }, parent);
        this.getBalances$(auth, context);
        this.fetchAllBalances(auth, context).subscribe(balances => {
            logger.info('Updating all balances:', balances);
        }, error => {
            context.error('❌ Error updating all balances:', error);
        });
    }

    /**
     * Polls until the token balance changes or a timeout occurs.
     */
    public waitUntilBalanceChanges(
        auth: W3oAuthenticator,
        token: W3oToken,
        delay: number,
        maxSeconds: number,
        parent: W3oContext
    ): Observable<W3oBalance> {
        const context = logger.method('waitUntilBalanceChanges', { auth, token, delay, maxSeconds }, parent);
        return new Observable<W3oBalance>(observer => {
            const startTime = Date.now();
            const check = () => {
                this.fetchSingleBalance(auth, token, context).subscribe(balance => {
                    const current = this.getBalances$(auth, context).getValue().find(b => b.token.symbol === token.symbol);
                    if (balance.amount.value !== current?.amount.value) {
                        this.addSingleBalanceToState(this.getBalances$(auth, context), balance, context);
                        observer.next(balance);
                        observer.complete();
                    } else if ((Date.now() - startTime) / 1000 >= maxSeconds) {
                        observer.error(new Error('Timeout: Balance did not change within the specified time.'));
                    } else {
                        setTimeout(check, 1000);
                    }
                }, err => {
                    context.error('❌ Error checking balance change', err);
                    observer.error(err);
                });
            };
            setTimeout(check, delay * 1000);
        });
    }

    /**
     * Fetches a single balance for a given token from the blockchain.
     */
    private fetchSingleBalance(
        auth: W3oAuthenticator,
        token: W3oToken,
        parent: W3oContext
    ): Observable<W3oBalance> {
        const context = logger.method('fetchSingleBalance', { auth, token }, parent);
        const session = auth.session;
        if (!session?.address) {
            context.error('No active session.');
            return throwError(() => new W3oError(W3oError.SESSION_WITHOUT_ACCOUNT, { session }));
        }
        if (!session.network) {
            context.error('No valid network.');
            return throwError(() => new W3oError(W3oError.SESSION_WITHOUT_NETWORK, { session }));
        }
        const params = {
            json: true,
            code: token.account,
            scope: session.address.toString(),
            table: 'accounts',
            limit: 100,
        };
        return auth.network.queryContract(params, context).pipe(
            map((result: any) => {
                if (!result?.rows?.length) {
                    console.warn(`⚠️ No balance found for ${token.symbol}. Returning zero balance.`);
                    return { amount: { value: 0, formatted: this.formatBalance(0, token) }, token };
                }
                const matchingRow = result.rows.find((row: any) => {
                    if (row.balance) {
                        const [ , symbol ] = row.balance.split(' ');
                        return symbol === token.symbol;
                    }
                    return false;
                });
                if (!matchingRow) {
                    console.warn(`⚠️ No balance found for ${token.symbol}. Returning zero balance.`);
                    return { amount: { value: 0, formatted: this.formatBalance(0, token) }, token };
                }
                const [amountStr] = matchingRow.balance.split(' ');
                const value = parseFloat(amountStr) * Math.pow(10, token.precision);
                return { amount: { value, formatted: this.formatBalance(value, token) }, token };
            }),
            catchError(error => {
                context.error(`❌ Error fetching balance for ${token.symbol}:`, error);
                return of({ amount: { value: 0, formatted: this.formatBalance(0, token) }, token });
            })
        );
    }

    /**
     * Adds or updates a token balance in the BehaviorSubject state.
     */
    private addSingleBalanceToState(
        balances$: BehaviorSubject<W3oBalance[]>,
        balance: W3oBalance,
        context: W3oContext
    ) {
        logger.method('addSingleBalanceToState', { balance }, context);
        const current = balances$.getValue();
        const idx = current.findIndex(b => b.token.symbol === balance.token.symbol);
        if (idx !== -1) {
            if (current[idx].amount.value !== balance.amount.value) {
                current[idx] = balance;
                balances$.next([...current]);
            } else {
                logger.log(`⚠️ No change detected in balance for ${balance.token.symbol}.`);
            }
        } else {
            balances$.next([...current, balance]);
        }
    }

    /**
     * Replaces all token balances in the BehaviorSubject state.
     */
    private addAllBalancesToState(
        balances$: BehaviorSubject<W3oBalance[]>,
        balances: W3oBalance[],
        context: W3oContext,
    ) {
        logger.method('addAllBalancesToState', { balances }, context);
        balances$.next(balances);
    }

    /**
     * Formats a token balance according to its precision.
     */
    private formatBalance(rawAmount: number, token: W3oToken): string {
        const factor = Math.pow(10, token.precision);
        return (rawAmount / factor).toFixed(token.precision);
    }

    /**
     * Returns or creates the shared BehaviorSubject that holds transfer statuses.
     */
    public getTransferStatus$(auth: W3oAuthenticator, parent: W3oContext): BehaviorSubject<Map<string, W3oTransferStatus>> {
        logger.method('getTransferStatus$', { auth }, parent);
        let transferStatus$ = auth.session.storage.get('transferStatus$') as BehaviorSubject<Map<string, W3oTransferStatus>>;
        if (!transferStatus$) {
            logger.info('Creating new transferStatus observable: BehaviorSubject<Map<string, TransferStatus>>', { auth });
            transferStatus$ = new BehaviorSubject<Map<string, W3oTransferStatus>>(new Map<string, W3oTransferStatus>());
            auth.session.storage.set('transferStatus$', transferStatus$);
        }
        return transferStatus$;
    }

    /**
     * Returns an observable transfer status for a given token symbol and authenticator.
     */
    public getTransferStatusForAuth(auth: W3oAuthenticator, tokenSymbol: string, parent: W3oContext): Observable<W3oTransferStatus> {
        return this.getTransferStatus$(auth, parent).asObservable().pipe(
            map(statusMap => statusMap.get(tokenSymbol) || { state: 'none' } as W3oTransferStatus)
        );
    }

    /**
     * Returns an observable transfer status for a given token symbol using the current session.
     */
    public getTransferStatus(tokenSymbol: string, parent: W3oContext): Observable<W3oTransferStatus> {
        const context = logger.method('getTransferStatus', { tokenSymbol }, parent);
        const session = this.octopus.sessions.current;
        if (!session) {
            context.error('No active session');
            return of({ state: 'none' } as W3oTransferStatus);
        }
        const auth = session.authenticator;
        return this.getTransferStatus$(auth, parent).asObservable().pipe(
            map(statusMap => statusMap.get(tokenSymbol) || { state: 'none' } as W3oTransferStatus)
        );
    }

    /**
     * Sets the transfer status for a specific token.
     */
    private setTransferStatus(
        auth: W3oAuthenticator,
        tokenSymbol: string,
        state: 'none' | 'success' | 'failure',
        message?: string,
        summary?: W3oTransferSummary,
        parent?: W3oContext
    ): void {
        const context = logger.method('setTransferStatus', { auth, tokenSymbol, state }, parent);
        const transferStatus$ = this.getTransferStatus$(auth, context);
        const statusMap = transferStatus$.getValue();
        statusMap.set(tokenSymbol, { state, message, summary });
        transferStatus$.next(statusMap);
    }

    /**
     * Resets the transfer status cycle for a specific token.
     */
    public resetTransferCycle(auth: W3oAuthenticator, tokenSymbol: string, parent: W3oContext): void {
        this.setTransferStatus(auth, tokenSymbol, 'none', undefined, undefined, parent);
    }

    /**
     * Resets transfer status for all tokens known to the authenticator's network.
     */
    public resetAllTransfers(auth: W3oAuthenticator, parent: W3oContext): void {
        const context = logger.method('resetAllTransfers', {}, parent);
        auth.network.tokens$.subscribe(tokenList => {
            tokenList.forEach(token => {
                this.resetTransferCycle(auth, token.symbol, context);
            });
        });
    }

    /**
     * Transfers a token and updates the transfer status accordingly.
     */
    public transferToken(
        auth: W3oAuthenticator,
        to: string,
        quantity: string,
        token: W3oToken,
        memo: string = '',
        parent: W3oContext
    ): Observable<AntelopeTransferSummary> {
        const context = logger.method('transferToken', { auth, to, quantity, token, memo }, parent);

        const from = auth.account.address;
        if (!from) {
            const errorMessage = 'No active session.';
            context.error(errorMessage);
            this.setTransferStatus(auth, token.symbol, 'failure', errorMessage, undefined, context);
            return throwError(() => new W3oError(W3oError.AUTH_WITHOUT_ACCOUNT, { auth }));
        }

        const result$ = new Subject<AntelopeTransferSummary>();
        try {
            const action = {
                account: token.account,
                name: 'transfer',
                authorization: [{ actor: from, permission: 'active' }],
                data: { from, to, quantity, memo },
            };
            logger.info('Sending transfer transaction', action);

            auth.session.signTransaction({ action }, context).subscribe({
                next: (result) => {
                    const txId = result.hash;
                    logger.info(`Transaction successful: ${txId}`);

                    const summary: AntelopeTransferSummary = {
                        from,
                        to,
                        amount: quantity,
                        transaction: txId,
                        memo,
                    };

                    this.setTransferStatus(auth, token.symbol, 'success', `Transferred ${quantity} to ${to}. TX: ${txId}`, summary, context);

                    this.fetchSingleBalance(auth, token, context).subscribe(() => {
                        logger.info(`Balance updated for ${token.symbol}`);
                    }, err => {
                        context.error(`Error updating balance for ${token.symbol}`, err);
                        new W3oError(W3oError.TRANSACTION_ERROR, { auth });
                    });
                },
                error: (error) => {
                    const errorMessage = error instanceof Error ? error.message : 'Transaction failed: Unknown error';
                    context.error('Transaction failed', error);
                    this.setTransferStatus(auth, token.symbol, 'failure', errorMessage, undefined, context);
                    result$.error(error);
                },
                complete: () => {
                    logger.info('Transaction completed');
                    result$.complete();
                }
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Transaction failed: Unknown error';
            context.error('Transaction failed', error);
            this.setTransferStatus(auth, token.symbol, 'failure', errorMessage, undefined, context);
        }

        return result$.asObservable();
    }

    /**
     * Returns a snapshot of the service state including its class name.
     */
    override snapshot(): any {
        return {
            ...super.snapshot(),
            _class: 'AntelopeTokensService',
        };
    }
}
