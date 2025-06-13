import { W3oError } from "@vapaee/w3o-core";
/**
 * Custom error class for Antelope-specific errors within Web3 Octopus.
 */
export declare class AntelopeError extends W3oError {
    /**
     * Constructs a new AntelopeError with a predefined message and optional payload.
     */
    constructor(error: {
        message: string;
        code: number;
    }, payload?: any);
    /**
     * Error indicating that the Wharfkit instance could not be found.
     */
    static readonly WHARFKIT_NOT_FOUND: {
        message: string;
        code: number;
    };
}
//# sourceMappingURL=AntelopeError.d.ts.map