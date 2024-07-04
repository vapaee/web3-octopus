
import {
    W3oAccount,
    W3oModule,
    W3oTransactionResponse,
    Web3Octopus,
} from '.';
import {
    W3oAddress,
    W3oNetworkName,
    W3oNetworkType,
    W3oTransaction
} from '../types';

// Clase abstracta que representa un autenticador de usuario
export abstract class W3oAuthenticator<T> extends W3oModule<T> {
    constructor(
        public readonly name: string,
        public readonly type: W3oNetworkType,
        public readonly w3o: Web3Octopus<T>
    ) {
        super(w3o);
    }

    // Método abstracto para verificar si el usuario está autenticado
    abstract isLogged(): boolean;

    // Método abstracto para obtener la dirección del usuario
    abstract getAddress(): W3oAddress;

    // Método abstracto para obtener la cuenta del usuario
    abstract getAccount(): W3oAccount;

    // Método abstracto para verificar si el autenticador es de solo lectura
    abstract isReadOnly(): boolean;

    // Método abstracto para firmar una transacción
    abstract signTransaction(trx: W3oTransaction): Promise<W3oTransactionResponse>;

    // Método abstracto para iniciar sesión en una red específica
    abstract login(network: W3oNetworkName): Promise<W3oAddress>;

    // Método abstracto para iniciar sesión automáticamente en una red específica
    abstract autoLogin(network: W3oNetworkName, address: W3oAddress): Promise<W3oAddress>;

    // Método abstracto para iniciar seción pero en modo de solo lectura (exploratorio)
    abstract setReadOnly(network: W3oNetworkName, address: W3oAddress): Promise<W3oAddress>;

    // Método abstracto para tomar una instantánea del estado del autenticador
    abstract snapshot(): any;
}
