// w3o-core/src/classes/W3oTokenList.ts
import { BehaviorSubject } from "rxjs";
import { W3oContextFactory } from "./W3oContext";
import { W3oToken } from "./W3oToken";
const logger = new W3oContextFactory('W3oTokenList');
/**
 * Represents a list of tokens and provides methods to query them by symbol or address
 */
export class W3oTokenList {
    constructor(http, url, parent) {
        this.http = http;
        this.url = url;
        this.__list$ = new BehaviorSubject([]);
        logger.method('constructor', { url }, parent);
        if (!url) {
            throw new Error('Token list URL must be provided');
        }
        if (!http) {
            throw new Error('HTTP client must be provided');
        }
    }
    /**
     * Observable that emits the current token list
     */
    get list$() {
        return this.__list$.asObservable();
    }
    /**
     * Returns the current token list value
     */
    get list() {
        return this.__list$.getValue();
    }
    /**
     * Loads the token list from a remote source via HTTP and emits it
     */
    load(parent) {
        logger.method('load', parent);
        this.http.get(this.url).subscribe({
            next: (tokens) => {
                this.__list$.next(tokens.map(data => new W3oToken(data)));
            },
            error: (err) => console.error('Error loading token list:', err),
        });
        return this.__list$.asObservable();
    }
    /**
     * Returns all tokens in the list
     */
    getTokens() {
        return this.__list$.getValue();
    }
    /**
     * Returns tokens that match the given symbol
     */
    getTokensBySymbol(symbol) {
        return this.__list$.getValue().filter((token) => token.symbol === symbol);
    }
    /**
     * Returns tokens that match the given address
     */
    getTokensByAddress(address) {
        return this.__list$.getValue().filter((token) => token.address === address);
    }
    /**
     * Returns the first token found by symbol or address
     */
    getToken(symbolOrAddress) {
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
    snapshot() {
        return {
            list: this.__list$.getValue().map((token) => token.snapshot()),
            url: this.url,
        };
    }
}
