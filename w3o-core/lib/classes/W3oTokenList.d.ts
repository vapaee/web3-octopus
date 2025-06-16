import { Observable } from "rxjs";
import { W3oContext } from "./W3oContext";
import { W3oToken } from "./W3oToken";
import { W3oHttpClient } from "../types";
/**
 * Represents a list of tokens and provides methods to query them by symbol or address
 */
export declare class W3oTokenList {
    private http;
    private url;
    private readonly __list$;
    constructor(http: W3oHttpClient, url: string, parent: W3oContext);
    /**
     * Observable that emits the current token list
     */
    get list$(): Observable<W3oToken[]>;
    /**
     * Returns the current token list value
     */
    get list(): W3oToken[];
    /**
     * Loads the token list from a remote source via HTTP and emits it
     */
    load(parent: W3oContext): Observable<W3oToken[]>;
    /**
     * Returns all tokens in the list
     */
    getTokens(): W3oToken[];
    /**
     * Returns tokens that match the given symbol
     */
    getTokensBySymbol(symbol: string): W3oToken[];
    /**
     * Returns tokens that match the given address
     */
    getTokensByAddress(address: string): W3oToken[];
    /**
     * Returns the first token found by symbol or address
     */
    getToken(symbolOrAddress: string): W3oToken | null;
    /**
     * Returns a snapshot of the token list state
     */
    snapshot(): any;
}
//# sourceMappingURL=W3oTokenList.d.ts.map