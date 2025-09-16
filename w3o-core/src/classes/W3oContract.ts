// w3o-core/src/classes/W3oContract.ts

import {
    W3oContractABI
} from '../types';
import { W3oContextFactory, W3oContext } from './W3oContext';

const logger = new W3oContextFactory('W3oContract');

/**
 * Base class for blockchain contracts providing address, name, and ABI metadata
 */
export class W3oContract {

    constructor(
        public readonly address: string,
        public readonly name: string,
        public readonly abi: W3oContractABI,
        parent: W3oContext
    ) {
        logger.method('constructor', { address, name, abi }, parent);
    }

    /**
     * Returns a snapshot of the contract's public metadata
     */
    snapshot(): any {
        return {
            address: this.address,
            name: this.name,
            abi: this.abi,
        };
    }
}
