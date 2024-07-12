import {
    Logger,
    LoggerContext,
    W3oError,
    W3oModule,
} from '.';

import { combineLatest, BehaviorSubject } from 'rxjs';
import {
    W3oGlobalSettings,
    W3oModuleInstance
} from '../types';

const logger = new Logger('W3oModuleManager');

// Clase que implementa un administrador de módulos
export class W3oModuleManager implements W3oModuleInstance {
    private __initialized = false;
    private __modules: { [w3oId: string]: W3oModule } = {};
    
    constructor(settings: W3oGlobalSettings, parent: LoggerContext) {
        logger.method('constructor', {settings}, parent);
    }

    registerModule(module: W3oModule, parent: LoggerContext): void {
        logger.method('registerModule', { module }, parent);
        if (this.__initialized) {
            throw new W3oError(W3oError.ALREADY_INITIALIZED, { name: 'W3oModuleManager', message: 'modules cannot be registered after initialization' });
        }
        this.__modules[module.w3oId] = module;
    }

    init(parent: LoggerContext) {
        logger.method('init', undefined, parent);
        if (this.__initialized) {
            throw new W3oError(W3oError.ALREADY_INITIALIZED, { name: 'W3oModuleManager', message: 'Module manager already initialized' });
        }
        this.__initialized = true;
        for (const w3oId in this.__modules) {
            // vamos a checkear que para cada módulo, se cumple que todos los módulos requeridos están registrados
            const module = this.__modules[w3oId];
            const missing = module.w3oRequire.filter((w3oId) => !this.__modules[w3oId]);
            if (missing.length) {
                throw new W3oError(W3oError.MODULE_REQUIREMENTS_NOT_MET, {
                    module: module.w3oId,
                    missing,
                    message: `Module ${module.w3oId} requires modules ${missing.join(', ')} to be registered`
                });
            }
            if (module.w3oRequire.length === 0) {
                // Si no tiene requerimientos lo iniciamos inmediatamente
                module.init();
            } else {
                // si tiene requerimientos, esperamos a que todos los requerimientos estén inicializados
                const requirements: BehaviorSubject<boolean>[] = module.w3oRequire.map((w3oId) => this.__modules[w3oId].initialized$);
                // usamos rxjs para esperar a que todos los requerimientos estén inicializados y luego iniciamos el módulo
                combineLatest(requirements).subscribe(() => {
                    // hacemos un checkeo adicional para asegurarnos de que todos los requerimientos están inicializados
                    const missing_init = module.w3oRequire.filter((w3oId) => !this.__modules[w3oId].initialized$.value);
                    if (missing_init.length) {
                        throw new W3oError(W3oError.MODULE_REQUIREMENTS_NOT_MET, {
                            module: module.w3oId,
                            not_initialized: missing_init.map((w3oId) => this.__modules[w3oId].w3oId),
                            message: `Module ${module.w3oId} requires modules ${missing_init.join(', ')} to be initialized`
                        });
                    }
                    module.init()
                });
            }
        }
    }
}