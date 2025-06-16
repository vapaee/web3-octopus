import { Observable } from 'rxjs';
import { W3oTransactionReceipt } from '../types';
/**
 * Represents a transaction response, including its hash and a method to await the receipt
 */
export declare abstract class W3oTransactionResponse {
    hash: string;
    constructor(hash: string);
    /**
     * Abstract method that returns an observable which emits the transaction receipt when available
     */
    abstract wait(): Observable<W3oTransactionReceipt>;
}
//# sourceMappingURL=W3oTransactionResponse.d.ts.map