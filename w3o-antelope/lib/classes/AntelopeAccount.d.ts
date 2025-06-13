import { W3oContext, W3oAccount, W3oAuthenticator } from '@vapaee/w3o-core';
import { Session } from '@wharfkit/session';
/**
 * Represents a user account for Antelope-based networks using a Wharfkit session.
 */
export declare class AntelopeAccount extends W3oAccount {
    /**
     * Constructs a new AntelopeAccount instance with address, session and authenticator.
     */
    constructor(address: string, session: Session, auth: W3oAuthenticator, parent: W3oContext);
    /**
     * Returns a snapshot of the current account state.
     */
    snapshot(): any;
}
//# sourceMappingURL=AntelopeAccount.d.ts.map