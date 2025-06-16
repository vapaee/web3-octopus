import { W3oContractABI } from '../types';
import { W3oContext } from './W3oContext';
/**
 * Base class for blockchain contracts providing address, name, and ABI metadata
 */
export declare abstract class W3oContract {
    readonly address: string;
    readonly name: string;
    readonly abi: W3oContractABI;
    constructor(address: string, name: string, abi: W3oContractABI, parent: W3oContext);
    /**
     * Returns a snapshot of the contract's public metadata
     */
    snapshot(): any;
}
//# sourceMappingURL=W3oContract.d.ts.map