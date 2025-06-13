// w3o-antelope/src/classes/AntelopeAuthAnchor.ts
import { W3oContextFactory, W3oTransactionResponse, W3oError, } from '@vapaee/w3o-core';
import { AntelopeAuthSupport } from './AntelopeAuthSupport';
import { Observable, take } from 'rxjs';
import { AntelopeAccount } from './AntelopeAccount';
import { AntelopeNetwork } from './AntelopeNetwork';
const logger = new W3oContextFactory('AntelopeAuthAnchor');
/**
 * Represents the response of a transaction in Antelope, with simplified wait method.
 */
export class AntelopeTransactionResponse extends W3oTransactionResponse {
    constructor(hash) {
        super(hash);
    }
    /**
     * Simulates waiting for transaction confirmation by emitting a success.
     */
    wait() {
        return new Observable((observer) => {
            observer.next({ status: 'success' });
            observer.complete();
        });
    }
}
/**
 * Anchor-based authentication support for Antelope networks.
 */
export class AntelopeAuthAnchor extends AntelopeAuthSupport {
    /**
     * Constructs the AntelopeAuthAnchor module with 'anchor' as support name.
     */
    constructor(parent) {
        const context = logger.method('constructor', parent);
        super('anchor', context);
    }
    /**
     * Returns the module version.
     */
    get w3oVersion() {
        return '1.0.0';
    }
    /**
     * Returns the module name.
     */
    get w3oName() {
        return 'antelope.auth.anchor';
    }
    /**
     * Lists required dependencies for this module.
     */
    get w3oRequire() {
        return [
            'antelope.auth.support@1.0.0',
        ];
    }
    /**
     * Indicates that this authenticator is not read-only.
     */
    isReadOnly() {
        return false;
    }
    /**
     * Initializes the module with its dependencies and logs success.
     */
    init(octopus, requirements, parent) {
        const context = logger.method('init', { octopus, requirements }, parent);
        super.init(octopus, requirements, context);
        logger.info('AntelopeAuthAnchor OK!', { w3oId: super.w3oId, octopus, requirements });
    }
    /**
     * Returns a snapshot of the module's current state.
     */
    snapshot() {
        return {
            ...super.snapshot(),
            _class: 'AntelopeAuthAnchor',
        };
    }
    /**
     * Extracts the Wharfkit instance from a W3oAuthenticator.
     */
    getWharfkitFrom(auth, parent) {
        const context = logger.method('getWharfkitFrom', { auth }, parent);
        if (auth) {
            if (auth.network instanceof AntelopeNetwork) {
                const wharfkit = auth.network.wharfkit;
                logger.info('Wharfkit found in network', wharfkit);
                return wharfkit;
            }
            else {
                context.error('No wharfkit found in network', { network: auth.network, auth });
                throw new W3oError(W3oError.SESSION_NOT_FOUND, { auth });
            }
        }
        context.error('No wharfkit found in auth', { auth });
        throw new W3oError(W3oError.SESSION_NOT_FOUND, { auth });
    }
    /**
     * Extracts the Wharfkit instance from a network name.
     */
    getWharfkitFromNetworkName(networkName, parent) {
        const context = logger.method('getWharfkitFromNetworkName', { networkName }, parent);
        const network = this.octopus.networks.getNetwork(networkName, context);
        if (network instanceof AntelopeNetwork) {
            return network.wharfkit;
        }
        context.error('No wharfkit found in network', { network });
        throw new W3oError(W3oError.SESSION_NOT_FOUND, { network });
    }
    /**
     * Saves a Wharfkit session in the authenticator's storage.
     */
    setWharfkitSession(authenticator, session, parent) {
        logger.method('setWharfkitSession', { session, authenticator, parent });
        const accountname = session.actor.toString();
        authenticator.onSessionChange$.subscribe(() => {
            if (!!authenticator.session) {
                authenticator.session.storage.set('wharfkit.session', session);
                logger.info(`✅Logged in as ${accountname}`);
            }
        });
        return accountname;
    }
    /**
     * Retrieves the Wharfkit session from the authenticator.
     */
    getWharfkitSession(authenticator, parent) {
        const context = logger.method('getWharfkitSession', { authenticator, parent });
        const session = authenticator.session.storage.get('wharfkit.session');
        if (!session) {
            context.error('No wharfkit session found in auth');
            throw new W3oError(W3oError.SESSION_MISSING_KEY, { 'key': 'wharfkit.session', authenticator });
        }
        logger.info('Wharfkit session found', session);
        return session;
    }
    /**
     * Internal helper that handles shared login/restore session logic.
     */
    authenticate(auth, networkName, parent, action, initialLabel, failMessage) {
        return new Observable(observer => {
            const context = logger.method(initialLabel, { auth, networkName }, parent);
            try {
                const wharfkit = this.getWharfkitFrom(auth, context);
                const network = this.octopus.networks.getNetwork(networkName, context);
                logger.log(`${initialLabel}():`, { wharfkit, network });
                action(wharfkit, context).then(session => {
                    logger.info(`${initialLabel}() ->`, { session });
                    if (session) {
                        const address = this.setWharfkitSession(auth, session, context);
                        const account = new AntelopeAccount(address, session, auth, context);
                        observer.next(account);
                        observer.complete();
                        // we suscribe to session.onLogout$ to execute logout in this class
                        const sub = auth.onSessionChange$.asObservable().subscribe({
                            next: (sessionId) => {
                                if (sessionId) {
                                    sub.unsubscribe();
                                    const w3oSession = this.octopus.sessions.getSession(sessionId, context);
                                    if (w3oSession) {
                                        w3oSession.onLogout$.asObservable().pipe(take(1)).subscribe({
                                            next: () => {
                                                logger.log(`${initialLabel}() -> logout()`);
                                                this.logout(auth, context);
                                            }
                                        });
                                    }
                                }
                            }
                        });
                    }
                    else if (initialLabel === 'login') {
                        context.error(failMessage, { session });
                        throw new W3oError(W3oError.SESSION_NOT_FOUND, { session });
                    }
                }).catch(error => {
                    context.error(failMessage, error);
                    observer.error(error);
                });
            }
            catch (error) {
                context.error('ERROR:', error);
                observer.error(error);
            }
        });
    }
    /**
     * Initiates login flow to the given network.
     */
    login(auth, networkName, parent) {
        return this.authenticate(auth, networkName, parent, (wharfkit, ctx) => wharfkit.login(ctx), 'login', 'Login failed');
    }
    /**
     * Attempts to restore a previous session automatically.
     */
    autoLogin(auth, networkName, parent) {
        return this.authenticate(auth, networkName, parent, (wharfkit, ctx) => wharfkit.restoreSession(ctx), 'autoLogin', 'Auto login failed');
    }
    /**
     * Logs out from the current Wharfkit session.
     */
    logout(auth, parent) {
        const context = logger.method('logout', { auth }, parent);
        try {
            const wharfkit = this.getWharfkitFrom(auth, context);
            wharfkit.logout(context);
        }
        catch (error) {
            context.error('ERROR:', error);
            throw new W3oError(W3oError.SESSION_NOT_FOUND, { auth });
        }
    }
    /**
     * Signs a transaction using Wharfkit and returns a transaction response.
     */
    signTransaction(auth, trx, parent) {
        const context = logger.method('signTransaction', { auth, trx, parent });
        const session = this.getWharfkitSession(auth, context);
        this.getWharfkitFrom(auth, context);
        const transaction = trx;
        return new Observable((observer) => {
            session.transact(transaction).then((response) => {
                logger.info('Transaction signed successfully', response);
                const txId = response.response?.['transaction_id'] || 'Unknown TX';
                const transactionResponse = new AntelopeTransactionResponse(txId);
                transactionResponse.wait().subscribe((receipt) => {
                    logger.info('Transaction receipt', receipt);
                    observer.next(transactionResponse);
                    observer.complete();
                });
            }).catch((error) => {
                context.error('Transaction signing failed', error);
                observer.error(error);
            });
        });
    }
}
