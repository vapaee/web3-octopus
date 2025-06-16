import { Observable } from 'rxjs';
import { W3oAuthInstance, W3oGlobalSettings, W3oNetworkType, W3oInstance, W3oNetworkName } from '../types';
import { W3oContext } from './W3oContext';
import { W3oChainSupport } from './W3oChainSupport';
import { W3oNetwork } from './W3oNetwork';
import { W3oAuthenticator } from './W3oAuthenticator';
import { W3oSession } from './W3oSession';
import { W3oManager } from './W3oManager';
/**
 * Auth manager that handles available authenticators and user login/logout flows
 */
export declare class W3oAuthManager extends W3oManager implements W3oAuthInstance {
    private __byType;
    octopus: W3oInstance;
    constructor(settings: W3oGlobalSettings, parent: W3oContext);
    /**
     * Initializes the auth manager with the Octopus instance
     */
    init(octopus: W3oInstance, parent: W3oContext): void;
    /**
     * Adds an auth support provider to the manager before initialization
     */
    addChainSupport(chain: W3oChainSupport, parent: W3oContext): void;
    /**
     * Creates a new authenticator instance from a registered support
     */
    createAuthenticator(network: W3oNetwork, parent: W3oContext): W3oAuthenticator;
    /**
     * Authenticates user (interactive login)
     */
    login(parent: W3oContext): Observable<W3oSession>;
    login(chain: W3oNetworkName, network: W3oNetworkType, parent: W3oContext): Observable<W3oSession>;
    /**
     * Attempts automatic login using cached session
     */
    autoLogin(parent: W3oContext): Observable<W3oSession>;
    autoLogin(chain: W3oNetworkName, network: W3oNetworkType, parent: W3oContext): Observable<W3oSession>;
    /**
     * Internal authentication routine used by login and autoLogin
     */
    private __authenticate;
    /**
     * Logs out from the current session
     */
    logout(parent: W3oContext): Observable<void>;
    /**
     * Captures a snapshot of the current auth manager state
     */
    snapshot(): any;
}
//# sourceMappingURL=W3oAuthManager.d.ts.map