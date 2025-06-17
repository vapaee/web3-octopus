// w3o-core/src/classes/W3oChainSupport.ts

import { Observable } from 'rxjs';
import {
    W3oNetworkName,
    W3oNetworkType,
    W3oTransaction,
    W3oAddress,
} from '../types';
import { W3oContextFactory, W3oContext } from './W3oContext';
import { W3oModule } from './W3oModule';
import { W3oAuthenticator } from './W3oAuthenticator';
import { W3oTransactionResponse } from './W3oTransactionResponse';
import { W3oAccount } from './W3oAccount';
import { W3oNetwork } from './W3oNetwork';
import { W3oContract } from './W3oContract';

const logger = new W3oContextFactory('W3oChainSupport');

/**
 * Abstract class that represents a user authenticator
 */
export abstract class W3oChainSupport extends W3oModule {
    constructor(
        public readonly type: W3oNetworkType,
        parent: W3oContext,
    ) {
        const context = logger.method('constructor', { type }, parent);
        super(context);
    }

    /**
     * Method to create an authenticator
     */
    createAuthenticator(network: W3oNetwork, parent: W3oContext): W3oAuthenticator {
        const context = logger.method('createAuthenticator', {network}, parent);
        return new W3oAuthenticator(this, network, context);
    }

    /**
     * Abstract method to check if the authenticator is read-only
     */
    abstract isReadOnly(): boolean;

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
    abstract autoLogin(auth: W3oAuthenticator, network: W3oNetworkName, parent: W3oContext): Observable<W3oAccount>;

    /**
     * Abstract method to log out
     */
    abstract logout(auth: W3oAuthenticator, parent: W3oContext): void;

    /** Additional chain specific methods */
    abstract queryContract(networkName: W3oNetworkName, params: { [key: string]: any }, parent: W3oContext): Observable<any>;

    abstract validateAccount(username: string, parent: W3oContext): Observable<boolean>;

    abstract fetchContract(address: W3oAddress, parent: W3oContext): Observable<W3oContract | null>;
}
