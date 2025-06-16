import { Observable, Subject } from 'rxjs';
import { W3oAddress, W3oSessionInstance, W3oTransaction } from '../types';
import { W3oContext } from './W3oContext';
import { W3oAuthenticator } from './W3oAuthenticator';
import { W3oNetwork } from './W3oNetwork';
import { W3oStorage } from './W3oStorage';
import { W3oTransactionResponse } from './W3oTransactionResponse';
/**
 * Represents a session, including methods to access the associated account and network,
 * store and retrieve data, and take a snapshot of the internal state.
 */
export declare class W3oSession {
    readonly manager: W3oSessionInstance;
    readonly address: W3oAddress;
    readonly authenticator: W3oAuthenticator;
    readonly network: W3oNetwork;
    /**
     * Static property that provides the separator used to build the session ID
     */
    static readonly ID_SEPARATOR = "--";
    /**
     * Subject to emit and complete when logout is triggered
     */
    onLogout$: Subject<any>;
    /**
     * Custom storage for session-scoped user data
     */
    readonly storage: W3oStorage;
    /**
     * Internal identifier for the session
     */
    private __id;
    constructor(manager: W3oSessionInstance, address: W3oAddress, authenticator: W3oAuthenticator, network: W3oNetwork, parent: W3oContext);
    /**
     * Getter to retrieve the session ID
     */
    get id(): string;
    /**
     * Performs logout: triggers authenticator logout, deletes session from manager, and emits logout event
     */
    logout(parent: W3oContext): void;
    /**
     * Signs a transaction using the authenticator support
     */
    signTransaction(transaction: W3oTransaction, parent: W3oContext): Observable<W3oTransactionResponse>;
    /**
     * Returns a snapshot of the session's current internal state
     */
    snapshot(): any;
}
//# sourceMappingURL=W3oSession.d.ts.map