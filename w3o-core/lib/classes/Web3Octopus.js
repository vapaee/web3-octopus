// w3o-core/src/classes/Web3Octopus.ts
import { BehaviorSubject, combineLatest, filter, map } from 'rxjs';
import { W3oContextFactory } from './W3oContext';
import { W3oAuthManager } from './W3oAuthManager';
import { W3oService } from './W3oService';
import { W3oNetworkManager } from './W3oNetworkManager';
import { W3oSessionManager } from './W3oSessionManager';
import { W3oModuleManager } from './W3oModuleManager';
import { W3oError } from './W3oError';
import { W3oModuleConcept } from './W3oModuleConcept';
const logger = new W3oContextFactory('Web3Octopus');
const defaultSettings = {
    appName: 'w3o-app',
    multiSession: false,
    autoLogin: true,
};
/**
 * Main singleton class that acts as the entry point, includes methods to add network support, register modules, and initialize the state
 */
export class Web3Octopus {
    /**
     * Returns the static Octopus singleton instance
     */
    static get instance() {
        if (!Web3Octopus.__instance) {
            throw new W3oError(W3oError.OCTOPUS_INSTANCE_NOT_FOUND);
        }
        return Web3Octopus.__instance;
    }
    constructor(parent) {
        this.__initCalled = false;
        this.onInitialized$ = new BehaviorSubject(this.__initCalled);
        this.onManagersReady$ = new BehaviorSubject(false);
        this.__authCtrl = null;
        this.__networkCtrl = null;
        this.__sessionCtrl = null;
        this.__moduleCtrl = null;
        this.__services = [];
        this.__serviceCtrl = null;
        this.__supportFor = {};
        this.__settings = null;
        logger.method('constructor', parent);
        Web3Octopus.__instance = this;
    }
    /**
     * Returns the session manager instance
     */
    get sessions() {
        if (!this.__sessionCtrl) {
            throw new W3oError(W3oError.SESSION_NOT_FOUND);
        }
        return this.__sessionCtrl;
    }
    /**
     * Returns the network manager instance
     */
    get networks() {
        if (!this.__networkCtrl) {
            throw new W3oError(W3oError.NETWORK_MANAGER_NOT_CREATED);
        }
        return this.__networkCtrl;
    }
    /**
     * Returns the initialized state
     */
    get initialized() {
        return this.__initCalled;
    }
    /**
     * Returns the authentication manager instance
     */
    get auth() {
        if (!this.__authCtrl) {
            throw new W3oError(W3oError.AUTH_MANAGER_NOT_CREATED);
        }
        return this.__authCtrl;
    }
    /**
     * Returns the module manager instance
     */
    get modules() {
        if (!this.__moduleCtrl) {
            throw new W3oError(W3oError.MODULE_MANAGER_NOT_CREATED);
        }
        return this.__moduleCtrl;
    }
    /**
     * Returns the services instance object
     */
    get services() {
        if (!this.__serviceCtrl) {
            throw new W3oError(W3oError.SERVICE_OBJECT_NOT_FOUND);
        }
        return this.__serviceCtrl;
    }
    /**
     * Returns the initialized settings
     */
    get settings() {
        if (!this.__settings) {
            throw new W3oError(W3oError.SETTINGS_NOT_FOUND);
        }
        return this.__settings;
    }
    /**
     * Observable that emits once Octopus is fully initialized
     */
    get whenReady() {
        return this.onInitialized$.pipe(filter((initialized) => initialized), map(() => undefined));
    }
    /**
     * Gets support settings for a given network type
     */
    getSupportFor(type) {
        logger.method('getSupportFor', { type });
        if (!this.__supportFor[type]) {
            throw new W3oError(W3oError.SUPPORT_NOT_FOUND, { type });
        }
        return this.__supportFor[type];
    }
    /**
     * Adds support for a new network type before initialization
     */
    addNetworkSupport(support, parent) {
        const context = logger.method('addNetworkSupport', { support }, parent);
        if (this.__initCalled) {
            throw new W3oError(W3oError.ALREADY_INITIALIZED, { name: 'Web3Octopus', message: 'Network support can only be added before initialization' });
        }
        const sub = this.onManagersReady$.pipe(filter((initialized) => initialized)).subscribe(() => {
            logger.log('processing support', support.type, 'with requirements', support.networks, support.chain, { support });
            for (const network of support.networks) {
                this.networks.addNetwork(network, context);
            }
            this.auth.addChainSupport(support.chain, context);
            if (support.networks.length > 0) {
                new W3oModuleConcept({ v: '1.0.0', n: `${support.type}.network.support`, r: [] }, { support }, context);
            }
            new W3oModuleConcept({ v: '1.0.0', n: `${support.type}.auth.support`, r: [`${support.type}.network.support`] }, { chain: support.chain }, context);
            new W3oModuleConcept({ v: '1.0.0', n: `${support.type}.global.support`, r: [`${support.type}.network.support`, `${support.type}.auth.support`] }, { support }, context);
            if (!this.networks.currentNetworkName) {
                this.networks.setCurrentNetwork(support.networks[0].name, context);
            }
            sub.unsubscribe();
        });
    }
    /**
     * Initializes the framework with provided settings
     */
    init(settings = defaultSettings, parent) {
        const context = logger.method('init', parent);
        if (this.__initCalled) {
            throw new W3oError(W3oError.ALREADY_INITIALIZED, { name: 'Web3Octopus', message: 'Web3Octopus can only be initialized once' });
        }
        const octopus = this;
        this.__settings = settings;
        this.__networkCtrl = new W3oNetworkManager(settings, context);
        this.__sessionCtrl = new W3oSessionManager(settings, context);
        this.__authCtrl = new W3oAuthManager(settings, context);
        this.__moduleCtrl = new W3oModuleManager(settings, context);
        this.__serviceCtrl = this.createServiceCustomInstance(context);
        this.onManagersReady$.next(true);
        this.modules.init(octopus, context);
        this.auth.init(octopus, context);
        this.sessions.init(octopus, context);
        this.networks.init(octopus, context);
        combineLatest([
            this.modules.whenReady,
            this.auth.whenReady,
            this.sessions.whenReady,
            this.networks.whenReady,
        ]).pipe(map(() => {
            this.__initCalled = true;
            this.onInitialized$.next(true);
            logger.log('Web3Octopus is ready!!', { octopus });
        })).subscribe(() => {
            logger.log('Web3Octopus is ready!!', { octopus });
        });
    }
    /**
     * Internal method to instantiate the service object tree
     */
    createServiceCustomInstance(parent) {
        logger.method('createServiceCustomInstance', parent);
        const servicesObject = { snapshot: () => ({}) };
        for (const service of this.__services) {
            logger.log('processing service', service.path);
            const path = service.path.split('.');
            let currentLevel = servicesObject;
            for (let i = 0; i < path.length; i++) {
                const part = path[i];
                if (i === path.length - 1) {
                    currentLevel[part] = service;
                }
                else {
                    if (!currentLevel[part]) {
                        currentLevel[part] = {};
                    }
                    currentLevel = currentLevel[part];
                }
            }
        }
        servicesObject.snapshot = () => {
            const snapshot = {};
            const createSnapshot = (src, dest) => {
                for (const key in src) {
                    if (src[key] instanceof W3oService) {
                        dest[key] = src[key].snapshot();
                    }
                    else if (typeof src[key] === 'object' && src[key] !== null) {
                        dest[key] = {};
                        createSnapshot(src[key], dest[key]);
                    }
                }
            };
            createSnapshot(servicesObject, snapshot);
            return snapshot;
        };
        return servicesObject;
    }
    /**
     * Registers the service modules to be instantiated during initialization
     */
    registerServices(services, parent) {
        logger.method('registerServices', { services }, parent);
        this.__services.push(...services);
    }
    /**
     * Returns a snapshot of the current state of Octopus and its subsystems
     */
    snapshot() {
        if (!this.__initCalled) {
            throw new W3oError(W3oError.NOT_INITIALIZED, { message: 'snapshots can only be taken after initialization' });
        }
        return {
            class: 'Web3Octopus',
            auth: this.auth.snapshot(),
            networks: this.networks.snapshot(),
            sessions: this.sessions.snapshot(),
            services: this.services.snapshot(),
        };
    }
}
Web3Octopus.__instance = null;
