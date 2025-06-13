// w3o-ethereum/src/classes/EthereumNetwork.ts

import {
    W3oContext,
    W3oContextFactory,
    W3oContractManager,
    W3oNetwork,
    W3oToken,
    W3oModule,
    W3oHttpClient,
    W3oNetworkSettings,
} from '@vapaee/w3o-core';
import { Observable } from 'rxjs';
import { EthereumContractManager } from './EthereumContractManager';


const logger = new W3oContextFactory('EthereumNetwork');

/**
 * Network implementation for Ethereum-based chains, handling settings and contract manager creation.
 */
export class EthereumNetwork extends W3oNetwork {
    private _settings!: W3oNetworkSettings;

    /**
     * Constructs an EthereumNetwork instance.
     * @param settings - Network settings including rpcUrl and tokensUrl.
     * @param parent - Parent context for logging.
     */
    constructor(
        settings: W3oNetworkSettings,
        parent: W3oContext
    ) {
        const context = logger.method('constructor', { settings }, parent);
        // Ensure httpClient is set
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
        W3oModule.registerModule(this, context);
    }

    /**
     * Returns the version declared in network settings.
     */
    override get w3oVersion(): string {
        return this._settings.chainId;
    }

    /**
     * Returns the module name declared in network settings.
     */
    override get w3oName(): string {
        return `ethereum.network.${this._settings.name}`;
    }

    /**
     * Returns the dependency list declared in network settings (none for base).
     */
    override get w3oRequire(): string[] {
        return [];
    }

    /**
     * Creates a contract manager specific to Ethereum networks.
     * @param network - The current EthereumNetwork instance.
     * @param parent - Parent context for logging.
     */
    override createContractManager(network: W3oNetwork, parent: W3oContext): W3oContractManager {
        const context = logger.method('createContractManager', { network }, parent);
        if (network instanceof EthereumNetwork) {
            logger.info('EthereumNetwork contract manager created', context);
            const manager = new EthereumContractManager(this._settings, network, context);
            return manager;
        } else {
            context.error(`Invalid network type: Expected EthereumNetwork, got ${network.constructor.name}`);
            throw new Error(`Invalid network type: ${network.constructor.name}`);
        }
    }

    /**
     * Returns the system token as a W3oToken. For Ethereum, this could be ETH.
     */
    override getSystemToken(): W3oToken {
        const context = logger.method('getSystemToken', undefined);
        // Construct a W3oToken with placeholder data for ETH
        return new W3oToken({
            address: '',
            symbol: 'ETH',
            name: 'Ether',
            decimals: 18,
            icon: '/assets/icons/eth.png',
            isSystemToken: true,
        });
    }

    /**
     * Stub method to update network state (not yet implemented).
     */
    override updateState(): Observable<void> {
        const context = logger.method('updateState', undefined);
        context.error('updateState not implemented for EthereumNetwork');
        return new Observable<void>(subscriber => {
            subscriber.complete();
        });
    }

    /**
     * Executes a read-only call to a smart contract.
     * @param params - Parameters including address, abi, method name, and arguments.
     */
    override queryContract(params: { address: string; abi: any[]; method: string; args?: any[] }):
        Observable<any> {
        const context = logger.method('queryContract', { params });
        return new Observable<any>(subscriber => {
            try {
                const provider = new (require('ethers').providers.JsonRpcProvider)(this._settings.rpcUrl);
                const contract = new (require('ethers').Contract)(params.address, params.abi, provider);
                contract[params.method](...(params.args || []))
                    .then((result: any) => {
                        context.log('Query result:', result);
                        subscriber.next(result);
                        subscriber.complete();
                    })
                    .catch((error: any) => {
                        context.error('Query error:', error);
                        subscriber.error(error);
                    });
            } catch (error) {
                context.error('Error in queryContract:', error);
                subscriber.error(error);
            }
        });
    }

    /**
     * Validates if an address is a valid Ethereum address.
     * @param address - The Ethereum address to validate.
     * @param parent - Parent context for logging.
     */
    override validateAccount(address: string, parent: W3oContext): Observable<boolean> {
        const context = logger.method('validateAccount', { address }, parent);
        return new Observable<boolean>(subscriber => {
            try {
                const isValid = require('ethers').utils.isAddress(address);
                subscriber.next(isValid);
                subscriber.complete();
            } catch {
                subscriber.next(false);
                subscriber.complete();
            }
        });
    }
}
