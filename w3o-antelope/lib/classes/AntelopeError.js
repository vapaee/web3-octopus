// w3o-antelope/src/classes/AntelopeError.ts
import { W3oError } from "@vapaee/w3o-core";
/**
 * Custom error class for Antelope-specific errors within Web3 Octopus.
 */
export class AntelopeError extends W3oError {
    /**
     * Constructs a new AntelopeError with a predefined message and optional payload.
     */
    constructor(error, payload) {
        super(error, payload);
    }
}
/**
 * Error indicating that the Wharfkit instance could not be found.
 */
AntelopeError.WHARFKIT_NOT_FOUND = { message: 'Wharfkit not found', code: 2000 };
