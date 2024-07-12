// w3o-core/src/classes/W3oContractManager.ts

import { Observable } from 'rxjs';
import {
    Logger,
    LoggerContext,
    W3oAuthenticator,
    W3oError,
    W3oNetwork,
    W3oSession,
    Web3Octopus,
} from '.';

import {
    W3oAuthInstance,
    W3oAuthSupportName,
    W3oGlobalSettings,
    W3oNetworkType
} from '../types';
import { W3oAuthSupport } from './W3oAuthSupport';

const logger = new Logger('W3oAuthManager');

// Represents a contract manager, including methods to add, get, and list contracts
export class W3oAuthManager implements W3oAuthInstance {
    private __initialized = false;
    private __byType: { [authType: string]: W3oAuthSupport[] } = {};
    private __byName: { [authName: string]: W3oAuthSupport } = {};
    
    constructor(settings: W3oGlobalSettings, parent: LoggerContext) {
        logger.method('constructor', {settings}, parent);
    }

    // Method to initialize the auth manager
    init(parent: LoggerContext) {
        const context = logger.method('init', undefined, parent);
        if (this.__initialized) {
            throw new W3oError(W3oError.ALREADY_INITIALIZED, { name: 'W3oAuthManager', message: 'Auth manager already initialized' });
        }
        this.__initialized = true;
        context.error('Not implemented yet');
    }

    // Method to add an authenticator to the manager
    addAuthSupport(auth: W3oAuthSupport, parent: LoggerContext): void {
        logger.method('add', {auth}, parent);
        this.__byName[auth.name] = auth;
        if (!this.__byType[auth.type]) {
            this.__byType[auth.type] = [];
        }
        this.__byType[auth.type].push(auth);
    }

    // Method to get an authenticator by name
    get(name: string): W3oAuthSupport {
        return this.__byName[name];
    }

    // Method to get a list of authenticators by type
    list(type: string): W3oAuthSupport[] {
        return this.__byType[type];
    }

    // Method to create an authenticator from its name
    createAuthenticator(name: W3oAuthSupportName, parent: LoggerContext): W3oAuthenticator {
        logger.method('createAuthenticator', {name}, parent);
        const auth = this.get(name);
        if (!auth) {
            throw new W3oError(W3oError.AUTH_SUPPORT_NOT_FOUND, {name});
        }
        return auth.createAuthenticator(parent);
    }

    // Main method to authenticate a user from a service
    login(
        network: W3oNetworkType,
        authName: W3oAuthSupportName,
        parent: LoggerContext
    ): Observable<W3oSession> {
        const context = logger.method('login', {network, authName}, parent);
        const auth = this.get(authName);
        if (!auth) {
            throw new W3oError(W3oError.AUTH_SUPPORT_NOT_FOUND, {authName});
        }
        const obs = new Observable<W3oSession>(subscriber => {
            try {
                // 1. Get the network instance
                const networkInstance: W3oNetwork = Web3Octopus.instance.networks.getNetwork(network, context);

                // 2. Create an authenticator
                const authenticator: W3oAuthenticator = auth.createAuthenticator(context);

                // 3. Call authenticator.login to get an account
                authenticator.login(network, context).subscribe({
                    next: account => {
                        // 4. Create a new session
                        const session = Web3Octopus.instance.sessions.createCurrentSession(account.getAddress(), authenticator, networkInstance, context);

                        // 5. Notify the subscriber of the created session
                        subscriber.next(session);
                        subscriber.complete();
                    },
                    error: err => {
                        subscriber.error(err);
                    }
                });
            } catch (error) {
                subscriber.error(error);
            }
        });
        return obs;
    }

    // Method to take a snapshot of the auth manager state
    snapshot(): any {
        const snapshot = {
            byType: { ...this.__byType },
            byName: [] as string[],
        };

        for (const type in snapshot.byType) {
            snapshot.byType[type] = snapshot.byType[type].map(auth => auth.snapshot());
        }

        snapshot.byName.push(... Object.keys(this.__byName));

        return snapshot;
    }
}
