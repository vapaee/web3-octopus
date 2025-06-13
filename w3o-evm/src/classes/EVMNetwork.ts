// w3o-antelope/src/classes/EVMNetwork.ts

import {
    W3oContext,
    W3oContextFactory,
    W3oContractManager,
    W3oNetwork,
    W3oToken,
    W3oModule,
    W3oHttpClient,
} from "@vapaee/w3o-core";

import { Observable } from "rxjs";
import { EVMContractManager } from "./EVMContractManager";
import { W3oEVMNetworkSettings } from "../types";
import { EVMWharfkit, WharfkitInstance } from "./EVMWharfkit";
import { Name } from "@wharfkit/antelope";

const logger = new W3oContextFactory('EVMNetwork');

/**
 * Network implementation for EVM-based chains, handling settings, wharfkit integration and EOSIO RPC.
 */
export class EVMNetwork extends W3oNetwork {

    private _settings!: W3oEVMNetworkSettings;
    private _wharfkit!: WharfkitInstance;

    /**
     * Constructs an EVMNetwork instance and initializes Wharfkit if settings are valid.
     */
    constructor(
        settings: W3oEVMNetworkSettings,
        parent: W3oContext
    ) {
        const context = logger.method('constructor', {chain: settings.displayName, settings}, parent);
        if (!settings.httpClient) {
            settings.httpClient = {
                get: <T>(url: string): Observable<T> => {
                    return new Observable<T>(subscriber => {
                        fetch(url, { method: 'GET' })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error(`HTTP error! status: ${response.status}`);
                                }
                                return response.json();
                            })
                            .then(data => {
                                subscriber.next(data as T);
                                subscriber.complete();
                            })
                            .catch(error => {
                                subscriber.error(error);
                            });
                    });
                }
            } as W3oHttpClient;
        }

        super(settings, context);
        this._settings = settings;

        this.initialized$.subscribe((result) => {
            if (result) {
                this._wharfkit = EVMWharfkit.wharfkit(this.octopus.settings.appName, settings, context);
                logger.log('Wharfkit initialized', { wharfkit: this._wharfkit });
            } else {
                context.error(`Module(${this.w3oId}) not initialized correctly`);
            }
        });

        W3oModule.registerModule(this, context);
    }

    /**
     * Returns the network settings specific to EVM.
     */
    get antelopeSettings(): W3oEVMNetworkSettings {
        return this._settings;
    }

    /**
     * Returns the Wharfkit instance or throws if not initialized.
     */
    get wharfkit(): WharfkitInstance {
        if (!this._wharfkit) {
            throw new Error(`Wharfkit not initialized. Module(${this.w3oId}). Try to initialize yourself after W3oModule constructor`);
        }
        return this._wharfkit;
    }

    /**
     * Returns the version declared in network settings.
     */
    override get w3oVersion(): string {
        return this.antelopeSettings?.w3oVersion ?? '';
    }

    /**
     * Returns the module name declared in network settings.
     */
    override get w3oName(): string {
        return this.antelopeSettings?.w3oName ?? '';
    }

    /**
     * Returns the dependency list declared in network settings.
     */
    override get w3oRequire(): string[] {
        return this.antelopeSettings?.w3oRequire ?? [];
    }

    /**
     * Returns a snapshot of the internal state of this module.
     */
    override snapshot(): any {
        return {
            ... super.snapshot(),
            _class: 'EVMNetwork',
            settings: this.settings,
        };
    }

    /**
     * Creates a contract manager specific to EVM networks.
     */
    override createContractManager(network: W3oNetwork, parent: W3oContext): W3oContractManager {
        const context = logger.method('createContractManager', {chain: network.name, network}, parent);
        if (network instanceof EVMNetwork) {
            logger.info('EVMNetwork contract manager created', parent);
            const manager = new EVMContractManager(this.settings, network, context);
            return manager;
        } else {
            context.error(`Invalid network type: Expected EVMNetwork, got ${network.constructor.name}`, parent);
            throw new Error(`Invalid network type: ${network.constructor.name}`);
        }
    }

    /**
     * Stub method to get the system token (not yet implemented).
     */
    override getSystemToken(): W3oToken {
        const context = logger.method('getSystemToken', undefined);
        context.error('getSystemToken not implemented');
        return {} as W3oToken;
    }

    /**
     * Stub method to update network state (not yet implemented).
     */
    override updateState(): Observable<void> {
        const context = logger.method('updateState', undefined);
        context.error('updateState not implemented');
        return new Observable<void>();
    }

    /**
     * Executes a query against a smart contract table using Wharfkit.
     */
    override queryContract(params: { [key: string]: any }): Observable<any> {
        const context = logger.method('queryContract', {params});
        return new Observable<any>((observer) => {
            this.wharfkit.accountKit.client.v1.chain.get_table_rows(params as any).then((result: any) => {
                logger.info('Query result:', {result});
                observer.next(result);
                observer.complete();
            }).catch((error: any) => {
                context.error('Query error:', {error});
                observer.error(error);
            });
        });
    }

    /**
     * Validates if an account exists on chain using Wharfkit.
     */
    override validateAccount(username: string, parent: W3oContext): Observable<boolean> {
        const context = logger.method('validateAccount', {username}, parent);
        return new Observable<boolean>(subscriber => {
            this.wharfkit.accountKit.client.v1.chain.get_account(Name.from(username)).then((result: any) => {
                logger.info('Account data:', {result});
                subscriber.next(true);
                subscriber.complete();
            }).catch((error) => {
                context.error('Account failed:', {username, error});
                subscriber.next(false);
                subscriber.complete();
            });
        });
    }
}
