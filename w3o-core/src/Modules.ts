import { IModules } from "./types";

export class ModulesProxy<TAnt> extends Proxy<Modules<TAnt>> {
    constructor(target: Modules<TAnt>, handler: ProxyHandler<Modules<TAnt>>) {
        super(target, handler);
    }
}

export class Modules<TAnt> {

    private _modules: Map<string, IModules> = new Map();
    public readonly proxy;
    constructor() {
        this.proxy = new Proxy(this, {
            get: (target, name: string) => {
                if (typeof name === "string") {
                    return target.getModule(name);
                }
            }
        }) as ModulesProxy<TAnt>;
    }

    private getModule<T extends IModules>(name: string): T {
        return this._modules.get(name) as T;
    }
    
    add(module: IModules): void {
        this._modules.set(module.name, module);
    }

    get(name: string): IModules {
        return this._modules.get(name) as IModules;
    }

    async init<TAnt>(ant: TAnt): Promise<void> {
        this._modules.forEach(async (module: IModules, name: string) => {
            await module.init(ant);
        });
    }
}
