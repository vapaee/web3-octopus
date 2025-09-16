// w3o-core/src/classes/W3oSessionManager.ts

import { BehaviorSubject, catchError, concatMap, EMPTY, finalize, from, mapTo, Observable, Subject, tap } from 'rxjs';

import {
    W3oAddress,
    W3oGlobalSettings,
    W3oInstance,
    W3oSessionInstance
} from '../types';
import { W3oContextFactory, W3oContext } from './W3oContext';
import { W3oNetwork } from './W3oNetwork';
import { W3oAuthenticator } from './W3oAuthenticator';
import { W3oSession } from './W3oSession';
import { W3oError } from './W3oError';
import { W3oManager } from './W3oManager';

const logger = new W3oContextFactory('W3oSessionManager');

interface W3oStoredSessions {
    currentSessionId: string | null;
    sessions: string[];
}

const STORAGE_KEY = 'w3o-sessions';

/**
 * Manages user sessions including creation, retrieval, deletion, and persistence.
 */
export class W3oSessionManager extends W3oManager implements W3oSessionInstance {
    /**
     * Stores all active sessions indexed by session ID.
     */
    private __sessions: { [key: string]: W3oSession } = {};

    /**
     * Flag indicating whether multiple sessions are allowed.
     */
    private __multiSession: boolean;

    /**
     * Flag indicating whether autoLogin is enabled.
     */
    private __autologin = false;

    /**
     * BehaviorSubject that holds the current active session.
     */
    private __current$: BehaviorSubject<W3oSession | null> = new BehaviorSubject<W3oSession | null>(null);

    /**
     * Reference to the Octopus instance that initialized the manager.
     */
    octopus!: W3oInstance;

    constructor(
        settings: W3oGlobalSettings,
        parent: W3oContext
    ) {
        const context = logger.method('constructor', { settings }, parent);
        super('W3oSessionManager');
        this.__multiSession = settings.multiSession;
        this.__autologin = settings.autoLogin;
    }

    /**
     * Observable stream of the current session.
     */
    get current$(): Observable<W3oSession | null> {
        return this.__current$.asObservable();
    }

    /**
     * Returns the ID of the current session, or null if no session is set.
     */
    get currentSessionId(): string | null {
        const session = this.__current$.value;
        return session ? session.id : null;
    }

    /**
     * Returns the current session instance, or null if not set.
     */
    get current(): W3oSession | null {
        return this.__current$.value;
    }

    /**
     * Returns a list of all stored session instances.
     */
    get list(): W3oSession[] {
        return Object.values(this.__sessions);
    }

    /**
     * Indicates whether multiple sessions are supported.
     */
    get isMultiSession(): boolean {
        return this.__multiSession;
    }

    /**
     * Initializes the session manager with an octopus instance and subscribes to network change events.
     */
    init(octopus: W3oInstance, parent: W3oContext): void {
        const context = logger.method('init', { octopus }, parent);
        if (this.__initCalled) {
            throw new W3oError(
                W3oError.ALREADY_INITIALIZED,
                { name: 'W3oSessionManager', message: 'Session manager already initialized' }
            );
        }
        this.__initCalled = true;
        this.octopus = octopus;
        octopus.networks.current$.subscribe((network) => {
            const name = network.name;
            logger.debug('network change detected', { name });
            const current = this.__current$.value;
            if (current && current.network.settings.name === name) {
                logger.debug('current session matches network, keeping session');
                return;
            }
            const matching = this.list.find(
                (s) => s.network.settings.name === name
            );
            if (matching) {
                logger.debug('switching to session of same network', {
                    id: matching.id,
                });
                this.__current$.next(matching);
            } else {
                logger.debug('no session for network, clearing current');
                this.__current$.next(null);
            }
        });


        if (this.__autologin) {
            this.loadSessions(context);
        }

        this.__current$.subscribe((session) => {
            logger.log('session change detected', { session });
            this.saveSessions(context);
        });

        this.__initialized$.next(true);
    }

    /**
     * Creates a new session for a specific address, authenticator, and network.
     */
    createSession(address: W3oAddress, authenticator: W3oAuthenticator, network: W3oNetwork, parent: W3oContext): W3oSession {
        const context = logger.method('createSession', { address, authenticator, network }, parent);
        const session = new W3oSession(this, address, authenticator, network, context);
        if (this.__sessions[session.id]) {
            throw new W3oError(W3oError.SESSION_ALREADY_EXISTS, { id: session.id });
        }
        this.__sessions[session.id] = session;
        authenticator.setSession(session, context);
        return session;
    }

    /**
     * Creates a new session and sets it as the current session.
     */
    createCurrentSession(address: W3oAddress, authenticator: W3oAuthenticator, network: W3oNetwork, parent: W3oContext): W3oSession {
        const context = logger.method('createCurrentSession', { address, authenticator, network }, parent);
        const session = this.createSession(address, authenticator, network, context);
        this.setCurrentSession(session.id, parent);
        return session;
    }

    /**
     * Retrieves a session by ID or throws if not found.
     */
    getSession(id: string, parent: W3oContext): W3oSession {
        logger.method('getSession', { id }, parent);
        const session = this.__sessions[id];
        if (!session) {
            throw new W3oError(W3oError.SESSION_NOT_FOUND, { id });
        }
        return session;
    }

    /**
     * Retrieves a session from the context instance. (Currently hardcoded context.sessionId)
     */
    getSessionFromContext(parent: W3oContext): W3oSession {
        logger.method('getSessionFromContext', parent);
        const session = this.__sessions['context.sessionId'];
        if (!session) {
            throw new W3oError(W3oError.SESSION_NOT_FOUND, { id: 'context.sessionId' });
        }
        return session;
    }

    /**
     * Returns a list of all existing sessions.
     */
    getSessions(parent: W3oContext): W3oSession[] {
        logger.method('getSessions', parent);
        return this.list;
    }

    /**
     * Deletes the session with the specified ID.
     * If it is the current session, another is selected or current is set to null.
     */
    deleteSession(id: string, parent: W3oContext): void {
        logger.method('deleteSession', { id }, parent);
        const isCurrent = this.currentSessionId === id;
        if (!this.__sessions[id]) {
            throw new W3oError(W3oError.SESSION_NOT_FOUND, { id });
        }
        const deletedSession = this.__sessions[id];
        delete this.__sessions[id];

        logger.log('Deleted session', { deletedSession });
        if (isCurrent) {
            const sessions = this.list;
            if (sessions.length > 0) {
                logger.log('Switching to the first session', { sessions });
                this.__current$.next(sessions[0]);
            } else {
                logger.log('No sessions left, setting current session to null');
                this.__current$.next(null);
            }
        }
    }

    /**
     * Sets the session with the given ID as the current session.
     */
    setCurrentSession(id: string, parent: W3oContext): void {
        logger.method('setCurrentSession', { id }, parent);
        const session = this.__sessions[id];
        if (!session) {
            throw new W3oError(W3oError.SESSION_NOT_FOUND, { id });
        }
        this.__current$.next(session);
        const netName = session.network.settings.name;
        if (this.octopus.networks.currentNetworkName !== netName) {
            this.octopus.networks.setCurrentNetwork(netName, parent);
        }
    }

    /**
     * Returns the current session instance.
     */
    getCurrentSession(parent: W3oContext): W3oSession | null {
        logger.method('getCurrentSession', parent);
        return this.current;
    }

    /**
     * Saves session information to localStorage.
     */
    saveSessions(parent: W3oContext): void {
        logger.method('saveSessions', parent);
        const stored: W3oStoredSessions = {
            currentSessionId: this.currentSessionId,
            sessions: Object.keys(this.__sessions),
        };
        logger.log('Saving sessions to local storage', { stored });
        //*
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
        /*/
        console.error('localStorage.setItem is disabled for now');
        //*/
    }

    /**
     * Loads sessions from localStorage and optionally performs autologin.
     */
    loadSessions(parent: W3oContext): Observable<void> {
        const context = logger.method('loadSessions', { currentSessionId: this.currentSessionId }, parent);
        const result$ = new Subject<void>();

        if (this.list.length > 0) {
            result$.error(new W3oError(
                W3oError.SESSION_ALREADY_EXISTS,
                { id: this.currentSessionId, message: 'close all sessions before loading' }
            ));
        }

        let stored: string | null = null;
        try {
            stored = localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            result$.error(new W3oError(
                W3oError.SESSION_LOAD_ERROR,
                { message: (e as Error).message }
            ));
        }

        if (!!stored) {
            // let isFirstSession = true;
            const data = JSON.parse(stored) as W3oStoredSessions;
            context.log('sessions found in local storage', { data });

            from(data.sessions).pipe(
                // Process each session ID sequentially
                concatMap((id) => {
                    const payload = W3oSession.splitId(id);
                    const network = this.octopus.networks.getNetwork(payload.networkName, context);
                    const authenticator = this.octopus.auth.createAuthenticator(network, payload.walletName, context);

                    context.log('Auto Login Session', { id });

                    // Return the login observable so concatMap chains it
                    return authenticator.autoLogin(payload.address, payload.networkName, context).pipe(
                        // delay(0),
                        tap((account) => {
                            context.log('authenticator.autoLogin.subscribe() -> (WharfkitInstance)', { account });
                            const session = this.createSession(
                                account.address,
                                account.authenticator,
                                account.authenticator.network,
                                context
                            );
                            if (data.currentSessionId === session.id) {
                                this.setCurrentSession(session.id, context);
                            }
                        }),
                        // delay(0),
                        // Keep sequence going even if one login fails
                        catchError((err) => {
                            context.error('authenticator.autoLogin.subscribe() -> (WharfkitInstance)', err);
                            return EMPTY;
                        }),
                        // Per-item completion log (optional)
                        finalize(() => {
                            context.log('authenticator.autoLogin.subscribe() -> complete', { id });
                        })
                    );
                }),
                // When ALL logins have completed (successes or handled errors), save sessions
                finalize(() => {
                    this.saveSessions(context);
                })
            ).subscribe();


        } else {
            context.log('no sessions found in local storage');
        }

        result$.next();
        result$.complete();
        return result$.pipe(
            tap(() => context.log('autoLogin completed')),
            mapTo(void 0)
        );
    }

    /**
     * Returns a snapshot of the internal session manager state.
     */
    snapshot(): any {
        return {
            currentSessionId: this.currentSessionId,
            sessionsKeys: Object.keys(this.__sessions),
            sessions: this.__sessions,
        };
    }
}
