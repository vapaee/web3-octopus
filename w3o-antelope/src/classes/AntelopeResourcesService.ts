// w3o-antelope/src/classes/AntelopeResourcesService.ts

import {
    W3oContext,
    W3oContextFactory,
    W3oInstance,
    W3oService,
    W3oModule,
    W3oAuthenticator,
    W3oTransactionReceipt
} from "@vapaee/w3o-core";
import { BehaviorSubject, Observable, combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { AntelopeResources } from "../types";
import { AntelopeNetwork } from "./AntelopeNetwork";

const logger = new W3oContextFactory('AntelopeResourcesService');

/**
 * Service to read and modify account resources on Antelope networks.
 */
export class AntelopeResourcesService extends W3oService {

    constructor(path: string, parent: W3oContext) {
        const context = logger.method('constructor', { path }, parent);
        super(path, context);
    }

    /** Version of the service */
    get w3oVersion(): string { return '1.0.0'; }

    /** Name of the service */
    get w3oName(): string { return 'antelope.service.resources'; }

    /** Required modules */
    get w3oRequire(): string[] {
        return [
            'antelope.auth.anchor@1.0.0',
            'antelope.network.support@1.0.0'
        ];
    }

    override init(octopus: W3oInstance, requirements: W3oModule[], parent: W3oContext): void {
        const context = logger.method('init', { octopus, requirements }, parent);
        logger.info('AntelopeResourcesService OK!', super.w3oId);
        super.init(octopus, requirements, context);
    }

    /** Returns or creates the observable holding account resources */
    public getResources$(auth: W3oAuthenticator, parent: W3oContext): BehaviorSubject<AntelopeResources> {
        const context = logger.method('getResources$', { auth }, parent);
        let resources$ = auth.session.storage.get('resources$') as BehaviorSubject<AntelopeResources>;
        if (!resources$) {
            resources$ = new BehaviorSubject<AntelopeResources>(this.emptyResources());
            auth.session.storage.set('resources$', resources$);
            this.updateResources(auth, context).subscribe(res => resources$.next(res));
        }
        return resources$;
    }

    /** Fetches latest resources from chain and updates observable */
    public updateResources(auth: W3oAuthenticator, parent: W3oContext): Observable<AntelopeResources> {
        const context = logger.method('updateResources', { auth }, parent);
        const account$ = this.fetchAccountInfo(auth, context);
        const rex$ = this.fetchRexBalance(auth, context);
        return combineLatest([account$, rex$]).pipe(
            map(([account, rex]) => this.buildResources(account, rex)),
            map(res => {
                const resources$ = auth.session.storage.get('resources$') as BehaviorSubject<AntelopeResources>;
                if (resources$) { resources$.next(res); }
                return res;
            })
        );
    }

    // ------------------------ read helpers ------------------------

    private emptyResources(): AntelopeResources {
        return {
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
        };
    }


    private fetchAccountInfo(auth: W3oAuthenticator, parent: W3oContext): Observable<any> {
        const context = logger.method('fetchAccountInfo', { auth }, parent);
        const network = auth.network as AntelopeNetwork;
        const rpc = network.antelopeSettings.rpcUrl;
        const account = auth.session.address.toString();
        const httpClient = network.settings.httpClient!;
        return httpClient.post<any>(`${rpc}/v1/chain/get_account`, { account_name: account });
    }

    private fetchRexBalance(auth: W3oAuthenticator, parent: W3oContext): Observable<any> {
        const context = logger.method('fetchRexBalance', { auth }, parent);
        const network = auth.network as AntelopeNetwork;
        const rpc = network.antelopeSettings.rpcUrl;
        const account = auth.session.address.toString();
        const httpClient = network.settings.httpClient!;
        const params = {
            code: 'eosio',
            table: 'rexbal',
            scope: account,
            json: true,
            limit: 1
        };
        return httpClient.post<any>(`${rpc}/v1/chain/get_table_rows`, params);
    }

    private parseTlos(value: string | undefined): number {
        if (!value) return 0;
        const num = parseFloat(value.split(' ')[0]);
        return isNaN(num) ? 0 : num;
    }

    private formatTlos(amount: number): string {
        return `${amount.toFixed(4)} TLOS`;
    }

    private buildResources(account: any, rex: any): AntelopeResources {
        const liquid = account.core_liquid_balance || '0.0000 TLOS';
        const cpuSelf = account.self_delegated_bandwidth?.cpu_weight || '0.0000 TLOS';
        const netSelf = account.self_delegated_bandwidth?.net_weight || '0.0000 TLOS';
        const cpuTotal = account.total_resources?.cpu_weight || cpuSelf;
        const netTotal = account.total_resources?.net_weight || netSelf;

        const delegatedBy = this.formatTlos(
            this.parseTlos(cpuTotal) + this.parseTlos(netTotal) - this.parseTlos(cpuSelf) - this.parseTlos(netSelf)
        );

        const stakedTotal = account.voter_info?.staked ? account.voter_info.staked / 10000 : 0;
        const delegatedTo = this.formatTlos(
            stakedTotal - this.parseTlos(cpuSelf) - this.parseTlos(netSelf)
        );

        const refund = account.refund_request ?
            this.formatTlos(
                this.parseTlos(account.refund_request.cpu_amount) + this.parseTlos(account.refund_request.net_amount)
            ) : '0.0000 TLOS';

        const ramTotal = account.ram_quota ? `${account.ram_quota} bytes` : '0 bytes';
        const ramAvail = account.ram_quota && account.ram_usage !== undefined ?
            `${account.ram_quota - account.ram_usage} bytes` : '0 bytes';

        const rexRow = rex?.rows?.[0];
        const rexStaked = rexRow?.vote_stake || '0.0000 TLOS';
        const rexDeposits = rexRow?.rex_balance || '0.0000 TLOS';

        const total = this.formatTlos(
            this.parseTlos(liquid) +
            this.parseTlos(cpuSelf) +
            this.parseTlos(netSelf) +
            this.parseTlos(delegatedTo) +
            this.parseTlos(rexStaked) +
            this.parseTlos(rexDeposits) +
            this.parseTlos(refund)
        );

        return {
            total,
            liquid,
            rexStaked,
            rexDeposits,
            cpuStaked: cpuSelf,
            netStaked: netSelf,
            refunding: refund,
            delegatedToOthers: delegatedTo,
            delegatedByOthers: delegatedBy,
            ramTotal,
            ramAvailable: ramAvail
        };
    }

    // ------------------------ tx helpers ------------------------

    private performAction(auth: W3oAuthenticator, action: any, parent: W3oContext): Observable<W3oTransactionReceipt> {
        const context = logger.method('performAction', { action }, parent);
        return new Observable<W3oTransactionReceipt>(observer => {
            auth.session.signTransaction({ action }, context).subscribe({
                next: (response) => {
                    response.wait().subscribe({
                        next: receipt => {
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

    // ------------------------ public tx API ------------------------

    public stakeCpu(auth: W3oAuthenticator, amount: number, parent: W3oContext): Observable<W3oTransactionReceipt> {
        const account = auth.session.address.toString();
        const action = {
            account: 'eosio',
            name: 'delegatebw',
            authorization: [{ actor: account, permission: 'active' }],
            data: {
                from: account,
                receiver: account,
                stake_net_quantity: this.formatTlos(0),
                stake_cpu_quantity: this.formatTlos(amount),
                transfer: false
            }
        };
        return this.performAction(auth, action, parent);
    }

    public unstakeCpu(auth: W3oAuthenticator, amount: number, parent: W3oContext): Observable<W3oTransactionReceipt> {
        const account = auth.session.address.toString();
        const action = {
            account: 'eosio',
            name: 'undelegatebw',
            authorization: [{ actor: account, permission: 'active' }],
            data: {
                from: account,
                receiver: account,
                unstake_net_quantity: this.formatTlos(0),
                unstake_cpu_quantity: this.formatTlos(amount)
            }
        };
        return this.performAction(auth, action, parent);
    }

    public stakeNet(auth: W3oAuthenticator, amount: number, parent: W3oContext): Observable<W3oTransactionReceipt> {
        const account = auth.session.address.toString();
        const action = {
            account: 'eosio',
            name: 'delegatebw',
            authorization: [{ actor: account, permission: 'active' }],
            data: {
                from: account,
                receiver: account,
                stake_net_quantity: this.formatTlos(amount),
                stake_cpu_quantity: this.formatTlos(0),
                transfer: false
            }
        };
        return this.performAction(auth, action, parent);
    }

    public unstakeNet(auth: W3oAuthenticator, amount: number, parent: W3oContext): Observable<W3oTransactionReceipt> {
        const account = auth.session.address.toString();
        const action = {
            account: 'eosio',
            name: 'undelegatebw',
            authorization: [{ actor: account, permission: 'active' }],
            data: {
                from: account,
                receiver: account,
                unstake_net_quantity: this.formatTlos(amount),
                unstake_cpu_quantity: this.formatTlos(0)
            }
        };
        return this.performAction(auth, action, parent);
    }

    public delegateResources(auth: W3oAuthenticator, to: string, cpuAmount: number, netAmount: number, parent: W3oContext): Observable<W3oTransactionReceipt> {
        const from = auth.session.address.toString();
        const action = {
            account: 'eosio',
            name: 'delegatebw',
            authorization: [{ actor: from, permission: 'active' }],
            data: {
                from,
                receiver: to,
                stake_cpu_quantity: this.formatTlos(cpuAmount),
                stake_net_quantity: this.formatTlos(netAmount),
                transfer: false
            }
        };
        return this.performAction(auth, action, parent);
    }

    public undelegateResources(auth: W3oAuthenticator, fromUser: string, cpuAmount: number, netAmount: number, parent: W3oContext): Observable<W3oTransactionReceipt> {
        const actor = auth.session.address.toString();
        const action = {
            account: 'eosio',
            name: 'undelegatebw',
            authorization: [{ actor: actor, permission: 'active' }],
            data: {
                from: actor,
                receiver: fromUser,
                unstake_cpu_quantity: this.formatTlos(cpuAmount),
                unstake_net_quantity: this.formatTlos(netAmount)
            }
        };
        return this.performAction(auth, action, parent);
    }

    public buyRam(auth: W3oAuthenticator, bytes: number, parent: W3oContext): Observable<W3oTransactionReceipt> {
        const account = auth.session.address.toString();
        const action = {
            account: 'eosio',
            name: 'buyrambytes',
            authorization: [{ actor: account, permission: 'active' }],
            data: {
                payer: account,
                receiver: account,
                bytes
            }
        };
        return this.performAction(auth, action, parent);
    }

    public sellRam(auth: W3oAuthenticator, bytes: number, parent: W3oContext): Observable<W3oTransactionReceipt> {
        const account = auth.session.address.toString();
        const action = {
            account: 'eosio',
            name: 'sellram',
            authorization: [{ actor: account, permission: 'active' }],
            data: {
                account,
                bytes
            }
        };
        return this.performAction(auth, action, parent);
    }

    public depositRex(auth: W3oAuthenticator, amount: number, parent: W3oContext): Observable<W3oTransactionReceipt> {
        const account = auth.session.address.toString();
        const action = {
            account: 'eosio',
            name: 'deposit',
            authorization: [{ actor: account, permission: 'active' }],
            data: {
                owner: account,
                amount: this.formatTlos(amount)
            }
        };
        return this.performAction(auth, action, parent);
    }

    public withdrawRex(auth: W3oAuthenticator, amount: number, parent: W3oContext): Observable<W3oTransactionReceipt> {
        const account = auth.session.address.toString();
        const action = {
            account: 'eosio',
            name: 'withdraw',
            authorization: [{ actor: account, permission: 'active' }],
            data: {
                owner: account,
                amount: this.formatTlos(amount)
            }
        };
        return this.performAction(auth, action, parent);
    }

    public refund(auth: W3oAuthenticator, parent: W3oContext): Observable<W3oTransactionReceipt> {
        const account = auth.session.address.toString();
        const action = {
            account: 'eosio',
            name: 'refund',
            authorization: [{ actor: account, permission: 'active' }],
            data: { owner: account }
        };
        return this.performAction(auth, action, parent);
    }

    public transfer(auth: W3oAuthenticator, to: string, amount: number, memo: string = '', parent: W3oContext): Observable<W3oTransactionReceipt> {
        const from = auth.session.address.toString();
        const action = {
            account: 'eosio.token',
            name: 'transfer',
            authorization: [{ actor: from, permission: 'active' }],
            data: { from, to, quantity: this.formatTlos(amount), memo }
        };
        return this.performAction(auth, action, parent);
    }

    public claimRefund(auth: W3oAuthenticator, parent: W3oContext): Observable<W3oTransactionReceipt> {
        return this.refund(auth, parent);
    }

    override snapshot(): any {
        return { ...super.snapshot(), _class: 'AntelopeResourcesService' };
    }
}

