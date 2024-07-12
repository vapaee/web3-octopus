
import {
    W3oContractABI
} from '../types';
import { Logger, LoggerContext } from './Logger';

const logger = new Logger('W3oContract');

// Representa un contrato, incluyendo métodos para obtener su ABI y un snapshot del estado interno
export abstract class W3oContract {

    constructor(
        public readonly address: string,
        public readonly name: string,
        public readonly abi: W3oContractABI,
        parent: LoggerContext
    ) {
        logger.method('constructor', { address, name, abi }, parent);
    }

    // Método para tomar una instantánea del estado del contrato
    snapshot(): any {
        return {
            address: this.address,
            name: this.name,
            abi: this.abi,
        };
    }
}