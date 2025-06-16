import { BehaviorSubject, Observable } from 'rxjs';
import { W3oGlobalSettings, W3oInstance, W3oIServices, W3oNetworkSupportSettings } from '../types';
import { W3oContext } from './W3oContext';
import { W3oAuthManager } from './W3oAuthManager';
import { W3oService } from './W3oService';
import { W3oNetworkManager } from './W3oNetworkManager';
import { W3oSessionManager } from './W3oSessionManager';
import { W3oModuleManager } from './W3oModuleManager';
interface WithSnapshot {
    snapshot(): any;
}
/**
 * Main singleton class that acts as the entry point, includes methods to add network support, register modules, and initialize the state
 */
export declare class Web3Octopus<Tw3o extends W3oIServices & WithSnapshot> implements W3oInstance {
    private __initCalled;
    onInitialized$: BehaviorSubject<boolean>;
    onManagersReady$: BehaviorSubject<boolean>;
    private __authCtrl;
    private __networkCtrl;
    private __sessionCtrl;
    private __moduleCtrl;
    private __services;
    private __serviceCtrl;
    private __supportFor;
    private __settings;
    private static __instance;
    /**
     * Returns the static Octopus singleton instance
     */
    static get instance(): W3oInstance;
    constructor(parent?: W3oContext);
    /**
     * Returns the session manager instance
     */
    get sessions(): W3oSessionManager;
    /**
     * Returns the network manager instance
     */
    get networks(): W3oNetworkManager;
    /**
     * Returns the initialized state
     */
    get initialized(): boolean;
    /**
     * Returns the authentication manager instance
     */
    get auth(): W3oAuthManager;
    /**
     * Returns the module manager instance
     */
    get modules(): W3oModuleManager;
    /**
     * Returns the services instance object
     */
    get services(): Tw3o;
    /**
     * Returns the initialized settings
     */
    get settings(): W3oGlobalSettings;
    /**
     * Observable that emits once Octopus is fully initialized
     */
    get whenReady(): Observable<void>;
    /**
     * Gets support settings for a given network type
     */
    getSupportFor(type: string): W3oNetworkSupportSettings;
    /**
     * Adds support for a new network type before initialization
     */
    addNetworkSupport(support: W3oNetworkSupportSettings, parent?: W3oContext): void;
    /**
     * Initializes the framework with provided settings
     */
    init(settings?: W3oGlobalSettings, parent?: W3oContext): void;
    /**
     * Internal method to instantiate the service object tree
     */
    private createServiceCustomInstance;
    /**
     * Registers the service modules to be instantiated during initialization
     */
    registerServices(services: W3oService[], parent?: W3oContext): void;
    /**
     * Returns a snapshot of the current state of Octopus and its subsystems
     */
    snapshot(): any;
}
export {};
//# sourceMappingURL=Web3Octopus.d.ts.map