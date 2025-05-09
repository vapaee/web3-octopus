import { W3oContextFactory, W3oContext } from './W3oContext';
import { W3oAuthenticator } from './W3oAuthenticator';

const logger = new W3oContextFactory('W3oAccount');

/**
 * Represents a user account, including minimal data and a reference to its authenticator.
 */
export abstract class W3oAccount {
    // Internal address value for the account
    private readonly __address: string;

    // Reference to the authenticator that created this account
    private readonly __authenticator: W3oAuthenticator;

    constructor(
        address: string,
        authenticator: W3oAuthenticator,
        parent: W3oContext
    ) {
        logger.method('constructor', { authenticator }, parent);
        this.__address = address;
        this.__authenticator = authenticator;

        this.__authenticator.onSessionChange$.subscribe((id) => {
            logger.log('session change detected', { id });
        });
    }

    /**
     * Returns the account address.
     */
    get address(): string {
        return this.__address;
    }

    /**
     * Returns the authenticator associated with this account.
     */
    get authenticator(): W3oAuthenticator {
        return this.__authenticator;
    }

    /**
     * Returns the account address (legacy method, use the getter instead).
     */
    getAddress(): string {
        return this.__address;
    }

    /**
     * Abstract method to take a snapshot of the account state.
     */
    abstract snapshot(): any;
}
