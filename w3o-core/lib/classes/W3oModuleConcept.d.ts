import { W3oContext } from './W3oContext';
import { W3oModule } from './W3oModule';
/**
 * Class that represents a typed module (authenticator, network or service) with strongly typed data
 */
export declare class W3oModuleConcept<T> extends W3oModule {
    private readonly moduleId;
    readonly data: T;
    constructor(moduleId: {
        v: string;
        n: string;
        r: string[];
    }, data: T, parent: W3oContext);
    /**
     * Returns the version of this module
     */
    get w3oVersion(): string;
    /**
     * Returns the name of this module
     */
    get w3oName(): string;
    /**
     * Returns the list of required module IDs
     */
    get w3oRequire(): string[];
}
//# sourceMappingURL=W3oModuleConcept.d.ts.map