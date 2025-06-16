// w3o-core/src/classes/W3oModuleConcept.ts
import { W3oContextFactory } from './W3oContext';
import { W3oModule } from './W3oModule';
const logger = new W3oContextFactory('W3oModuleConcept');
/**
 * Class that represents a typed module (authenticator, network or service) with strongly typed data
 */
export class W3oModuleConcept extends W3oModule {
    constructor(moduleId, data, parent) {
        const context = logger.method('constructor', parent);
        super(context);
        this.moduleId = moduleId;
        this.data = data;
        const [name, version] = [moduleId.n, moduleId.v];
        if (!!name && !!version) {
            W3oModule.registerModule(this, context);
        }
        else {
            context.error('Module not registered. review the moduleId', { moduleId });
        }
    }
    /**
     * Returns the version of this module
     */
    get w3oVersion() {
        return this.moduleId?.v ?? '';
    }
    /**
     * Returns the name of this module
     */
    get w3oName() {
        return this.moduleId?.n ?? '';
    }
    /**
     * Returns the list of required module IDs
     */
    get w3oRequire() {
        return this.moduleId?.r ?? [];
    }
}
