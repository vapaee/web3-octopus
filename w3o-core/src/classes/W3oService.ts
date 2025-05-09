// w3o-core/src/classes/W3oNetworkManager.ts

import { W3oContextFactory, W3oContext } from "./W3oContext";
import { W3oModule } from "./W3oModule";

const logger = new W3oContextFactory('W3oService');

/**
 * Abstract class that represents a service module with a specific path
 */
export abstract class W3oService extends W3oModule {
    constructor(
        public path: string,
        parent: W3oContext,
    ) {
        const context = logger.method('constructor', { path }, parent);
        super(context);
    }

    /**
     * Returns a snapshot of the internal state of the service, including its path
     */
    override snapshot(): any {
        return {
            ...super.snapshot(),
            path: this.path,
        };
    }
}
