import { BehaviorSubject } from 'rxjs';
import {
    W3oAccount,
    W3oError,
    W3oNetwork,
    W3oSession,
} from '.';

export class W3oSessionManager {
    private sessions: {[key: string]: W3oSession<any>} = {};
    public currentSessionId$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

    get currentSessionId(): string | null {
        return this.currentSessionId$.value;
    }

    // Método para crear una sesión
    createSession(account: W3oAccount, network: W3oNetwork<any>): W3oSession<any> {
        const session = new W3oSession(account, network);
        this.sessions[session.getId()] = session;
        this.setCurrentSession(session.getId());
        return session;
    }

    // Método para abrir una sesión
    openSession(account: W3oAccount): W3oSession<any> {
        /*
        TODO: para implementar este método necesitamos tener una referencia al manejador de Networks para pedirle el network actual y así poder crear la sesión y setearla como la sesión actual
        */
        return {} as W3oSession<any>;
    }

    // Método para obtener una sesión por su ID
    getSession(id: string): W3oSession<any> {
        const session = this.sessions[id];
        if (!session) {
            throw new W3oError(W3oError.SESSION_NOT_FOUND.message, W3oError.SESSION_NOT_FOUND.code, { id })
        }
        return session;
    }

    // Método para obtener todas las sesiones
    getSessions(): W3oSession<any>[] {
        return Object.values(this.sessions);
    }

    // Método para eliminar una sesión por su ID
    deleteSession(id: string): void {
        if (!this.sessions[id]) {
            throw new W3oError(W3oError.SESSION_NOT_FOUND.message, W3oError.SESSION_NOT_FOUND.code, { id })
        }
        delete this.sessions[id];
        this.currentSessionId$.next(null);
    }

    // Método para establecer la sesión actual
    setCurrentSession(id: string): void {
        if (!this.sessions[id]) {
            throw new W3oError(W3oError.SESSION_NOT_FOUND.message, W3oError.SESSION_NOT_FOUND.code, { id })
        }
        this.currentSessionId$.next(id);
    }

    // Método para obtener la sesión actual
    getCurrentSession(): W3oSession<any> {
        if (!this.currentSessionId) {
            throw new Error('No current session set');
        }
        return this.sessions[this.currentSessionId];
    }

    // Método para tomar una instantánea del estado del manejador de sesiones
    snapshot(): any {
        return {
            currentSessionId: this.currentSessionId,
            sessions: Object.keys(this.sessions),
        };
    }
}
