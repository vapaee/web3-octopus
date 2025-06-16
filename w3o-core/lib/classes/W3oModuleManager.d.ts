import { W3oGlobalSettings, W3oModuleInstance, W3oInstance } from '../types';
import { W3oContext } from './W3oContext';
import { W3oModule } from './W3oModule';
import { W3oManager } from './W3oManager';
/**
 * Class that implements a module manager
 */
export declare class W3oModuleManager extends W3oManager implements W3oModuleInstance {
    constructor(settings: W3oGlobalSettings, parent: W3oContext);
    /**
     * Initializes the module manager and all registered modules with their dependencies
     */
    init(octopus: W3oInstance, parent: W3oContext): void;
    /**
     * Parses a version string like '1.2.3' into numeric components
     */
    private parseVersion;
    /**
     * Checks if an actual version satisfies the requested semver range
     */
    private versionSatisfies;
    /**
     * Registers a module in the global module registry
     */
    registerModule(module: W3oModule, parent: W3oContext): void;
    /**
     * Gets a module by its ID from the global registry
     */
    getModule<T extends W3oModule = W3oModule>(w3oId: string, parent: W3oContext): T | undefined;
    /**
     * Gets all registered modules from the global registry
     */
    getModules(parent: W3oContext): W3oModule[];
}
//# sourceMappingURL=W3oModuleManager.d.ts.map