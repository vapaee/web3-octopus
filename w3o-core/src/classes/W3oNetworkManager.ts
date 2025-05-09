// w3o-core/src/classes/W3oNetworkManager.ts

import { BehaviorSubject } from 'rxjs';
import {
    W3oGlobalSettings,
    W3oNetworkInstance,
    W3oNetworkName,
    W3oInstance,
} from '../types';

import { W3oContextFactory, W3oContext } from './W3oContext';
import { W3oNetwork } from './W3oNetwork';
import { W3oError } from './W3oError';
import { W3oManager } from './W3oManager';

const logger = new W3oContextFactory('W3oNetworkManager');

/**
 * Manager that handles registration, retrieval and switching of blockchain networks
 */
export class W3oNetworkManager extends W3oManager implements W3oNetworkInstance {
    private __networks: W3oNetwork[] = [];

    public onNetworkChange$: BehaviorSubject<W3oNetworkName | null> = new BehaviorSubject<string | null>(null);

    octopus!: W3oInstance;

    constructor(
        settings: W3oGlobalSettings,
        parent: W3oContext
    ) {
        logger.method('constructor', { settings }, parent);
        super('W3oNetworkManager');
    }

    /**
     * Returns the name of the currently selected network
     */
    get currentNetworkName(): string | null {
        return this.onNetworkChange$.value;
    }

    /**
     * Returns the currently selected network instance
     */
    get current(): W3oNetwork {
        const name = this.currentNetworkName;
        if (!name) {
            throw new W3oError(W3oError.NETWORK_NOT_FOUND, { name, snapshot: this.snapshot() });
        }
        return this.getNetwork(name, W3oContextFactory.current!);
    }

    /**
     * Returns the list of registered network instances
     */
    get list(): W3oNetwork[] {
        return this.__networks;
    }

    /**
     * Initializes the network manager with the Octopus instance
     */
    init(
        octopus: W3oInstance,
        parent: W3oContext
    ): void {
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
    addNetwork(network: W3oNetwork, parent: W3oContext): void {
        logger.method('addNetwork', { network }, parent);
        if (this.__initCalled) {
            throw new W3oError(W3oError.ALREADY_INITIALIZED, { name: 'W3oNetworkManager', message: 'Network manager already initialized' });
        }
        this.__networks.push(network);
    }

    /**
     * Gets a network instance by its name
     */
    getNetwork(name: W3oNetworkName, parent: W3oContext): W3oNetwork {
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
    setCurrentNetwork(name: W3oNetworkName, parent: W3oContext): void {
        const context = logger.method('setCurrentNetwork', { name }, parent);
        const net = this.getNetwork(name, context) as W3oNetwork;
        if (!net) {
            throw new W3oError(W3oError.NETWORK_NOT_FOUND, { name, snapshot: this.snapshot() });
        }
        this.onNetworkChange$.next(name);
    }

    /**
     * Gets the current network instance
     */
    getCurrentNetwork(): W3oNetwork {
        return this.current;
    }

    /**
     * Updates the state of all registered networks (sequentially)
     */
    async updateState(): Promise<void> {
        for (const network of this.__networks) {
            await network.updateState();
        }
    }

    /**
     * Returns a snapshot of the internal state of the network manager
     */
    snapshot(): any {
        return {
            _class: 'W3oNetworkManager',
            networks: this.__networks.map(network => network.snapshot()),
            currentNetworkName: this.currentNetworkName,
        };
    }
}
