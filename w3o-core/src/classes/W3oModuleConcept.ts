// w3o-core/src/classes/W3oModuleConcept.ts

import { W3oContextFactory, W3oContext } from './W3oContext';
import { W3oModule } from './W3oModule';

const logger = new W3oContextFactory('W3oModuleConcept');

/**
 * Class that represents a typed module (authenticator, network or service) with strongly typed data
 */
export class W3oModuleConcept<T> extends W3oModule {
    constructor(
        private readonly moduleId: { v: string, n: string, r: string[] },
        public readonly data: T,
        parent: W3oContext,
    ) {
        const context = logger.method('constructor', parent);
        super(context);

        const [name, version] = [moduleId.n, moduleId.v];
        if (!!name && !!version) {
            W3oModule.registerModule(this, context);
        } else {
            context.error('Module not registered. review the moduleId', { moduleId });
        }
    }

    /**
     * Returns the version of this module
     */
    override get w3oVersion(): string {
        return this.moduleId?.v ?? '';
    }

    /**
     * Returns the name of this module
     */
    override get w3oName(): string {
        return this.moduleId?.n ?? '';
    }

    /**
     * Returns the list of required module IDs
     */
    override get w3oRequire(): string[] {
        return this.moduleId?.r ?? '';
    }
}
