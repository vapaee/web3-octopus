// w3o-ethereum/src/classes/EthereumAccount.ts

import { W3oContextFactory, W3oContext, W3oAccount, W3oAuthenticator } from '@vapaee/w3o-core';

const logger = new W3oContextFactory('EthereumAccount');

/**
 * Represents a user account for Ethereum networks.
 */
export class EthereumAccount extends W3oAccount {
    constructor(address: string, auth: W3oAuthenticator, parent: W3oContext) {
        const context = logger.method('constructor', { address, auth }, parent);
        super(address, auth, context);
    }

    snapshot(): any {
        return {
            address: this.getAddress(),
            _class: 'EthereumAccount',
        };
    }
}
