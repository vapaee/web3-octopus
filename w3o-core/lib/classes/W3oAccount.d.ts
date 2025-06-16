import { W3oContext } from './W3oContext';
import { W3oAuthenticator } from './W3oAuthenticator';
/**
 * Represents a user account, including minimal data and a reference to its authenticator.
 */
export declare abstract class W3oAccount {
    private readonly __address;
    private readonly __authenticator;
    constructor(address: string, authenticator: W3oAuthenticator, parent: W3oContext);
    /**
     * Returns the account address.
     */
    get address(): string;
    /**
     * Returns the authenticator associated with this account.
     */
    get authenticator(): W3oAuthenticator;
    /**
     * Returns the account address (legacy method, use the getter instead).
     */
    getAddress(): string;
    /**
     * Abstract method to take a snapshot of the account state.
     */
    abstract snapshot(): any;
}
//# sourceMappingURL=W3oAccount.d.ts.map