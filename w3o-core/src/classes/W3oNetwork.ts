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
import { W3oChainSupport } from './W3oChainSupport';

const logger = new W3oContextFactory('W3oNetwork');

/**
 * Abstract class that represents a specific blockchain network with token and contract management capabilities.
 */
export class W3oNetwork extends W3oModule {

    private __contractCtrl: W3oContractManager;
    private __tokenlist: W3oTokenList;
    public support!: W3oChainSupport;

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
        this.support = requirements[0] as W3oChainSupport;
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
     * Creates the contract manager for the network.
     */
    createContractManager(network: W3oNetwork, parent: W3oContext): W3oContractManager {
        const context = logger.method('createContractManager', { network }, parent);
        return new W3oContractManager(this.settings, network, context);
    }

    /**
     * Returns the native system token. To be overridden by specific networks.
     */
    getSystemToken(): W3oToken {
        const context = logger.method('getSystemToken', undefined);
        context.error('getSystemToken not implemented');
        return {} as W3oToken;
    }

    /**
     * Updates internal state. To be overridden by specific networks.
     */
    updateState(): Observable<void> {
        const context = logger.method('updateState', undefined);
        context.error('updateState not implemented');
        return new Observable<void>();
    }

    /**
     * Performs a read-only query via the chain support.
     */
    queryContract(params: { [key: string]: any }): Observable<any> {
        return this.support.queryContract(params);
    }

    /**
     * Validates if a given address is a valid account on the network.
     */
    validateAccount(address: string, parent: W3oContext): Observable<boolean> {
        return this.support.validateAccount(address, parent);
    }
}
