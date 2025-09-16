import { Observable } from 'rxjs';
import {
    W3oContext,
    W3oContextFactory,
    W3oChainSupport,
    W3oNetworkType,
    W3oTransactionResponse,
    W3oNetworkName,
    W3oToken,
    W3oTokenData,
    W3oContract,
    W3oAddress,
    W3oWallet,
} from '@vapaee/w3o-core';
import { AntelopeWharfkit, WharfkitInstance } from './AntelopeWharfkit';
import { Name } from '@wharfkit/antelope';
import { W3oAntelopeNetworkSettings } from '../types';

const logger = new W3oContextFactory('AntelopeChainSupport');

export class AntelopeTransactionResponse extends W3oTransactionResponse {
    constructor(hash: string) { super(hash); }
    wait(): Observable<any> { return new Observable(o => { o.next({ status: 'success' }); o.complete(); }); }
}

export class AntelopeChainSupport extends W3oChainSupport {
    private _wharfkits: { [network: string]: WharfkitInstance } = {};

    constructor(
        parent: W3oContext,
        wallets: W3oWallet[],
    ) {
        const context = logger.method('constructor', parent);
        super('antelope' as W3oNetworkType, wallets, context);
    }

    override get w3oVersion(): string { return '1.0.2'; }
    override get w3oName(): string { return 'antelope.chain.support'; }
    override get w3oRequire(): string[] { return []; }

    getWharfkit(networkName: W3oNetworkName, parent: W3oContext): WharfkitInstance {
        logger.method('getWharfkit', { networkName }, parent);
        if (!this._wharfkits[networkName]) {
            const network = this.octopus.networks.getNetwork(networkName, parent);
            const settings = network.settings as W3oAntelopeNetworkSettings;
            this._wharfkits[networkName] = AntelopeWharfkit.wharfkit(this.octopus.settings.appName, settings, parent);
        }
        return this._wharfkits[networkName];
    }

    override createToken(data: W3oTokenData, parent: W3oContext): W3oToken {
        const context = logger.method('createToken', { data }, parent);
        const token = new W3oToken(data, new W3oContract(
            data.address,
            data.name ?? `${data.symbol} token`,
            [], // Not needed?
            context
        ));
        return token;
    }


    override queryContract(networkName: W3oNetworkName, params: { [key: string]: any }, parent: W3oContext): Observable<any> {
        const context = logger.method('queryContract', { networkName, params }, parent);
        return new Observable(observer => {
            const wk = this.getWharfkit(networkName, context);
            wk.accountKit.client.v1.chain.get_table_rows(params as any).then(result => {
                observer.next(result);
                observer.complete();
            }).catch(err => observer.error(err));
        });
    }

    override validateAccount(username: string, parent: W3oContext): Observable<boolean> {
        const { network } = parent.args<{ network: W3oNetworkName }>();
        const sender = parent.parent()?.args<{ sender?: string }>()?.sender;

        const validPattern = /^[a-z1-5]{1,12}$/.test(username);
        if (!validPattern) {
            return new Observable(o => { o.next(false); o.complete(); });
        }

        if (sender && sender === username) {
            return new Observable(o => { o.next(false); o.complete(); });
        }

        const wk = this.getWharfkit(network, parent);
        return new Observable(sub => {
            wk.accountKit.client.v1.chain.get_account(Name.from(username)).then(() => {
                sub.next(true); sub.complete();
            }).catch(() => { sub.next(false); sub.complete(); });
        });
    }

    override fetchContract(address: W3oAddress, parent: W3oContext): Observable<W3oContract | null> {
        const context = logger.method('fetchContract', { address }, parent);
        context.error('fetchContract not implemented');
        return new Observable<W3oContract | null>();
    }

}
