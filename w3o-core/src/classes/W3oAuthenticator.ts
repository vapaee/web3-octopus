// w3o-core/src/classes/W3oAuthenticator.ts


import {Observable, Subject } from 'rxjs';
import {
    W3oAddress,
    W3oNetworkName,
    W3oTransaction
} from '../types';

import { W3oContextFactory, W3oContext } from './W3oContext';
import { W3oAccount } from './W3oAccount';
import { W3oChainSupport } from './W3oChainSupport';
import { W3oError } from './W3oError';
import { W3oTransactionResponse } from './W3oTransactionResponse';
import { W3oSession } from './W3oSession';
import { W3oNetwork } from './W3oNetwork';

const logger = new W3oContextFactory('W3oAuthenticator');

/**
 * Class that encapsulates authentication logic, session association,
 * and transaction signing for a specific network using a given support.
 * Is responsible for managing user authentication using a specific support strategy,
 * including login, logout, session handling and transaction signing.
 */
export class W3oAuthenticator {
    private __account: W3oAccount | null = null;
    private __session: W3oSession | null = null;

    /**
     * Emits when the session ID changes
     */
    public onSessionChange$: Subject<string> = new Subject<string>();

    constructor(
        public readonly support: W3oChainSupport,
        public readonly network: W3oNetwork,
        parent: W3oContext,
    ) {
        logger.method('constructor', { support }, parent);
    }

    /**
     * Returns the authenticated account or throws if not logged in
     */
    get account(): W3oAccount {
        if (!this.__account) {
            throw new W3oError(W3oError.ACCOUNT_NOT_LOGGED, { authenticator: this });
        }
        return this.__account;
    }

    /**
     * Returns the authenticator's name
     */
    get name(): string {
        return this.support.w3oName;
    }

    /**
     * Returns the authenticator's type
     */
    get type(): string {
        return this.support.type;
    }

    /**
     * Returns the current session ID or empty string
     */
    get sessionId(): string {
        return this.session.id ?? '';
    }

    /**
     * Returns the current session or throws if not set
     */
    get session(): W3oSession {
        if (!this.__session) {
            throw new W3oError(W3oError.SESSION_NOT_SET, { authenticator: this });
        }
        return this.__session;
    }

    /**
     * Internally sets the session ID and emits session change event
     */
    private setSessionId(sessionId: string, parent: W3oContext): void {
        logger.method('setSessionId', { sessionId }, parent);
        this.onSessionChange$.next(sessionId);
    }

    /**
     * Sets the session if not already set, otherwise throws
     */
    setSession(session: W3oSession, parent: W3oContext): void {
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
    isLogged(): boolean {
        return this.__account !== null;
    }

    /**
     * Returns the account address
     */
    getAddress(): W3oAddress {
        return this.account.getAddress();
    }

    /**
     * Returns the authenticated account or null
     */
    getAccount(): W3oAccount | null {
        return this.__account;
    }

    /**
     * Checks if the authenticator is in read-only mode
     */
    isReadOnly(): boolean {
        return this.support.isReadOnly();
    }

    /**
     * Delegates transaction signing to the support and emits response
     */
    signTransaction(trx: W3oTransaction, parent: W3oContext): Observable<W3oTransactionResponse> {
        const context = logger.method('signTransaction', { trx }, parent);
        if (this.isReadOnly()) {
            throw new W3oError(W3oError.READ_ONLY_AUTHENTICATOR, { authenticator: this });
        }
        return new Observable<W3oTransactionResponse>(subscriber => {
            try {
                const response = this.support.signTransaction(this, trx, context);
                response.subscribe({
                    next: (res) => subscriber.next(res),
                    error: (err) => subscriber.error(err),
                    complete: () => subscriber.complete(),
                });
            } catch (error) {
                context.error(error);
                subscriber.error(error);
            }
        });
    }

    /**
     * Starts login process through the support layer
     */
    login(networkName: W3oNetworkName, parent: W3oContext): Observable<W3oAccount> {
        const context = logger.method('login', { networkName }, parent);
        return new Observable<W3oAccount>(subscriber => {
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
            } catch (error) {
                context.error((error as Error).message);
                subscriber.error(error);
            }
        });
    }

    /**
     * Attempts auto-login through the support layer
     */
    autoLogin(network: W3oNetworkName, parent: W3oContext): Observable<W3oAccount> {
        const context = logger.method('autoLogin', { network }, parent);
        return new Observable<W3oAccount>(subscriber => {
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
            } catch (error) {
                context.error((error as Error).message);
                subscriber.error(error);
            }
        });
    }

    /**
     * Logs out the current account and removes its session
     */
    logout(parent: W3oContext): void {
        const context = logger.method('logout', parent);
        try {
            this.support.logout(this, context);
            this.__account = null;
            this.__session = null;
        } catch (error) {
            context.error((error as Error).message);
        }
    }

    /**
     * Returns a snapshot of the internal state
     */
    snapshot(): any {
        return {
            _class: 'W3oAuthenticator',
            account: this.__account?.snapshot(),
            session: this.__session?.snapshot(),
            support: this.support.snapshot(),
            network: this.network.snapshot(),
        };
    }
}
