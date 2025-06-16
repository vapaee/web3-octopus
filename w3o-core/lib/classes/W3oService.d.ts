import { W3oContext } from "./W3oContext";
import { W3oModule } from "./W3oModule";
/**
 * Abstract class that represents a service module with a specific path
 */
export declare abstract class W3oService extends W3oModule {
    path: string;
    constructor(path: string, parent: W3oContext);
    /**
     * Returns a snapshot of the internal state of the service, including its path
     */
    snapshot(): any;
}
//# sourceMappingURL=W3oService.d.ts.map