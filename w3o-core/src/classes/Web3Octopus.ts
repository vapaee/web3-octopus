// w3o-core/src/classes/Web3Octopus.ts

import {
    Logger,
    LoggerContext,
    W3oError,
    W3oModuleManager,
    W3oNetworkManager,
    W3oSessionManager,
} from '.';
import { W3oGlobalSettings, W3oInstance, W3oIServices, W3oNetworkSupportSettings } from '../types';
import { W3oAuthManager } from './W3oAuthManager';
import { W3oService } from './W3oService';

const logger = new Logger('Web3Octopus');

const defaultSettings: W3oGlobalSettings = {
    multiSession: false,
    autoLogin: true,
};

interface WithSnapshot {
    snapshot(): any;
}

// Main singleton class that acts as the entry point, includes methods to add network support, register modules, and initialize the state
export class Web3Octopus<Tw3o extends W3oIServices & WithSnapshot> implements W3oInstance {
    private __initialized = false;
    private __services: W3oService[] = [];
    private __serviceCtrl: Tw3o | null = null;
    private __networkCtrl: W3oNetworkManager | null = null;
    private __sessionCtrl: W3oSessionManager | null = null;
    private __authCtrl: W3oAuthManager | null = null;
    private __meduleCtrl: W3oModuleManager | null = null;

    // static getter para obtener la instancia de Octopus casteada a la interfaz W3oInstance
    private static __instance: W3oInstance | null = null;
    static get instance(): W3oInstance {
        if (!Web3Octopus.__instance) {
            throw new W3oError(W3oError.OCTOPUS_INSTANCE_NOT_FOUND);
        }
        return Web3Octopus.__instance;
    }

    constructor(settings: W3oGlobalSettings = defaultSettings, parent?: LoggerContext) {
        const context = logger.method('constructor', {settings}, parent);
        this.__authCtrl = new W3oAuthManager(settings, context);
        this.__networkCtrl = new W3oNetworkManager(settings, context);
        this.__sessionCtrl = new W3oSessionManager(settings, context);
        this.__meduleCtrl = new W3oModuleManager(settings, context);
        // set the instance to this object
        Web3Octopus.__instance = this;
    }

    // Getter to obtain the session manager
    get sessions(): W3oSessionManager {
        if (!this.__sessionCtrl) {
            throw new W3oError(W3oError.SESSION_NOT_FOUND);
        }
        return this.__sessionCtrl;
    }

    // Getter to obtain the network manager
    get networks(): W3oNetworkManager {
        if (!this.__networkCtrl) {
            throw new W3oError(W3oError.NETWORK_MANAGER_NOT_CREATED);
        }
        return this.__networkCtrl;
    }

    // Getter to obtain the auth manager
    get auth(): W3oAuthManager {
        if (!this.__authCtrl) {
            throw new W3oError(W3oError.AUTH_MANAGER_NOT_CREATED);
        }
        return this.__authCtrl;
    }

    // Getter to obtain the module manager
    get modules(): W3oModuleManager {
        if (!this.__meduleCtrl) {
            throw new W3oError(W3oError.MODULE_MANAGER_NOT_CREATED);
        }
        return this.__meduleCtrl;
    }

    // Getter to obtain the services
    get services(): Tw3o {
        if (!this.__serviceCtrl) {
            throw new W3oError(W3oError.SERVICE_OBJECT_NOT_FOUND);
        }
        return this.__serviceCtrl;
    }
    
    // Method to add network support
    addNetworkSupport(support: W3oNetworkSupportSettings, parent?: LoggerContext): void {
        const context = logger.method('addNetworkSupport', {support}, parent);
        if (this.__initialized) {
            throw new W3oError(W3oError.ALREADY_INITIALIZED, { name: 'Web3Octopus', message: 'Network support can only be added before initialization' });
        }

        // Add support for the network
        for (const network of support.networks) {
            this.networks.addNetwork(network, context);
        }

        // Add support for authentication for this type of network
        for (const auth of support.auth) {
            this.auth.addAuthSupport(auth, context);
        }
    }

    // Method to initialize the framework state
    init(parent?: LoggerContext): void {
        const context = logger.method('init', parent);
        if (this.__initialized) {
            throw new W3oError(W3oError.ALREADY_INITIALIZED, { name: 'Web3Octopus', message: 'Web3Octopus can only be initialized once' });
        }
        this.__initialized = true;
        this.networks.init(context);
        this.sessions.init(context);
        this.__serviceCtrl = this.createService(context);
        context.log('Initialized successfully');
    }

    // Method to register services
    registerServices(services: W3oService[], parent?: LoggerContext): void {
        logger.method('registerServices', {services}, parent);
        this.__services.push(...services);
    }

    // Method to create services
    private createService(parent?: LoggerContext): Tw3o {
        const context = logger.method('createService', undefined, parent);

        // Create the services object
        const servicesObject: any = {};
        for (const service of this.__services) {
            context.log('processing service', service.path);
            const path = service.path.split('.');
            let currentLevel = servicesObject;

            for (let i = 0; i < path.length; i++) {
                const part = path[i];
                if (i === path.length - 1) {
                    currentLevel[part] = service;
                } else {
                    if (!currentLevel[part]) {
                        currentLevel[part] = {};
                    }
                    currentLevel = currentLevel[part];
                }
            }
        }

        // Add the snapshot method to the services object
        servicesObject.snapshot = () => {
            const snapshot: any = {};
            const createSnapshot = (src: any, dest: any) => {
                for (const key in src) {
                    if (src[key] instanceof W3oService) {
                        dest[key] = src[key].snapshot();
                    } else if (typeof src[key] === 'object' && src[key] !== null) {
                        dest[key] = {};
                        createSnapshot(src[key], dest[key]);
                    }
                }
            };
            createSnapshot(servicesObject, snapshot);
            return snapshot;
        };
        
        context.log('services created successfully', {services: servicesObject});
        return servicesObject as Tw3o;
    }

    // Method to take a snapshot of the framework state
    snapshot(): any {
        if (!this.__initialized) {
            throw new W3oError(W3oError.NOT_INITIALIZED, { message: 'snapshots can only be taken after initialization' });
        }
        return {
            auth: this.auth.snapshot(),
            networks: this.networks.snapshot(),
            sessions: this.sessions.snapshot(),
            services: this.services.snapshot(),
        };
    }
}

