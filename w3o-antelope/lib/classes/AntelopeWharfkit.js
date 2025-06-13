// w3o-antelope/src/classes/AntelopeWharfkit.ts
import { APIClient } from '@wharfkit/antelope';
import { AccountKit } from '@wharfkit/account';
import { SessionKit } from '@wharfkit/session';
import { WebRenderer } from '@wharfkit/web-renderer';
import { WalletPluginAnchor } from '@wharfkit/wallet-plugin-anchor';
import { WalletPluginCleos } from '@wharfkit/wallet-plugin-cleos';
import { W3oContextFactory } from '@vapaee/w3o-core';
const logger = new W3oContextFactory('WharfkitInstance');
/**
 * Provides a wrapper for managing Wharfkit session and account instances with contextual logging
 */
export class WharfkitInstance {
    /**
     * Creates a new instance of WharfkitInstance with the provided session and account kits
     * @param sessionKit - The SessionKit instance for managing sessions
     * @param accountKit - The AccountKit instance for managing accounts
     * @param parent - The parent context for logging
     */
    constructor(sessionKit, accountKit, parent) {
        this.sessionKit = sessionKit;
        this.accountKit = accountKit;
        /**
         * id of the WharfkitInstance
         * @type {number}
         * @memberof WharfkitInstance
         * */
        this.id = Math.floor(Math.random() * 1000);
        logger.method('constructor', { id: this.id }, parent);
    }
    /**
     * Validates if the given EOSIO account exists
     */
    async validateAccount(username) {
        try {
            await this.accountKit.load(username);
            return true;
        }
        catch {
            return false;
        }
    }
    /**
     * Initiates login flow and stores the session
     */
    async login(parent) {
        logger.method('login', { id: this.id }, parent);
        logger.info('Logging in...');
        const { session } = await this.sessionKit.login();
        this.__currentSession = session;
        logger.info('Login successful', { session });
        return session;
    }
    /**
     * Logs out the current session
     */
    logout(parent) {
        logger.method('logout', { id: this.id, currentSession: this.__currentSession, sessionKit: this.sessionKit }, parent);
        if (this.__currentSession) {
            this.sessionKit.logout(this.__currentSession);
            this.__currentSession = undefined;
        }
    }
    /**
     * Attempts to restore a previously active session
     */
    async restoreSession(parent) {
        logger.method('restoreSession', { id: this.id, sessionKit: this.sessionKit }, parent);
        const session = await this.sessionKit.restore();
        this.__currentSession = session;
        if (session) {
            logger.info('Session restored', { session });
        }
        else {
            logger.info('No session to restore');
        }
        return session;
    }
    /**
     * Returns the currently active session, if any
     */
    get currentSession() {
        return this.__currentSession;
    }
    /**
     * Provides access to the underlying EOSIO API client from the session
     */
    get client() {
        return this.__currentSession?.client;
    }
    /**
     * Returns a snapshot of the service state including its class name.
     */
    snapshot() {
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
    static createSessionKit(appName, network, parent) {
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
    static createAccountKit(network, parent) {
        logger.method('createAccountKit', { network }, parent);
        const client = new APIClient({ url: network.rpcUrl });
        const accountKit = new AccountKit(network.chain, { client });
        return accountKit;
    }
    /**
     * Returns a fully initialized WharfkitInstance including SessionKit and AccountKit
     */
    static wharfkit(appName, network, parent) {
        const context = logger.method('wharfkit', { appName, network }, parent);
        const sessionKit = AntelopeWharfkit.createSessionKit(appName, network, context);
        const accountKit = AntelopeWharfkit.createAccountKit(network, context);
        return new WharfkitInstance(sessionKit, accountKit, context);
    }
}
