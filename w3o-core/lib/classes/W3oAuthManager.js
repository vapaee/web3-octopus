// w3o-core/src/classes/W3oContractManager.ts
import { BehaviorSubject, filter, take } from 'rxjs';
import { W3oContextFactory } from './W3oContext';
import { W3oError } from './W3oError';
import { W3oManager } from './W3oManager';
const logger = new W3oContextFactory('W3oAuthManager');
/**
 * Auth manager that handles available authenticators and user login/logout flows
 */
export class W3oAuthManager extends W3oManager {
    constructor(settings, parent) {
        logger.method('constructor', { settings }, parent);
        super('W3oAuthManager');
        this.__byType = {};
    }
    /**
     * Initializes the auth manager with the Octopus instance
     */
    init(octopus, parent) {
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
    addChainSupport(chain, parent) {
        logger.method('addChainSupport', { chain }, parent);
        if (this.__initCalled) {
            throw new W3oError(W3oError.ALREADY_INITIALIZED, { chain });
        }
        this.__byType[chain.type] = chain;
    }
    /**
     * Creates a new authenticator instance from a registered support
     */
    createAuthenticator(network, parent) {
        logger.method('createAuthenticator', { network }, parent);
        const auth = this.__byType[network.type];
        if (!auth) {
            throw new W3oError(W3oError.AUTH_SUPPORT_NOT_FOUND, { type: network.type });
        }
        return auth.createAuthenticator(network, parent);
    }
    login(networkNameOrParent, networkType, parent) {
        return this.__authenticate('login', networkNameOrParent, networkType, parent);
    }
    autoLogin(networkNameOrParent, networkType, parent) {
        return this.__authenticate('autoLogin', networkNameOrParent, networkType, parent);
    }
    /**
     * Internal authentication routine used by login and autoLogin
     */
    __authenticate(method, networkNameOrParent, networkType, parent) {
        if (typeof networkNameOrParent !== 'string') {
            const context = logger.method(method, networkNameOrParent);
            const network = this.octopus.networks.current;
            return this.__authenticate(method, network.name, network.type, networkNameOrParent);
        }
        const networkName = networkNameOrParent;
        const context = logger.method(method, { networkName, networkType }, parent);
        const networkInstance = this.octopus.networks.getNetwork(networkName, context);
        const auth = this.__byType[networkType ?? networkInstance.type];
        if (!auth) {
            throw new W3oError(W3oError.AUTH_SUPPORT_NOT_FOUND, { type: networkType ?? networkInstance.type });
        }
        const subject = new BehaviorSubject(null);
        const exec = () => {
            try {
                const authenticator = auth.createAuthenticator(networkInstance, context);
                authenticator[method](networkName, context).subscribe({
                    next: account => {
                        const session = this.octopus.sessions.createCurrentSession(account.getAddress(), authenticator, networkInstance, context);
                        subject.next(session);
                        subject.complete();
                    },
                    error: err => subject.error(err)
                });
            }
            catch (error) {
                context.error(error);
                subject.error(error);
            }
        };
        if (method === 'autoLogin') {
            this.octopus.whenReady.pipe(take(1)).subscribe(() => exec());
        }
        else {
            exec();
        }
        return subject.pipe(filter(session => session !== null));
    }
    /**
     * Logs out from the current session
     */
    logout(parent) {
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
    snapshot() {
        const snapshot = {
            byType: {},
        };
        for (const type in this.__byType) {
            snapshot.byType[type] = this.__byType[type].snapshot();
        }
        return snapshot;
    }
}
