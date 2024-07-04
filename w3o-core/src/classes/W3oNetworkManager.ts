import {
    W3oError,
    W3oNetwork,
} from '.';

import {
    W3oNetworkName,
} from '../types';


// Representa un manejador de redes, incluyendo métodos para registrar, obtener y listar redes, y actualizar el estado
export class W3oNetworkManager<T> {
    private __networks: W3oNetwork<T>[] = [];
    private __currentNetwork: W3oNetwork<T>;

    constructor() {
        this.__currentNetwork = {} as W3oNetwork<T>;
    }

    get networks(): W3oNetwork<T>[] {
        return this.__networks;
    }

    // Método para registrar una red
    registerNetwork(network: W3oNetwork<T>): void {
        this.__networks.push(network);
    }

    // Método para obtener una red por su nombre
    getNetwork(name: W3oNetworkName): W3oNetwork<T> | undefined {
        return this.__networks.find(network => network.settings.name === name) as W3oNetwork<T>;
    }

    // Método para establecer la red actual
    setCurrentNetwork(name: W3oNetworkName): void {
        const net =  this.getNetwork(name) as W3oNetwork<T>;
        if (!net) {
            throw new W3oError(W3oError.NETWORK_NOT_FOUND.message, W3oError.NETWORK_NOT_FOUND.code, { name });
        }
        this.__currentNetwork = net;
    }

    // Método para obtener la red actual
    getCurrentNetwork(): W3oNetwork<T> {
        return this.__currentNetwork;
    }
    
    // Método para actualizar el estado de todas las redes
    async updateState(): Promise<void> {
        for (const network of this.__networks) {
            await network.updateState();
        }
    }

    // Método para tomar una instantánea del estado del manejador de redes
    snapshot(): any {
        return {
            networks: this.__networks.map(network => network.snapshot()),
            currentNetwork: this.__currentNetwork.snapshot(),
        };
    }
}
