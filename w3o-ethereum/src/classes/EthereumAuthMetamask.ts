// w3o-ethereum/src/classes/EthereumAuthMetamask.ts

import {
    W3oContext,
    W3oContextFactory,
    W3oInstance,
    W3oTransaction,
    W3oTransactionResponse,
    W3oAccount,
    W3oNetworkName,
    W3oAuthenticator,
    W3oError,
    W3oModule,
    W3oContract,
} from '@vapaee/w3o-core';
import { EthereumAuthSupport } from './EthereumAuthSupport';
import { Observable } from 'rxjs';
import { EthereumAccount } from './EthereumAccount';
import { ethers } from 'ethers';
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
        super(context);
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

    private getProvider(): ethers.providers.Web3Provider {
        if (typeof window !== 'undefined' && (window as any).ethereum) {
            return new ethers.providers.Web3Provider((window as any).ethereum);
        }
        throw new W3oError(EthereumError.PROVIDER_NOT_FOUND);
    }

    private async ensureNetwork(provider: ethers.providers.Web3Provider, networkName: W3oNetworkName, parent: W3oContext): Promise<void> {
        const context = logger.method('ensureNetwork', { networkName }, parent);
        const settings = this.octopus.networks.getNetwork(networkName, context) as any;
        const chainIdHex = '0x' + parseInt(settings.settings.chainId, 10).toString(16);
        const currentChainId = await provider.send('eth_chainId', []);
        if (currentChainId === chainIdHex) return;
        try {
            await provider.send('wallet_switchEthereumChain', [{ chainId: chainIdHex }]);
        } catch (switchError: any) {
            if (switchError.code === 4902 || switchError?.data?.originalError?.code === 4902) {
                await provider.send('wallet_addEthereumChain', [{
                    chainId: chainIdHex,
                    chainName: settings.settings.displayName,
                    nativeCurrency: {
                        name: settings.settings.nativeCurrency ?? 'ETH',
                        symbol: settings.settings.symbol ?? 'ETH',
                        decimals: settings.settings.decimals ?? 18,
                    },
                    rpcUrls: [settings.settings.rpcUrl],
                    blockExplorerUrls: [settings.settings.links?.explorer || ''],
                }]);
                await provider.send('wallet_switchEthereumChain', [{ chainId: chainIdHex }]);
            } else {
                throw switchError;
            }
        }
    }

    login(auth: W3oAuthenticator, networkName: W3oNetworkName, parent: W3oContext): Observable<W3oAccount> {
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
                    }).catch(err => {
                        context.error('login failed', err);
                        observer.error(err);
                    });
                }).catch(err => {
                    context.error('network switch failed', err);
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
                this.ensureNetwork(provider, auth.network.name, context).then(() => {
                    provider.getSigner().then((signer: ethers.providers.JsonRpcSigner) => {
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
                }).catch(err => {
                    context.error('network switch failed', err);
                    observer.error(err);
                });
            } catch (error) {
                context.error('signTransaction failed', error);
                observer.error(error);
            }
        });
    }

    queryContract(networkName: W3oNetworkName, params: { [key: string]: any }, parent: W3oContext): Observable<any> {
        const context = logger.method('queryContract', { networkName, params }, parent);
        context.error('queryContract not implemented');
        return new Observable<any>();
    }

    validateAccount(username: string, parent: W3oContext): Observable<boolean> {
        const context = logger.method('validateAccount', { username }, parent);
        const isValid = ethers.utils.isAddress(username);
        return new Observable<boolean>(observer => { observer.next(isValid); observer.complete(); });
    }

    fetchContract(address: string, parent: W3oContext): Observable<W3oContract | null> {
        const context = logger.method('fetchContract', { address }, parent);
        context.error('fetchContract not implemented');
        return new Observable<W3oContract | null>();
    }
}
