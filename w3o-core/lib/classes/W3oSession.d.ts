import { W3oAccount, W3oNetwork } from '.';
export declare class W3oSession {
    account: W3oAccount;
    network: W3oNetwork;
    constructor(account: W3oAccount, network: W3oNetwork);
    getId(): string;
    getAccount(): W3oAccount;
    getNetwork(): W3oNetwork;
    set<T>(key: string, value: T): void;
    get<T>(key: string): T;
    remove(key: string): void;
    snapshot(): any;
}
