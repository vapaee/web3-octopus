// w3o-core/src/classes/W3oNetwork.ts

import { Observable } from 'rxjs';

import {
    W3oInstance,
    W3oNetworkName,
    W3oNetworkSettings,
    W3oNetworkType,
} from '../types';

import { W3oContextFactory, W3oContext } from './W3oContext';
import { W3oModule } from './W3oModule';
import { W3oContractManager } from './W3oContractManager';
import { W3oToken } from './W3oToken';
import { W3oDefaultHttpClient } from './W3oDefaultHttpClient';
import { W3oTokenList } from './W3oTokenList';

const logger = new W3oContextFactory('W3oNetwork');

/**
 * Abstract class that represents a specific blockchain network with token and contract management capabilities.
 */
export abstract class W3oNetwork extends W3oModule {

    private __contractCtrl: W3oContractManager;
    private __tokenlist: W3oTokenList;

    constructor(
        public readonly settings: W3oNetworkSettings,
        parent: W3oContext
    ) {
        const context = logger.method('constructor', {settings}, parent);
        if (!settings.httpClient) {
            settings.httpClient = new W3oDefaultHttpClient();
        }
        super(context);
        this.__contractCtrl = this.createContractManager(this, context);
        this.__tokenlist = new W3oTokenList(settings.httpClient!, settings.tokensUrl);
    }

    /**
     * Getter to retrieve the network type.
     */
    get type(): W3oNetworkType {
        return this.settings.type;
    }

    /**
     * Getter to retrieve the network name.
     */
    get name(): W3oNetworkName {
        return this.settings.name;
    }

    /**
     * Getter to obtain an observable stream of tokens available on the network.
     */
    get tokens$(): Observable<W3oToken[]> {
        return this.__tokenlist.list$;
    }

    /**
     * Getter to obtain the current token list available on the network.
     */
    get tokens(): W3oToken[] {
        return this.__tokenlist.list;
    }

    /**
     * Initializes the network module and fetches its tokens.
     */
    override init(octopus: W3oInstance, requirements: W3oModule[], parent: W3oContext): void {
        const context = logger.method('init', { w3oId: this.w3oId, octopus, requirements }, parent);
        this.fetchTokens(context).subscribe(tokens => {
            logger.info('Tokens fetched', { tokens });
            super.init(octopus, requirements, context);
        });
    }

    /**
     * Loads the token list from the configured source.
     */
    fetchTokens(parent: W3oContext): Observable<W3oToken[]> {
        const context = logger.method('fetchTokens', { w3oId: this.w3oId }, parent);
        return this.__tokenlist.load(context);
    }

    /**
     * Returns the network type (redundant alias to `type`).
     */
    getNetworkType(): W3oNetworkType {
        return this.type;
    }

    /**
     * Finds a token by its symbol or address.
     */
    getToken(token: string, parent: W3oContext): W3oToken | null {
        logger.method('getToken', {token}, parent);
        return this.tokens.find(t => t.symbol === token || t.address === token) || null;
    }

    /**
     * Returns the contract manager associated with this network.
     */
    getContractManager(): W3oContractManager {
        return this.__contractCtrl;
    }

    /**
     * Abstract method to create the specific contract manager for the network.
     */
    abstract createContractManager(network: W3oNetwork, parent: W3oContext): W3oContractManager;

    /**
     * Abstract method to retrieve the native system token of the network.
     */
    abstract getSystemToken(): W3oToken;

    /**
     * Abstract method to update the internal state of the network.
     */
    abstract updateState(): Observable<void>;

    /**
     * Abstract method to perform a read-only query to a smart contract.
     */
    abstract queryContract(params: { [key: string]: any }): Observable<any>;

    /**
     * Validates if a given address is a valid account on the network.
     */
    validateAccount(address: string, parent: W3oContext): Observable<boolean> {
        logger.method('validateAccount', {address}, parent);
        return new Observable<boolean>(subscriber => {
            subscriber.next(true); // Simulate a successful validation (Ethereum, Solana, etc.)
            subscriber.complete();
        });
    }
}
