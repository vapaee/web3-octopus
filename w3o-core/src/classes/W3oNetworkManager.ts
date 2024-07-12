// w3o-core\src\classes\W3oNetworkManager.ts
import { BehaviorSubject } from 'rxjs';
import {
    Logger,
    LoggerContext,
    W3oError,
    W3oNetwork,
} from '.';

import {
    W3oGlobalSettings,
    W3oNetworkInstance,
    W3oNetworkName,
} from '../types';

const logger = new Logger('W3oNetworkManager');

// Representa un manejador de redes, incluyendo métodos para registrar, obtener y listar redes, y actualizar el estado
export class W3oNetworkManager implements W3oNetworkInstance {
    private __initialized = false;
    private __networks: W3oNetwork[] = [];

    public onNetworkChange$: BehaviorSubject<W3oNetworkName | null> = new BehaviorSubject<string | null>(null);

    constructor(settings: W3oGlobalSettings, parent: LoggerContext) {
        logger.method('constructor', {settings}, parent);
    }

    // Getter para obtener el nombre de la red actual
    get currentNetworkName(): string | null {
        return this.onNetworkChange$.value;
    }

    // Getter para obtener la red actual
    get current() {
        const name = this.currentNetworkName;
        if (!name) {
            throw new W3oError(W3oError.NETWORK_NOT_FOUND, { name });
        }
        return this.getNetwork(name, Logger.current);        
    }

    // Getter para obtener la lista de redes
    get list(): W3oNetwork[] {
        return this.__networks;
    }

    // Método para inicializar el manejador de redes
    init(parent?: LoggerContext) {
        const context = logger.method('init', undefined, parent);
        if (this.__initialized) {
            throw new W3oError(W3oError.ALREADY_INITIALIZED, { name: 'W3oNetworkManager', message: 'Network manager already initialized' });
        }
        this.__initialized = true;
        context.log('Not implemented yet');
    }

    // Método para registrar una red
    addNetwork(network: W3oNetwork, parent: LoggerContext): void {
        logger.method('addNetwork', { network }, parent);
        this.__networks.push(network);
    }

    // Método para obtener una red por su nombre
    getNetwork(name: W3oNetworkName, parent: LoggerContext): W3oNetwork {
        logger.method('getNetwork', { name }, parent);
        const network = this.__networks.find(network => network.settings.name === name);
        if (!network) {
            throw new W3oError(W3oError.NETWORK_NOT_FOUND, { name });
        }
        return network;
    }

    // Método para establecer la red actual
    setCurrentNetwork(name: W3oNetworkName, parent: LoggerContext): void {
        const context = logger.method('setCurrentNetwork', { name }, parent);
        const net =  this.getNetwork(name, context) as W3oNetwork;
        if (!net) {
            throw new W3oError(W3oError.NETWORK_NOT_FOUND, { name });
        }
        this.onNetworkChange$.next(name);
    }

    // Método para obtener la red actual
    getCurrentNetwork(): W3oNetwork {
        return this.current;
    }
    
    // Método para actualizar el estado de todas las redes
    // TODO: cambiar el tipo de retorno a Observable y hacer que los networks sean actualizados todos a las vez y no secuencialmente (remove this comment when implemented)
    async updateState(): Promise<void> {
        for (const network of this.__networks) {
            await network.updateState(); // asumir que devuelve un observable
        }
    }

    // Método para tomar una instantánea del estado del manejador de redes
    snapshot(): any {
        return {
            networks: this.__networks.map(network => network.snapshot()),
            currentNetwork: this.getCurrentNetwork().snapshot(),
        };
    }
}
