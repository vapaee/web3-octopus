// w3o-core/src/classes/W3oNetwork.ts
import { Observable } from 'rxjs';
import { W3oContextFactory } from './W3oContext';
import { W3oModule } from './W3oModule';
import { W3oContractManager } from './W3oContractManager';
import { W3oDefaultHttpClient } from './W3oDefaultHttpClient';
import { W3oTokenList } from './W3oTokenList';
const logger = new W3oContextFactory('W3oNetwork');
/**
 * class that represents a specific blockchain network with token and contract management capabilities.
 */
export class W3oNetwork extends W3oModule {
    constructor(settings, parent) {
        const context = logger.method('constructor', { settings }, parent);
        if (!settings.httpClient) {
            settings.httpClient = new W3oDefaultHttpClient();
        }
        super(context);
        this.settings = settings;
        this.__contractCtrl = this.createContractManager(this, context);
        this.__tokenlist = new W3oTokenList(settings.httpClient, settings.tokensUrl, context);
    }
    /**
     * Getter to retrieve the network type.
     */
    get type() {
        return this.settings?.type || 'other';
    }
    /**
     * Getter to retrieve the network name.
     */
    get name() {
        return this.settings?.name || 'unknown';
    }
    /**
     * Getter to obtain an observable stream of tokens available on the network.
     */
    get tokens$() {
        return this.__tokenlist.list$;
    }
    /**
     * Getter to obtain the current token list available on the network.
     */
    get tokens() {
        return this.__tokenlist.list;
    }
    /**
     * Initializes the network module and fetches its tokens.
     */
    init(octopus, requirements, parent) {
        const context = logger.method('init', { w3oId: this.w3oId, octopus, requirements }, parent);
        this.support = requirements[0];
        this.fetchTokens(context).subscribe((tokens) => {
            logger.info('Tokens fetched', { tokens });
            super.init(octopus, requirements, context);
        });
    }
    get w3oVersion() {
        throw new Error('w3oVersion need to be overridden in the subclass');
    }
    get w3oRequire() {
        throw new Error('w3oRequire need to be overridden in the subclass');
    }
    get w3oName() {
        throw new Error('w3oName need to be overridden in the subclass');
    }
    /**
     * Loads the token list from the configured source.
     */
    fetchTokens(parent) {
        const context = logger.method('fetchTokens', { w3oId: this.w3oId }, parent);
        return this.__tokenlist.load(context);
    }
    /**
     * Returns the network type (redundant alias to `type`).
     */
    getNetworkType() {
        return this.type;
    }
    /**
     * Finds a token by its symbol or address.
     */
    getToken(token, parent) {
        logger.method('getToken', { token }, parent);
        return this.tokens.find(t => t.symbol === token || t.address === token) || null;
    }
    /**
     * Returns the contract manager associated with this network.
     */
    getContractManager() {
        return this.__contractCtrl;
    }
    /**
     * Creates the contract manager for the network.
     */
    createContractManager(network, parent) {
        const context = logger.method('createContractManager', { network }, parent);
        return new W3oContractManager(this.settings, network, context);
    }
    /**
     * Returns the native system token. To be overridden by specific networks.
     */
    getSystemToken() {
        const context = logger.method('getSystemToken', undefined);
        context.error('getSystemToken not implemented');
        return {};
    }
    /**
     * Updates internal state. To be overridden by specific networks.
     */
    updateState() {
        const context = logger.method('updateState', undefined);
        context.error('updateState not implemented');
        return new Observable();
    }
    /**
     * Performs a read-only query via the chain support.
     */
    queryContract(params) {
        return this.support.queryContract(params);
    }
    /**
     * Validates if a given address is a valid account on the network.
     */
    validateAccount(address, parent) {
        const context = logger.method('validateAccount', { address, network: this.name }, parent);
        return this.support.validateAccount(address, context);
    }
}
