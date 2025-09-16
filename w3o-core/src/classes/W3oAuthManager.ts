// w3o-core/src/classes/W3oAuthManager.ts

import { BehaviorSubject, filter, Observable, take } from 'rxjs';
import {
    W3oAuthInstance,
    W3oGlobalSettings,
    W3oNetworkType,
    W3oInstance,
    W3oNetworkName,
    W3oWalletName
} from '../types';

import { W3oContextFactory, W3oContext } from './W3oContext';
import { W3oChainSupport } from './W3oChainSupport';
import { W3oNetwork } from './W3oNetwork';
import { W3oAuthenticator } from './W3oAuthenticator';
import { W3oSession } from './W3oSession';
import { W3oError } from './W3oError';
import { W3oManager } from './W3oManager';

const logger = new W3oContextFactory('W3oAuthManager');

/**
 * Auth manager that handles available authenticators and user login/logout flows
 */
export class W3oAuthManager extends W3oManager implements W3oAuthInstance {
    private __byType: { [authType: W3oNetworkType | string]: W3oChainSupport } = {};

    octopus!: W3oInstance;

    constructor(
        settings: W3oGlobalSettings,
        parent: W3oContext
    ) {
        logger.method('constructor', { settings }, parent);
        super('W3oAuthManager');
    }

    /**
     * Initializes the auth manager with the Octopus instance
     */
    init(octopus: W3oInstance, parent: W3oContext) {
        logger.method('init', { octopus }, parent);
        this.octopus = octopus;
        if (this.__initCalled) {
            throw new W3oError(W3oError.ALREADY_INITIALIZED, {
                name: 'W3oAuthManager',
                message: 'Auth manager already initialized'
            });
        }
        this.__initCalled = true;
        this.__initialized$.next(true);
    }

    /**
     * Adds an auth support provider to the manager before initialization
     */
    addChainSupport(support: W3oChainSupport, parent: W3oContext): void {
        logger.method('addChainSupport', { support }, parent);
        if (this.__initCalled) {
            throw new W3oError(W3oError.ALREADY_INITIALIZED, { support });
        }
        this.__byType[support.type] = support;
    }

    /**
     * Retrieves chain support by type
     */
    getChainSupport(type: W3oNetworkType, parent?: W3oContext): W3oChainSupport {
        const context = logger.method('getChainSupport', { type }, parent);
        const support = this.__byType[type];
        if (!support) {
            throw new W3oError(W3oError.AUTH_SUPPORT_NOT_FOUND, { type });
        }
        return support;
    }

    /**
     * Creates a new authenticator instance from a registered support
     */
    createAuthenticator(network: W3oNetwork, walletName: W3oWalletName, parent: W3oContext): W3oAuthenticator {
        logger.method('createAuthenticator', { network }, parent);
        const support = this.__byType[network.type];
        if (!support) {
            throw new W3oError(W3oError.AUTH_SUPPORT_NOT_FOUND, { type: network.type });
        }
        return support.createAuthenticator(network, walletName, parent);
    }

    /**
     * Authenticates user (interactive login)
     */
    login(): Observable<W3oSession>;
    login(parent: W3oContext): Observable<W3oSession>;
    login(
        chain: W3oNetworkName,
        network: W3oNetworkType,
        parent: W3oContext
    ): Observable<W3oSession>;
    login(
        networkNameOrParent?: W3oNetworkName | W3oContext,
        networkType?: W3oNetworkType,
        parent?: W3oContext
    ): Observable<W3oSession> {
        if (typeof networkNameOrParent !== 'string') {
            const context = logger.method('login', networkNameOrParent);
            const network = this.octopus.networks.current as W3oNetwork;
            return this.login(network.name, network.type, context);
        }

        const networkName = networkNameOrParent;
        const context = logger.method('login', { networkName, networkType }, parent);
        const networkInstance = this.octopus.networks.getNetwork(networkName, context);
        const support = this.__byType[networkType ?? networkInstance.type];
        if (!support) {
            throw new W3oError(W3oError.AUTH_SUPPORT_NOT_FOUND, { type: networkType ?? networkInstance.type });
        }

        const subject = new BehaviorSubject<W3oSession | null>(null);
        const exec = () => {
            try {
                const authenticator = support.createAuthenticator(networkInstance, support.currentWallet.name, context);
                authenticator.login(networkName, context).subscribe({
                    next: account => {
                        const session = this.octopus.sessions.createCurrentSession(
                            account.address,
                            authenticator,
                            networkInstance,
                            context
                        );
                        subject.next(session);
                        subject.complete();
                    },
                    error: err => subject.error(err)
                });
            } catch (error) {
                context.error(error);
                subject.error(error);
            }
        };

        this.octopus.whenReady.subscribe(() => exec()).unsubscribe();

        return subject.pipe(filter(session => session !== null)) as Observable<W3oSession>;
    }

    /**
     * Logs out from the current session
     */
    logout(parent?: W3oContext): Observable<void> {
        const context = logger.method('logout', parent);
        const session = this.octopus.sessions.current;
        if (!session) {
            throw new W3oError(W3oError.SESSION_NOT_FOUND, { sessions: this.octopus.sessions.snapshot() });
        }
        session.logout(context);
        return session.onLogout$;
    }

    /**
     * Captures a snapshot of the current auth manager state
     */
    snapshot(): any {
        const snapshot = {
            byType: {} as { [authType: string]: any },
        };

        for (const type in this.__byType) {
            snapshot.byType[type] = this.__byType[type].snapshot();
        }

        return snapshot;
    }
}
