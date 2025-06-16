// w3o-core/src/classes/W3oManager.ts
import { BehaviorSubject, filter, take, map } from 'rxjs';
import { W3oContextFactory } from './W3oContext';
const logger = new W3oContextFactory('W3oManager');
/**
 * Base class for managers that support initialization lifecycle tracking
 */
export class W3oManager {
    constructor(managerName = 'W3oManager') {
        this.managerName = managerName;
        this.__initCalled = false;
        this.__initialized$ = new BehaviorSubject(false);
        logger.method('constructor', { managerName });
        this.whenReady.subscribe(() => {
            W3oContextFactory.current?.log(`✅ ${this.managerName} ready!`);
        });
    }
    /**
     * Observable that emits true when the manager is initialized
     */
    get initialized$() {
        return this.__initialized$.asObservable().pipe(filter((value) => value), take(1));
    }
    /**
     * Returns current initialized state of the manager
     */
    get initialized() {
        return this.__initialized$.value;
    }
    /**
     * Emits once when initialization is complete
     */
    get whenReady() {
        return this.initialized$.pipe(filter((value) => value), take(1), map(() => {
            return;
        }));
    }
}
