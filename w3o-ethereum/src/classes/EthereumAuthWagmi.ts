// w3o-ethereum/src/classes/EthereumAuthWagmi.ts

import {
    W3oContext,
    W3oContextFactory,
    W3oAuthenticator,
    W3oAuthSupportName,
    W3oAccount,
    W3oError,
    W3oNetworkName
} from '@vapaee/w3o-core';
import { Observable, BehaviorSubject } from 'rxjs';
import { EthereumAccount } from './EthereumAccount';
import { EthereumTransactionResponse } from './EthereumTransactionResponse';
import { ethers, Signer } from 'ethers';
import { InjectedConnector } from '@wagmi/core/connectors/injected';
import { createClient, configureChains } from '@wagmi/core';
import { mainnet, goerli } from '@wagmi/core/chains';
import { Connector } from '@wagmi/core';

/**
 * Authentication support for Ethereum networks using wagmi (InjectedConnector).
 */
export class EthereumAuthWagmi extends (await import('./EthereumAuthSupport')).EthereumAuthSupport {
    private wagmiClient: ReturnType<typeof createClient>;
    private connector: Connector;
    private __signer: Signer | null = null;

    constructor(parent: W3oContext) {
        const context = logger.method('constructor', parent);
        super('wagmi' as W3oAuthSupportName, context);

        // Configure wagmi client with mainnet and goerli chains
        const { provider, webSocketProvider } = configureChains(
            [mainnet, goerli],
            [
                new ethers.providers.InfuraProvider(mainnet.id, { infura: 'YOUR_INFURA_ID' }),
                new ethers.providers.InfuraProvider(goerli.id, { infura: 'YOUR_INFURA_ID' })
            ]
        );

        this.wagmiClient = createClient({
            autoConnect: true,
            connectors: [
                new InjectedConnector({ chains: [mainnet, goerli] })
            ],
            provider,
            webSocketProvider
        });

        // The injected connector (MetaMask)
        this.connector = new InjectedConnector({ chains: [mainnet, goerli] });
    }

    override get w3oVersion(): string {
        return '1.0.0';
    }

    override get w3oName(): string {
        return 'ethereum.auth.wagmi';
    }

    override get w3oRequire(): string[] {
        return [];
    }

    /**
     * Indicates that this authenticator is not read-only.
     */
    override isReadOnly(): boolean {
        return false;
    }

    /**
     * Internal helper to handle login/autoLogin flows.
     */
    private authenticate(
        auth: W3oAuthenticator,
        networkName: W3oNetworkName,
        parent: W3oContext,
        action: 'login' | 'autoLogin'
    ): Observable<W3oAccount> {
        return new Observable<W3oAccount>(observer => {
            const context = logger.method(action, { auth, networkName }, parent);
            try {
                // Connect the injected connector (MetaMask)
                this.connector.connect().then(async () => {
                    // Get the provider from wagmi client
                    const wagmiProvider = this.wagmiClient.provider;
                    if (!wagmiProvider) {
                        throw new W3oError(W3oError.KEY_NOT_FOUND, { message: 'Provider not found' });
                    }
                    // Create ethers.js provider and signer
                    const provider = new ethers.providers.Web3Provider((wagmiProvider as any).provider);
                    const signer = provider.getSigner();

                    // Retrieve address
                    const address = await signer.getAddress();
                    context.info('Logged in as', { address });

                    // Store signer for later transactions
                    this.__signer = signer;

                    // Create EthereumAccount and emit
                    const account = new EthereumAccount(address, signer, auth, context);
                    observer.next(account);
                    observer.complete();

                    // Listen for session changes to handle logout
                    const sub = auth.onSessionChange$.asObservable().subscribe({
                        next: (sessionId: string) => {
                            if (sessionId) {
                                sub.unsubscribe();
                                const w3oSession = this.octopus.sessions.getSession(sessionId, context);
                                if (w3oSession) {
                                    w3oSession.onLogout$.asObservable().pipe().subscribe({
                                        next: () => {
                                            context.log('logout triggered');
                                            this.logout(auth, context);
                                        }
                                    });
                                }
                            }
                        }
                    });
                }).catch(error => {
                    context.error(`${action} failed`, error);
                    observer.error(error);
                });
            } catch (error) {
                context.error('ERROR:', error);
                observer.error(error);
            }
        });
    }

    /**
     * Initiates login flow to the given network via wagmi (MetaMask).
     */
    override login(
        auth: W3oAuthenticator,
        networkName: W3oNetworkName,
        parent: W3oContext
    ): Observable<W3oAccount> {
        return this.authenticate(auth, networkName, parent, 'login');
    }

    /**
     * Attempts to restore a previously active session (wagmi autoConnect).
     */
    override autoLogin(
        auth: W3oAuthenticator,
        networkName: W3oNetworkName,
        parent: W3oContext
    ): Observable<W3oAccount> {
        return this.authenticate(auth, networkName, parent, 'autoLogin');
    }

    /**
     * Logs out by disconnecting the injected connector (MetaMask).
     */
    override logout(auth: W3oAuthenticator, parent: W3oContext): void {
        const context = logger.method('logout', { auth }, parent);
        try {
            // wagmi does not expose a direct disconnect; instruct MetaMask to disconnect if possible
            this.wagmiClient.disconnect();
            this.__signer = null;
        } catch (error) {
            context.error('ERROR:', error);
            throw new W3oError(W3oError.SESSION_NOT_FOUND, { auth });
        }
    }

    /**
     * Signs a transaction using the stored ethers.js Signer.
     */
    override signTransaction(auth: W3oAuthenticator, trx: any, parent: W3oContext): Observable<EthereumTransactionResponse> {
        const context = logger.method('signTransaction', { auth, trx }, parent);
        if (!this.__signer) {
            throw new W3oError(W3oError.READ_ONLY_AUTHENTICATOR, { authenticator: this });
        }
        return new Observable<EthereumTransactionResponse>(observer => {
            (this.__signer as Signer).sendTransaction(trx).then(txResponse => {
                context.info('Transaction sent', { txResponse });
                const txRespWrapper = new EthereumTransactionResponse(txResponse);
                txRespWrapper.wait().subscribe({
                    next: receipt => {
                        context.info('Transaction confirmed', { receipt });
                        observer.next(txRespWrapper);
                        observer.complete();
                    },
                    error: err => observer.error(err)
                });
            }).catch(error => {
                context.error('Transaction signing failed', error);
                observer.error(error);
            });
        });
    }
}

const logger = new W3oContextFactory('EthereumAuthWagmi');
