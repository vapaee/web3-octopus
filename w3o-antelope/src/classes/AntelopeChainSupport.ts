import { Observable } from 'rxjs';
import {
    W3oContext,
    W3oContextFactory,
    W3oChainSupport,
    W3oNetworkType,
    W3oAuthenticator,
    W3oAccount,
    W3oTransaction,
    W3oTransactionResponse,
    W3oNetworkName,
    W3oError,
    W3oContract,
    W3oAddress,
} from '@vapaee/w3o-core';
import { AntelopeWharfkit, WharfkitInstance } from './AntelopeWharfkit';
import { Session } from '@wharfkit/session';
import { Name } from '@wharfkit/antelope';
import { AntelopeTransaction, W3oAntelopeNetworkSettings } from '../types';
import { AntelopeAccount } from './AntelopeAccount';

const logger = new W3oContextFactory('AntelopeChainSupport');

export class AntelopeTransactionResponse extends W3oTransactionResponse {
    constructor(hash: string) { super(hash); }
    wait(): Observable<any> { return new Observable(o => { o.next({ status: 'success' }); o.complete(); }); }
}

export class AntelopeChainSupport extends W3oChainSupport {
    private _wharfkits: { [network: string]: WharfkitInstance } = {};

    constructor(parent: W3oContext) {
        const context = logger.method('constructor', parent);
        super('antelope' as W3oNetworkType, context);
    }

    override isReadOnly(): boolean { return false; }

    override get w3oVersion(): string { return '1.0.0'; }
    override get w3oName(): string { return 'antelope.chain.support'; }
    override get w3oRequire(): string[] { return []; }

    private getWharfkit(networkName: W3oNetworkName, parent: W3oContext): WharfkitInstance {
        if (!this._wharfkits[networkName]) {
            const network = this.octopus.networks.getNetwork(networkName, parent);
            const settings = network.settings as W3oAntelopeNetworkSettings;
            this._wharfkits[networkName] = AntelopeWharfkit.wharfkit(this.octopus.settings.appName, settings, parent);
        }
        return this._wharfkits[networkName];
    }

    private setWharfkitSession(authenticator: W3oAuthenticator, session: Session, parent: W3oContext): string {
        logger.method('setWharfkitSession', { session }, parent);
        const accountname = session.actor.toString();
        authenticator.onSessionChange$.subscribe(() => {
            if (authenticator.session) {
                authenticator.session.storage.set<Session>('wharfkit.session', session);
                logger.info(`✅Logged in as ${accountname}`);
            }
        });
        return accountname;
    }

    private getWharfkitSession(authenticator: W3oAuthenticator, parent: W3oContext): Session {
        const session = authenticator.session.storage.get<Session>('wharfkit.session') as Session;
        if (!session) {
            throw new W3oError(W3oError.SESSION_MISSING_KEY, { key: 'wharfkit.session', authenticator });
        }
        return session;
    }

    private authenticate(
        auth: W3oAuthenticator,
        networkName: W3oNetworkName,
        parent: W3oContext,
        action: (wharfkit: WharfkitInstance, ctx: W3oContext) => Promise<Session | undefined>
    ): Observable<W3oAccount> {
        return new Observable(observer => {
            const context = logger.method('authenticate', { networkName }, parent);
            try {
                const wharfkit = this.getWharfkit(networkName, context);
                action(wharfkit, context).then(session => {
                    if (session) {
                        const address = this.setWharfkitSession(auth, session, context);
                        observer.next(new AntelopeAccount(address, session, auth, context));
                        observer.complete();
                    } else {
                        observer.error('session not found');
                    }
                }).catch(err => { observer.error(err); });
            } catch (e) { observer.error(e); }
        });
    }

    override login(auth: W3oAuthenticator, networkName: W3oNetworkName, parent: W3oContext): Observable<W3oAccount> {
        return this.authenticate(auth, networkName, parent, (wk, ctx) => wk.login(ctx));
    }

    override autoLogin(auth: W3oAuthenticator, networkName: W3oNetworkName, parent: W3oContext): Observable<W3oAccount> {
        return this.authenticate(auth, networkName, parent, (wk, ctx) => wk.restoreSession(ctx));
    }

    override logout(auth: W3oAuthenticator, parent: W3oContext): void {
        const session = this.getWharfkitSession(auth, parent);
        const wk = this.getWharfkit(auth.network.name, parent);
        if (session) {
            wk.logout(parent);
        }
    }

    override signTransaction(auth: W3oAuthenticator, trx: W3oTransaction, parent: W3oContext): Observable<W3oTransactionResponse> {
        const context = logger.method('signTransaction', { trx }, parent);
        const session = this.getWharfkitSession(auth, context);
        const transaction = trx as AntelopeTransaction;
        return new Observable(observer => {
            session.transact(transaction).then(response => {
                const txId = response.response?.['transaction_id'] as string || 'Unknown TX';
                observer.next(new AntelopeTransactionResponse(txId));
                observer.complete();
            }).catch(err => observer.error(err));
        });
    }

    override queryContract(networkName: W3oNetworkName, params: { [key: string]: any }, parent: W3oContext): Observable<any> {
        return new Observable(observer => {
            const wk = this.getWharfkit(networkName, logger.method('queryContract', params, parent));
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
