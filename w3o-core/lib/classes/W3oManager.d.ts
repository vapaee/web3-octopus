import { BehaviorSubject, Observable } from 'rxjs';
/**
 * Base class for managers that support initialization lifecycle tracking
 */
export declare class W3oManager {
    private managerName;
    protected __initCalled: boolean;
    protected __initialized$: BehaviorSubject<boolean>;
    constructor(managerName?: string);
    /**
     * Observable that emits true when the manager is initialized
     */
    get initialized$(): Observable<boolean>;
    /**
     * Returns current initialized state of the manager
     */
    get initialized(): boolean;
    /**
     * Emits once when initialization is complete
     */
    get whenReady(): Observable<void>;
}
//# sourceMappingURL=W3oManager.d.ts.map