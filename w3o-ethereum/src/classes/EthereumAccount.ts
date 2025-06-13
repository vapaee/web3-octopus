// w3o-ethereum/src/classes/EthereumAccount.ts

import { W3oAccount, W3oAuthenticator, W3oContextFactory, W3oContext } from '@vapaee/w3o-core';
import { Signer } from 'ethers';

const logger = new W3oContextFactory('EthereumAccount');

/**
 * Represents a user account on Ethereum networks, holding an ethers.js Signer.
 */
export class EthereumAccount extends W3oAccount {
    // Internal signer for the account
    private readonly __signer: Signer;

    /**
     * Constructs a new EthereumAccount.
     * @param address The account address.
     * @param signer An ethers.js Signer instance.
     * @param auth The authenticator that created this account.
     * @param parent The context.
     */
    constructor(
        address: string,
        signer: Signer,
        auth: W3oAuthenticator,
        parent: W3oContext
    ) {
        const context = logger.method('constructor', { address, auth, signer }, parent);
        super(address, auth, context);
        this.__signer = signer;
    }

    /**
     * Returns the underlying ethers.js Signer.
     */
    get signer(): Signer {
        return this.__signer;
    }

    /**
     * Returns a snapshot of the current account state (only address).
     */
    snapshot(): any {
        return {
            address: this.getAddress(),
            _class: 'EthereumAccount',
        };
    }
}
