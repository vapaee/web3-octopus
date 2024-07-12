import { Observable } from 'rxjs';
import {
    Logger,
    LoggerContext,
    W3oContractManager,
    W3oModule,
    W3oToken,
} from '.';

import {
    W3oNetworkSettings,
    W3oNetworkType,
} from '../types';

const logger = new Logger('W3oNetwork');

// Clase abstracta que representa una red específica, incluyendo métodos para obtener información sobre la red y sus contratos
export abstract class W3oNetwork extends W3oModule {
    private __contractCtrl: W3oContractManager;

    constructor(
        public readonly settings: W3oNetworkSettings,
        parent: LoggerContext
    ) {
        const context = logger.method('constructor', {settings}, parent);
        super();
        this.__contractCtrl = this.createContractManager(this, context);
    }

    // Getter para obtener el tipo de red
    get type(): W3oNetworkType {
        return this.settings.type;
    }

    // Getter para obtener el nombre de la red
    get name(): string {
        return this.settings.name;
    }
    
    // Método abstracto para obtener el tipo de red
    getNetworkType(): W3oNetworkType {
        return this.type;
    }

    // Método para obtener un token a partir de su dirección o symbolo
    getToken(token: string, parent: LoggerContext): W3oToken | null {
        logger.method('getToken', {token}, parent);
        return this.getTokensList().find(t => t.symbol === token || t.address === token) || null;
    }

    // Método para obtener el manejador de contratos de la red
    getContractManager(): W3oContractManager {
        return this.__contractCtrl;
    }

    // Método abstracto para crear el contract manager específico de la red
    abstract createContractManager(network: W3oNetwork, parent: LoggerContext): W3oContractManager;

    // Método abstracto para obtener el token del sistema de la red
    abstract getSystemToken(): W3oToken;

    // Método abstracto para obtener la lista de tokens de la red
    abstract getTokensList(): W3oToken[];

    // Método abstracto para actualizar el estado de la red
    abstract updateState(): Observable<void>;

    // Método abstracto para tomar una instantánea del estado de la red
    abstract snapshot(): any;
}