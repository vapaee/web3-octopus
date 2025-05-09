// w3o-core/src/classes/W3oTransactionResponse.ts

import { Observable } from 'rxjs';
import { W3oTransactionReceipt } from '../types';

/**
 * Represents a transaction response, including its hash and a method to await the receipt
 */
export abstract class W3oTransactionResponse {

    constructor(public hash: string) {}

    /**
     * Abstract method that returns an observable which emits the transaction receipt when available
     */
    abstract wait(): Observable<W3oTransactionReceipt>;
}
