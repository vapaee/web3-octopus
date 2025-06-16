import { Observable } from 'rxjs';
import { W3oAddress, W3oGlobalSettings, W3oInstance, W3oSessionInstance } from '../types';
import { W3oContext } from './W3oContext';
import { W3oNetwork } from './W3oNetwork';
import { W3oAuthenticator } from './W3oAuthenticator';
import { W3oSession } from './W3oSession';
import { W3oManager } from './W3oManager';
/**
 * Manages user sessions including creation, retrieval, deletion, and persistence.
 */
export declare class W3oSessionManager extends W3oManager implements W3oSessionInstance {
    /**
     * Stores all active sessions indexed by session ID.
     */
    private __sessions;
    /**
     * Flag indicating whether multiple sessions are allowed.
     */
    private __multiSession;
    /**
     * Flag indicating whether autoLogin is enabled.
     */
    private __autologin;
    /**
     * BehaviorSubject that holds the current active session.
     */
    private __current$;
    /**
     * Reference to the Octopus instance that initialized the manager.
     */
    octopus: W3oInstance;
    constructor(settings: W3oGlobalSettings, parent: W3oContext);
    /**
     * Observable stream of the current session.
     */
    get current$(): Observable<W3oSession | null>;
    /**
     * Returns the ID of the current session, or null if no session is set.
     */
    get currentSessionId(): string | null;
    /**
     * Returns the current session instance, or null if not set.
     */
    get current(): W3oSession | null;
    /**
     * Returns a list of all stored session instances.
     */
    get list(): W3oSession[];
    /**
     * Indicates whether multiple sessions are supported.
     */
    get isMultiSession(): boolean;
    /**
     * Initializes the session manager with an octopus instance and subscribes to network change events.
     */
    init(octopus: W3oInstance, parent: W3oContext): void;
    /**
     * Creates a new session for a specific address, authenticator, and network.
     */
    createSession(address: W3oAddress, authenticator: W3oAuthenticator, network: W3oNetwork, parent: W3oContext): W3oSession;
    /**
     * Creates a new session and sets it as the current session.
     */
    createCurrentSession(address: W3oAddress, authenticator: W3oAuthenticator, network: W3oNetwork, parent: W3oContext): W3oSession;
    /**
     * Retrieves a session by ID or throws if not found.
     */
    getSession(id: string, parent: W3oContext): W3oSession;
    /**
     * Retrieves a session from the context instance. (Currently hardcoded context.sessionId)
     */
    getSessionFromContext(parent: W3oContext): W3oSession;
    /**
     * Returns a list of all existing sessions.
     */
    getSessions(parent: W3oContext): W3oSession[];
    /**
     * Deletes the session with the specified ID.
     * If it is the current session, another is selected or current is set to null.
     */
    deleteSession(id: string, parent: W3oContext): void;
    /**
     * Sets the session with the given ID as the current session.
     */
    setCurrentSession(id: string, parent: W3oContext): void;
    /**
     * Returns the current session instance.
     */
    getCurrentSession(parent: W3oContext): W3oSession | null;
    /**
     * Saves session information to localStorage.
     */
    saveSessions(parent: W3oContext): void;
    /**
     * Loads sessions from localStorage and optionally performs autologin.
     */
    loadSessions(parent: W3oContext): Observable<void>;
    /**
     * Returns a snapshot of the internal session manager state.
     */
    snapshot(): any;
}
//# sourceMappingURL=W3oSessionManager.d.ts.map