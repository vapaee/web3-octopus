// w3o-ethereum/src/classes/EthereumWalletMetakeep.ts
/*
import {
    W3oContextFactory,
    W3oContext,
    W3oAuthenticator,
    W3oNetwork,
    W3oNetworkName,
    W3oAccount,
    W3oInstance,
    W3oModule,
    W3oAddress,
} from '@vapaee/w3o-core';
import { EthereumWallet } from './EthereumWallet';
import { from, map, Observable, of, switchMap, tap } from 'rxjs';
import { ethers } from 'ethers';
import { MetaKeep } from 'metakeep';
import { metakeepCache } from '../utils/MetakeepCache';
import { EthereumAccount } from './EthereumAccount';
import { EthereumError } from './EthereumError';

const logger = new W3oContextFactory('EthereumWalletMetakeep');

export interface MetakeepOptions {
    appId: string;
    appName: string;
    reasonCallback?: (transaction: never) => string;
}

export class EthereumWalletMetakeep extends EthereumWallet {

    private __metakeep: MetaKeep | null = null;
    private __web3Provider: ethers.providers.Web3Provider | null = null;
    private __email: string = '';
    private __address: string = '';
    private __appId: string = '';

    constructor(options: MetakeepOptions, parent?: W3oContext) {
        const context = logger.method('constructor', parent);
        super('metakeep', context);
        this.__appId = options.appId;
    }

    override get w3oVersion(): string { return '0.9.0'; }
    override get w3oName(): string { return 'ethereum.wallet.metakeep'; }
    override get w3oRequire(): string[] { return []; }

    setEmail(email: string, parent?: W3oContext): void {
        logger.method('setEmail', { email }, parent);
        if (this.__email !== '') {
            throw new EthereumError(
                EthereumError.METAKEEP_ALREADY_IN_USE,
                {
                    value: `currently using ${this.__email} when trying to log in with ${email}`,
                    message: 'You need to logout the current session in order to login again using Metakeep Wallet'
                }
            )
        }
        this.__email = email;
        metakeepCache.setLogged(email);
    }

    setAppId(appid: string, parent?: W3oContext) {
        logger.method('setEmail', { appid }, parent);
        this.__appId = appid;
    }
    
    private assertMetakeepSDKReady(auth: W3oAuthenticator, networkName: W3oNetworkName, parent: W3oContext): Observable<void> {
        const context = logger.method('assertMetakeepSDKReady', { auth, networkName }, parent);
        const network: W3oNetwork = this.octopus.networks.getNetwork(networkName, context);
        return new Observable<void>(observer => {
            if (!this.__metakeep) {
                const url = network.settings.rpcUrl;
                context.log('get rpcURL', { url });

                const chainId: number = parseInt(network.settings.chainId);

                if (this.__appId === '') {
                    throw new EthereumError(EthereumError.METAKEEP_APPID_NOT_SET)
                }

                const rpcNodeUrls = {
                    [chainId]: url,
                };

                this.__metakeep = new MetaKeep({
                    // App id to configure UI
                    appId: this.__appId,
                    // Default chain to use
                    chainId,
                    // RPC node urls map
                    rpcNodeUrls,
                    // Signed in user's email address
                    user: {
                        email: this.__email,
                    },
                });

                this.__metakeep.ethereum.then((provider) => {
                    if (!provider) {
                        throw new EthereumError(EthereumError.PROVIDER_NOT_FOUND);
                    }                    
                    return provider.enable().then(() => {
                        this.__web3Provider = new ethers.providers.Web3Provider(provider as ethers.providers.ExternalProvider);
                    });
                });
            } else {
                observer.next();
                observer.complete();
            }
        });
    }
    
    // W3oModule overrides ----------------------------------

    override init(octopus: W3oInstance, requirements: W3oModule[], parent: W3oContext): void {
        const context = logger.method('init', { octopus, requirements }, parent);
        super.init(octopus, requirements, context);
        logger.info('EthereumWalletMetakeep OK!', this.w3oId);
    }
    // EthereumWallet API overrides --------------------------

    override login(auth: W3oAuthenticator, networkName: W3oNetworkName, parent: W3oContext): Observable<EthereumAccount> {
        const context = logger.method('login', { auth, networkName }, parent);

        return this.assertMetakeepSDKReady(auth, networkName, context).pipe(
            tap(() => {
                if (!this.__web3Provider) {
                    throw new EthereumError(EthereumError.PROVIDER_NOT_FOUND);
                }
            }),
            switchMap(() => {
                // First try to get address from cache
                this.__address = metakeepCache.getEthAddress(this.__email);
                if (this.__address) {
                    const account = new EthereumAccount(this.__address, auth, context);
                    metakeepCache.setLogged(this.__email);
                    return of(account);
                } else {
                    // If no cache, ask provider
                    return from(this.__web3Provider!.getSigner().getAddress()).pipe(
                        switchMap(address => {
                            this.__address = address;
                            const account = new EthereumAccount(this.__address, auth, context);
                            metakeepCache.setLogged(this.__email);
                            return from(this.__metakeep!.getWallet() ?? Promise.resolve(null)).pipe(
                                tap(credentials => {
                                    if (credentials) {
                                        metakeepCache.addCredentials(this.__email, credentials.wallet);
                                    }
                                }),
                                map(() => account)
                            );
                        })
                    );
                }
            })
        );
    }

    override autoLogin(auth: W3oAuthenticator, address: W3oAddress, networkName: W3oNetworkName, parent: W3oContext): Observable<W3oAccount> {
        const context = logger.method('autoLogin', { auth, networkName }, parent);
        const email = metakeepCache.getLogged();
        if (email) {
            this.setEmail(email, context);
            return this.login(auth, networkName, context);
        } else {
            context.log('Not email found for autoLogin');
            // Return an observable that never emits any value
            return new Observable<W3oAccount>(observer => {
                observer.complete();
            });
        }      
    }

    override logout(auth: W3oAuthenticator, parent: W3oContext): void {
        logger.method('logout', { auth }, parent);
        this.__email = '';
        this.__metakeep = null;
        this.__web3Provider = null;
        metakeepCache.setLogged('');
    }

    snapshot(): any {
        return {
            ...super.snapshot(),
            _class: 'EthereumWalletMetakeep',
        };
    }
}
*/