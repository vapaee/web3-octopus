/**
 * Represents a token, including methods to get information about the token and its associated contract
 */
export declare class W3oToken {
    readonly data: {
        [key: string]: any;
    };
    constructor(data: {
        [key: string]: any;
    });
    /**
     * * Getter for the token name
     */
    get name(): string;
    /**
     * Getter for the token symbol
     */
    get symbol(): string;
    /**
     * Getter for the token contract address
     */
    get account(): string;
    /**
     * Getter for the token contract address
     */
    get address(): string;
    /**
     * Getter for the token precision (decimals)
     */
    get precision(): number;
    /**
     * Getter for the token logo URL
     */
    get logo(): string;
    /**
     * Getter for the token chain.
     */
    get chain(): string;
    /**
     * Getter to know if the token is a system token
     * @returns boolean - true if the token is a system token, false otherwise
     */
    isSystemToken(): boolean;
    /**
     * Getter for the Icon URL of the token
     * @returns boolean - true if the token is a native token, false otherwise
     */
    getIconUrl(): string;
    /**
     * Getter for the display name of the token
     * @returns string - the display name of the token (Ethereum, Bitcoin, etc.)
     */
    getDisplayName(): string;
    /**
     * Getter for the symbol of the token
     * @returns string - the symbol of the token (ETH, BTC, etc.)
     */
    getSymbol(): string;
    /**
     * Getter for the decimals or precision of the token
     * @returns number - the number of decimals for the token (18, 8, etc.) - default is 18
     *
     */
    getDecimals(): number;
    /**
     * Getter for the USD price of the token (if available)
     * @returns number - the USD price of the token (if available) - default is 0
     */
    getUSDPrice(): number;
    /**
     * Getter for the contract address of the token
     * @returns string - the contract address of the token (if available) - default is '0x'
     */
    getContractAddress(): string;
    /**
     * Takes and returns a snapshot of the token's state
     * @returns any
     */
    snapshot(): any;
}
//# sourceMappingURL=W3oToken.d.ts.map