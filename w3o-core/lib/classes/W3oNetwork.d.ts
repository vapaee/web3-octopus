import { Observable } from 'rxjs';
import { W3oInstance, W3oNetworkName, W3oNetworkSettings, W3oNetworkType } from '../types';
import { W3oContext } from './W3oContext';
import { W3oModule } from './W3oModule';
import { W3oContractManager } from './W3oContractManager';
import { W3oToken } from './W3oToken';
import { W3oChainSupport } from './W3oChainSupport';
/**
 * class that represents a specific blockchain network with token and contract management capabilities.
 */
export declare class W3oNetwork extends W3oModule {
    readonly settings: W3oNetworkSettings;
    private __contractCtrl;
    private __tokenlist;
    support: W3oChainSupport;
    constructor(settings: W3oNetworkSettings, parent: W3oContext);
    /**
     * Getter to retrieve the network type.
     */
    get type(): W3oNetworkType;
    /**
     * Getter to retrieve the network name.
     */
    get name(): W3oNetworkName;
    /**
     * Getter to obtain an observable stream of tokens available on the network.
     */
    get tokens$(): Observable<W3oToken[]>;
    /**
     * Getter to obtain the current token list available on the network.
     */
    get tokens(): W3oToken[];
    /**
     * Initializes the network module and fetches its tokens.
     */
    init(octopus: W3oInstance, requirements: W3oModule[], parent: W3oContext): void;
    get w3oVersion(): string;
    get w3oRequire(): string[];
    get w3oName(): string;
    /**
     * Loads the token list from the configured source.
     */
    fetchTokens(parent: W3oContext): Observable<W3oToken[]>;
    /**
     * Returns the network type (redundant alias to `type`).
     */
    getNetworkType(): W3oNetworkType;
    /**
     * Finds a token by its symbol or address.
     */
    getToken(token: string, parent: W3oContext): W3oToken | null;
    /**
     * Returns the contract manager associated with this network.
     */
    getContractManager(): W3oContractManager;
    /**
     * Creates the contract manager for the network.
     */
    createContractManager(network: W3oNetwork, parent: W3oContext): W3oContractManager;
    /**
     * Returns the native system token. To be overridden by specific networks.
     */
    getSystemToken(): W3oToken;
    /**
     * Updates internal state. To be overridden by specific networks.
     */
    updateState(): Observable<void>;
    /**
     * Performs a read-only query via the chain support.
     */
    queryContract(params: {
        [key: string]: any;
    }): Observable<any>;
    /**
     * Validates if a given address is a valid account on the network.
     */
    validateAccount(address: string, parent: W3oContext): Observable<boolean>;
}
//# sourceMappingURL=W3oNetwork.d.ts.map