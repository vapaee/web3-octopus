import { W3oContextFactory } from './W3oContext';
const logger = new W3oContextFactory('W3oAccount');
/**
 * Represents a user account, including minimal data and a reference to its authenticator.
 */
export class W3oAccount {
    constructor(address, authenticator, parent) {
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
    get address() {
        return this.__address;
    }
    /**
     * Returns the authenticator associated with this account.
     */
    get authenticator() {
        return this.__authenticator;
    }
    /**
     * Returns the account address (legacy method, use the getter instead).
     */
    getAddress() {
        return this.__address;
    }
}
