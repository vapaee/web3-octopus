import {
    Logger,
    LoggerContext,
    W3oAuthenticator,
    W3oNetwork,
} from '.';
import { W3oAddress } from '../types';

const logger = new Logger('W3oSession');

// Representa una sesión, incluyendo métodos para obtener la cuenta y la red asociadas, almacenar y recuperar datos, y obtener un snapshot del estado interno
export class W3oSession {

    // propiedad estática que provee el separador que se usará para construir el ID de la sesión
    public static readonly ID_SEPARATOR = '--';

    // storage for user custom properties for the session
    private __storage: {[key in string]: any} = {};
    // identifier for the session
    private __id: string = '';

    constructor(
        public readonly address: W3oAddress, 
        public readonly authenticator: W3oAuthenticator, 
        public readonly network: W3oNetwork,
        parent: LoggerContext,
    ) {
        logger.method('constructor', {address, authenticator, network}, parent);
        this.__id = `${address}${W3oSession.ID_SEPARATOR}${authenticator.name}${W3oSession.ID_SEPARATOR}${network.name}`;
    }

    // Getter para obtener el ID de la sesión
    get id(): string {
        return this.__id;
    }
    
    // Método para almacenar un valor en la sesión
    set<TData>(key: string, value: TData): void {
        this.__storage[key] = value;
    }

    // Método para recuperar un valor de la sesión
    get<TData>(key: string): TData {
        return this.__storage[key] as TData;
    }

    // Método para eliminar un valor de la sesión
    remove(key: string): void {
        delete this.__storage[key];
    }

    // Metodo para obtener las claves almacenadas en la sesión
    keys(): string[] {
        return Object.keys(this.__storage);
    }

    // Método para tomar una instantánea del estado de la sesión
    snapshot(): any {
        return {
            authenticator: this.authenticator.snapshot(),
            network: this.network.snapshot(),
            __storage: { ...this.__storage }
        };
    }
}
