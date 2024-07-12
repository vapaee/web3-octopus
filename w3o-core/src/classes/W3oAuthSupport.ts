
import { Observable } from 'rxjs';
import {
    Logger,
    LoggerContext,
    W3oAccount,
    W3oAuthenticator,
    W3oModule,
    W3oTransactionResponse,
} from '.';
import {
    W3oAddress,
    W3oAuthSupportName,
    W3oNetworkName,
    W3oNetworkType,
    W3oTransaction
} from '../types';

const logger = new Logger('W3oAuthSupport');

// Clase abstracta que representa un autenticador de usuario
export abstract class W3oAuthSupport extends W3oModule {
    constructor(
        public readonly name: W3oAuthSupportName,
        public readonly type: W3oNetworkType,
    ) {
        super();
    }

    // Método para crear un autenticador
    createAuthenticator(parent: LoggerContext): W3oAuthenticator {
        logger.method('createAuthenticator', undefined, parent);
        return new W3oAuthenticator(this);
    }

    // Método abstracto para verificar si el autenticador es de solo lectura
    abstract isReadOnly(): boolean;
    
    // Método abstracto para firmar una transacción
    abstract signTransaction(trx: W3oTransaction, parent: LoggerContext): Observable<W3oTransactionResponse>;
    
    // Método abstracto para iniciar sesión en una red específica
    abstract login(network: W3oNetworkName, parent: LoggerContext): Observable<W3oAccount>;
    
    // Método abstracto para iniciar sesión automáticamente en una red específica
    abstract autoLogin(network: W3oNetworkName, address: W3oAddress, parent: LoggerContext): Observable<W3oAccount>;
    
    // Método abstracto para cerrar sesión
    abstract logout(parent: LoggerContext): void;

    // Método abstracto para tomar una instantánea del estado del autenticador
    abstract snapshot(): any;
    
}
