// w3o-core/src/classes/W3oContractManager.ts

import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import {
    W3oAddress,
    W3oNetworkSettings,
} from '../types';
import { W3oContextFactory, W3oContext } from './W3oContext';
import { W3oContract } from './W3oContract';
import { W3oNetwork } from './W3oNetwork';

const logger = new W3oContextFactory('W3oContractManager');

/**
 * Abstract manager for contracts, handles retrieval and caching of contract instances
 */
export abstract class W3oContractManager {
    private __contracts: { [address: string]: W3oContract | null } = {};

    constructor(
        public readonly settings: W3oNetworkSettings,
        public readonly network: W3oNetwork,
        parent: W3oContext
    ) {
        logger.method('constructor', { network }, parent);
    }

    /**
     * Returns a list of all cached contract instances (excluding nulls)
     */
    get list(): W3oContract[] {
        return Object.values(this.__contracts).filter(contract => contract !== null) as W3oContract[];
    }

    /**
     * Returns a list of all contract addresses stored in the cache
     */
    get addresses(): W3oAddress[] {
        return Object.keys(this.__contracts).map(address => address as W3oAddress);
    }

    /**
     * Adds a contract to the cache
     */
    addContract(address: W3oAddress, contract: W3oContract | null, parent: W3oContext): void {
        logger.method('addContract', { address, contract }, parent);
        if (contract) {
            this.__contracts[address] = contract;
            logger.info(`Contract added at address: ${address}`);
        } else {
            logger.warn(`No contract provided for address: ${address}`);
        }
    }

    /**
     * Retrieves a contract by address from cache or fetches it from blockchain
     */
    getContract(address: W3oAddress, parent: W3oContext): Observable<W3oContract | null> {
        const context = logger.method('getContract', { address }, parent);
        const contract = this.__contracts[address];
        if (contract !== undefined) {
            return from(Promise.resolve(contract));
        }
        return this.fetchContract(address, context).pipe(
            mergeMap(fetchedContract => {
                if (fetchedContract) {
                    this.addContract(address, fetchedContract, context);
                } else {
                    this.__contracts[address] = null;
                }
                return from(Promise.resolve(fetchedContract));
            })
        );
    }

    /**
     * Returns the current list of cached contract instances
     */
    getContracts(parent: W3oContext): W3oContract[] {
        logger.method('getContracts', parent);
        return this.list;
    }

    /**
     * Gets a token contract from network tokens, fetching it if needed
     */
    getTokenContract(symbol: string, parent: W3oContext): Observable<W3oContract | null> {
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
        return this.fetchContract(token.address as W3oAddress, context).pipe(
            mergeMap(fetchedContract => {
                if (fetchedContract) {
                    this.addContract(token.address as W3oAddress, fetchedContract, context);
                }
                return from(Promise.resolve(fetchedContract));
            })
        );
    }

    /**
     * Abstract method to fetch a contract from blockchain by its address
     */
    abstract fetchContract(address: W3oAddress, parent: W3oContext): Observable<W3oContract | null>;

    /**
     * Returns a snapshot of all contracts currently cached
     */
    snapshot(): any {
        return {
            contracts: this.list.map(contract => contract.snapshot()),
        };
    }
}

