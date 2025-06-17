import { W3oContextFactory, W3oContext } from './W3oContext';
import { W3oAuthenticator } from './W3oAuthenticator';

const logger = new W3oContextFactory('W3oAccount');

/**
 * Represents a user account, including minimal data and a reference to its authenticator.
 */
export abstract class W3oAccount {

    constructor(
        public readonly address: string,
        public readonly authenticator: W3oAuthenticator,
        parent: W3oContext
    ) {
        logger.method('constructor', { authenticator }, parent);

        this.authenticator.onSessionChange$.subscribe((id) => {
            logger.log('session change detected', { id });
        });
    }

    /**
     * Abstract method to take a snapshot of the account state.
     */
    abstract snapshot(): any;
}
