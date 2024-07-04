import { Web3Octopus } from '.';
import { BehaviorSubject } from 'rxjs';
export declare abstract class W3oModule<T> {
    readonly w3o: Web3Octopus<T>;
    initilized$: BehaviorSubject<boolean>;
    constructor(w3o: Web3Octopus<T>);
    abstract init(): void;
    abstract snapshot(): any;
    abstract get version(): string;
    abstract get name(): string;
    abstract get require(): string[];
}
