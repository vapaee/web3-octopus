// w3o-core/src/classes/W3oAuthenticator.ts
import { Observable, Subject } from 'rxjs';
import { W3oContextFactory } from './W3oContext';
import { W3oError } from './W3oError';
const logger = new W3oContextFactory('W3oAuthenticator');
/**
 * Class that encapsulates authentication logic, session association,
 * and transaction signing for a specific network using a given support.
 * Is responsible for managing user authentication using a specific support strategy,
 * including login, logout, session handling and transaction signing.
 */
export class W3oAuthenticator {
    constructor(support, network, parent) {
        this.support = support;
        this.network = network;
        this.__account = null;
        this.__session = null;
        /**
         * Emits when the session ID changes
         */
        this.onSessionChange$ = new Subject();
        logger.method('constructor', { support }, parent);
    }
    /**
     * Returns the authenticated account or throws if not logged in
     */
    get account() {
        if (!this.__account) {
            throw new W3oError(W3oError.ACCOUNT_NOT_LOGGED, { authenticator: this });
        }
        return this.__account;
    }
    /**
     * Returns the authenticator's name
     */
    get name() {
        return this.support.w3oName;
    }
    /**
     * Returns the authenticator's type
     */
    get type() {
        return this.support.type;
    }
    /**
     * Returns the current session ID or empty string
     */
    get sessionId() {
        return this.session.id ?? '';
    }
    /**
     * Returns the current session or throws if not set
     */
    get session() {
        if (!this.__session) {
            throw new W3oError(W3oError.SESSION_NOT_SET, { authenticator: this });
        }
        return this.__session;
    }
    /**
     * Internally sets the session ID and emits session change event
     */
    setSessionId(sessionId, parent) {
        logger.method('setSessionId', { sessionId }, parent);
        this.onSessionChange$.next(sessionId);
    }
    /**
     * Sets the session if not already set, otherwise throws
     */
    setSession(session, parent) {
        const context = logger.method('setSession', { session: session.id }, parent);
        if (this.__session) {
            throw new W3oError(W3oError.SESSION_ALREADY_SET, { authenticator: this, session });
        }
        this.__session = session;
        this.setSessionId(session.id, context);
    }
    /**
     * Returns true if the account is logged in
     */
    isLogged() {
        return this.__account !== null;
    }
    /**
     * Returns the account address
     */
    getAddress() {
        return this.account.getAddress();
    }
    /**
     * Returns the authenticated account or null
     */
    getAccount() {
        return this.__account;
    }
    /**
     * Checks if the authenticator is in read-only mode
     */
    isReadOnly() {
        return this.support.isReadOnly();
    }
    /**
     * Delegates transaction signing to the support and emits response
     */
    signTransaction(trx, parent) {
        const context = logger.method('signTransaction', { trx }, parent);
        if (this.isReadOnly()) {
            throw new W3oError(W3oError.READ_ONLY_AUTHENTICATOR, { authenticator: this });
        }
        return new Observable(subscriber => {
            try {
                const response = this.support.signTransaction(this, trx, context);
                response.subscribe({
                    next: (res) => subscriber.next(res),
                    error: (err) => subscriber.error(err),
                    complete: () => subscriber.complete(),
                });
            }
            catch (error) {
                context.error(error);
                subscriber.error(error);
            }
        });
    }
    /**
     * Starts login process through the support layer
     */
    login(networkName, parent) {
        const context = logger.method('login', { networkName }, parent);
        return new Observable(subscriber => {
            try {
                const accountObservable = this.support.login(this, networkName, context);
                accountObservable.subscribe({
                    next: (account) => {
                        logger.log('this.support.login.subscribe() -> result', { account: account.getAddress() });
                        this.__account = account;
                        subscriber.next(account);
                    },
                    error: (err) => subscriber.error(err),
                    complete: () => subscriber.complete(),
                });
            }
            catch (error) {
                context.error(error.message);
                subscriber.error(error);
            }
        });
    }
    /**
     * Attempts auto-login through the support layer
     */
    autoLogin(network, parent) {
        const context = logger.method('autoLogin', { network }, parent);
        return new Observable(subscriber => {
            try {
                const accountObservable = this.support.autoLogin(this, network, context);
                accountObservable.subscribe({
                    next: (account) => {
                        this.__account = account;
                        subscriber.next(account);
                    },
                    error: (err) => subscriber.error(err),
                    complete: () => subscriber.complete(),
                });
            }
            catch (error) {
                context.error(error.message);
                subscriber.error(error);
            }
        });
    }
    /**
     * Logs out the current account and removes its session
     */
    logout(parent) {
        const context = logger.method('logout', parent);
        try {
            this.support.logout(this, context);
            this.__account = null;
            this.__session = null;
        }
        catch (error) {
            context.error(error.message);
        }
    }
    /**
     * Returns a snapshot of the internal state
     */
    snapshot() {
        return {
            _class: 'W3oAuthenticator',
            account: this.__account?.snapshot(),
            session: this.__session?.snapshot(),
            support: this.support.snapshot(),
            network: this.network.snapshot(),
        };
    }
}
