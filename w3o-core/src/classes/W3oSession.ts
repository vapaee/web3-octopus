// w3o-core/src/classes/W3oSession.ts

import { Observable, Subject } from 'rxjs';
import { W3oAddress, W3oSessionInstance, W3oTransaction } from '../types';

import { W3oContextFactory, W3oContext } from './W3oContext';
import { W3oAuthenticator } from './W3oAuthenticator';
import { W3oNetwork } from './W3oNetwork';
import { W3oStorage } from './W3oStorage';
import { W3oTransactionResponse } from './W3oTransactionResponse';

const logger = new W3oContextFactory('W3oSession');

/**
 * Represents a session, including methods to access the associated account and network,
 * store and retrieve data, and take a snapshot of the internal state.
 */
export class W3oSession {

    /**
     * Static property that provides the separator used to build the session ID
     */
    public static readonly ID_SEPARATOR = '--';

    /**
     * Subject to emit and complete when logout is triggered
     */
    onLogout$: Subject<any> = new Subject<any>();

    /**
     * Custom storage for session-scoped user data
     */
    public readonly storage: W3oStorage = new W3oStorage();

    /**
     * Internal identifier for the session
     */
    private __id: string = '';

    constructor(
        public readonly manager: W3oSessionInstance,
        public readonly address: W3oAddress,
        public readonly authenticator: W3oAuthenticator,
        public readonly network: W3oNetwork,
        parent: W3oContext,
    ) {
        logger.method('constructor', {address, authenticator, network}, parent);
        this.__id = `${address}${W3oSession.ID_SEPARATOR}${authenticator.type}${W3oSession.ID_SEPARATOR}${network.name}`;
    }

    /**
     * Getter to retrieve the session ID
     */
    get id(): string {
        return this.__id;
    }

    /**
     * Performs logout: triggers authenticator logout, deletes session from manager, and emits logout event
     */
    logout(parent: W3oContext) {
        const context = logger.method('logout', parent);
        this.authenticator.logout(context);
        this.manager.deleteSession(this.id, context);
        this.onLogout$.next(null);
        this.onLogout$.complete();
    }

    /**
     * Signs a transaction using the authenticator support
     */
    signTransaction(transaction: W3oTransaction, parent: W3oContext): Observable<W3oTransactionResponse> {
        const context = logger.method('transact', {transaction}, parent);
        return this.authenticator.support.signTransaction(this.authenticator, transaction, context);
    }

    /**
     * Returns a snapshot of the session's current internal state
     */
    snapshot(): any {
        return {
            authenticator: this.authenticator.snapshot(),
            network: this.network.snapshot(),
            storage: this.storage.snapshot(),
        };
    }
}
