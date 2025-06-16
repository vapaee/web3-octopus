// w3o-antelope/src/classes/AntelopeAccount.ts
import { W3oContextFactory, W3oAccount } from '@vapaee/w3o-core';
const logger = new W3oContextFactory('AntelopeAccount');
/**
 * Represents a user account for Antelope-based networks using a Wharfkit session.
 */
export class AntelopeAccount extends W3oAccount {
    /**
     * Constructs a new AntelopeAccount instance with address, session and authenticator.
     */
    constructor(address, session, auth, parent) {
        const context = logger.method('constructor', { address, auth, session }, parent);
        super(address, auth, context);
    }
    /**
     * Returns a snapshot of the current account state.
     */
    snapshot() {
        return {
            address: this.getAddress(),
            _class: 'AntelopeAccount',
        };
    }
}
