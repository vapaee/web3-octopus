// w3o-core/src/classes/W3oChainSupport.ts

import { Observable } from 'rxjs';
import {
    W3oNetworkName,
    W3oNetworkType,
    W3oAddress,
    W3oWalletName,
    W3oTokenData,
} from '../types';
import { W3oContextFactory, W3oContext } from './W3oContext';
import { W3oModule } from './W3oModule';
import { W3oAuthenticator } from './W3oAuthenticator';
import { W3oNetwork } from './W3oNetwork';
import { W3oContract } from './W3oContract';
import { W3oWallet } from './W3oWallet';
import { W3oToken } from './W3oToken';
import { W3oError } from './W3oError';

const logger = new W3oContextFactory('W3oChainSupport');

/**
 * Abstract class that represents a user authenticator
 */
export abstract class W3oChainSupport extends W3oModule {
    private __currentWallet!: W3oWallet;

    constructor(
        public readonly type: W3oNetworkType,
        public readonly wallets: W3oWallet[],
        parent: W3oContext,
    ) {
        const context = logger.method('constructor', { type }, parent);
        super(context);
        this.setCurentWallet(wallets[0], context);
    }

    get currentWallet(): W3oWallet {
        return this.__currentWallet;
    }

    /**
     * Retrieves wallet by name
     */
    getWalletByName(name: W3oWalletName, parent: W3oContext): W3oWallet | null {
        const context = logger.method('getWalletByName', { name }, parent);
        const wallet = this.wallets.find(w => w.name == name) || null;
        if (!wallet) {
            logger.warn('getWalletByName: wallet not found', { name }, context);
        }
        return wallet;
    }

    /**
     * Sets current wallet
     */
    setCurentWallet(wallet: W3oWallet, parent: W3oContext) {
        logger.method('setCurentWallet', {wallet}, parent);
        this.__currentWallet = wallet;
    }

    /**
     * Method to create an authenticator
     */
    createAuthenticator(network: W3oNetwork, walletName: W3oWalletName, parent: W3oContext): W3oAuthenticator {
        const context = logger.method('createAuthenticator', {network}, parent);
        const wallet = this.wallets.find(w => w.name == walletName);
        if (!wallet) {
            throw new W3oError(
                W3oError.WALLET_NOT_FOUND,
                { walletName, message: 'could not create authenticator' }
            );
        }
        return new W3oAuthenticator(this, network, wallet, context);
    }

    abstract createToken(data: W3oTokenData, parent: W3oContext): W3oToken;

    abstract queryContract(networkName: W3oNetworkName, params: { [key: string]: any }, parent: W3oContext): Observable<any>;

    abstract validateAccount(username: string, parent: W3oContext): Observable<boolean>;

    abstract fetchContract(address: W3oAddress, parent: W3oContext): Observable<W3oContract | null>;
}
