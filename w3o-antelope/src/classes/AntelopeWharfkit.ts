// w3o-antelope/src/classes/AntelopeWharfkit.ts

import { APIClient } from '@wharfkit/antelope';
import { AccountKit } from '@wharfkit/account';
import { SessionKit, Session } from '@wharfkit/session';
import { WebRenderer } from '@wharfkit/web-renderer';
import { WalletPluginAnchor } from '@wharfkit/wallet-plugin-anchor';
import { WalletPluginCleos } from '@wharfkit/wallet-plugin-cleos';
import { W3oAntelopeNetworkSettings } from '../types';
import { W3oContextFactory, W3oContext, W3oNetwork, W3oAuthenticator, W3oAddress } from '@vapaee/w3o-core';

const logger = new W3oContextFactory('WharfkitInstance');

/**
 * Provides a wrapper for managing Wharfkit session and account instances with contextual logging
 */
export class WharfkitInstance {

    /**
     * id of the WharfkitInstance
     * @type {number}
     * @memberof WharfkitInstance
     * */
    public id: number = Math.floor(Math.random() * 1000);

    /**
     * Creates a new instance of WharfkitInstance with the provided session and account kits
     * @param sessionKit - The SessionKit instance for managing sessions
     * @param accountKit - The AccountKit instance for managing accounts
     * @param parent - The parent context for logging
     */
    constructor(
        public readonly sessionKit: SessionKit,
        public readonly accountKit: AccountKit,
        public readonly networkSettings: W3oAntelopeNetworkSettings,
        parent: W3oContext
    ) {
        logger.method('constructor', {id: this.id}, parent);
    }

    private __currentSession?: Session;

    /**
     * Validates if the given EOSIO account exists
     */
    public async validateAccount(username: string): Promise<boolean> {
        try {
            await this.accountKit.load(username);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Initiates login flow and stores the session
     */
    public async login(parent: W3oContext): Promise<Session> {
        logger.method('login', {id: this.id}, parent);
        logger.info('Logging in...');
        const { session } = await this.sessionKit.login();
        this.__currentSession = session;
        logger.info('Login successful', { session });
        return session;
    }

    /**
     * Logs out the current session
     */
    public logout(parent: W3oContext): void {
        logger.method('logout', { id: this.id, currentSession: this.__currentSession, sessionKit: this.sessionKit }, parent);
        if (this.__currentSession) {
            this.sessionKit.logout(this.__currentSession);
            this.__currentSession = undefined;
        }
    }

    /**
     * Attempts to restore a previously active session
     */
    public async restoreSession(actor: W3oAddress, parent: W3oContext): Promise<Session | undefined> {
        const context = logger.method('restoreSession', { actor, chain: this.sessionKit.chains[0].id.hexString, sessionKit: this.sessionKit }, parent);
        try {
            const session = await this.sessionKit.restore({
                chain: this.sessionKit.chains[0],
                actor: actor.toString(),
            });
            this.__currentSession = session;
            if (session) {
                context.info('Session restored', { actor: session.actor.toString(), session });
            } else {
                context.info('No session to restore');
            }
            return session;
        } catch (error) {
            context.error('WharfkitInstance.restoreSession() Failed to restore session', (error as Error).message);
            return undefined;
        }
    }

    /**
     * Returns the currently active session, if any
     */
    public get currentSession(): Session | undefined {
        return this.__currentSession;
    }

    /**
     * Provides access to the underlying EOSIO API client from the session
     */
    public get client() {
        return this.__currentSession?.client;
    }

    /**
     * Returns a snapshot of the service state including its class name.
     */
    public snapshot(): any {
        return {
            _class: 'WharfkitInstance',
            currentSession: this.__currentSession,
            sessionKit: this.sessionKit,
            accountKit: this.accountKit,
        };
    }

}

/**
 * Utility class for creating Wharfkit-related instances for session and account management
 */
export class AntelopeWharfkit {

    /**
     * Creates a SessionKit instance configured for the given app and Antelope network
     */
    public static createSessionKit(appName: string, network: W3oAntelopeNetworkSettings, parent: W3oContext) {
        logger.method('createSessionKit', { appName, network }, parent);
        const sessionKit = new SessionKit({
            appName: appName,
            chains: [
                {
                    id: network.chainId,
                    url: network.rpcUrl
                }
            ],
            ui: new WebRenderer(),
            walletPlugins: [
                new WalletPluginAnchor(),
                new WalletPluginCleos()
            ]
        });
        return sessionKit;
    }

    /**
     * Creates an AccountKit instance configured for the specified Antelope network
     */
    public static createAccountKit(network: W3oAntelopeNetworkSettings, parent: W3oContext) {
        logger.method('createAccountKit', { network }, parent);
        const client = new APIClient({ url: network.rpcUrl });
        const accountKit = new AccountKit(network.chain, { client });
        return accountKit;
    }

    /**
     * Returns a fully initialized WharfkitInstance including SessionKit and AccountKit
     */
    public static wharfkit(appName: string, networkSettings: W3oAntelopeNetworkSettings, parent: W3oContext): WharfkitInstance {
        const context = logger.method('wharfkit', { appName, networkSettings }, parent);
        const sessionKit = AntelopeWharfkit.createSessionKit(appName, networkSettings, context);
        const accountKit = AntelopeWharfkit.createAccountKit(networkSettings, context);
        return new WharfkitInstance(sessionKit, accountKit, networkSettings, context);
    }
}
