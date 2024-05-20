import { Modules } from './Modules';
import { IModules } from './types';
import { version } from './version';

export class Ant<TMyModules> {

    private _manager: Modules<Ant<TMyModules>>;

    constructor() {
        this._manager = new Modules<Ant<TMyModules>>();
    }

    get version(): string {
        return version;
    }

    get modules(): TMyModules {
        return this._manager.proxy as unknown as TMyModules;
    }

    addModule(module: IModules): void {
        this._manager.add(module);
    }

    sayHello(): void {
        console.log("--------------------------------");
        console.log(`@vapaee/ant version: ${this.version}`);
        console.log("--------------------------------");
    }
}