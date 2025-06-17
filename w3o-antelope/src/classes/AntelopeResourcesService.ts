// w3o-antelope/src/classes/AntelopeResourcesService.ts

import {
    BehaviorSubject,
    combineLatest,
    Observable,
    of
} from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
    W3oAuthenticator,
    W3oContext,
    W3oContextFactory,
    W3oInstance,
    W3oModule,
    W3oService,
    W3oTransactionReceipt
} from '@vapaee/w3o-core';
import {
    AntelopeResourcesState,
    AntelopeBalanceBreakdown,
    AntelopeResources,
    AntelopeAccountData,
    AntelopeRexbalTable,
    AntelopeRexfundTable
} from '../types';

const logger = new W3oContextFactory('AntelopeResourcesService');

/**
 * Service responsible for retrieving and modifying account resources on
 * Antelope based chains. It exposes an observable with the current
 * resources state and provides helper methods to perform common
 * resource management actions.
 */
export class AntelopeResourcesService extends W3oService {

    constructor(path: string, parent: W3oContext) {
        const context = logger.method('constructor', { path }, parent);
        super(path, context);
    }

    /** Returns current version */
    get w3oVersion(): string { return '1.0.0'; }

    /** Module name used by Web3Octopus */
    get w3oName(): string { return 'antelope.service.resources'; }

    /** Dependencies required to operate */
    get w3oRequire(): string[] {
        return [
            'antelope.chain.support@1.0.0',
            'antelope.network.support@1.0.0',
        ];
    }

    /** Initialise service */
    override init(octopus: W3oInstance, requirements: W3oModule[], parent: W3oContext): void {
        const context = logger.method('init', { octopus, requirements }, parent);
        logger.info('AntelopeResourcesService OK!', super.w3oId);
        super.init(octopus, requirements, context);
    }

    /**
     * Returns or creates the shared BehaviorSubject of resources for the
     * provided authenticator.
     */
    public getResources$(auth: W3oAuthenticator, parent: W3oContext): BehaviorSubject<AntelopeResourcesState> {
        const context = logger.method('getResources$', { auth }, parent);
        let resources$ = auth.session.storage.get('resources$') as BehaviorSubject<AntelopeResourcesState>;
        if (!resources$) {
            resources$ = new BehaviorSubject<AntelopeResourcesState>(this.emptyState());
            auth.session.storage.set('resources$', resources$);
            this.updateResources(auth, context);
        }
        return resources$;
    }

    /** Fetch latest resources from blockchain and update state */
    public updateResources(auth: W3oAuthenticator, parent: W3oContext): void {
        const context = logger.method('updateResources', { auth }, parent);
        const subject = this.getResources$(auth, context);
        this.fetchResources(auth, context).subscribe({
            next: (res) => subject.next(res),
            error: (err) => context.error('fetchResources error', err)
        });
    }

    /**
     * Performs the RPC calls required to gather the full resources
     * information for the given authenticator.
     */
    private fetchResources(auth: W3oAuthenticator, parent: W3oContext): Observable<AntelopeResourcesState> {
        const context = logger.method('fetchResources', {}, parent);
        const session = auth.session;
        const address = session.address?.toString();
        if (!address) {
            context.error('No active session');
            return of(this.emptyState());
        }

        const http = auth.network.settings.httpClient!;
        const rpc = auth.network.settings.rpcUrl;

        const getAccount$ = http.post<AntelopeAccountData>(`${rpc}/v1/chain/get_account`, { account_name: address })
            .pipe(catchError(() => of(null)));

        const rexbalParams = { json: true, code: 'eosio', scope: address, table: 'rexbal' };
        const rexBal$ = auth.network.queryContract(rexbalParams, context)
            .pipe(catchError(() => of({ rows: [] } as any)));

        const rexfundParams = { json: true, code: 'eosio', scope: address, table: 'rexfund' };
        const rexFund$ = auth.network.queryContract(rexfundParams, context)
            .pipe(catchError(() => of({ rows: [] } as any)));

        return combineLatest([getAccount$, rexBal$, rexFund$]).pipe(
            map(([account, rexbal, rexfund]) => this.parseResources(account, rexbal, rexfund, context))
        );
    }

    /** Parses RPC responses into AntelopeResources */
    private parseResources(account: AntelopeAccountData | null, rexbal: AntelopeRexbalTable, rexfund: AntelopeRexfundTable, context: W3oContext): AntelopeResourcesState {
        logger.method('parseResources', { account, rexbal, rexfund }, context);

        if (!account) {
            return this.emptyState();
        }

        const liquid = account.core_liquid_balance || '0.0000 TLOS';

        const cpuStaked = account.self_delegated_bandwidth?.cpu_weight || '0.0000 TLOS';
        const netStaked = account.self_delegated_bandwidth?.net_weight || '0.0000 TLOS';

        const refundCpu = account.refund_request?.cpu_amount || '0.0000 TLOS';
        const refundNet = account.refund_request?.net_amount || '0.0000 TLOS';
        const refundingVal = this.assetToValue(refundCpu) + this.assetToValue(refundNet);
        const refunding = this.valueToAsset(refundingVal);

        const rexStaked = rexbal?.rows?.[0]?.vote_stake || '0.0000 TLOS';
        const rexDeposits = rexfund?.rows?.[0]?.balance || '0.0000 TLOS';

        const cpuTotal = this.assetToValue(account.total_resources?.cpu_weight || '0.0000 TLOS');
        const netTotal = this.assetToValue(account.total_resources?.net_weight || '0.0000 TLOS');
        const cpuSelf = this.assetToValue(account.self_delegated_bandwidth?.cpu_weight || '0.0000 TLOS');
        const netSelf = this.assetToValue(account.self_delegated_bandwidth?.net_weight || '0.0000 TLOS');
        const delDiff = (cpuSelf + netSelf) - (cpuTotal + netTotal);
        const delegatedToOthers = this.valueToAsset(Math.max(delDiff, 0));
        const delegatedByOthers = this.valueToAsset(Math.max(-delDiff, 0));

        const ramTotalBytes = account.ram_quota || 0;
        const ramAvailableBytes = ramTotalBytes - (account.ram_usage || 0);

        const totalVal =
            this.assetToValue(liquid) +
            this.assetToValue(cpuStaked) +
            this.assetToValue(netStaked) +
            this.assetToValue(rexStaked) +
            this.assetToValue(rexDeposits) +
            refundingVal;

        const balance: AntelopeBalanceBreakdown = {
            total: this.valueToAsset(totalVal),
            liquid,
            rexStaked,
            rexDeposits,
            cpuStaked,
            netStaked,
            refunding,
            delegatedToOthers,
            delegatedByOthers,
            ramTotal: `${ramTotalBytes} bytes`,
            ramAvailable: `${ramAvailableBytes} bytes`
        };

        const resources: AntelopeResources = {
            cpu: {
                total: account.cpu_limit.max,
                used: account.cpu_limit.used,
                percent: account.cpu_limit.max ? (account.cpu_limit.used / account.cpu_limit.max) * 100 : 0,
                available: account.cpu_limit.max - account.cpu_limit.used
            },
            net: {
                total: account.net_limit.max,
                used: account.net_limit.used,
                percent: account.net_limit.max ? (account.net_limit.used / account.net_limit.max) * 100 : 0,
                available: account.net_limit.max - account.net_limit.used
            },
            ram: {
                total: ramTotalBytes,
                used: account.ram_usage,
                percent: ramTotalBytes ? (account.ram_usage / ramTotalBytes) * 100 : 0,
                available: ramAvailableBytes
            }
        };

        return { balance, resources, account };
    }

    /** Creates an empty resources object */
    private emptyState(): AntelopeResourcesState {
        return {
            balance: {
                total: '0.0000 TLOS',
                liquid: '0.0000 TLOS',
                rexStaked: '0.0000 TLOS',
                rexDeposits: '0.0000 TLOS',
                cpuStaked: '0.0000 TLOS',
                netStaked: '0.0000 TLOS',
                refunding: '0.0000 TLOS',
                delegatedToOthers: '0.0000 TLOS',
                delegatedByOthers: '0.0000 TLOS',
                ramTotal: '0 bytes',
                ramAvailable: '0 bytes'
            },
            resources: {
                cpu: { total: 0, used: 0, percent: 0, available: 0 },
                net: { total: 0, used: 0, percent: 0, available: 0 },
                ram: { total: 0, used: 0, percent: 0, available: 0 }
            },
            account: null
        };
    }

    /** Parses a string asset (e.g. "1.0000 TLOS") into a numeric value */
    private assetToValue(asset: string): number {
        const [amount] = asset.split(' ');
        const value = parseFloat(amount);
        return isNaN(value) ? 0 : value;
    }

    /** Formats a numeric value into an asset string with 4 decimals */
    private valueToAsset(value: number): string {
        return `${value.toFixed(4)} TLOS`;
    }

    // ---------------------------------------------------------------------
    //  Transaction helpers
    // ---------------------------------------------------------------------

    private quantity(amount: number): string {
        return `${amount.toFixed(4)} TLOS`;
    }

    private transact(auth: W3oAuthenticator, actions: any | any[], parent: W3oContext): Observable<W3oTransactionReceipt> {
        const context = logger.method('transact', { actions }, parent);
        return new Observable<W3oTransactionReceipt>(observer => {
            const params = Array.isArray(actions) ? { actions } : { action: actions };
            auth.session.signTransaction(params, context).subscribe({
                next: res => {
                    res.wait().subscribe({
                        next: receipt => {
                            this.updateResources(auth, context);
                            observer.next(receipt);
                            observer.complete();
                        },
                        error: err => observer.error(err)
                    });
                },
                error: err => observer.error(err)
            });
        });
    }

    // ---- CPU & NET ----

    public stakeCpu(amount: number): Observable<W3oTransactionReceipt> {
        const context = logger.method('stakeCpu', { amount });
        const auth = this.octopus.sessions.current?.authenticator!;
        return this.delegateResources(auth.account.address, amount, 0, auth, context);
    }

    public unstakeCpu(amount: number): Observable<W3oTransactionReceipt> {
        const context = logger.method('unstakeCpu', { amount });
        const auth = this.octopus.sessions.current?.authenticator!;
        return this.undelegateResources(auth.account.address, amount, 0, auth, context);
    }

    public stakeNet(amount: number): Observable<W3oTransactionReceipt> {
        const context = logger.method('stakeNet', { amount });
        const auth = this.octopus.sessions.current?.authenticator!;
        return this.delegateResources(auth.account.address, 0, amount, auth, context);
    }

    public unstakeNet(amount: number): Observable<W3oTransactionReceipt> {
        const context = logger.method('unstakeNet', { amount });
        const auth = this.octopus.sessions.current?.authenticator!;
        return this.undelegateResources(auth.account.address, 0, amount, auth, context);
    }

    public delegateResources(to: string, cpuAmount: number, netAmount: number, auth?: W3oAuthenticator, parent?: W3oContext): Observable<W3oTransactionReceipt> {
        const context = logger.method('delegateResources', { to, cpuAmount, netAmount }, parent);
        auth = auth || this.octopus.sessions.current!.authenticator;
        const from = auth.account.address;
        const action = {
            account: 'eosio',
            name: 'delegatebw',
            authorization: [{ actor: from, permission: 'active' }],
            data: {
                from,
                receiver: to,
                stake_net_quantity: this.quantity(netAmount),
                stake_cpu_quantity: this.quantity(cpuAmount),
                transfer: false
            }
        };
        return this.transact(auth, action, context);
    }

    public undelegateResources(from: string, cpuAmount: number, netAmount: number, auth?: W3oAuthenticator, parent?: W3oContext): Observable<W3oTransactionReceipt> {
        const context = logger.method('undelegateResources', { from, cpuAmount, netAmount }, parent);
        auth = auth || this.octopus.sessions.current!.authenticator;
        const owner = auth.account.address;
        const action = {
            account: 'eosio',
            name: 'undelegatebw',
            authorization: [{ actor: owner, permission: 'active' }],
            data: {
                from: owner,
                receiver: from,
                unstake_net_quantity: this.quantity(netAmount),
                unstake_cpu_quantity: this.quantity(cpuAmount)
            }
        };
        return this.transact(auth, action, context);
    }

    // ---- RAM ----

    public buyRam(bytes: number, auth?: W3oAuthenticator, parent?: W3oContext): Observable<W3oTransactionReceipt> {
        const context = logger.method('buyRam', { bytes }, parent);
        auth = auth || this.octopus.sessions.current!.authenticator;
        const account = auth.account.address;
        const action = {
            account: 'eosio',
            name: 'buyrambytes',
            authorization: [{ actor: account, permission: 'active' }],
            data: { payer: account, receiver: account, bytes }
        };
        return this.transact(auth, action, context);
    }

    public sellRam(bytes: number, auth?: W3oAuthenticator, parent?: W3oContext): Observable<W3oTransactionReceipt> {
        const context = logger.method('sellRam', { bytes }, parent);
        auth = auth || this.octopus.sessions.current!.authenticator;
        const account = auth.account.address;
        const action = {
            account: 'eosio',
            name: 'sellram',
            authorization: [{ actor: account, permission: 'active' }],
            data: { account, bytes }
        };
        return this.transact(auth, action, context);
    }

    // ---- REX ----

    public depositRex(amount: number, auth?: W3oAuthenticator, parent?: W3oContext): Observable<W3oTransactionReceipt> {
        const context = logger.method('depositRex', { amount }, parent);
        auth = auth || this.octopus.sessions.current!.authenticator;
        const owner = auth.account.address;
        const action = {
            account: 'eosio',
            name: 'deposit',
            authorization: [{ actor: owner, permission: 'active' }],
            data: { owner, amount: this.quantity(amount) }
        };
        return this.transact(auth, action, context);
    }

    public withdrawRex(amount: number, auth?: W3oAuthenticator, parent?: W3oContext): Observable<W3oTransactionReceipt> {
        const context = logger.method('withdrawRex', { amount }, parent);
        auth = auth || this.octopus.sessions.current!.authenticator;
        const owner = auth.account.address;
        const action = {
            account: 'eosio',
            name: 'withdraw',
            authorization: [{ actor: owner, permission: 'active' }],
            data: { owner, amount: this.quantity(amount) }
        };
        return this.transact(auth, action, context);
    }

    public refund(auth?: W3oAuthenticator, parent?: W3oContext): Observable<W3oTransactionReceipt> {
        const context = logger.method('refund', {}, parent);
        auth = auth || this.octopus.sessions.current!.authenticator;
        const owner = auth.account.address;
        const action = {
            account: 'eosio',
            name: 'refund',
            authorization: [{ actor: owner, permission: 'active' }],
            data: { owner }
        };
        return this.transact(auth, action, context);
    }

    public claimRefund(auth?: W3oAuthenticator, parent?: W3oContext): Observable<W3oTransactionReceipt> {
        return this.refund(auth, parent);
    }

    /** Snapshot of internal state */
    override snapshot(): any {
        return {
            ...super.snapshot(),
            _class: 'AntelopeResourcesService'
        };
    }
}

