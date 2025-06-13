// w3o-ethereum/src/classes/EthereumError.ts

import { W3oError } from "@vapaee/w3o-core";

/**
 * Custom error class for Ethereum specific errors within Web3 Octopus.
 */
export class EthereumError extends W3oError {
    constructor(error: { message: string, code: number }, payload?: any) {
        super(error, payload);
    }

    public static readonly PROVIDER_NOT_FOUND = { message: 'Ethereum provider not found', code: 3000 };
}
