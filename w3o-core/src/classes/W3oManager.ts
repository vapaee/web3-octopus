// w3o-core/src/classes/W3oManager.ts

import { BehaviorSubject, filter, take, Observable, map } from 'rxjs';
import { W3oContextFactory } from './W3oContext';

const logger = new W3oContextFactory('W3oManager');

/**
 * Base class for managers that support initialization lifecycle tracking
 */
export class W3oManager {
    protected __initCalled = false;
    protected __initialized$ = new BehaviorSubject<boolean>(false);

    constructor(
        private managerName: string = 'W3oManager'
    ) {
        logger.method('constructor', { managerName });
        this.whenReady.subscribe(() => {
            W3oContextFactory.current?.log(`✅ ${this.managerName} ready!`);
        });
    }

    /**
     * Observable that emits true when the manager is initialized
     */
    get initialized$(): Observable<boolean> {
        return this.__initialized$.asObservable().pipe(
            filter((value) => value),
            take(1)
        );
    }

    /**
     * Returns current initialized state of the manager
     */
    get initialized(): boolean {
        return this.__initialized$.value;
    }

    /**
     * Emits once when initialization is complete
     */
    get whenReady(): Observable<void> {
        return this.initialized$.pipe(
            filter((value) => value),
            take(1),
            map(() => {
                return;
            })
        );
    }
}
