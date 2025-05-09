// w3o-core/src/classes/W3oTokenList.ts

import { BehaviorSubject, Observable } from "rxjs";
import { W3oContext, W3oContextFactory } from "./W3oContext";
import { W3oToken } from "./W3oToken";
import { W3oHttpClient, W3oTokenData } from "../types";

const logger = new W3oContextFactory('W3oTokenList');

/**
 * Represents a list of tokens and provides methods to query them by symbol or address
 */
export class W3oTokenList {
    private readonly __list$ = new BehaviorSubject<W3oToken[]>([]);

    constructor(
        private http: W3oHttpClient,
        private url: string,
    ) {}

    /**
     * Observable that emits the current token list
     */
    get list$(): Observable<W3oToken[]> {
        return this.__list$.asObservable();
    }

    /**
     * Returns the current token list value
     */
    get list(): W3oToken[] {
        return this.__list$.getValue();
    }

    /**
     * Loads the token list from a remote source via HTTP and emits it
     */
    public load(parent: W3oContext): Observable<W3oToken[]> {
        logger.method('load', parent);
        this.http.get<W3oTokenData[]>(this.url).subscribe({
            next: tokens => {
                this.__list$.next(tokens.map(data => new W3oToken(data)));
            },
            error: err => console.error('Error loading token list:', err),
        });
        return this.__list$.asObservable();
    }

    /**
     * Returns all tokens in the list
     */
    getTokens(): W3oToken[] {
        return this.__list$.getValue();
    }

    /**
     * Returns tokens that match the given symbol
     */
    getTokensBySymbol(symbol: string): W3oToken[] {
        return this.__list$.getValue().filter(token => token.symbol === symbol);
    }

    /**
     * Returns tokens that match the given address
     */
    getTokensByAddress(address: string): W3oToken[] {
        return this.__list$.getValue().filter(token => token.address === address);
    }

    /**
     * Returns the first token found by symbol or address
     */
    getToken(symbolOrAddress: string): W3oToken | null {
        const tokenBySymbol = this.getTokensBySymbol(symbolOrAddress);
        if (tokenBySymbol.length > 0) {
            return tokenBySymbol[0];
        }
        const tokenByAddress = this.getTokensByAddress(symbolOrAddress);
        if (tokenByAddress.length > 0) {
            return tokenByAddress[0];
        }
        return null;
    }

    /**
     * Returns a snapshot of the token list state
     */
    snapshot(): any {
        return {
            list: this.__list$.getValue().map(token => token.snapshot()),
            url: this.url,
        };
    }
}
