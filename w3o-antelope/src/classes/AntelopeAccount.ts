// w3o-antelope/src/classes/AntelopeAccount.ts

import { W3oContextFactory, W3oContext, W3oAccount, W3oAuthenticator } from '@vapaee/w3o-core';
import { Session } from '@wharfkit/session';

const logger = new W3oContextFactory('AntelopeAccount');

/**
 * Represents a user account for Antelope-based networks using a Wharfkit session.
 */
export class AntelopeAccount extends W3oAccount {

    /**
     * Constructs a new AntelopeAccount instance with address, session and authenticator.
     */
    constructor(
        address: string,
        session: Session,
        auth: W3oAuthenticator,
        parent: W3oContext,
    ) {
        const context = logger.method('constructor', { address, auth, session }, parent);
        super(address, auth as W3oAuthenticator, context);
    }

    /**
     * Returns a snapshot of the current account state.
     */
    snapshot(): any {
        return {
            ...super.snapshot(),
            _class: 'AntelopeAccount',
        };
    }
}
