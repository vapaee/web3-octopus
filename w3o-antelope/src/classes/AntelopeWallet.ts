// w3o-ethereum/src/classes/AntelopeWallet.ts

import {
    W3oContextFactory,
    W3oContext,
    W3oWallet,
    W3oWalletName,
    W3oNetworkName,
} from '@vapaee/w3o-core';
import { AntelopeError } from './AntelopeError';

const logger = new W3oContextFactory('AntelopeWallet');

/**
 * Represents a user account for Ethereum networks.
 */
export abstract class AntelopeWallet extends W3oWallet {
    constructor(
        name: W3oWalletName,
        parent: W3oContext
    ) {
        const context = logger.method('constructor', parent);
        super(name, context);
    }

    override isReadOnly(): boolean { return false; }

    snapshot(): any {
        return {
            ...super.snapshot(),
            _class: 'AntelopeWallet',
        };
    }
}
