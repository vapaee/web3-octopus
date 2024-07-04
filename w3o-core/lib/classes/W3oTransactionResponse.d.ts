import { W3oTransactionReceipt } from '../types';
export declare abstract class W3oTransactionResponse {
    hash: string;
    constructor(hash: string);
    abstract wait(): Promise<W3oTransactionReceipt>;
}
