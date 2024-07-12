import {
    W3oContract,
} from '.';


// Representa un token, incluyendo métodos para obtener información del token y su contrato asociado
export abstract class W3oToken {

    // Getter para obtener el símbolo del token
    get symbol(): string {
        return this.getSymbol();
    }

    // Getter para obtener al dirección del contrato del token
    get address(): string {
        return this.getContract().address;
    }

    // Método abstracto para verificar si es el token del sistema
    abstract isSystemToken(): boolean;

    // Método abstracto para obtener la URL del icono del token
    abstract getIconUrl(): string;

    // Método abstracto para obtener el nombre para mostrar del token
    abstract getDisplayName(): string;

    // Método abstracto para obtener el símbolo del token
    abstract getSymbol(): string;

    // Método abstracto para obtener los decimales del token
    abstract getDecimals(): number;

    // Método abstracto para obtener el precio en USD del token
    abstract getUSDPrice(): number;

    // Método abstracto para obtener el contrato del token
    abstract getContract(): W3oContract;

    // Método abstracto para tomar una instantánea del estado del token
    abstract snapshot(): any;
}
