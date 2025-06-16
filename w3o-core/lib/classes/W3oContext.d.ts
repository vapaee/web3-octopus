import { Observable } from 'rxjs';
/**
 * Type representing log methods used in context logging
 */
type LogMethod = 'log' | 'error' | 'info' | 'warn' | 'debug' | 'assert';
/**
 * Internal structure used to store a log line in context
 */
interface LoggedLine {
    t: number;
    m: LogMethod;
    args: any[];
}
/**
 * Class representing a logging and contextual execution scope
 */
export declare class W3oContext {
    private readonly idValue;
    private readonly parentContext?;
    readonly root: W3oContext;
    private readonly logsArray;
    private readonly levelValue;
    private readonly startTime;
    private readonly argsValue;
    private readonly storage;
    private readonly destroyedSubject;
    private rootTimeoutId?;
    readonly indent: string;
    /**
     * Generates a 2-digit hexadecimal unique ID for the context
     */
    private static generateUniqueId;
    constructor(className: string, methodName: string, args: any, parentContext?: W3oContext);
    /**
     * Observable that emits when the context is destroyed
     */
    get destroyed$(): Observable<boolean>;
    /**
     * Cleans memory, log and timer resources of the context tree
     */
    dismiss(): void;
    /**
     * Returns this context's ID
     */
    id(): string;
    /**
     * Returns the parent context, if any
     */
    parent(): W3oContext | undefined;
    /**
     * Returns the arguments used when creating this context
     */
    args<T = any>(): T;
    /**
     * Returns all the log lines registered in this context
     */
    logs(): LoggedLine[];
    /**
     * Returns the depth level in the context tree
     */
    level(): number;
    /**
     * Returns the time passed since the root context was created
     */
    private getCurrentTime;
    /**
     * Returns a formatted timestamp string for console output
     */
    timestamp(): string;
    /**
     * Returns the branch identifier made of concatenated ancestor IDs
     */
    branch(): string;
    /**
     * Prefix string used for log indentation and labeling
     */
    get prefix(): string;
    /**
     * Internally stores a log entry with method type and args
     */
    private pushLog;
    /**
     * Logs a message using `console.log`
     */
    log(...args: any[]): void;
    /**
     * Logs an error message, supports custom `print()` on W3oError
     */
    error(...args: any[]): void;
    /**
     * Logs an info message using `console.info`
     */
    info(...args: any[]): void;
    /**
     * Logs a warning message using `console.warn`
     */
    warn(...args: any[]): void;
    /**
     * Logs a debug message using `console.debug`
     */
    debug(...args: any[]): void;
    /**
     * Logs an assertion with condition and args
     */
    assert(condition: boolean, ...args: any[]): void;
}
/**
 * Factory to create W3oContext instances for methods in a class
 */
export declare class W3oContextFactory {
    private className;
    static current?: W3oContext;
    constructor(className: string);
    /**
     * Creates a new context for a method invocation with optional parent context
     */
    method(methodName: string, args?: any, context?: W3oContext): W3oContext;
    log(...args: any[]): void;
    error(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    debug(...args: any[]): void;
    assert(condition: boolean, ...args: any[]): void;
    /**
     * Returns either the current context or the native console
     */
    private static get console();
}
export {};
//# sourceMappingURL=W3oContext.d.ts.map