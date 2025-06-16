// w3o-core/src/classes/W3oNetworkManager.ts
import { BehaviorSubject } from 'rxjs';
import { W3oContextFactory } from './W3oContext';
import { W3oError } from './W3oError';
import { W3oManager } from './W3oManager';
const logger = new W3oContextFactory('W3oNetworkManager');
/**
 * Manager that handles registration, retrieval and switching of blockchain networks
 */
export class W3oNetworkManager extends W3oManager {
    constructor(settings, parent) {
        logger.method('constructor', { settings }, parent);
        super('W3oNetworkManager');
        this.__networks = [];
        this.onNetworkChange$ = new BehaviorSubject(null);
    }
    /**
     * Returns the name of the currently selected network
     */
    get currentNetworkName() {
        return this.onNetworkChange$.value;
    }
    /**
     * Returns the currently selected network instance
     */
    get current() {
        const name = this.currentNetworkName;
        if (!name) {
            throw new W3oError(W3oError.NETWORK_NOT_FOUND, { name, snapshot: this.snapshot() });
        }
        return this.getNetwork(name, W3oContextFactory.current);
    }
    /**
     * Returns the list of registered network instances
     */
    get list() {
        return this.__networks;
    }
    /**
     * Initializes the network manager with the Octopus instance
     */
    init(octopus, parent) {
        logger.method('init', { octopus }, parent);
        this.octopus = octopus;
        if (this.__initCalled) {
            throw new W3oError(W3oError.ALREADY_INITIALIZED, { name: 'W3oNetworkManager', message: 'Network manager already initialized' });
        }
        this.__initCalled = true;
        this.__initialized$.next(true);
    }
    /**
     * Adds a network to the list of managed networks
     */
    addNetwork(network, parent) {
        logger.method('addNetwork', { network }, parent);
        if (this.__initCalled) {
            throw new W3oError(W3oError.ALREADY_INITIALIZED, { name: 'W3oNetworkManager', message: 'Network manager already initialized' });
        }
        this.__networks.push(network);
    }
    /**
     * Gets a network instance by its name
     */
    getNetwork(name, parent) {
        logger.method('getNetwork', { name }, parent);
        const network = this.__networks.find(network => network.settings.name === name);
        if (!network) {
            throw new W3oError(W3oError.NETWORK_NOT_FOUND, { name, snapshot: this.snapshot() });
        }
        return network;
    }
    /**
     * Sets the current network by name
     */
    setCurrentNetwork(name, parent) {
        const context = logger.method('setCurrentNetwork', { name }, parent);
        const net = this.getNetwork(name, context);
        if (!net) {
            throw new W3oError(W3oError.NETWORK_NOT_FOUND, { name, snapshot: this.snapshot() });
        }
        this.onNetworkChange$.next(name);
    }
    /**
     * Gets the current network instance
     */
    getCurrentNetwork() {
        return this.current;
    }
    /**
     * Updates the state of all registered networks (sequentially)
     */
    async updateState() {
        for (const network of this.__networks) {
            await network.updateState();
        }
    }
    /**
     * Returns a snapshot of the internal state of the network manager
     */
    snapshot() {
        return {
            _class: 'W3oNetworkManager',
            networks: this.__networks.map(network => network.snapshot()),
            currentNetworkName: this.currentNetworkName,
        };
    }
}
