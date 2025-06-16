import { Observable } from 'rxjs';
import { W3oContextFactory, W3oChainSupport, W3oTransactionResponse, W3oError, } from '@vapaee/w3o-core';
import { AntelopeWharfkit } from './AntelopeWharfkit';
import { Name } from '@wharfkit/antelope';
import { AntelopeAccount } from './AntelopeAccount';
const logger = new W3oContextFactory('AntelopeChainSupport');
export class AntelopeTransactionResponse extends W3oTransactionResponse {
    constructor(hash) { super(hash); }
    wait() { return new Observable(o => { o.next({ status: 'success' }); o.complete(); }); }
}
export class AntelopeChainSupport extends W3oChainSupport {
    constructor(parent) {
        const context = logger.method('constructor', parent);
        super('antelope', context);
        this._wharfkits = {};
    }
    isReadOnly() { return false; }
    get w3oVersion() { return '1.0.0'; }
    get w3oName() { return 'antelope.chain.support'; }
    get w3oRequire() { return []; }
    getWharfkit(networkName, parent) {
        if (!this._wharfkits[networkName]) {
            const network = this.octopus.networks.getNetwork(networkName, parent);
            const settings = network.settings;
            this._wharfkits[networkName] = AntelopeWharfkit.wharfkit(this.octopus.settings.appName, settings, parent);
        }
        return this._wharfkits[networkName];
    }
    setWharfkitSession(authenticator, session, parent) {
        logger.method('setWharfkitSession', { session }, parent);
        const accountname = session.actor.toString();
        authenticator.onSessionChange$.subscribe(() => {
            if (authenticator.session) {
                authenticator.session.storage.set('wharfkit.session', session);
                logger.info(`✅Logged in as ${accountname}`);
            }
        });
        return accountname;
    }
    getWharfkitSession(authenticator, parent) {
        const session = authenticator.session.storage.get('wharfkit.session');
        if (!session) {
            throw new W3oError(W3oError.SESSION_MISSING_KEY, { key: 'wharfkit.session', authenticator });
        }
        return session;
    }
    authenticate(auth, networkName, parent, action) {
        return new Observable(observer => {
            const context = logger.method('authenticate', { networkName }, parent);
            try {
                const wharfkit = this.getWharfkit(networkName, context);
                action(wharfkit, context).then(session => {
                    if (session) {
                        const address = this.setWharfkitSession(auth, session, context);
                        observer.next(new AntelopeAccount(address, session, auth, context));
                        observer.complete();
                    }
                    else {
                        observer.error('session not found');
                    }
                }).catch(err => { observer.error(err); });
            }
            catch (e) {
                observer.error(e);
            }
        });
    }
    login(auth, networkName, parent) {
        return this.authenticate(auth, networkName, parent, (wk, ctx) => wk.login(ctx));
    }
    autoLogin(auth, networkName, parent) {
        return this.authenticate(auth, networkName, parent, (wk, ctx) => wk.restoreSession(ctx));
    }
    logout(auth, parent) {
        const session = this.getWharfkitSession(auth, parent);
        const wk = this.getWharfkit(auth.network.name, parent);
        if (session) {
            wk.logout(parent);
        }
    }
    signTransaction(auth, trx, parent) {
        const context = logger.method('signTransaction', { trx }, parent);
        const session = this.getWharfkitSession(auth, context);
        const transaction = trx;
        return new Observable(observer => {
            session.transact(transaction).then(response => {
                const txId = response.response?.['transaction_id'] || 'Unknown TX';
                observer.next(new AntelopeTransactionResponse(txId));
                observer.complete();
            }).catch(err => observer.error(err));
        });
    }
    queryContract(networkName, params, parent) {
        return new Observable(observer => {
            const wk = this.getWharfkit(networkName, logger.method('queryContract', params, parent));
            wk.accountKit.client.v1.chain.get_table_rows(params).then(result => {
                observer.next(result);
                observer.complete();
            }).catch(err => observer.error(err));
        });
    }
    validateAccount(username, parent) {
        const { network } = parent.args();
        const wk = this.getWharfkit(network, parent);
        return new Observable(sub => {
            wk.accountKit.client.v1.chain.get_account(Name.from(username)).then(() => {
                sub.next(true);
                sub.complete();
            }).catch(() => { sub.next(false); sub.complete(); });
        });
    }
    fetchContract(address, parent) {
        const context = logger.method('fetchContract', { address }, parent);
        context.error('fetchContract not implemented');
        return new Observable();
    }
}
