// w3o-ethereum/src/classes/EthereumNetwork.ts

import {
    W3oContext,
    W3oContextFactory,
    W3oNetwork,
    W3oToken,
    W3oModule,
    W3oDefaultHttpClient,
} from '@vapaee/w3o-core';
import { Observable } from 'rxjs';
import { ethers } from 'ethers';
import { W3oEthereumNetworkSettings } from '../types';

const logger = new W3oContextFactory('EthereumNetwork');

/**
 * Simple Ethereum/EVM network implementation using ethers providers.
 */
export class EthereumNetwork extends W3oNetwork {
    private _settings!: W3oEthereumNetworkSettings;
    private _provider!: ethers.providers.JsonRpcProvider;

    constructor(settings: W3oEthereumNetworkSettings, parent: W3oContext) {
        const context = logger.method('constructor', { chain: settings.displayName, settings }, parent);
        if (!settings.httpClient) {
            settings.httpClient = new W3oDefaultHttpClient();
        }
        super(settings, context);
        this._settings = settings;
        this._provider = new ethers.providers.JsonRpcProvider(settings.rpcUrl);
        W3oModule.registerModule(this, context);
    }

    get ethereumSettings(): W3oEthereumNetworkSettings {
        return this._settings;
    }

    get provider(): ethers.providers.JsonRpcProvider {
        return this._provider;
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
        const isValid = ethers.utils.isAddress(address);
        return new Observable<boolean>(subscriber => {
            void context;
            subscriber.next(isValid);
            subscriber.complete();
        });
    }
}