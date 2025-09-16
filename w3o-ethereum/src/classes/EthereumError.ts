// w3o-ethereum/src/classes/EthereumError.ts

import { W3oError } from "@vapaee/w3o-core";

/**
 * Custom error class for Ethereum specific errors within Web3 Octopus.
 */
export class EthereumError extends W3oError {
    constructor(error: { message: string, code: number }, payload?: any) {
        super(error, payload);
    }

    public static readonly PROVIDER_NOT_FOUND  = { message: 'Ethereum provider not found', code: 3000 };
    public static readonly NOT_VALID_NUMBERISH = { message: 'Not a valid numberish value', code: 3001 };
    public static readonly METAKEEP_ALREADY_IN_USE = { message: 'Metakeep wallet only supports one active session at a time', code: 3002 };
    public static readonly METAKEEP_APPID_NOT_SET = { message: 'Metakeep needs a valid App Id in order to work', code: 3003 };
}
