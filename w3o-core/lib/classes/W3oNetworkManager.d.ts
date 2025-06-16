import { BehaviorSubject } from 'rxjs';
import { W3oGlobalSettings, W3oNetworkInstance, W3oNetworkName, W3oInstance } from '../types';
import { W3oContext } from './W3oContext';
import { W3oNetwork } from './W3oNetwork';
import { W3oManager } from './W3oManager';
/**
 * Manager that handles registration, retrieval and switching of blockchain networks
 */
export declare class W3oNetworkManager extends W3oManager implements W3oNetworkInstance {
    private __networks;
    onNetworkChange$: BehaviorSubject<W3oNetworkName | null>;
    octopus: W3oInstance;
    constructor(settings: W3oGlobalSettings, parent: W3oContext);
    /**
     * Returns the name of the currently selected network
     */
    get currentNetworkName(): string | null;
    /**
     * Returns the currently selected network instance
     */
    get current(): W3oNetwork;
    /**
     * Returns the list of registered network instances
     */
    get list(): W3oNetwork[];
    /**
     * Initializes the network manager with the Octopus instance
     */
    init(octopus: W3oInstance, parent: W3oContext): void;
    /**
     * Adds a network to the list of managed networks
     */
    addNetwork(network: W3oNetwork, parent: W3oContext): void;
    /**
     * Gets a network instance by its name
     */
    getNetwork(name: W3oNetworkName, parent: W3oContext): W3oNetwork;
    /**
     * Sets the current network by name
     */
    setCurrentNetwork(name: W3oNetworkName, parent: W3oContext): void;
    /**
     * Gets the current network instance
     */
    getCurrentNetwork(): W3oNetwork;
    /**
     * Updates the state of all registered networks (sequentially)
     */
    updateState(): Promise<void>;
    /**
     * Returns a snapshot of the internal state of the network manager
     */
    snapshot(): any;
}
//# sourceMappingURL=W3oNetworkManager.d.ts.map