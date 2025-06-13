// w3o-ethereum/src/classes/EthereumAuthSupport.ts

import { W3oAuthSupport, W3oAuthSupportName, W3oContextFactory, W3oContext, W3oModule } from '@vapaee/w3o-core';
import { W3oTransaction, W3oTransactionResponse, W3oAccount, W3oNetworkName } from '@vapaee/w3o-core';
import { Observable } from 'rxjs';

const logger = new W3oContextFactory('EthereumAuthSupport');

/**
 * Base class for implementing authentication support specific to Ethereum.
 */
export abstract class EthereumAuthSupport extends W3oAuthSupport {
    /**
     * Constructs an EthereumAuthSupport instance with the given support name and context.
     */
    constructor(
        name: W3oAuthSupportName,
        parent: W3oContext
    ) {
        const context = logger.method('constructor', { name }, parent);
        super(name, 'ethereum', context);
    }

    /**
     * Abstract method to check if the authenticator is read-only.
     */
    abstract isReadOnly(): boolean;

    /**
     * Abstract method to sign a transaction.
     */
    abstract signTransaction(auth: W3oAuthenticator, trx: W3oTransaction, parent: W3oContext): Observable<W3oTransactionResponse>;

    /**
     * Abstract method to log in to a specific network.
     */
    abstract login(auth: W3oAuthenticator, network: W3oNetworkName, parent: W3oContext): Observable<W3oAccount>;

    /**
     * Abstract method to automatically log in to a specific network.
     */
    abstract autoLogin(auth: W3oAuthenticator, network: W3oNetworkName, parent: W3oContext): Observable<W3oAccount>;

    /**
     * Abstract method to log out.
     */
    abstract logout(auth: W3oAuthenticator, parent: W3oContext): void;
}
