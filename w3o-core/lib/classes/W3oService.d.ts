import { Web3Octopus } from '.';
export declare abstract class W3oService<T> {
    path: string;
    constructor(path: string, w3o: Web3Octopus<T>);
    abstract init(w3o: Web3Octopus<T>): void;
    abstract snapshot(): any;
}
declare class MyServiceClass<T> extends W3oService<T> {
    path: string;
    constructor(path: string, w3o: Web3Octopus<T>);
    init(w3o: Web3Octopus<T>): void;
    snapshot(): any;
    hello(): void;
}
interface IMyServices {
    foo: MyServiceClass<IMyServices>;
}
export declare function getOctopus(): Web3Octopus<IMyServices>;
export {};
