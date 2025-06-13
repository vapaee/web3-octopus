// w3o-antelope/src/classes/EVMAuthAnchor.ts

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

import { EVMAuthSupport } from './EVMAuthSupport';
import { Observable, take } from 'rxjs';
import { WharfkitInstance } from './EVMWharfkit';
import { EVMAccount } from './EVMAccount';
import { Session } from '@wharfkit/session';
import { EVMTransaction } from '../types';
import { EVMNetwork } from './EVMNetwork';

const logger = new W3oContextFactory('EVMAuthAnchor');

/**
 * Represents the response of a transaction in EVM, with simplified wait method.
 */
export class EVMTransactionResponse extends W3oTransactionResponse {
    constructor(hash: string) {
        super(hash);
    }

    /**
     * Simulates waiting for transaction confirmation by emitting a success.
     */
    wait(): Observable<any> {
        return new Observable<any>((observer) => {
            observer.next({ status: 'success' });
            observer.complete();
        });
    }
}

/**
 * Anchor-based authentication support for EVM networks.
 */
export class EVMAuthAnchor extends EVMAuthSupport {

    /**
     * Constructs the EVMAuthAnchor module with 'anchor' as support name.
     */
    constructor(parent: W3oContext) {
        const context = logger.method('constructor', parent);
        super('anchor' as W3oAuthSupportName, context);
    }

    /**
     * Returns the module version.
     */
    override get w3oVersion(): string {
        return '1.0.0';
    }

    /**
     * Returns the module name.
     */
    override get w3oName(): string {
        return 'antelope.auth.anchor';
    }

    /**
     * Lists required dependencies for this module.
     */
    override get w3oRequire(): string[] {
        return [
            'antelope.auth.support@1.0.0',
        ];
    }

    /**
     * Indicates that this authenticator is not read-only.
     */
    override isReadOnly(): boolean {
        return false;
    }

    /**
     * Initializes the module with its dependencies and logs success.
     */
    override init(octopus: W3oInstance, requirements: W3oModule[], parent: W3oContext): void {
        const context = logger.method('init', { octopus, requirements }, parent);
        super.init(octopus, requirements, context);
        logger.info('EVMAuthAnchor OK!', { w3oId: super.w3oId, octopus, requirements });
    }

    /**
     * Returns a snapshot of the module's current state.
     */
    override snapshot(): any {
        return {
            ... super.snapshot(),
            _class: 'EVMAuthAnchor',
        };
    }

    /**
     * Extracts the Wharfkit instance from a W3oAuthenticator.
     */
    getWharfkitFrom(auth: W3oAuthenticator, parent: W3oContext): WharfkitInstance {
        const context = logger.method('getWharfkitFrom', { auth }, parent);
        if (auth) {
            if (auth.network instanceof EVMNetwork) {
                const wharfkit = auth.network.wharfkit;
                logger.info('Wharfkit found in network', wharfkit);
                return wharfkit;
            } else {
                context.error('No wharfkit found in network', { network: auth.network, auth });
                throw new W3oError(W3oError.SESSION_NOT_FOUND, { auth });
            }
        }
        context.error('No wharfkit found in auth', { auth });
        throw new W3oError(W3oError.SESSION_NOT_FOUND, { auth });
    }

    /**
     * Extracts the Wharfkit instance from a network name.
     */
    getWharfkitFromNetworkName(networkName: W3oNetworkName, parent: W3oContext): WharfkitInstance {
        const context = logger.method('getWharfkitFromNetworkName', { networkName }, parent);
        const network = this.octopus.networks.getNetwork(networkName, context);
        if (network instanceof EVMNetwork) {
            return network.wharfkit;
        }
        context.error('No wharfkit found in network', { network });
        throw new W3oError(W3oError.SESSION_NOT_FOUND, { network });
    }

    /**
     * Saves a Wharfkit session in the authenticator's storage.
     */
    private setWharfkitSession(authenticator: W3oAuthenticator, session: Session, parent: W3oContext): string {
        logger.method('setWharfkitSession', { session, authenticator, parent });
        const accountname = session.actor.toString();
        authenticator.onSessionChange$.subscribe(() => {
            if (!!authenticator.session) {
                authenticator.session.storage.set<Session>('wharfkit.session', session);
                logger.info(`✅Logged in as ${accountname}`);
            }
        });
        return accountname;
    }

    /**
     * Retrieves the Wharfkit session from the authenticator.
     */
    public getWharfkitSession(authenticator: W3oAuthenticator, parent: W3oContext): Session {
        const context = logger.method('getWharfkitSession', { authenticator, parent });
        const session = authenticator.session.storage.get<Session>('wharfkit.session') as Session;
        if (!session) {
            context.error('No wharfkit session found in auth');
            throw new W3oError(W3oError.SESSION_MISSING_KEY, { 'key': 'wharfkit.session', authenticator });
        }
        logger.info('Wharfkit session found', session);
        return session;
    }

    /**
     * Internal helper that handles shared login/restore session logic.
     */
    private authenticate(
        auth: W3oAuthenticator,
        networkName: W3oNetworkName,
        parent: W3oContext,
        action: (wharfkit: WharfkitInstance, ctx: W3oContext) => Promise<Session | undefined>,
        initialLabel: string,
        failMessage: string
    ): Observable<W3oAccount> {
        return new Observable<W3oAccount>(observer => {
            const context = logger.method(initialLabel, { auth, networkName }, parent);

            try {
                const wharfkit = this.getWharfkitFrom(auth, context);
                const network = this.octopus.networks.getNetwork(networkName, context);
                logger.log(`${initialLabel}():`, { wharfkit, network });

                action(wharfkit, context).then(session => {
                    logger.info(`${initialLabel}() ->`, { session });
                    if (session) {
                        const address = this.setWharfkitSession(auth, session, context);
                        const account = new EVMAccount(address, session, auth, context);
                        observer.next(account as W3oAccount);
                        observer.complete();

                        // we suscribe to session.onLogout$ to execute logout in this class
                        const sub = auth.onSessionChange$.asObservable().subscribe({
                            next: (sessionId: string) => {
                                if (sessionId) {
                                    sub.unsubscribe();
                                    const w3oSession = this.octopus.sessions.getSession(sessionId, context);
                                    if (w3oSession) {
                                        w3oSession.onLogout$.asObservable().pipe(
                                            take(1)
                                        ).subscribe({
                                            next: () => {
                                                logger.log(`${initialLabel}() -> logout()`);
                                                this.logout(auth, context)
                                            }
                                        })
                                    }
                                }
                            }
                        });
                    } else if (initialLabel === 'login') {
                        context.error(failMessage, { session });
                        throw new W3oError(W3oError.SESSION_NOT_FOUND, { session });
                    }
                }).catch(error => {
                    context.error(failMessage, error);
                    observer.error(error);
                });
            } catch (error) {
                context.error('ERROR:', error);
                observer.error(error);
            }
        });
    }

    /**
     * Initiates login flow to the given network.
     */
    override login(
        auth: W3oAuthenticator,
        networkName: W3oNetworkName,
        parent: W3oContext
    ): Observable<W3oAccount> {
        return this.authenticate(
            auth,
            networkName,
            parent,
            (wharfkit, ctx) => wharfkit.login(ctx),
            'login',
            'Login failed'
        );
    }

    /**
     * Attempts to restore a previous session automatically.
     */
    override autoLogin(
        auth: W3oAuthenticator,
        networkName: W3oNetworkName,
        parent: W3oContext
    ): Observable<W3oAccount> {
        return this.authenticate(
            auth,
            networkName,
            parent,
            (wharfkit, ctx) => wharfkit.restoreSession(ctx),
            'autoLogin',
            'Auto login failed'
        );
    }

    /**
     * Logs out from the current Wharfkit session.
     */
    override logout(auth: W3oAuthenticator, parent: W3oContext): void {
        const context = logger.method('logout', { auth }, parent);
        try {
            const wharfkit = this.getWharfkitFrom(auth, context);
            wharfkit.logout(context);
        } catch (error) {
            context.error('ERROR:', error);
            throw new W3oError(W3oError.SESSION_NOT_FOUND, { auth });
        }
    }

    /**
     * Signs a transaction using Wharfkit and returns a transaction response.
     */
    override signTransaction(auth: W3oAuthenticator, trx: W3oTransaction, parent: W3oContext): Observable<EVMTransactionResponse> {
        const context = logger.method('signTransaction', { auth, trx, parent });
        const session = this.getWharfkitSession(auth, context);
        this.getWharfkitFrom(auth, context);
        const transaction = trx as EVMTransaction;
        return new Observable<EVMTransactionResponse>((observer) => {
            session.transact(transaction).then((response) => {
                logger.info('Transaction signed successfully', response);
                const txId = response.response?.['transaction_id'] as string || 'Unknown TX';
                const transactionResponse = new EVMTransactionResponse(txId);
                transactionResponse.wait().subscribe((receipt) => {
                    logger.info('Transaction receipt', receipt);
                    observer.next(transactionResponse);
                    observer.complete();
                });
            }).catch((error) => {
                context.error('Transaction signing failed', error);
                observer.error(error);
            });
        });
    }
}
