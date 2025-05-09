// w3o-core/src/classes/Web3Octopus.ts

import { BehaviorSubject, combineLatest, filter, map, Observable } from 'rxjs';
import {
    W3oGlobalSettings,
    W3oInstance,
    W3oIServices,
    W3oNetworkSupportSettings,
} from '../types';

import { W3oContextFactory, W3oContext } from './W3oContext';
import { W3oAuthManager } from './W3oAuthManager';
import { W3oService } from './W3oService';
import { W3oNetworkManager } from './W3oNetworkManager';
import { W3oSessionManager } from './W3oSessionManager';
import { W3oModuleManager } from './W3oModuleManager';
import { W3oError } from './W3oError';
import { W3oModuleConcept } from './W3oModuleConcept';

const logger = new W3oContextFactory('Web3Octopus');

const defaultSettings: W3oGlobalSettings = {
    appName: 'w3o-app',
    multiSession: false,
    autoLogin: true,
};

interface WithSnapshot {
    snapshot(): any;
}

/**
 * Main singleton class that acts as the entry point, includes methods to add network support, register modules, and initialize the state
 */
export class Web3Octopus<Tw3o extends W3oIServices & WithSnapshot> implements W3oInstance {

    private __initCalled = false;
    public onInitialized$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.__initCalled);
    public onManagersReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private __authCtrl: W3oAuthManager | null = null;
    private __networkCtrl: W3oNetworkManager | null = null;
    private __sessionCtrl: W3oSessionManager | null = null;
    private __moduleCtrl: W3oModuleManager | null = null;
    private __services: W3oService[] = [];
    private __serviceCtrl: Tw3o | null = null;
    private __supportFor: { [type: string]: W3oNetworkSupportSettings } = {};
    private __settings: W3oGlobalSettings | null = null;

    private static __instance: W3oInstance | null = null;

    /**
     * Returns the static Octopus singleton instance
     */
    static get instance(): W3oInstance {
        if (!Web3Octopus.__instance) {
            throw new W3oError(W3oError.OCTOPUS_INSTANCE_NOT_FOUND);
        }
        return Web3Octopus.__instance;
    }

    constructor(parent?: W3oContext) {
        logger.method('constructor', parent);
        Web3Octopus.__instance = this;
    }

    /**
     * Returns the session manager instance
     */
    get sessions(): W3oSessionManager {
        if (!this.__sessionCtrl) {
            throw new W3oError(W3oError.SESSION_NOT_FOUND);
        }
        return this.__sessionCtrl;
    }

    /**
     * Returns the network manager instance
     */
    get networks(): W3oNetworkManager {
        if (!this.__networkCtrl) {
            throw new W3oError(W3oError.NETWORK_MANAGER_NOT_CREATED);
        }
        return this.__networkCtrl;
    }

    /**
     * Returns the initialized state
     */
    get initialized(): boolean {
        return this.__initCalled;
    }

    /**
     * Returns the authentication manager instance
     */
    get auth(): W3oAuthManager {
        if (!this.__authCtrl) {
            throw new W3oError(W3oError.AUTH_MANAGER_NOT_CREATED);
        }
        return this.__authCtrl;
    }

    /**
     * Returns the module manager instance
     */
    get modules(): W3oModuleManager {
        if (!this.__moduleCtrl) {
            throw new W3oError(W3oError.MODULE_MANAGER_NOT_CREATED);
        }
        return this.__moduleCtrl;
    }

    /**
     * Returns the services instance object
     */
    get services(): Tw3o {
        if (!this.__serviceCtrl) {
            throw new W3oError(W3oError.SERVICE_OBJECT_NOT_FOUND);
        }
        return this.__serviceCtrl;
    }

    /**
     * Returns the initialized settings
     */
    get settings(): W3oGlobalSettings {
        if (!this.__settings) {
            throw new W3oError(W3oError.SETTINGS_NOT_FOUND);
        }
        return this.__settings;
    }

    /**
     * Observable that emits once Octopus is fully initialized
     */
    get whenReady(): Observable<void> {
        return this.onInitialized$.pipe(
            filter(initialized => initialized),
            map(() => undefined)
        );
    }

    /**
     * Gets support settings for a given network type
     */
    getSupportFor(type: string): W3oNetworkSupportSettings {
        logger.method('getSupportFor', { type });
        if (!this.__supportFor[type]) {
            throw new W3oError(W3oError.SUPPORT_NOT_FOUND, { type });
        }
        return this.__supportFor[type];
    }

    /**
     * Adds support for a new network type before initialization
     */
    addNetworkSupport(support: W3oNetworkSupportSettings, parent?: W3oContext): void {
        const context = logger.method('addNetworkSupport', { support }, parent);
        if (this.__initCalled) {
            throw new W3oError(W3oError.ALREADY_INITIALIZED, { name: 'Web3Octopus', message: 'Network support can only be added before initialization' });
        }

        const sub = this.onManagersReady$.pipe(
            filter(initialized => initialized)
        ).subscribe(() => {
            logger.log('processing support', support.type, 'with requirements', support.networks, support.auth, { support });

            for (const network of support.networks) {
                this.networks.addNetwork(network, context);
            }

            for (const auth of support.auth) {
                this.auth.addAuthSupport(auth, context);
            }

            if (support.networks.length > 0) {
                new W3oModuleConcept(
                    { v: '1.0.0', n: `${support.type}.network.support`, r: [] },
                    { support },
                    context
                );
            }

            if (support.auth.length > 0) {
                new W3oModuleConcept(
                    { v: '1.0.0', n: `${support.type}.auth.support`, r: [`${support.type}.network.support`] },
                    { auth: support.auth },
                    context
                );
            }

            new W3oModuleConcept(
                { v: '1.0.0', n: `${support.type}.global.support`, r: [`${support.type}.network.support`, `${support.type}.auth.support`] },
                { support },
                context
            );

            if (!this.networks.currentNetworkName) {
                this.networks.setCurrentNetwork(support.networks[0].name, context);
            }

            sub.unsubscribe();
        });
    }

    /**
     * Initializes the framework with provided settings
     */
    init(settings: W3oGlobalSettings = defaultSettings, parent?: W3oContext): void {
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
        ]).pipe(
            map(() => {
                this.__initCalled = true;
                this.onInitialized$.next(true);
                logger.log('Web3Octopus is ready!!', { octopus });
            })
        ).subscribe(() => {
            logger.log('Web3Octopus is ready!!', { octopus });
        });
    }

    /**
     * Internal method to instantiate the service object tree
     */
    private createServiceCustomInstance(parent?: W3oContext): Tw3o {
        logger.method('createServiceCustomInstance', parent);
        const servicesObject: Tw3o = { snapshot: () => ({}) } as Tw3o;

        for (const service of this.__services) {
            logger.log('processing service', service.path);
            const path = service.path.split('.');
            let currentLevel = servicesObject as unknown as { [part: string]: W3oService };
            for (let i = 0; i < path.length; i++) {
                const part = path[i];
                if (i === path.length - 1) {
                    currentLevel[part] = service;
                } else {
                    if (!currentLevel[part]) {
                        currentLevel[part] = {} as W3oService;
                    }
                    currentLevel = currentLevel[part] as unknown as { [part: string]: W3oService };
                }
            }
        }

        (servicesObject as unknown as WithSnapshot).snapshot = () => {
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

        return servicesObject as Tw3o;
    }

    /**
     * Registers the service modules to be instantiated during initialization
     */
    registerServices(services: W3oService[], parent?: W3oContext): void {
        logger.method('registerServices', { services }, parent);
        this.__services.push(...services);
    }

    /**
     * Returns a snapshot of the current state of Octopus and its subsystems
     */
    snapshot(): any {
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
