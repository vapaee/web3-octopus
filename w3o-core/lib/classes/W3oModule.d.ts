import { Observable } from 'rxjs';
import { W3oContext } from './W3oContext';
import { W3oInstance } from '../types';
/**
 * Abstract class that represents a reusable module with name, version and dependencies
 */
export declare abstract class W3oModule {
    static modules: {
        [w3oId: string]: W3oModule;
    };
    /**
     * Registers a module in the static registry
     */
    static registerModule(module: W3oModule, parent: W3oContext): void;
    /**
     * Returns a module from the registry by its ID
     */
    static getModule(w3oId: string, parent: W3oContext): W3oModule | undefined;
    /**
     * Returns the full list of registered modules
     */
    static getModules(parent: W3oContext): W3oModule[];
    private __octopus;
    private __requirements;
    private __initialized$;
    constructor(parent: W3oContext);
    /**
     * Observable that emits once the module is initialized
     */
    get initialized$(): Observable<W3oModule>;
    /**
     * Returns whether the module has been initialized
     */
    get initialized(): boolean;
    /**
     * Accessor for the Octopus instance, throws if not initialized
     */
    get octopus(): W3oInstance;
    /**
     * Accessor for the list of module requirements, throws if not initialized
     */
    get requirements(): W3oModule[];
    /**
     * Initializes the module with Octopus instance and resolved dependencies
     */
    init(octopus: W3oInstance, requirements: W3oModule[], parent: W3oContext): void;
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
    get w3oId(): string;
    /**
     * Returns a snapshot of this module’s metadata
     */
    snapshot(): {
        w3oId: string;
        w3oName: string;
        w3oVersion: string;
        w3oRequire: string[];
    };
}
//# sourceMappingURL=W3oModule.d.ts.map