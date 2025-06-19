// w3o-ethereum/src/classes/EthereumTokensService.ts

import {
    W3oAccount,
    W3oContext,
    W3oContextFactory,
    W3oInstance,
    W3oService,
    W3oModule,
    W3oBalance,
    W3oAuthenticator,
    W3oToken,
    W3oTransferSummary,
    W3oTransferStatus,
} from "@vapaee/w3o-core";
import { BehaviorSubject, combineLatest, Observable, of, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { ethers } from "ethers";
import { EthereumNetwork } from "./EthereumNetwork";

const logger = new W3oContextFactory('EthereumTokensService');
const erc20Abi = [
    "function balanceOf(address owner) view returns (uint256)",
    "function transfer(address to, uint amount) returns (bool)"
];

export class EthereumTokensService extends W3oService {
    constructor(path: string, parent: W3oContext) {
        const context = logger.method('constructor', { path }, parent);
        super(path, context);
    }

    get w3oVersion(): string {
        return '1.0.0';
    }

    get w3oName(): string {
        return 'ethereum.service.tokens';
    }

    get w3oRequire(): string[] {
        return [
            'ethereum.chain.support@1.0.0',
            'ethereum.network.support@1.0.0',
        ];
    }

    override init(octopus: W3oInstance, requirements: W3oModule[], parent: W3oContext): void {
        const context = logger.method('init', { octopus, requirements }, parent);
        logger.info('EthereumTokensService OK!', super.w3oId);
        super.init(octopus, requirements, context);
    }

    public getBalances$(auth: W3oAuthenticator, parent: W3oContext): BehaviorSubject<W3oBalance[]> {
        const context = logger.method('getBalances$', { auth }, parent);
        void context;
        let balances$ = auth.session.storage.get('balances$') as BehaviorSubject<W3oBalance[]>;
        if (!balances$) {
            balances$ = new BehaviorSubject<W3oBalance[]>([]);
            auth.session.storage.set('balances$', balances$);
        }
        return balances$;
    }

    private fetchSingleBalance(auth: W3oAuthenticator, token: W3oToken, parent: W3oContext): Observable<W3oBalance> {
        const context = logger.method('fetchSingleBalance', { auth, token }, parent);
        const session = auth.session;
        const address = session.address;
        if (!address) {
            return of({ amount: { value: 0, formatted: '0' }, token });
        }
        const network = (auth.account as W3oAccount).authenticator.network as unknown as EthereumNetwork;

        // If the token address indicates the native currency, fetch balance directly from provider
        if (token.address === '___NATIVE_CURRENCY___') {
            return new Observable<W3oBalance>((observer) => {
                network.provider.getBalance(address).then((balance: any) => {
                    const value = Number(balance.toString());
                    const formatted = (value / Math.pow(10, token.precision)).toFixed(token.precision);
                    observer.next({ amount: { value, formatted }, token });
                    observer.complete();
                }).catch((error: any) => {
                    context.error('fetchSingleBalance error', {error, token: token.symbol, address});
                    observer.next({ amount: { value: 0, formatted: '0' }, token });
                    observer.complete();
                });
            });
        }

        const contract = new ethers.Contract(token.address, erc20Abi, network.provider);
        return new Observable<W3oBalance>((observer) => {
            contract.balanceOf(address).then((balance: any) => {
                const value = Number(balance.toString());
                const formatted = (value / Math.pow(10, token.precision)).toFixed(token.precision);
                observer.next({ amount: { value, formatted }, token });
                observer.complete();
            }).catch((error: any) => {
                context.error('fetchSingleBalance error', {error, token: token.symbol, address});
                observer.next({ amount: { value: 0, formatted: '0' }, token });
                observer.complete();
            });
        });
    }

    private addSingleBalanceToState(
        balances$: BehaviorSubject<W3oBalance[]>,
        balance: W3oBalance
    ) {
        const current = balances$.getValue();
        const idx = current.findIndex(b => b.token.symbol === balance.token.symbol);
        if (idx !== -1) {
            current[idx] = balance;
            balances$.next([...current]);
        } else {
            balances$.next([...current, balance]);
        }
    }

    public getTransferStatus$(auth: W3oAuthenticator, parent: W3oContext): BehaviorSubject<Map<string, W3oTransferStatus>> {
        logger.method('getTransferStatus$', { auth }, parent);
        let transferStatus$ = auth.session.storage.get('transferStatus$') as BehaviorSubject<Map<string, W3oTransferStatus>>;
        if (!transferStatus$) {
            transferStatus$ = new BehaviorSubject<Map<string, W3oTransferStatus>>(new Map<string, W3oTransferStatus>());
            auth.session.storage.set('transferStatus$', transferStatus$);
        }
        return transferStatus$;
    }

    public getTransferStatusForAuth(auth: W3oAuthenticator, tokenSymbol: string, parent: W3oContext): Observable<W3oTransferStatus> {
        return this.getTransferStatus$(auth, parent).asObservable().pipe(
            map(statusMap => statusMap.get(tokenSymbol) || { state: 'none' } as W3oTransferStatus)
        );
    }

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

    public resetTransferCycle(auth: W3oAuthenticator, tokenSymbol: string, parent: W3oContext): void {
        this.setTransferStatus(auth, tokenSymbol, 'none', undefined, undefined, parent);
    }

    public resetAllTransfers(auth: W3oAuthenticator, parent: W3oContext): void {
        const context = logger.method('resetAllTransfers', {}, parent);
        auth.network.tokens$.subscribe(tokenList => {
            tokenList.forEach(token => {
                this.resetTransferCycle(auth, token.symbol, context);
            });
        });
    }

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
                        this.addSingleBalanceToState(this.getBalances$(auth, context), balance);
                        observer.next(balance);
                        observer.complete();
                    } else if ((Date.now() - startTime) / 1000 >= maxSeconds) {
                        observer.error(new Error('Timeout: Balance did not change within the specified time.'));
                    } else {
                        setTimeout(check, 1000);
                    }
                }, err => {
                    context.error('Error checking balance change', err);
                    observer.error(err);
                });
            };
            setTimeout(check, delay * 1000);
        });
    }

    public updateAllBalances(auth: W3oAuthenticator, parent: W3oContext): void {
        const context = logger.method('updateAllBalances', { auth }, parent);
        const balances$ = this.getBalances$(auth, context);
        auth.network.tokens$.subscribe(tokens => {
            const obs = tokens.map(t => this.fetchSingleBalance(auth, t, context));
            combineLatest(obs).subscribe(balances => {
                balances.forEach(b => this.addSingleBalanceToState(balances$, b));
            });
        });
    }

    public transferToken(
        auth: W3oAuthenticator,
        to: string,
        quantity: string,
        token: W3oToken,
        memo: string = '',
        parent: W3oContext
    ): Observable<W3oTransferSummary> {
        const context = logger.method('transferToken', { auth, to, quantity, token }, parent);
        void memo;
        const result$ = new Subject<W3oTransferSummary>();
        try {
            const network = auth.network as unknown as EthereumNetwork;
            if (typeof window !== 'undefined' && (window as any).ethereum) {
                const web3Provider = new ethers.providers.Web3Provider((window as any).ethereum);
                const signer = web3Provider.getSigner();
                const contract = new ethers.Contract(token.address, erc20Abi, signer);
                const numericPart = quantity.split(' ')[0];
                const amount = ethers.utils.parseUnits(numericPart, token.precision);

                contract.transfer(to, amount).then((tx: any) => {
                    const summary: W3oTransferSummary = {
                        from: auth.session.address!,
                        to,
                        amount: quantity,
                        transaction: tx.hash
                    };
                    this.setTransferStatus(auth, token.symbol, 'success', `Transferred ${quantity} to ${to}. TX: ${tx.hash}`, summary, context);
                    this.fetchSingleBalance(auth, token, context).subscribe(balance => {
                        this.addSingleBalanceToState(this.getBalances$(auth, context), balance);
                    });
                    result$.next(summary);
                    result$.complete();
                }).catch((error: any) => {
                    const msg = error instanceof Error ? error.message : 'Transaction failed: Unknown error';
                    context.error('transfer error', error);
                    this.setTransferStatus(auth, token.symbol, 'failure', msg, undefined, context);
                    result$.error(error);
                });
            } else {
                const iface = new ethers.utils.Interface(erc20Abi);
                const data = iface.encodeFunctionData('transfer', [to, quantity]);
                auth.session.signTransaction({ to: token.address, data }, context).subscribe({
                    next: (tx) => {
                        const summary: W3oTransferSummary = { from: auth.session.address!, to, amount: quantity, transaction: tx.hash };
                        this.setTransferStatus(auth, token.symbol, 'success', `Transferred ${quantity} to ${to}. TX: ${tx.hash}`, summary, context);
                        this.fetchSingleBalance(auth, token, context).subscribe(balance => {
                            this.addSingleBalanceToState(this.getBalances$(auth, context), balance);
                        });
                        result$.next(summary);
                    },
                    error: (error) => {
                        const msg = error instanceof Error ? error.message : 'Transaction failed: Unknown error';
                        context.error('transfer error', error);
                        this.setTransferStatus(auth, token.symbol, 'failure', msg, undefined, context);
                        result$.error(error);
                    },
                    complete: () => {
                        result$.complete();
                    }
                });
            }
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Transaction failed: Unknown error';
            context.error('transferToken failed', error as any);
            this.setTransferStatus(auth, token.symbol, 'failure', msg, undefined, context);
            result$.error(error as any);
        }
        return result$.asObservable();
    }

    override snapshot(): any {
        return {
            ...super.snapshot(),
            _class: 'EthereumTokensService',
        };
    }
}
