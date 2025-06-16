// w3o-core/src/classes/W3oContractManager.ts
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { W3oContextFactory } from './W3oContext';
const logger = new W3oContextFactory('W3oContractManager');
/**
 * Abstract manager for contracts, handles retrieval and caching of contract instances
 */
export class W3oContractManager {
    constructor(settings, network, parent) {
        this.settings = settings;
        this.network = network;
        this.__contracts = {};
        logger.method('constructor', { network }, parent);
    }
    /**
     * Returns a list of all cached contract instances (excluding nulls)
     */
    get list() {
        return Object.values(this.__contracts).filter(contract => contract !== null);
    }
    /**
     * Returns a list of all contract addresses stored in the cache
     */
    get addresses() {
        return Object.keys(this.__contracts).map(address => address);
    }
    /**
     * Adds a contract to the cache
     */
    addContract(address, contract, parent) {
        logger.method('addContract', { address, contract }, parent);
        if (contract) {
            this.__contracts[address] = contract;
            logger.info(`Contract added at address: ${address}`);
        }
        else {
            logger.warn(`No contract provided for address: ${address}`);
        }
    }
    /**
     * Retrieves a contract by address from cache or fetches it from blockchain
     */
    getContract(address, parent) {
        const context = logger.method('getContract', { address }, parent);
        const contract = this.__contracts[address];
        if (contract !== undefined) {
            return from(Promise.resolve(contract));
        }
        return this.fetchContract(address, context).pipe(mergeMap((fetchedContract) => {
            if (fetchedContract) {
                this.addContract(address, fetchedContract, context);
            }
            else {
                this.__contracts[address] = null;
            }
            return from(Promise.resolve(fetchedContract));
        }));
    }
    /**
     * Returns the current list of cached contract instances
     */
    getContracts(parent) {
        logger.method('getContracts', parent);
        return this.list;
    }
    /**
     * Gets a token contract from network tokens, fetching it if needed
     */
    getTokenContract(symbol, parent) {
        const context = logger.method('getTokenContract', { symbol }, parent);
        const token = this.network.getToken(symbol, parent);
        if (!token) {
            logger.warn(`No token found with symbol: ${symbol}`, parent);
            return from(Promise.resolve(null));
        }
        const existingContract = this.list.find(contract => contract.address === token.address) || null;
        if (existingContract) {
            logger.info(`Token contract found with symbol: ${symbol}`, parent);
            return from(Promise.resolve(existingContract));
        }
        return this.fetchContract(token.address, context).pipe(mergeMap((fetchedContract) => {
            if (fetchedContract) {
                this.addContract(token.address, fetchedContract, context);
            }
            return from(Promise.resolve(fetchedContract));
        }));
    }
    /**
     * Abstract method to fetch a contract from blockchain by its address
     */
    fetchContract(address, parent) {
        return this.network.support.fetchContract(address, parent);
    }
    /**
     * Returns a snapshot of all contracts currently cached
     */
    snapshot() {
        return {
            contracts: this.list.map(contract => contract.snapshot()),
        };
    }
}
