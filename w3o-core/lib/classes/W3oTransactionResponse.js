// w3o-core/src/classes/W3oTransactionResponse.ts
/**
 * Represents a transaction response, including its hash and a method to await the receipt
 */
export class W3oTransactionResponse {
    constructor(hash) {
        this.hash = hash;
    }
}
