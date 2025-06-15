// w3o-ethereum/src/classes/EthereumAuthMetamask.ts

import {
    W3oContext,
    W3oContextFactory,
    W3oAuthSupportName,
    W3oInstance,
    W3oTransaction,
    W3oTransactionResponse,
    W3oAccount,
    W3oNetworkName,
    W3oAuthenticator,
    W3oError,
    W3oModule,
} from '@vapaee/w3o-core';
import { EthereumAuthSupport } from './EthereumAuthSupport';
import { Observable } from 'rxjs';
import { EthereumAccount } from './EthereumAccount';
import { BrowserProvider, JsonRpcSigner } from 'ethers';
import { EthereumError } from './EthereumError';

const logger = new W3oContextFactory('EthereumAuthMetamask');

export class EthereumTransactionResponse extends W3oTransactionResponse {
    constructor(hash: string) {
        super(hash);
    }

    wait(): Observable<any> {
        return new Observable<any>(observer => {
            observer.next({} as any);
            observer.complete();
        });
    }
}

export class EthereumAuthMetamask extends EthereumAuthSupport {
    constructor(parent: W3oContext) {
        const context = logger.method('constructor', parent);
        super('metamask' as W3oAuthSupportName, context);
    }

    override get w3oVersion(): string { return '1.0.0'; }
    override get w3oName(): string { return 'ethereum.auth.metamask'; }
    override get w3oRequire(): string[] { return []; }

    override isReadOnly(): boolean { return false; }

    override init(octopus: W3oInstance, requirements: W3oModule[], parent: W3oContext): void {
        const context = logger.method('init', { octopus, requirements }, parent);
        super.init(octopus, requirements, context);
        logger.info('EthereumAuthMetamask OK!', super.w3oId);
    }

    private getProvider(): BrowserProvider {
        if (typeof window !== 'undefined' && (window as any).ethereum) {
            return new BrowserProvider((window as any).ethereum);
        }
        throw new W3oError(EthereumError.PROVIDER_NOT_FOUND);
    }

    login(auth: W3oAuthenticator, networkName: W3oNetworkName, parent: W3oContext): Observable<W3oAccount> {
        return new Observable<W3oAccount>(observer => {
            const context = logger.method('login', { networkName }, parent);
            try {
                const provider = this.getProvider();
                provider.send('eth_requestAccounts', []).then(accounts => {
                    const address = accounts[0];
                    const account = new EthereumAccount(address, auth, context);
                    observer.next(account);
                    observer.complete();
                }).catch(err => {
                    context.error('login failed', err);
                    observer.error(err);
                });
            } catch (error) {
                context.error('login failed', error);
                observer.error(error);
            }
        });
    }

    autoLogin(auth: W3oAuthenticator, networkName: W3oNetworkName, parent: W3oContext): Observable<W3oAccount> {
        return this.login(auth, networkName, parent);
    }

    logout(auth: W3oAuthenticator, parent: W3oContext): void {
        logger.method('logout', { auth }, parent);
        // nothing to do for Metamask
    }

    signTransaction(auth: W3oAuthenticator, trx: W3oTransaction, parent: W3oContext): Observable<EthereumTransactionResponse> {
        const context = logger.method('signTransaction', { trx }, parent);
        void auth;
        return new Observable<EthereumTransactionResponse>(observer => {
            try {
                const provider = this.getProvider();
                provider.getSigner().then((signer: JsonRpcSigner) => {
                    signer.sendTransaction(trx as any).then(tx => {
                        observer.next(new EthereumTransactionResponse(tx.hash));
                        observer.complete();
                    }).catch(err => {
                        context.error('signTransaction failed', err);
                        observer.error(err);
                    });
                }).catch(err => {
                    context.error('getSigner failed', err);
                    observer.error(err);
                });
            } catch (error) {
                context.error('signTransaction failed', error);
                observer.error(error);
            }
        });
    }
}
