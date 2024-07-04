import { W3oContract } from '.';
import { W3oAddress } from '../types';
export declare class W3oContractManager {
    addContract(address: W3oAddress, contract: W3oContract | null): void;
    getContract(address: W3oAddress): Promise<W3oContract | null>;
    getContracts(): W3oContract[];
    getTokenContract(symbol: string): Promise<W3oContract | null>;
    snapshot(): any;
}
