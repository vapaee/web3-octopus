// w3o-core/src/classes/W3oContext.ts
import { BehaviorSubject } from 'rxjs';
import { W3oStorage } from './W3oStorage';
/**
 * Class representing a logging and contextual execution scope
 */
export class W3oContext {
    /**
     * Generates a 2-digit hexadecimal unique ID for the context
     */
    static generateUniqueId() {
        const rand = Math.floor(Math.random() * 256);
        return rand.toString(16).padStart(2, '0');
    }
    constructor(className, methodName, args, parentContext) {
        this.logsArray = [];
        this.destroyedSubject = new BehaviorSubject(false);
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
                    // TODO: Handle context timeout
                    // console.warn(
                    //     'Warning: context not dismissed after 10 seconds',
                    //     this
                    // );
                    // this.dismiss();
                }
            }, 10000);
        }
        this.log(`${className}.${methodName}()`, args);
        this.argsValue = args;
    }
    /**
     * Observable that emits when the context is destroyed
     */
    get destroyed$() {
        return this.destroyedSubject.asObservable();
    }
    /**
     * Cleans memory, log and timer resources of the context tree
     */
    dismiss() {
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
    id() {
        return this.idValue;
    }
    /**
     * Returns the parent context, if any
     */
    parent() {
        return this.parentContext;
    }
    /**
     * Returns the arguments used when creating this context
     */
    args() {
        return this.argsValue;
    }
    /**
     * Returns all the log lines registered in this context
     */
    logs() {
        return this.logsArray;
    }
    /**
     * Returns the depth level in the context tree
     */
    level() {
        return this.levelValue;
    }
    /**
     * Returns the time passed since the root context was created
     */
    getCurrentTime() {
        return Date.now() - this.startTime;
    }
    /**
     * Returns a formatted timestamp string for console output
     */
    timestamp() {
        let t = this.getCurrentTime().toString();
        while (t.length < 6) {
            t = ' ' + t;
        }
        return t;
    }
    /**
     * Returns the branch identifier made of concatenated ancestor IDs
     */
    branch() {
        const prefix = this.parentContext ? this.parentContext.branch() : '';
        return `${prefix}${this.idValue}`;
    }
    /**
     * Prefix string used for log indentation and labeling
     */
    get prefix() {
        const indent = '  '.repeat(this.levelValue);
        return `${this.timestamp()} ${this.branch()}: ${indent}`;
    }
    /**
     * Internally stores a log entry with method type and args
     */
    pushLog(method, args) {
        this.logsArray.push({ t: this.getCurrentTime(), m: method, args });
    }
    /**
     * Logs a message using `console.log`
     */
    log(...args) {
        this.pushLog('log', args);
        console.log(this.prefix, ...args);
    }
    /**
     * Logs an error message, supports custom `print()` on W3oError
     */
    error(...args) {
        this.pushLog('error', args);
        if (typeof args[0] === 'string' && typeof args[1]?.print === 'function') {
            const msg = args[0];
            const err = args[1];
            err.print(`${this.prefix} ${msg}`);
        }
        else if (typeof args[0]?.print === 'function') {
            const err = args[0];
            err.print(this.prefix);
        }
        else {
            console.error(this.prefix, ...args);
        }
    }
    /**
     * Logs an info message using `console.info`
     */
    info(...args) {
        this.pushLog('info', args);
        console.info(this.prefix, ...args);
    }
    /**
     * Logs a warning message using `console.warn`
     */
    warn(...args) {
        this.pushLog('warn', args);
        console.warn(this.prefix, ...args);
    }
    /**
     * Logs a debug message using `console.debug`
     */
    debug(...args) {
        this.pushLog('debug', args);
        console.debug(this.prefix, ...args);
    }
    /**
     * Logs an assertion with condition and args
     */
    assert(condition, ...args) {
        this.pushLog('assert', args);
        console.assert(condition, this.prefix, ...args);
    }
}
/**
 * Factory to create W3oContext instances for methods in a class
 */
export class W3oContextFactory {
    constructor(className) {
        this.className = className;
    }
    /**
     * Creates a new context for a method invocation with optional parent context
     */
    method(methodName, args, context) {
        if (args instanceof W3oContext) {
            context = args;
            args = undefined;
        }
        const ctx = new W3oContext(this.className, methodName, args, context);
        W3oContextFactory.current = ctx;
        return ctx;
    }
    // ---- Console proxies using current context ----
    log(...args) {
        W3oContextFactory.console.log(...args);
    }
    error(...args) {
        W3oContextFactory.console.error(...args);
    }
    info(...args) {
        W3oContextFactory.console.info(...args);
    }
    warn(...args) {
        W3oContextFactory.console.warn(...args);
    }
    debug(...args) {
        W3oContextFactory.console.debug(...args);
    }
    assert(condition, ...args) {
        W3oContextFactory.console.assert(condition, ...args);
    }
    /**
     * Returns either the current context or the native console
     */
    static get console() {
        return W3oContextFactory.current ?? console;
    }
}
