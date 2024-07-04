"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.W3oModule = void 0;
const rxjs_1 = require("rxjs");
// Clase abstracta que representa un módulo (authenticador, network o servicio), el API mínimo y la lista de sus dependencias
// El Manejador de Módulos de W3O se encarga de inicializar los módulos y sus dependencias
// Y de alertar cuando alguna dependencia no se cumpla.
class W3oModule {
    constructor(w3o) {
        this.w3o = w3o;
        this.initilized$ = new rxjs_1.BehaviorSubject(false);
    }
}
exports.W3oModule = W3oModule;
//# sourceMappingURL=W3oModule.js.map