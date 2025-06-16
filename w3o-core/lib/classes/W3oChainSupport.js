// w3o-core/src/classes/W3oAuthManager.ts
import { W3oContextFactory } from './W3oContext';
import { W3oModule } from './W3oModule';
import { W3oAuthenticator } from './W3oAuthenticator';
const logger = new W3oContextFactory('W3oChainSupport');
/**
 * Abstract class that represents a user authenticator
 */
export class W3oChainSupport extends W3oModule {
    constructor(type, parent) {
        const context = logger.method('constructor', { type }, parent);
        super(context);
        this.type = type;
    }
    /**
     * Method to create an authenticator
     */
    createAuthenticator(network, parent) {
        const context = logger.method('createAuthenticator', { network }, parent);
        return new W3oAuthenticator(this, network, context);
    }
}
