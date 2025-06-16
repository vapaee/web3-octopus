// w3o-core/src/classes/W3oModule.ts

import {
    BehaviorSubject,
    filter,
    Observable,
    take
} from 'rxjs';
import { W3oContextFactory, W3oContext } from './W3oContext';
import { W3oInstance } from '../types';

const logger = new W3oContextFactory('W3oModule');

/**
 * Abstract class that represents a reusable module with name, version and dependencies
 */
export abstract class W3oModule {
    // Static registry of all registered modules
    static modules: { [w3oId: string]: W3oModule } = {};

    /**
     * Registers a module in the static registry
     */
    static registerModule(module: W3oModule, parent: W3oContext): void {
        logger.method('registerModule', { w3oId: module.w3oId, module }, parent);
        if (W3oModule.modules[module.w3oId]) {
            throw new Error(`Module ${module.w3oId} already registered`);
        }
        W3oModule.modules[module.w3oId] = module;
    }

    /**
     * Returns a module from the registry by its ID
     */
    static getModule(w3oId: string, parent: W3oContext): W3oModule | undefined {
        logger.method('getModule', { w3oId }, parent);
        return W3oModule.modules[w3oId];
    }

    /**
     * Returns the full list of registered modules
     */
    static getModules(parent: W3oContext): W3oModule[] {
        logger.method('getModules', {}, parent);
        return Object.values(W3oModule.modules);
    }

    private __octopus!: W3oInstance;
    private __requirements!: W3oModule[];
    private __initialized$: BehaviorSubject<W3oModule | false> = new BehaviorSubject<W3oModule | false>(false);

    constructor(
        parent: W3oContext,
    ) {
        const context = logger.method('constructor', parent);

        context.log('context de this.w3oId.split("@")', { self: {...this} });
        const [name, version] = this.w3oId.split('@');
        context.log('Module name and version', { name, version });
        if (!!name && !!version) {
            context.log('Registering module', { w3oId: this.w3oId });
            W3oModule.registerModule(this, context);
        } else {
            context.error('w3oId. Module name or version is missing. We wait...');
            setTimeout(() => {
                context.error('w3oId', { w3oId: this.w3oId });
                if (!W3oModule.modules[this.w3oId]) {
                    context.error('Module not registered. Try to register yourself after W3oModule constructor', { w3oId: this.w3oId });
                }
            }, 0);
        }
    }

    /**
     * Observable that emits once the module is initialized
     */
    get initialized$(): Observable<W3oModule> {
        return this.__initialized$.asObservable().pipe(
            filter((value: false | W3oModule): value is W3oModule => value !== false),
            take(1),
        );
    }

    /**
     * Returns whether the module has been initialized
     */
    get initialized(): boolean {
        return this.__initialized$.getValue() !== false;
    }

    /**
     * Accessor for the Octopus instance, throws if not initialized
     */
    get octopus(): W3oInstance {
        if (!this.__octopus) {
            throw new Error(`Module(${this.w3oId}) not initialized. Try to initialize yourself after W3oModule constructor`);
        }
        return this.__octopus;
    }

    /**
     * Accessor for the list of module requirements, throws if not initialized
     */
    get requirements(): W3oModule[] {
        if (!this.__requirements) {
            throw new Error(`Module(${this.w3oId}) not initialized. Try to initialize yourself after W3oModule constructor`);
        }
        return this.__requirements;
    }

    /**
     * Initializes the module with Octopus instance and resolved dependencies
     */
    init(octopus: W3oInstance, requirements: W3oModule[], parent: W3oContext): void {
        logger.method('init', { w3oId: this.w3oId, octopus, requirements }, parent);
        this.__octopus = octopus;
        this.__requirements = requirements;
        this.__initialized$.next(this);
    }

    /**
     * Abstract: Returns module version
     */
    abstract get w3oVersion(): string;

    /**
     * Abstract: Returns module name
     */
    abstract get w3oName(): string;

    /**
     * Abstract: Returns list of module dependencies as w3oIds
     */
    abstract get w3oRequire(): string[];

    /**
     * Computed property combining module name and version
     */
    public get w3oId(): string {
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
