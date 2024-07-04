"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOctopus = exports.W3oService = void 0;
const _1 = require(".");
// Clase abstracta que representa un módulo, incluyendo un método para inicializar el módulo y obtener un snapshot del estado interno
class W3oService {
    constructor(path, w3o) {
        this.path = path;
    }
}
exports.W3oService = W3oService;
// -- ejemplo de uso --
class MyServiceClass extends W3oService {
    constructor(path, w3o) {
        super(path, w3o);
        this.path = path;
    }
    init(w3o) {
        console.log('init');
    }
    snapshot() {
        return {};
    }
    hello() {
        console.log('hello');
    }
}
const octopus = new _1.Web3Octopus();
const myService = new MyServiceClass('foo', octopus);
function getOctopus() {
    return octopus;
}
exports.getOctopus = getOctopus;
// --
const oct = getOctopus();
oct.services.foo.hello();
//# sourceMappingURL=W3oService.js.map