import { Observable, Subject } from 'rxjs';
import { W3oAddress, W3oNetworkName, W3oTransaction } from '../types';
import { W3oContext } from './W3oContext';
import { W3oAccount } from './W3oAccount';
import { W3oChainSupport } from './W3oChainSupport';
import { W3oTransactionResponse } from './W3oTransactionResponse';
import { W3oSession } from './W3oSession';
import { W3oNetwork } from './W3oNetwork';
/**
 * Class that encapsulates authentication logic, session association,
 * and transaction signing for a specific network using a given support.
 * Is responsible for managing user authentication using a specific support strategy,
 * including login, logout, session handling and transaction signing.
 */
export declare class W3oAuthenticator {
    readonly support: W3oChainSupport;
    readonly network: W3oNetwork;
    private __account;
    private __session;
    /**
     * Emits when the session ID changes
     */
    onSessionChange$: Subject<string>;
    constructor(support: W3oChainSupport, network: W3oNetwork, parent: W3oContext);
    /**
     * Returns the authenticated account or throws if not logged in
     */
    get account(): W3oAccount;
    /**
     * Returns the authenticator's name
     */
    get name(): string;
    /**
     * Returns the authenticator's type
     */
    get type(): string;
    /**
     * Returns the current session ID or empty string
     */
    get sessionId(): string;
    /**
     * Returns the current session or throws if not set
     */
    get session(): W3oSession;
    /**
     * Internally sets the session ID and emits session change event
     */
    private setSessionId;
    /**
     * Sets the session if not already set, otherwise throws
     */
    setSession(session: W3oSession, parent: W3oContext): void;
    /**
     * Returns true if the account is logged in
     */
    isLogged(): boolean;
    /**
     * Returns the account address
     */
    getAddress(): W3oAddress;
    /**
     * Returns the authenticated account or null
     */
    getAccount(): W3oAccount | null;
    /**
     * Checks if the authenticator is in read-only mode
     */
    isReadOnly(): boolean;
    /**
     * Delegates transaction signing to the support and emits response
     */
    signTransaction(trx: W3oTransaction, parent: W3oContext): Observable<W3oTransactionResponse>;
    /**
     * Starts login process through the support layer
     */
    login(networkName: W3oNetworkName, parent: W3oContext): Observable<W3oAccount>;
    /**
     * Attempts auto-login through the support layer
     */
    autoLogin(network: W3oNetworkName, parent: W3oContext): Observable<W3oAccount>;
    /**
     * Logs out the current account and removes its session
     */
    logout(parent: W3oContext): void;
    /**
     * Returns a snapshot of the internal state
     */
    snapshot(): any;
}
//# sourceMappingURL=W3oAuthenticator.d.ts.map