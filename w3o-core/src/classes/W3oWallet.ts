import { W3oContextFactory, W3oContext } from './W3oContext';
import { W3oAddress, W3oInstance, W3oNetworkName, W3oTransaction, W3oWalletName } from '../types';
import { W3oModule } from './W3oModule';
import { W3oAuthenticator } from './W3oAuthenticator';
import { Observable } from 'rxjs';
import { W3oTransactionResponse } from './W3oTransactionResponse';
import { W3oAccount } from './W3oAccount';

const logger = new W3oContextFactory('W3oWallet');

/**
 * Represents a user account, including minimal data and a reference to its authenticator.
 */
export abstract class W3oWallet extends W3oModule {

    constructor(
        public readonly name: W3oWalletName,
        parent: W3oContext
    ) {
        const context = logger.method('constructor', parent);
        super(context);
    }

    override init(octopus: W3oInstance, requirements: W3oModule[], parent: W3oContext): void {
        const context = logger.method('init', { octopus, requirements }, parent);
        super.init(octopus, requirements, context);
    }

    /**
     * Abstract method to sign a transaction
     */
    abstract signTransaction(auth: W3oAuthenticator, trx: W3oTransaction, parent: W3oContext): Observable<W3oTransactionResponse>;

    /**
     * Abstract method to log in to a specific network
     */
    abstract login(auth: W3oAuthenticator, network: W3oNetworkName, parent: W3oContext): Observable<W3oAccount>;

    /**
     * Abstract method to automatically log in to a specific network
     */
    abstract autoLogin(auth: W3oAuthenticator, address: W3oAddress, network: W3oNetworkName, parent: W3oContext): Observable<W3oAccount>;

    /**
     * Abstract method to log out
     */
    abstract logout(auth: W3oAuthenticator, parent: W3oContext): void;

    /**
     * Abstract method to check if the authenticator is read-only
     */
    abstract isReadOnly(): boolean;
}
