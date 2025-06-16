import { Observable } from 'rxjs';
import { W3oContext, W3oChainSupport, W3oAuthenticator, W3oAccount, W3oTransaction, W3oTransactionResponse, W3oNetworkName, W3oContract, W3oAddress } from '@vapaee/w3o-core';
export declare class AntelopeTransactionResponse extends W3oTransactionResponse {
    constructor(hash: string);
    wait(): Observable<any>;
}
export declare class AntelopeChainSupport extends W3oChainSupport {
    private _wharfkits;
    constructor(parent: W3oContext);
    isReadOnly(): boolean;
    get w3oVersion(): string;
    get w3oName(): string;
    get w3oRequire(): string[];
    private getWharfkit;
    private setWharfkitSession;
    private getWharfkitSession;
    private authenticate;
    login(auth: W3oAuthenticator, networkName: W3oNetworkName, parent: W3oContext): Observable<W3oAccount>;
    autoLogin(auth: W3oAuthenticator, networkName: W3oNetworkName, parent: W3oContext): Observable<W3oAccount>;
    logout(auth: W3oAuthenticator, parent: W3oContext): void;
    signTransaction(auth: W3oAuthenticator, trx: W3oTransaction, parent: W3oContext): Observable<W3oTransactionResponse>;
    queryContract(networkName: W3oNetworkName, params: {
        [key: string]: any;
    }, parent: W3oContext): Observable<any>;
    validateAccount(username: string, parent: W3oContext): Observable<boolean>;
    fetchContract(address: W3oAddress, parent: W3oContext): Observable<W3oContract | null>;
}
//# sourceMappingURL=AntelopeChainSupport.d.ts.map