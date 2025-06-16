// w3o-core/src/classes/W3oModule.ts
import { BehaviorSubject, filter, take } from 'rxjs';
import { W3oContextFactory } from './W3oContext';
const logger = new W3oContextFactory('W3oModule');
/**
 * Abstract class that represents a reusable module with name, version and dependencies
 */
export class W3oModule {
    /**
     * Registers a module in the static registry
     */
    static registerModule(module, parent) {
        logger.method('registerModule', { w3oId: module.w3oId, module }, parent);
        if (W3oModule.modules[module.w3oId]) {
            throw new Error(`Module ${module.w3oId} already registered`);
        }
        W3oModule.modules[module.w3oId] = module;
    }
    /**
     * Returns a module from the registry by its ID
     */
    static getModule(w3oId, parent) {
        logger.method('getModule', { w3oId }, parent);
        return W3oModule.modules[w3oId];
    }
    /**
     * Returns the full list of registered modules
     */
    static getModules(parent) {
        logger.method('getModules', {}, parent);
        return Object.values(W3oModule.modules);
    }
    constructor(parent) {
        this.__initialized$ = new BehaviorSubject(false);
        const context = logger.method('constructor', parent);
        const [name, version] = this.w3oId.split('@');
        if (!!name && !!version) {
            W3oModule.registerModule(this, context);
        }
        else {
            setTimeout(() => {
                if (!W3oModule.modules[this.w3oId]) {
                    context.error('Module not registered. Try to register yourself after W3oModule constructor', { w3oId: this.w3oId });
                }
            }, 0);
        }
    }
    /**
     * Observable that emits once the module is initialized
     */
    get initialized$() {
        return this.__initialized$.asObservable().pipe(filter((value) => value !== false), take(1));
    }
    /**
     * Returns whether the module has been initialized
     */
    get initialized() {
        return this.__initialized$.getValue() !== false;
    }
    /**
     * Accessor for the Octopus instance, throws if not initialized
     */
    get octopus() {
        if (!this.__octopus) {
            throw new Error(`Module(${this.w3oId}) not initialized. Try to initialize yourself after W3oModule constructor`);
        }
        return this.__octopus;
    }
    /**
     * Accessor for the list of module requirements, throws if not initialized
     */
    get requirements() {
        if (!this.__requirements) {
            throw new Error(`Module(${this.w3oId}) not initialized. Try to initialize yourself after W3oModule constructor`);
        }
        return this.__requirements;
    }
    /**
     * Initializes the module with Octopus instance and resolved dependencies
     */
    init(octopus, requirements, parent) {
        logger.method('init', { w3oId: this.w3oId, octopus, requirements }, parent);
        this.__octopus = octopus;
        this.__requirements = requirements;
        this.__initialized$.next(this);
    }
    /**
     * Computed property combining module name and version
     */
    get w3oId() {
        return this.w3oName + '@' + this.w3oVersion;
    }
    /**
     * Returns a snapshot of this module’s metadata
     */
    snapshot() {
        return {
            w3oId: this.w3oId,
            w3oName: this.w3oName,
            w3oVersion: this.w3oVersion,
            w3oRequire: this.w3oRequire,
        };
    }
}
// Static registry of all registered modules
W3oModule.modules = {};
