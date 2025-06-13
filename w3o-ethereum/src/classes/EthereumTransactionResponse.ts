// w3o-ethereum/src/classes/EthereumTransactionResponse.ts

import { Observable } from 'rxjs';
import { providers } from 'ethers';
import { W3oTransactionReceipt } from '../types';

/**
 * Represents a transaction response on Ethereum, wrapping ethers.js transaction response
 * and providing a method to wait for the receipt.
 */
export class EthereumTransactionResponse {
    /**
     * The hash of the transaction.
     */
    public readonly hash: string;

    private readonly provider: providers.Provider;
    private readonly txPromise: Promise<providers.TransactionResponse>;

    /**
     * Constructs a new EthereumTransactionResponse.
     * @param txPromise - A promise that resolves to an ethers TransactionResponse.
     * @param provider - The ethers provider to use for waiting for the receipt.
     */
    constructor(
        txPromise: Promise<providers.TransactionResponse>,
        provider: providers.Provider
    ) {
        this.txPromise = txPromise;
        this.provider = provider;
        // Initialize hash as empty; will be overwritten once txPromise resolves.
        this.hash = '';
        this.txPromise.then(tx => {
            // @ts-ignore
            this.hash = tx.hash;
        }).catch(() => {
            // In case of error, hash remains empty string
        });
    }

    /**
     * Returns an observable that emits the transaction receipt once available.
     */
    wait(): Observable<W3oTransactionReceipt> {
        return new Observable<W3oTransactionReceipt>(subscriber => {
            this.txPromise
                .then(tx => {
                    return this.provider.waitForTransaction(tx.hash);
                })
                .then(receipt => {
                    subscriber.next(receipt as W3oTransactionReceipt);
                    subscriber.complete();
                })
                .catch(error => {
                    subscriber.error(error);
                });
        });
    }
}
