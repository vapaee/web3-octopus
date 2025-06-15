// w3o-ethereum/src/classes/EthereumNetwork.ts

import {
    W3oContext,
    W3oContextFactory,
    W3oContractManager,
    W3oNetwork,
    W3oToken,
    W3oModule,
    W3oHttpClient,
} from '@vapaee/w3o-core';
import { Observable } from 'rxjs';
import { EthereumContractManager } from './EthereumContractManager';
import { W3oEthereumNetworkSettings } from '../types';
import { EthereumWagmi } from './EthereumWagmi';
import { createPublicClient, http, PublicClient } from 'viem';
import { Chain } from 'viem';

const logger = new W3oContextFactory('EthereumNetwork');

/**
 * Network implementation for Ethereum/EVM chains.
 */
export class EthereumNetwork extends W3oNetwork {
    private _settings!: W3oEthereumNetworkSettings;
    private _client!: PublicClient;

    constructor(settings: W3oEthereumNetworkSettings, parent: W3oContext) {
        const context = logger.method('constructor', { chain: settings.displayName, settings }, parent);
        if (!settings.httpClient) {
            settings.httpClient = {
                get: <T>(url: string): Observable<T> => {
                    return new Observable<T>(subscriber => {
                        fetch(url, { method: 'GET' })
                            .then(res => {
                                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                                return res.json();
                            })
                            .then(data => { subscriber.next(data as T); subscriber.complete(); })
                            .catch(err => subscriber.error(err));
                    });
                }
            } as W3oHttpClient;
        }

        super(settings, context);
        this._settings = settings;

        this.initialized$.subscribe((result) => {
            if (result) {
                EthereumWagmi.wagmi(settings, context);
                const chain: Chain = {
                    id: parseInt(settings.chainId, 10),
                    name: settings.displayName,
                    network: settings.name,
                    nativeCurrency: { name: settings.nativeCurrency ?? 'ETH', symbol: settings.symbol ?? 'ETH', decimals: settings.decimals ?? 18 },
                    rpcUrls: { default: { http: [settings.rpcUrl] } },
                };
                this._client = createPublicClient({ chain, transport: http(settings.rpcUrl) });
                logger.log('Viem client initialized');
            } else {
                context.error(`Module(${this.w3oId}) not initialized correctly`);
            }
        });

        W3oModule.registerModule(this, context);
    }

    get ethereumSettings(): W3oEthereumNetworkSettings {
        return this._settings;
    }

    get client(): PublicClient {
        return this._client;
    }

    override get w3oVersion(): string {
        return this.ethereumSettings?.w3oVersion ?? '';
    }

    override get w3oName(): string {
        return this.ethereumSettings?.w3oName ?? '';
    }

    override get w3oRequire(): string[] {
        return this.ethereumSettings?.w3oRequire ?? [];
    }

    override snapshot(): any {
        return {
            ...super.snapshot(),
            _class: 'EthereumNetwork',
            settings: this.settings,
        };
    }

    override createContractManager(network: W3oNetwork, parent: W3oContext): W3oContractManager {
        const context = logger.method('createContractManager', { chain: network.name, network }, parent);
        if (network instanceof EthereumNetwork) {
            const manager = new EthereumContractManager(this.settings, network, context);
            return manager;
        } else {
            context.error(`Invalid network type: ${network.constructor.name}`);
            throw new Error(`Invalid network type: ${network.constructor.name}`);
        }
    }

    override getSystemToken(): W3oToken {
        const context = logger.method('getSystemToken', undefined);
        context.error('getSystemToken not implemented');
        return {} as W3oToken;
    }

    override updateState(): Observable<void> {
        const context = logger.method('updateState', undefined);
        context.error('updateState not implemented');
        return new Observable<void>();
    }

    override queryContract(params: { [key: string]: any }): Observable<any> {
        const context = logger.method('queryContract', { params });
        context.error('queryContract not implemented');
        return new Observable<any>();
    }

    override validateAccount(address: string, parent: W3oContext): Observable<boolean> {
        const context = logger.method('validateAccount', { address }, parent);
        void context;
        // Basic validation: check hex string length
        const isValid = /^0x[a-fA-F0-9]{40}$/.test(address);
        return new Observable<boolean>(subscriber => {
            subscriber.next(isValid);
            subscriber.complete();
        });
    }
}
