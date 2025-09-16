// w3o-core/src/classes/W3oContext.ts

import { BehaviorSubject, Observable } from 'rxjs';
import { W3oStorage } from './W3oStorage';

/**
 * Type representing log methods used in context logging
 */
type LogMethod = 'log' | 'error' | 'info' | 'warn' | 'debug' | 'assert';

/**
 * Internal structure used to store a log line in context
 */
interface LoggedLine {
    t: number;       // milliseconds since context tree start
    m: LogMethod;    // which method was called
    args: any[];     // arguments passed to the method
}

/**
 * Class representing a logging and contextual execution scope
 */
export class W3oContext {
    private readonly idValue: string;
    private readonly parentContext?: W3oContext;
    public readonly root: W3oContext;
    private readonly logsArray: LoggedLine[] = [];
    private readonly levelValue: number;
    private readonly startTime: number;
    private readonly argsValue: any;
    private readonly storage: W3oStorage;
    private readonly destroyedSubject = new BehaviorSubject<boolean>(false);
    private rootTimeoutId?: number;
    readonly indent: string;

    /**
     * Generates a 2-digit hexadecimal unique ID for the context
     */
    private static generateUniqueId(): string {
        const rand = Math.floor(Math.random() * 256);
        return rand.toString(16).padStart(2, '0');
    }

    constructor(
        className: string,
        methodName: string,
        args: any,
        parentContext?: W3oContext
    ) {
        this.idValue = W3oContext.generateUniqueId();
        this.parentContext = parentContext;
        this.startTime = parentContext ? parentContext.startTime : Date.now();
        this.levelValue = parentContext ? parentContext.levelValue + 1 : 0;
        this.indent = '  '.repeat(this.levelValue);
        this.root = parentContext ? parentContext.root : this;
        this.storage = parentContext ? parentContext.storage : new W3oStorage();

        if (!parentContext) {
            this.rootTimeoutId = window.setTimeout(() => {
                if (!this.destroyedSubject.value) {
                    // Is it worth closing a context automatically due to time?
                }
            }, 10_000);
        }

        this.log(`${className}.${methodName}()`, args);
        this.argsValue = args;
    }

    /**
     * Observable that emits when the context is destroyed
     */
    public get destroyed$(): Observable<boolean> {
        return this.destroyedSubject.asObservable();
    }

    /**
     * Cleans memory, log and timer resources of the context tree
     */
    public dismiss(): void {
        this.logsArray.length = 0;
        this.root.storage.clear();
        this.destroyedSubject.next(true);
        if (this.rootTimeoutId !== undefined) {
            clearTimeout(this.rootTimeoutId);
        }
    }

    /**
     * Returns this context's ID
     */
    public id(): string {
        return this.idValue;
    }

    /**
     * Returns the parent context, if any
     */
    public parent(): W3oContext | undefined {
        return this.parentContext;
    }

    /**
     * Returns the arguments used when creating this context
     */
    public args<T = any>(): T {
        return this.argsValue as T;
    }

    /**
     * Returns all the log lines registered in this context
     */
    public logs(): LoggedLine[] {
        return this.logsArray;
    }

    /**
     * Returns the depth level in the context tree
     */
    public level(): number {
        return this.levelValue;
    }

    /**
     * Returns the time passed since the root context was created
     */
    private getCurrentTime(): number {
        return Date.now() - this.startTime;
    }

    /**
     * Returns a formatted timestamp string for console output
     */
    public timestamp(): string {
        let t = this.getCurrentTime().toString();
        while (t.length < 6) {
            t = ' ' + t;
        }
        return t;
    }

    /**
     * Returns the branch identifier made of concatenated ancestor IDs
     */
    public branch(): string {
        const prefix = this.parentContext ? this.parentContext.branch() : '';
        return `${prefix}${this.idValue}`;
    }

    /**
     * Prefix string used for log indentation and labeling
     */
    get prefix(): string {
        const indent = '  '.repeat(this.levelValue);
        return `${this.timestamp()} ${this.branch()}: ${indent}`;
    }

    /**
     * Internally stores a log entry with method type and args
     */
    private pushLog(method: LogMethod, args: any[]): void {
        this.logsArray.push({ t: this.getCurrentTime(), m: method, args });
    }

    /**
     * Logs a message using `console.log`
     */
    public log(...args: any[]): void {
        this.pushLog('log', args);
        console.log(this.prefix, ...args);
    }

    /**
     * Logs an error message, supports custom `print()` on W3oError
     */
    public error(...args: any[]): void {
        this.pushLog('error', args);
        if (typeof args[0] === 'string' && typeof args[1]?.print === 'function') {
            const msg = args[0];
            const err = args[1] as { print: (msg: string) => void };
            err.print(`${this.prefix} ${msg}`);
        } else if (typeof args[0]?.print === 'function') {
            const err = args[0] as { print: (msg: string) => void };
            err.print(this.prefix);
        } else {
            console.error(this.prefix, ...args);
        }
    }

    /**
     * Logs an info message using `console.info`
     */
    public info(...args: any[]): void {
        this.pushLog('info', args);
        console.info(this.prefix, ...args);
    }

    /**
     * Logs a warning message using `console.warn`
     */
    public warn(...args: any[]): void {
        this.pushLog('warn', args);
        console.warn(this.prefix, ...args);
    }

    /**
     * Logs a debug message using `console.debug`
     */
    public debug(...args: any[]): void {
        this.pushLog('debug', args);
        console.debug(this.prefix, ...args);
    }

    /**
     * Logs an assertion with condition and args
     */
    public assert(condition: boolean, ...args: any[]): void {
        this.pushLog('assert', args);
        console.assert(condition, this.prefix, ...args);
    }
}

/**
 * Factory to create W3oContext instances for methods in a class
 */
export class W3oContextFactory {
    private className: string;
    public static current?: W3oContext;

    constructor(className: string) {
        this.className = className;
    }

    /**
     * Creates a new context for a method invocation with optional parent context
     */
    public method(methodName: string, args?: any, context?: W3oContext): W3oContext {
        if (args instanceof W3oContext) {
            context = args;
            args = undefined;
        }
        const ctx = new W3oContext(this.className, methodName, args, context);
        W3oContextFactory.current = ctx;
        return ctx;
    }

    // ---- Console proxies using current context ----

    public log(...args: any[]): void {
        W3oContextFactory.console.log(...args);
    }

    public error(...args: any[]): void {
        W3oContextFactory.console.error(...args);
    }

    public info(...args: any[]): void {
        W3oContextFactory.console.info(...args);
    }

    public warn(...args: any[]): void {
        W3oContextFactory.console.warn(...args);
    }

    public debug(...args: any[]): void {
        W3oContextFactory.console.debug(...args);
    }

    public assert(condition: boolean, ...args: any[]): void {
        W3oContextFactory.console.assert(condition, ...args);
    }

    /**
     * Returns either the current context or the native console
     */
    private static get console(): W3oContext | Console {
        return W3oContextFactory.current ?? console;
    }
}
