import { Observable } from 'rxjs';
import { W3oAddress, W3oNetworkSettings } from '../types';
import { W3oContext } from './W3oContext';
import { W3oContract } from './W3oContract';
import { W3oNetwork } from './W3oNetwork';
/**
 * Abstract manager for contracts, handles retrieval and caching of contract instances
 */
export declare class W3oContractManager {
    readonly settings: W3oNetworkSettings;
    readonly network: W3oNetwork;
    private __contracts;
    constructor(settings: W3oNetworkSettings, network: W3oNetwork, parent: W3oContext);
    /**
     * Returns a list of all cached contract instances (excluding nulls)
     */
    get list(): W3oContract[];
    /**
     * Returns a list of all contract addresses stored in the cache
     */
    get addresses(): W3oAddress[];
    /**
     * Adds a contract to the cache
     */
    addContract(address: W3oAddress, contract: W3oContract | null, parent: W3oContext): void;
    /**
     * Retrieves a contract by address from cache or fetches it from blockchain
     */
    getContract(address: W3oAddress, parent: W3oContext): Observable<W3oContract | null>;
    /**
     * Returns the current list of cached contract instances
     */
    getContracts(parent: W3oContext): W3oContract[];
    /**
     * Gets a token contract from network tokens, fetching it if needed
     */
    getTokenContract(symbol: string, parent: W3oContext): Observable<W3oContract | null>;
    /**
     * Abstract method to fetch a contract from blockchain by its address
     */
    fetchContract(address: W3oAddress, parent: W3oContext): Observable<W3oContract | null>;
    /**
     * Returns a snapshot of all contracts currently cached
     */
    snapshot(): any;
}
//# sourceMappingURL=W3oContractManager.d.ts.map