// w3o-core\src\classes\W3oSessionManager.ts

import { BehaviorSubject } from 'rxjs';
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
    W3oAddress,
    W3oGlobalSettings,
    W3oSessionInstance
} from '../types';

const logger = new Logger('W3oSessionManager');

interface W3oStoredSessions {
    currentSessionId: string | null;
    sessions: string[];
}

const STORAGE_KEY = 'w3o-sessions';

export class W3oSessionManager implements W3oSessionInstance {
    private __initialized = false;
    private __sessions: {[key: string]: W3oSession} = {};
    private __multiSession: boolean;
    private __autologin = false;

    public onSessionChange$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

    constructor(settings: W3oGlobalSettings, parent: LoggerContext) {
        const context = logger.method('constructor', {settings}, parent);
        this.__multiSession = settings.multiSession;
        this.__autologin = settings.autoLogin;
        Web3Octopus.instance.networks.onNetworkChange$.subscribe(() => {
            this.onSessionChange$.next(null);
        });

        this.onSessionChange$.subscribe(() => {
            context.log('session change detected');
            this.saveSessions(context);
        });
    }

    // Getter para obtener el ID de la sesión actual
    get currentSessionId(): string | null {
        return this.onSessionChange$.value;
    }

    // Getter para obtener la sesión actual
    get current() {
        const id = this.currentSessionId;
        if (!id) {
            throw new W3oError(W3oError.SESSION_NOT_FOUND, { id })
        }
        return this.__sessions[id];        
    }

    // Getter para obtener la lista de sesiones
    get list(): W3oSession[] {
        return Object.values(this.__sessions);
    }
    
    // Getter para obtener si se permite multi-sesión
    get isMultiSession(): boolean {
        return this.__multiSession;
    }

    // Método para inicializar el manejador de sesiones
    init(parent: LoggerContext) {
        const context = logger.method('init', undefined, parent);
        if (this.__initialized) {
            throw new W3oError(W3oError.ALREADY_INITIALIZED, { name: 'W3oSessionManager', message: 'Session manager already initialized' });
        }
        this.__initialized = true;
        this.loadSessions(context);
    }

    // Método para crear una sesión
    createSession(
        address: W3oAddress, 
        authenticator: W3oAuthenticator, 
        network: W3oNetwork,
        parent: LoggerContext
    ): W3oSession {
        const context = logger.method('createSession', { address, authenticator, network }, parent);
        const session = new W3oSession(address, authenticator, network, context);
        // verificamos que la sessión no exista y la agregamos
        if (this.__sessions[session.id]) {
            throw new W3oError(W3oError.SESSION_ALREADY_EXISTS, { id: session.id });
        }
        this.__sessions[session.id] = session;
        authenticator.setSessionId(session.id, context);
        return session;
    }

    // Método para crear una sesión y setearla como la sesión actual
    createCurrentSession(
        address: W3oAddress, 
        authenticator: W3oAuthenticator, 
        network: W3oNetwork,
        parent: LoggerContext
    ): W3oSession {
        const context = logger.method('createCurrentSession', { address, authenticator, network }, parent);
        const session = this.createSession(address, authenticator, network, context);
        // verificamos que la sessión no exista
        if (this.__sessions[session.id]) {
            throw new W3oError(W3oError.SESSION_ALREADY_EXISTS, { id: session.id, message: 'use setCurrentSession(id) instead' });
        }
        this.setCurrentSession(session.id, parent);
        return session;
    }

    // Método para obtener una sesión por su ID
    getSession(id: string, parent: LoggerContext): W3oSession {
        logger.method('getSession', { id }, parent);
        const session = this.__sessions[id];
        if (!session) {
            throw new W3oError(W3oError.SESSION_NOT_FOUND, { id })
        }
        return session;
    }

    // Método para obtener todas las sesiones
    getSessions(parent: LoggerContext): W3oSession[] {
        logger.method('getSessions', undefined, parent);
        return this.list;
    }

    // Método para eliminar una sesión por su ID
    deleteSession(id: string, parent: LoggerContext): void {
        logger.method('deleteSession', { id }, parent);
        if (!this.__sessions[id]) {
            throw new W3oError(W3oError.SESSION_NOT_FOUND, { id })
        }
        delete this.__sessions[id];
        this.onSessionChange$.next(null);
    }

    // Método para establecer la sesión actual
    setCurrentSession(id: string, parent: LoggerContext): void {
        logger.method('setCurrentSession', { id }, parent);
        if (!this.__sessions[id]) {
            throw new W3oError(W3oError.SESSION_NOT_FOUND, { id })
        }
        this.onSessionChange$.next(id);
    }

    // Método para obtener la sesión actual
    getCurrentSession(parent: LoggerContext): W3oSession {
        logger.method('getCurrentSession', undefined, parent);
        return this.current;
    }

    // Método para salvar en local storage la información de las sessiones abiertas y cual es la actual
    saveSessions(parent: LoggerContext): void {
        logger.method('saveSessions', undefined, parent);
        const stored: W3oStoredSessions = {
            currentSessionId: this.currentSessionId,
            sessions: Object.keys(this.__sessions),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    }

    // Método para cargar desde local storage la información de las sessiones abiertas y cual es la actual
    loadSessions(parent: LoggerContext): void {
        const context = logger.method('loadSessions', undefined, parent);
        // primero verificamos que no haya sesiones abiertas
        if (this.list.length > 0) {
            throw new W3oError(W3oError.SESSION_ALREADY_EXISTS, { id: this.currentSessionId, message: 'close all sessions before loading' });
        }
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                context.log('sessions found in local storage');
                const data = JSON.parse(stored) as W3oStoredSessions;
                const separator = W3oSession.ID_SEPARATOR;
                for (const id of data.sessions) {
                    const [address, authName, netwokName] = id.split(separator);
                    const network = Web3Octopus.instance.networks.getNetwork(netwokName, context);
                    const authenticator = Web3Octopus.instance.auth.createAuthenticator(authName, context);
                    this.createSession(address, authenticator, network, context);
                }
                if (this.__autologin && data.currentSessionId) {
                    const session = this.__sessions[data.currentSessionId];
                    if (!session) {
                        throw new W3oError(W3oError.SESSION_NOT_FOUND, {
                            id: data.currentSessionId,
                            message: 'could not perform autologin'
                        });
                    }
                    session.authenticator.autoLogin(session.network.settings.name, session.address, context).subscribe(() => {
                        this.setCurrentSession(session.id, context);
                    });
                }
            } else {
                context.log('no sessions found in local storage');
            }
        } catch (e) {
            throw new W3oError(W3oError.SESSION_LOAD_ERROR, { message: (e as {message: string}).message })
        }
    }

    // Método para tomar una instantánea del estado del manejador de sesiones
    snapshot(): any {
        return {
            currentSessionId: this.currentSessionId,
            sessions: Object.keys(this.__sessions),
        };
    }
}
