// w3o-core/src/classes/W3oError.ts

import { W3oContextFactory, W3oContext } from "./W3oContext";

/**
 * Custom error class for Web3Octopus including error codes, payload and contextual logging
 */
export class W3oError extends Error {
    public code: number;
    public payload: any;

    constructor(error: { code: number, message: string }, payload?: any) {
        super(error.message);
        this.code = error.code;
        this.payload = payload;
        this.name = 'W3oError';
        const context = W3oContextFactory.current;
        this.print(context?.prefix ?? error.message, context);
    }

    /**
     * Returns a string representation of the error with code
     */
    public override toString(): string {
        return `${this.name} [${this.code}]: ${this.message}`;
    }

    /**
     * Prints the error using context-aware logging or console fallback
     */
    public print(prefix: string = '', context: W3oContext | undefined = undefined): void {
        if (context) {
            if (this.payload) {
                context.error(prefix + this.toString(), this.payload);
            } else {
                context.error(prefix + this.toString());
            }
        } else {
            if (this.payload) {
                console.error(prefix + this.toString(), this.payload);
            } else {
                console.error(prefix + this.toString());
            }
        }
    }

    /**
     * Static helper to print any kind of error or W3oError in a unified format
     */
    public static print(t: unknown, e?: unknown, p?: W3oContext): void {
        if (typeof t === 'string' && e instanceof W3oError) {
            e.print(t, p);
        } else if (t instanceof W3oError) {
            t.print('', p);
        }
        console.error(!!t ? t : 'Unknown error:', e);
    }

    // List of error codes sorted alphabetically with sequential codes
    public static readonly ACCOUNT_NOT_LOGGED             = { code: 1000, message: 'Account not logged' };
    public static readonly ALREADY_INITIALIZED            = { code: 1001, message: 'Already initialized' };
    public static readonly AUTH_MANAGER_NOT_CREATED       = { code: 1002, message: 'Auth manager was not created' };
    public static readonly AUTH_SUPPORT_NOT_FOUND         = { code: 1003, message: 'Auth support not found' };
    public static readonly AUTH_WITHOUT_ACCOUNT           = { code: 1004, message: 'Authenticator without account' };
    public static readonly KEY_NOT_FOUND                  = { code: 1005, message: 'Key not found' };
    public static readonly MODULE_MANAGER_NOT_CREATED     = { code: 1006, message: 'Module manager was not created' };
    public static readonly MODULE_REQUIREMENTS_NOT_MET    = { code: 1007, message: 'Module requirements not met' };
    public static readonly NETWORK_MANAGER_NOT_CREATED    = { code: 1008, message: 'Network manager was not created' };
    public static readonly NETWORK_NOT_FOUND              = { code: 1009, message: 'Network not found' };
    public static readonly NOT_INITIALIZED                = { code: 1010, message: 'Not initialized' };
    public static readonly OCTOPUS_INSTANCE_NOT_FOUND     = { code: 1011, message: 'Octopus instance not found' };
    public static readonly READ_ONLY_AUTHENTICATOR        = { code: 1012, message: 'Read only authenticator' };
    public static readonly SERVICE_OBJECT_NOT_FOUND       = { code: 1013, message: 'Service object wa not created' };
    public static readonly SETTINGS_NOT_FOUND             = { code: 1014, message: 'Settings not found' };
    public static readonly SESSION_ALREADY_EXISTS         = { code: 1015, message: 'Session already exists' };
    public static readonly SESSION_ALREADY_SET            = { code: 1016, message: 'Session already set' };
    public static readonly SESSION_LOAD_ERROR             = { code: 1017, message: 'Session load error' };
    public static readonly SESSION_MANAGER_NOT_CREATED    = { code: 1018, message: 'Session manager was not created' };
    public static readonly SESSION_MISSING_KEY            = { code: 1019, message: 'Session missing key' };
    public static readonly SESSION_NOT_EDITABLE           = { code: 1020, message: 'Session is not editable' };
    public static readonly SESSION_NOT_FOUND              = { code: 1021, message: 'Session not found' };
    public static readonly SESSION_NOT_MULTIPLE           = { code: 1022, message: 'You are not working with multiple sessions' };
    public static readonly SESSION_NOT_SET                = { code: 1023, message: 'Session not set' };
    public static readonly SESSION_WITHOUT_ACCOUNT        = { code: 1024, message: 'Session without account' };
    public static readonly SESSION_WITHOUT_NETWORK        = { code: 1025, message: 'Session without network' };
    public static readonly SUPPORT_NOT_FOUND              = { code: 1026, message: 'Support not found' };
    public static readonly TRANSACTION_ERROR              = { code: 1027, message: 'Transaction error' };
}
