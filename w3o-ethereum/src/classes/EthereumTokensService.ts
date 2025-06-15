// w3o-ethereum/src/classes/EthereumTokensService.ts

import {
    W3oContext,
    W3oContextFactory,
    W3oInstance,
    W3oService,
    W3oModule,
    W3oBalance,
    W3oAuthenticator,
    W3oToken,
    W3oTransferSummary,
} from "@vapaee/w3o-core";
import { BehaviorSubject, combineLatest, Observable, of, Subject } from "rxjs";
import { ethers } from "ethers";
import { EthereumAccount } from "./EthereumAccount";

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
            'ethereum.auth.metamask@1.0.0',
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
        const provider = (auth.account as EthereumAccount).authenticator.network['client'];
        const contract = new ethers.Contract(token.address, erc20Abi, provider);
        return new Observable<W3oBalance>((observer) => {
            contract.balanceOf(address).then((balance: any) => {
                const value = Number(balance.toString());
                const formatted = (value / Math.pow(10, token.precision)).toFixed(token.precision);
                observer.next({ amount: { value, formatted }, token });
                observer.complete();
            }).catch((error: any) => {
                context.error('fetchSingleBalance error', error);
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
            const provider = (auth.account as EthereumAccount).authenticator.network['client'];
            const signer = new ethers.Wallet(auth.session.storage.get('privateKey'), provider);
            const contract = new ethers.Contract(token.address, erc20Abi, signer);
            contract.transfer(to, quantity).then((tx: any) => {
                result$.next({ from: signer.address, to, amount: quantity, transaction: tx.hash });
                result$.complete();
            }).catch((error: any) => {
                context.error('transfer error', error);
                result$.error(error);
            });
        } catch (error) {
            context.error('transferToken failed', error as any);
            result$.error(error);
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
