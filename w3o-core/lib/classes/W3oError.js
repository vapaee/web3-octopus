"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.W3oError = void 0;
// Representa un error específico dentro de Web3 Octopus
class W3oError {
    constructor(message, code, payload) {
        this.message = message;
        this.code = code;
        this.payload = payload;
    }
}
exports.W3oError = W3oError;
//# sourceMappingURL=W3oError.js.map