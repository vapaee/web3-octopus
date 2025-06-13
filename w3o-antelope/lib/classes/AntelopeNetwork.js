// w3o-antelope/src/classes/AntelopeNetwork.ts
import { W3oContextFactory, W3oNetwork, W3oModule, } from "@vapaee/w3o-core";
import { Observable } from "rxjs";
import { AntelopeContractManager } from "./AntelopeContractManager";
import { AntelopeWharfkit } from "./AntelopeWharfkit";
import { Name } from "@wharfkit/antelope";
const logger = new W3oContextFactory('AntelopeNetwork');
/**
 * Network implementation for Antelope-based chains, handling settings, wharfkit integration and EOSIO RPC.
 */
export class AntelopeNetwork extends W3oNetwork {
    /**
     * Constructs an AntelopeNetwork instance and initializes Wharfkit if settings are valid.
     */
    constructor(settings, parent) {
        const context = logger.method('constructor', { chain: settings.displayName, settings }, parent);
        if (!settings.httpClient) {
            settings.httpClient = {
                get: (url) => {
                    return new Observable(subscriber => {
                        fetch(url, { method: 'GET' })
                            .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            return response.json();
                        })
                            .then(data => {
                            subscriber.next(data);
                            subscriber.complete();
                        })
                            .catch(error => {
                            subscriber.error(error);
                        });
                    });
                }
            };
        }
        super(settings, context);
        this._settings = settings;
        this.initialized$.subscribe((result) => {
            if (result) {
                this._wharfkit = AntelopeWharfkit.wharfkit(this.octopus.settings.appName, settings, context);
                logger.log('Wharfkit initialized', { wharfkit: this._wharfkit });
            }
            else {
                context.error(`Module(${this.w3oId}) not initialized correctly`);
            }
        });
        W3oModule.registerModule(this, context);
    }
    /**
     * Returns the network settings specific to Antelope.
     */
    get antelopeSettings() {
        return this._settings;
    }
    /**
     * Returns the Wharfkit instance or throws if not initialized.
     */
    get wharfkit() {
        if (!this._wharfkit) {
            throw new Error(`Wharfkit not initialized. Module(${this.w3oId}). Try to initialize yourself after W3oModule constructor`);
        }
        return this._wharfkit;
    }
    /**
     * Returns the version declared in network settings.
     */
    get w3oVersion() {
        return this.antelopeSettings?.w3oVersion ?? '';
    }
    /**
     * Returns the module name declared in network settings.
     */
    get w3oName() {
        return this.antelopeSettings?.w3oName ?? '';
    }
    /**
     * Returns the dependency list declared in network settings.
     */
    get w3oRequire() {
        return this.antelopeSettings?.w3oRequire ?? [];
    }
    /**
     * Returns a snapshot of the internal state of this module.
     */
    snapshot() {
        return {
            ...super.snapshot(),
            _class: 'AntelopeNetwork',
            settings: this.settings,
        };
    }
    /**
     * Creates a contract manager specific to Antelope networks.
     */
    createContractManager(network, parent) {
        const context = logger.method('createContractManager', { chain: network.name, network }, parent);
        if (network instanceof AntelopeNetwork) {
            logger.info('AntelopeNetwork contract manager created', parent);
            const manager = new AntelopeContractManager(this.settings, network, context);
            return manager;
        }
        else {
            context.error(`Invalid network type: Expected AntelopeNetwork, got ${network.constructor.name}`, parent);
            throw new Error(`Invalid network type: ${network.constructor.name}`);
        }
    }
    /**
     * Stub method to get the system token (not yet implemented).
     */
    getSystemToken() {
        const context = logger.method('getSystemToken', undefined);
        context.error('getSystemToken not implemented');
        return {};
    }
    /**
     * Stub method to update network state (not yet implemented).
     */
    updateState() {
        const context = logger.method('updateState', undefined);
        context.error('updateState not implemented');
        return new Observable();
    }
    /**
     * Executes a query against a smart contract table using Wharfkit.
     */
    queryContract(params) {
        const context = logger.method('queryContract', { params });
        return new Observable((observer) => {
            this.wharfkit.accountKit.client.v1.chain.get_table_rows(params).then((result) => {
                logger.info('Query result:', { result });
                observer.next(result);
                observer.complete();
            }).catch((error) => {
                context.error('Query error:', { error });
                observer.error(error);
            });
        });
    }
    /**
     * Validates if an account exists on chain using Wharfkit.
     */
    validateAccount(username, parent) {
        const context = logger.method('validateAccount', { username }, parent);
        return new Observable(subscriber => {
            this.wharfkit.accountKit.client.v1.chain.get_account(Name.from(username)).then((result) => {
                logger.info('Account data:', { result });
                subscriber.next(true);
                subscriber.complete();
            }).catch((error) => {
                context.error('Account failed:', { username, error });
                subscriber.next(false);
                subscriber.complete();
            });
        });
    }
}
