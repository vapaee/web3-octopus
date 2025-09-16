// w3o-ethereum/src/classes/EthereumWalletMetamask.ts

import {
    W3oContextFactory,
    W3oContext,
    W3oAuthenticator,
    W3oNetworkName,
    W3oAccount,
    W3oInstance,
    W3oModule,
    W3oAddress,
} from '@vapaee/w3o-core';
import { EthereumWallet } from './EthereumWallet';
import { Observable } from 'rxjs';
import { EthereumAccount } from './EthereumAccount';

const logger = new W3oContextFactory('EthereumWalletMetamask');

/**
 * Represents a user account for Ethereum networks.
 */
export class EthereumWalletMetamask extends EthereumWallet {
    constructor(parent?: W3oContext) {
        const context = logger.method('constructor', parent);
        super('metamask', context);
    }

    override get w3oVersion(): string { return '1.1.0'; }
    override get w3oName(): string { return 'ethereum.wallet.metamask'; }
    override get w3oRequire(): string[] { return []; }

    override init(octopus: W3oInstance, requirements: W3oModule[], parent: W3oContext): void {
        const context = logger.method('init', { octopus, requirements }, parent);
        super.init(octopus, requirements, context);
        logger.info('EthereumWalletMetamask OK!', this.w3oId);
    }

    override login(auth: W3oAuthenticator, networkName: W3oNetworkName, parent: W3oContext): Observable<W3oAccount> {
        return new Observable<W3oAccount>(observer => {
            const context = logger.method('login', { networkName }, parent);
            try {
                const provider = this.getProvider();
                this.ensureNetwork(provider, networkName, context).then(() => {
                    provider.send('eth_requestAccounts', []).then(accounts => {
                        const address = accounts[0];
                        const account = new EthereumAccount(address, auth, context);
                        observer.next(account);
                        observer.complete();
                    }).catch((err: any) => {
                        context.error('login failed', err);
                        observer.error(err);
                    });
                }).catch((err: any) => {
                    context.error('network switch failed', err);
                    observer.error(err);
                });
            } catch (error: any) {
                context.error('login failed', error);
                observer.error(error);
            }
        });
    }

    override autoLogin(auth: W3oAuthenticator, address: W3oAddress, networkName: W3oNetworkName, parent: W3oContext): Observable<W3oAccount> {
        return this.login(auth, networkName, parent);
    }

    override logout(auth: W3oAuthenticator, parent: W3oContext): void {
        logger.method('logout', { auth }, parent);
        // nothing to do for Metamask
    }

    snapshot(): any {
        return {
            ...super.snapshot(),
            _class: 'EthereumWalletMetamask',
        };
    }
}
