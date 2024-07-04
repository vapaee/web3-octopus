import {
    W3oContractABI
} from '../types';

// Representa un contrato, incluyendo métodos para obtener su ABI y un snapshot del estado interno
export abstract class W3oContract {
    // Método abstracto para obtener el ABI del contrato
    abstract getABI(): Promise<W3oContractABI>;

    // Método abstracto para tomar una instantánea del estado del contrato
    abstract snapshot(): any;
}