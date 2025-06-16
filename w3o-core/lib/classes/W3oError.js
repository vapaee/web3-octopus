// w3o-core/src/classes/W3oError.ts
import { W3oContextFactory } from "./W3oContext";
/**
 * Custom error class for Web3Octopus including error codes, payload and contextual logging
 */
export class W3oError extends Error {
    constructor(error, payload) {
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
    toString() {
        return `${this.name} [${this.code}]: ${this.message}`;
    }
    /**
     * Prints the error using context-aware logging or console fallback
     */
    print(prefix = '', context = undefined) {
        if (context) {
            if (this.payload) {
                context.error(prefix + this.toString(), this.payload);
            }
            else {
                context.error(prefix + this.toString());
            }
        }
        else {
            if (this.payload) {
                console.error(prefix + this.toString(), this.payload);
            }
            else {
                console.error(prefix + this.toString());
            }
        }
    }
    /**
     * Static helper to print any kind of error or W3oError in a unified format
     */
    static print(t, e, p) {
        if (typeof t === 'string' && e instanceof W3oError) {
            e.print(t, p);
        }
        else if (t instanceof W3oError) {
            t.print('', p);
        }
        console.error(!!t ? t : 'Unknown error:', e);
    }
}
// List of error codes sorted alphabetically with sequential codes
W3oError.ACCOUNT_NOT_LOGGED = { code: 1000, message: 'Account not logged' };
W3oError.ALREADY_INITIALIZED = { code: 1001, message: 'Already initialized' };
W3oError.AUTH_MANAGER_NOT_CREATED = { code: 1002, message: 'Auth manager was not created' };
W3oError.AUTH_SUPPORT_NOT_FOUND = { code: 1003, message: 'Auth support not found' };
W3oError.AUTH_WITHOUT_ACCOUNT = { code: 1004, message: 'Authenticator without account' };
W3oError.KEY_NOT_FOUND = { code: 1005, message: 'Key not found' };
W3oError.MODULE_MANAGER_NOT_CREATED = { code: 1006, message: 'Module manager was not created' };
W3oError.MODULE_REQUIREMENTS_NOT_MET = { code: 1007, message: 'Module requirements not met' };
W3oError.NETWORK_MANAGER_NOT_CREATED = { code: 1008, message: 'Network manager was not created' };
W3oError.NETWORK_NOT_FOUND = { code: 1009, message: 'Network not found' };
W3oError.NOT_INITIALIZED = { code: 1010, message: 'Not initialized' };
W3oError.OCTOPUS_INSTANCE_NOT_FOUND = { code: 1011, message: 'Octopus instance not found' };
W3oError.READ_ONLY_AUTHENTICATOR = { code: 1012, message: 'Read only authenticator' };
W3oError.SERVICE_OBJECT_NOT_FOUND = { code: 1013, message: 'Service object was not created' };
W3oError.SETTINGS_NOT_FOUND = { code: 1014, message: 'Settings not found' };
W3oError.SESSION_ALREADY_EXISTS = { code: 1015, message: 'Session already exists' };
W3oError.SESSION_ALREADY_SET = { code: 1016, message: 'Session already set' };
W3oError.SESSION_LOAD_ERROR = { code: 1017, message: 'Session load error' };
W3oError.SESSION_MANAGER_NOT_CREATED = { code: 1018, message: 'Session manager was not created' };
W3oError.SESSION_MISSING_KEY = { code: 1019, message: 'Session missing key' };
W3oError.SESSION_NOT_EDITABLE = { code: 1020, message: 'Session is not editable' };
W3oError.SESSION_NOT_FOUND = { code: 1021, message: 'Session not found' };
W3oError.SESSION_NOT_MULTIPLE = { code: 1022, message: 'You are not working with multiple sessions' };
W3oError.SESSION_NOT_SET = { code: 1023, message: 'Session not set' };
W3oError.SESSION_WITHOUT_ACCOUNT = { code: 1024, message: 'Session without account' };
W3oError.SESSION_WITHOUT_NETWORK = { code: 1025, message: 'Session without network' };
W3oError.SUPPORT_NOT_FOUND = { code: 1026, message: 'Support not found' };
W3oError.TRANSACTION_ERROR = { code: 1027, message: 'Transaction error' };
