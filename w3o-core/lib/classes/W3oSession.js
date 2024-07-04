"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.W3oSession = void 0;
// Representa una sesión, incluyendo métodos para obtener la cuenta y la red asociadas, almacenar y recuperar datos, y obtener un snapshot del estado interno
class W3oSession {
    constructor(account, network) {
        this.account = account;
        this.network = network;
    }
    // Método para obtener el ID de la sesión
    getId() {
        // Implementar lógica para obtener el ID de la sesión
        return `${this.account.getAddress()}:${this.network.getName()}`;
    }
    // Método para obtener la cuenta asociada a la sesión
    getAccount() {
        // Implementar lógica para obtener la cuenta asociada a la sesión
        return this.account;
    }
    // Método para obtener la red asociada a la sesión
    getNetwork() {
        // Implementar lógica para obtener la red asociada a la sesión
        return this.network;
    }
    // Método para almacenar un valor en la sesión
    set(key, value) {
        // Implementar lógica para almacenar un valor en la sesión
    }
    // Método para recuperar un valor de la sesión
    get(key) {
        // Implementar lógica para recuperar un valor de la sesión
        return {}; // Valor neutro
    }
    // Método para eliminar un valor de la sesión
    remove(key) {
        // Implementar lógica para eliminar un valor de la sesión
    }
    // Método para tomar una instantánea del estado de la sesión
    snapshot() {
        // Implementar lógica para tomar una instantánea del estado de la sesión
        return {}; // Valor neutro
    }
}
exports.W3oSession = W3oSession;
//# sourceMappingURL=W3oSession.js.map