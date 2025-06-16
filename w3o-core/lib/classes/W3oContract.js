// w3o-core/src/classes/W3oContract.ts
import { W3oContextFactory } from './W3oContext';
const logger = new W3oContextFactory('W3oContract');
/**
 * Base class for blockchain contracts providing address, name, and ABI metadata
 */
export class W3oContract {
    constructor(address, name, abi, parent) {
        this.address = address;
        this.name = name;
        this.abi = abi;
        logger.method('constructor', { address, name, abi }, parent);
    }
    /**
     * Returns a snapshot of the contract's public metadata
     */
    snapshot() {
        return {
            address: this.address,
            name: this.name,
            abi: this.abi,
        };
    }
}
