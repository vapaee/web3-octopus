import { W3oContext } from "./W3oContext";
/**
 * Custom error class for Web3Octopus including error codes, payload and contextual logging
 */
export declare class W3oError extends Error {
    code: number;
    payload: any;
    constructor(error: {
        code: number;
        message: string;
    }, payload?: any);
    /**
     * Returns a string representation of the error with code
     */
    toString(): string;
    /**
     * Prints the error using context-aware logging or console fallback
     */
    print(prefix?: string, context?: W3oContext | undefined): void;
    /**
     * Static helper to print any kind of error or W3oError in a unified format
     */
    static print(t: unknown, e?: unknown, p?: W3oContext): void;
    static readonly ACCOUNT_NOT_LOGGED: {
        code: number;
        message: string;
    };
    static readonly ALREADY_INITIALIZED: {
        code: number;
        message: string;
    };
    static readonly AUTH_MANAGER_NOT_CREATED: {
        code: number;
        message: string;
    };
    static readonly AUTH_SUPPORT_NOT_FOUND: {
        code: number;
        message: string;
    };
    static readonly AUTH_WITHOUT_ACCOUNT: {
        code: number;
        message: string;
    };
    static readonly KEY_NOT_FOUND: {
        code: number;
        message: string;
    };
    static readonly MODULE_MANAGER_NOT_CREATED: {
        code: number;
        message: string;
    };
    static readonly MODULE_REQUIREMENTS_NOT_MET: {
        code: number;
        message: string;
    };
    static readonly NETWORK_MANAGER_NOT_CREATED: {
        code: number;
        message: string;
    };
    static readonly NETWORK_NOT_FOUND: {
        code: number;
        message: string;
    };
    static readonly NOT_INITIALIZED: {
        code: number;
        message: string;
    };
    static readonly OCTOPUS_INSTANCE_NOT_FOUND: {
        code: number;
        message: string;
    };
    static readonly READ_ONLY_AUTHENTICATOR: {
        code: number;
        message: string;
    };
    static readonly SERVICE_OBJECT_NOT_FOUND: {
        code: number;
        message: string;
    };
    static readonly SETTINGS_NOT_FOUND: {
        code: number;
        message: string;
    };
    static readonly SESSION_ALREADY_EXISTS: {
        code: number;
        message: string;
    };
    static readonly SESSION_ALREADY_SET: {
        code: number;
        message: string;
    };
    static readonly SESSION_LOAD_ERROR: {
        code: number;
        message: string;
    };
    static readonly SESSION_MANAGER_NOT_CREATED: {
        code: number;
        message: string;
    };
    static readonly SESSION_MISSING_KEY: {
        code: number;
        message: string;
    };
    static readonly SESSION_NOT_EDITABLE: {
        code: number;
        message: string;
    };
    static readonly SESSION_NOT_FOUND: {
        code: number;
        message: string;
    };
    static readonly SESSION_NOT_MULTIPLE: {
        code: number;
        message: string;
    };
    static readonly SESSION_NOT_SET: {
        code: number;
        message: string;
    };
    static readonly SESSION_WITHOUT_ACCOUNT: {
        code: number;
        message: string;
    };
    static readonly SESSION_WITHOUT_NETWORK: {
        code: number;
        message: string;
    };
    static readonly SUPPORT_NOT_FOUND: {
        code: number;
        message: string;
    };
    static readonly TRANSACTION_ERROR: {
        code: number;
        message: string;
    };
}
//# sourceMappingURL=W3oError.d.ts.map