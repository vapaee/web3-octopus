import { W3oContractABI } from '../types';
export declare abstract class W3oContract {
    abstract getABI(): Promise<W3oContractABI>;
    abstract snapshot(): any;
}
