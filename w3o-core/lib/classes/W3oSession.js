// w3o-core/src/classes/W3oSession.ts
import { Subject } from 'rxjs';
import { W3oContextFactory } from './W3oContext';
import { W3oStorage } from './W3oStorage';
const logger = new W3oContextFactory('W3oSession');
/**
 * Represents a session, including methods to access the associated account and network,
 * store and retrieve data, and take a snapshot of the internal state.
 */
export class W3oSession {
    constructor(manager, address, authenticator, network, parent) {
        this.manager = manager;
        this.address = address;
        this.authenticator = authenticator;
        this.network = network;
        /**
         * Subject to emit and complete when logout is triggered
         */
        this.onLogout$ = new Subject();
        /**
         * Custom storage for session-scoped user data
         */
        this.storage = new W3oStorage();
        /**
         * Internal identifier for the session
         */
        this.__id = '';
        logger.method('constructor', { address, authenticator, network }, parent);
        this.__id = `${address}${W3oSession.ID_SEPARATOR}${authenticator.type}${W3oSession.ID_SEPARATOR}${network.name}`;
    }
    /**
     * Getter to retrieve the session ID
     */
    get id() {
        return this.__id;
    }
    /**
     * Performs logout: triggers authenticator logout, deletes session from manager, and emits logout event
     */
    logout(parent) {
        const context = logger.method('logout', parent);
        this.authenticator.logout(context);
        this.manager.deleteSession(this.id, context);
        this.onLogout$.next(null);
        this.onLogout$.complete();
    }
    /**
     * Signs a transaction using the authenticator support
     */
    signTransaction(transaction, parent) {
        const context = logger.method('transact', { transaction }, parent);
        return this.authenticator.support.signTransaction(this.authenticator, transaction, context);
    }
    /**
     * Returns a snapshot of the session's current internal state
     */
    snapshot() {
        return {
            authenticator: this.authenticator.snapshot(),
            network: this.network.snapshot(),
            storage: this.storage.snapshot(),
        };
    }
}
/**
 * Static property that provides the separator used to build the session ID
 */
W3oSession.ID_SEPARATOR = '--';
