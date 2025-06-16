// w3o-core/src/classes/W3oNetworkManager.ts
import { W3oContextFactory } from "./W3oContext";
import { W3oModule } from "./W3oModule";
const logger = new W3oContextFactory('W3oService');
/**
 * Abstract class that represents a service module with a specific path
 */
export class W3oService extends W3oModule {
    constructor(path, parent) {
        const context = logger.method('constructor', { path }, parent);
        super(context);
        this.path = path;
    }
    /**
     * Returns a snapshot of the internal state of the service, including its path
     */
    snapshot() {
        return {
            ...super.snapshot(),
            path: this.path,
        };
    }
}
