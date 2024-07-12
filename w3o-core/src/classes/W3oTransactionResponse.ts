import { Observable } from 'rxjs';
import { W3oTransactionReceipt } from '../types';

// Representa la respuesta de una transacción, incluyendo el hash de la transacción y una función para esperar el recibo
export abstract class W3oTransactionResponse {
    constructor(public hash: string) {}

    // Método abstracto para esperar el recibo de la transacción
    abstract wait(): Observable<W3oTransactionReceipt>;
}