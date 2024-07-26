// w3o-core/src/classes/W3oContractManager.ts

import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import {
    Logger,
    LoggerContext,
    W3oContract,
    W3oNetwork,
} from '.';

import {
    W3oAddress
} from '../types';

const logger = new Logger('W3oContractManager');

// Represents a contract manager, including methods to add, get, and list contracts
export abstract class W3oContractManager {
    // This is a contract cache that will fill as they are requested
    private __contracts: { [address: string]: W3oContract | null } = {};

    constructor(
        public readonly network: W3oNetwork,
        parent: LoggerContext
    ) {
        logger.method('constructor', {network}, parent);
    }

    // Property to get the list of contracts
    get list(): W3oContract[] {
        // Debemos filtrar los valores null para que la lista solo contenga contratos válidos
        return Object.values(this.__contracts).filter(contract => contract !== null) as W3oContract[];
    }

    // Property to get the list of contract addresses
    get addresses(): W3oAddress[] {
        return Object.keys(this.__contracts).map(address => address as W3oAddress);
    }

    // Method to add a contract
    addContract(address: W3oAddress, contract: W3oContract | null, parent: LoggerContext): void {
        const context = logger.method('addContract', { address, contract }, parent);
        if (contract) {
            this.__contracts[address] = contract;
            context.info(`Contract added at address: ${address}`, parent);
        } else {
            context.warn(`No contract provided for address: ${address}`, parent);
        }
    }

    // Method to get a contract by its address
    getContract(address: W3oAddress, parent: LoggerContext): Observable<W3oContract | null> {
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

    // Method to get all contracts
    getContracts(parent: LoggerContext): W3oContract[] {
        logger.method('getContracts', undefined, parent);
        return this.list;
    }

    // Method to get a token contract by its symbol
    getTokenContract(symbol: string, parent: LoggerContext): Observable<W3oContract | null> {
        const context = logger.method('getTokenContract', { symbol }, parent);
        const token = this.network.getToken(symbol, parent);
        if (!token) {
            context.warn(`No token found with symbol: ${symbol}`, parent);
            return from(Promise.resolve(null));
        }
        const existingContract = this.list.find(contract => contract.address === token.address) || null;
        if (existingContract) {
            context.info(`Token contract found with symbol: ${symbol}`, parent);
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

    // Abstract method to request a contract from the blockchain by its address (it may not exist)
    abstract fetchContract(address: W3oAddress, parent: LoggerContext): Observable<W3oContract | null>;

    // Method to take a snapshot of the contract manager state
    snapshot(): any {
        return {
            contracts: this.list.map(contract => contract.snapshot()),
        };
    }
}

