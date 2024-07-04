import {
    W3oAccount,
    W3oNetwork,
} from '.';

// Representa una sesión, incluyendo métodos para obtener la cuenta y la red asociadas, almacenar y recuperar datos, y obtener un snapshot del estado interno
export class W3oSession<T> {
    private storage: {[key in string]: any} = {};

    constructor(public account: W3oAccount, public network: W3oNetwork<T>) {}

    // Método para obtener el ID de la sesión
    getId(): string {
        // Implementar lógica para obtener el ID de la sesión
        return `${this.account.getAddress()}:${this.network.settings.name}`;
    }

    // Método para obtener la cuenta asociada a la sesión
    getAccount(): W3oAccount {
        return this.account;
    }

    // Método para obtener la red asociada a la sesión
    getNetwork(): W3oNetwork<T> {
        return this.network;
    }

    // Método para almacenar un valor en la sesión
    set<TData>(key: string, value: TData): void {
        this.storage[key] = value;
    }

    // Método para recuperar un valor de la sesión
    get<TData>(key: string): TData {
        return this.storage[key] as TData;
    }

    // Método para eliminar un valor de la sesión
    remove(key: string): void {
        delete this.storage[key];
    }

    // Método para tomar una instantánea del estado de la sesión
    snapshot(): any {
        return {
            account: this.account,
            network: this.network,
            storage: { ...this.storage }
        };
    }
}
