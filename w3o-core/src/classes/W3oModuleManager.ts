import {
    W3oModule,
    Web3Octopus,
} from '.';

import { combineLatest, BehaviorSubject } from 'rxjs';

// Clase que implementa un administrador de módulos
export class W3oModuleManager<T> {
    _modules: { [w3oId: string]: W3oModule<T> } = {};
    constructor(public readonly w3o: Web3Octopus<T>) { }

    registerModule(module: W3oModule<T>): void {
        this._modules[module.w3oId] = module;        
    }

    init() {
        for (const w3oId in this._modules) {
            // vamos a checkear que para cada módulo, se cumple que todos los módulos requeridos están registrados
            const module = this._modules[w3oId];
            const missing = module.w3oRequire.filter((w3oId) => !this._modules[w3oId]);
            if (missing.length) {
                throw new Error(`Module ${module.w3oId} requires modules ${missing.join(', ')} to be registered`);
            }
            if (module.w3oRequire.length === 0) {
                // Si no tiene requerimientos lo iniciamos inmediatamente
                module.init();
            } else {
                // si tiene requerimientos, esperamos a que todos los requerimientos estén inicializados
                const requirements: BehaviorSubject<boolean>[] = module.w3oRequire.map((w3oId) => this._modules[w3oId].initialized$);
                // usamos rxjs para esperar a que todos los requerimientos estén inicializados y luego iniciamos el módulo
                combineLatest(requirements).subscribe(() => module.init());
            }
        }
    }
}