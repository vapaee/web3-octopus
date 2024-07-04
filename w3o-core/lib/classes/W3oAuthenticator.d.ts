import { W3oAccount, W3oTransactionResponse } from '.';
import { W3oAddress, W3oNetworkName, W3oNetworkType, W3oTransaction } from '../types';
export declare abstract class W3oAuthenticator {
    name: string;
    type: W3oNetworkType;
    constructor(name: string, type: W3oNetworkType);
    abstract getName(): string;
    abstract isLogged(): boolean;
    abstract getNetworkType(): W3oNetworkType;
    abstract getAddress(): W3oAddress;
    abstract getAccount(): W3oAccount;
    abstract isReadOnly(): boolean;
    abstract signTransaction(trx: W3oTransaction): Promise<W3oTransactionResponse>;
    abstract login(network: W3oNetworkName): Promise<W3oAddress>;
    abstract autoLogin(network: W3oNetworkName, address: W3oAddress): Promise<W3oAddress>;
    abstract setReadOnly(network: W3oNetworkName, address: W3oAddress): Promise<W3oAddress>;
    abstract snapshot(): any;
}
