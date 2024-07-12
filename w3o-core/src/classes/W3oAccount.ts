import {
    W3oAuthenticator,
} from '.';


// Representa una cuenta de usuario, incluyendo datos mínimos y una referencia a su autenticador
export abstract class W3oAccount {
    
    constructor(public readonly authenticator: W3oAuthenticator) {}

    // Método abstracto para obtener la dirección de la cuenta
    abstract getAddress(): string;

    // Método abstracto para tomar una instantánea del estado de la cuenta
    abstract snapshot(): any;
}