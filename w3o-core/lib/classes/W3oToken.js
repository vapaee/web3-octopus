// w3o-core/src/classes/W3oToken.ts
/**
 * Represents a token, including methods to get information about the token and its associated contract
 */
export class W3oToken {
    constructor(data) {
        this.data = data;
    }
    /**
     * * Getter for the token name
     */
    get name() {
        return this.getDisplayName();
    }
    /**
     * Getter for the token symbol
     */
    get symbol() {
        return this.getSymbol();
    }
    /**
     * Getter for the token contract address
     */
    get account() {
        return this.getContractAddress();
    }
    /**
     * Getter for the token contract address
     */
    get address() {
        return this.getContractAddress();
    }
    /**
     * Getter for the token precision (decimals)
     */
    get precision() {
        return this.getDecimals();
    }
    /**
     * Getter for the token logo URL
     */
    get logo() {
        return this.getIconUrl();
    }
    /**
     * Getter for the token chain.
     */
    get chain() {
        return 'chain?';
    }
    // If this class is overridden by a subclass, the subclass must implement this methods:
    /**
     * Getter to know if the token is a system token
     * @returns boolean - true if the token is a system token, false otherwise
     */
    isSystemToken() {
        return this.data['isSystemToken'] ?? false;
    }
    /**
     * Getter for the Icon URL of the token
     * @returns boolean - true if the token is a native token, false otherwise
     */
    getIconUrl() {
        return this.data['logoURI'] ?? this.data['iconUrl'] ?? this.data['icon'] ?? this.data['logo'] ?? '/asstets/icons/tokens/unknown.svg';
    }
    /**
     * Getter for the display name of the token
     * @returns string - the display name of the token (Ethereum, Bitcoin, etc.)
     */
    getDisplayName() {
        return this.data['displayName'] ?? this.data['name'] ?? 'Unknown Token';
    }
    /**
     * Getter for the symbol of the token
     * @returns string - the symbol of the token (ETH, BTC, etc.)
     */
    getSymbol() {
        return this.data['symbol'] ?? 'UNKNOWN';
    }
    /**
     * Getter for the decimals or precision of the token
     * @returns number - the number of decimals for the token (18, 8, etc.) - default is 18
     *
     */
    getDecimals() {
        return this.data['decimals'] ?? this.data['precision'] ?? 18;
    }
    /**
     * Getter for the USD price of the token (if available)
     * @returns number - the USD price of the token (if available) - default is 0
     */
    getUSDPrice() {
        return this.data['usdPrice'] ?? 0;
    }
    /**
     * Getter for the contract address of the token
     * @returns string - the contract address of the token (if available) - default is '0x'
     */
    getContractAddress() {
        return this.data['address'] ?? this.data['contract'] ?? this.data['account'] ?? '0x';
    }
    /**
     * Takes and returns a snapshot of the token's state
     * @returns any
     */
    snapshot() {
        return {
            name: this.name,
            symbol: this.symbol,
            account: this.account,
            address: this.address,
            precision: this.precision,
            logo: this.logo,
            chain: this.chain,
            data: this.data,
        };
    }
}
