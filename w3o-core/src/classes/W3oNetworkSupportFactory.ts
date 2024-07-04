import {
    W3oAuthenticator,
    W3oNetwork,
} from '.';

import {
    W3oNetworkName,
    W3oNetworkType,
    W3oSupportSettings,
} from '../types';


// Representa la fábrica de soporte para múltiples redes y autenticadores, incluyendo métodos para obtener redes y autenticadores específicos, y obtener un snapshot del estado interno
export abstract class W3oNetworkSupportFactory<T, TNetwork extends W3oNetwork<T>, TAuthenticator extends W3oAuthenticator<T>> {
    constructor(public settings: W3oSupportSettings<T>) {}

    // Método para obtener el tipo de red
    abstract getNetworkType(): W3oNetworkType;

    // Método para obtener todas las redes
    getNetworks(): TNetwork[] {
        return this.settings.networks.map(network => network as TNetwork);
    }

    // Método para obtener todos los autenticadores
    getAuthenticators(): TAuthenticator[] {
        return this.settings.auth.map(auth => auth as TAuthenticator);
    }

    // Método para obtener una red por su nombre
    getNetwork(name: W3oNetworkName): TNetwork | undefined {
        return this.getNetworks().find(network => network.settings.name === name) as TNetwork;
    }

    // Método para obtener un autenticador por su nombre
    getAuthenticator(name: string): TAuthenticator | undefined {
        return this.getAuthenticators().find(auth => auth.name === name);
    }

    // Método para tomar una instantánea del estado de la fábrica
    snapshot(): any {
        return {
            networks: this.getNetworks().map(network => network.snapshot()),
            authenticators: this.getAuthenticators().map(auth => auth.snapshot()),
        };
    }
}
