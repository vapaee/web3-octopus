import { W3oContext, W3oInstance, W3oTransaction, W3oTransactionResponse, W3oAccount, W3oNetworkName, W3oAuthenticator, W3oModule } from '@vapaee/w3o-core';
import { AntelopeAuthSupport } from './AntelopeAuthSupport';
import { Observable } from 'rxjs';
import { WharfkitInstance } from './AntelopeWharfkit';
import { Session } from '@wharfkit/session';
/**
 * Represents the response of a transaction in Antelope, with simplified wait method.
 */
export declare class AntelopeTransactionResponse extends W3oTransactionResponse {
    constructor(hash: string);
    /**
     * Simulates waiting for transaction confirmation by emitting a success.
     */
    wait(): Observable<any>;
}
/**
 * Anchor-based authentication support for Antelope networks.
 */
export declare class AntelopeAuthAnchor extends AntelopeAuthSupport {
    /**
     * Constructs the AntelopeAuthAnchor module with 'anchor' as support name.
     */
    constructor(parent: W3oContext);
    /**
     * Returns the module version.
     */
    get w3oVersion(): string;
    /**
     * Returns the module name.
     */
    get w3oName(): string;
    /**
     * Lists required dependencies for this module.
     */
    get w3oRequire(): string[];
    /**
     * Indicates that this authenticator is not read-only.
     */
    isReadOnly(): boolean;
    /**
     * Initializes the module with its dependencies and logs success.
     */
    init(octopus: W3oInstance, requirements: W3oModule[], parent: W3oContext): void;
    /**
     * Returns a snapshot of the module's current state.
     */
    snapshot(): any;
    /**
     * Extracts the Wharfkit instance from a W3oAuthenticator.
     */
    getWharfkitFrom(auth: W3oAuthenticator, parent: W3oContext): WharfkitInstance;
    /**
     * Extracts the Wharfkit instance from a network name.
     */
    getWharfkitFromNetworkName(networkName: W3oNetworkName, parent: W3oContext): WharfkitInstance;
    /**
     * Saves a Wharfkit session in the authenticator's storage.
     */
    private setWharfkitSession;
    /**
     * Retrieves the Wharfkit session from the authenticator.
     */
    getWharfkitSession(authenticator: W3oAuthenticator, parent: W3oContext): Session;
    /**
     * Internal helper that handles shared login/restore session logic.
     */
    private authenticate;
    /**
     * Initiates login flow to the given network.
     */
    login(auth: W3oAuthenticator, networkName: W3oNetworkName, parent: W3oContext): Observable<W3oAccount>;
    /**
     * Attempts to restore a previous session automatically.
     */
    autoLogin(auth: W3oAuthenticator, networkName: W3oNetworkName, parent: W3oContext): Observable<W3oAccount>;
    /**
     * Logs out from the current Wharfkit session.
     */
    logout(auth: W3oAuthenticator, parent: W3oContext): void;
    /**
     * Signs a transaction using Wharfkit and returns a transaction response.
     */
    signTransaction(auth: W3oAuthenticator, trx: W3oTransaction, parent: W3oContext): Observable<AntelopeTransactionResponse>;
}
//# sourceMappingURL=AntelopeAuthAnchor.d.ts.map