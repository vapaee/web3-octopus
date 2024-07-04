import {
    W3oContractManager,
    W3oModule,
    W3oToken,
    Web3Octopus,
} from '.';

import {
    W3oNetworkSettings,
    W3oNetworkType,
} from '../types';

// Clase abstracta que representa una red específica, incluyendo métodos para obtener información sobre la red y sus contratos
export abstract class W3oNetwork<T> extends W3oModule<T> {
    constructor(
        public readonly settings: W3oNetworkSettings,
        public readonly w3o: Web3Octopus<T>,
    ) {
        super(w3o);
    }

    // Método abstracto para obtener el tipo de red
    abstract getNetworkType(): W3oNetworkType;

    // Método abstracto para obtener el manejador de contratos de la red
    abstract getContractManager(): W3oContractManager;

    // Método abstracto para obtener el token del sistema de la red
    abstract getSystemToken(): W3oToken;

    // Método abstracto para obtener la lista de tokens de la red
    abstract getTokensList(): Promise<W3oToken[]>;

    // Método abstracto para actualizar el estado de la red
    abstract updateState(): Promise<void>;

    // Método abstracto para tomar una instantánea del estado de la red
    abstract snapshot(): any;
}