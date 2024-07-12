

type LogMethod = 'log' | 'error';

interface LoggedLine {
    t: number;                            // milliseconds since the root node context was created
    m: LogMethod;                         // method name
    args: any[];                          // arguments passed to the method
}

type LoggerContextParent = LoggerContext | undefined;

export class LoggerContext {
    private static uniqueIdCounter = 0;
    private idValue: string;
    private parentContext?: LoggerContextParent;
    // private methodName: string;
    private argsValue: any;
    private logsArray: LoggedLine[];
    private levelValue: number;
    private startTime: number;

    constructor(methodName: string, args: any, parent?: LoggerContextParent) {
        this.idValue = LoggerContext.generateUniqueId();
        this.parentContext = parent;
        // this.methodName = methodName;
        this.argsValue = args;
        this.logsArray = [];
        this.levelValue = parent ? parent.level() + 1 : 0;
        this.startTime = parent ? parent.startTime : Date.now();
        this.log(`${methodName}()`, args);
    }

    static generateUniqueId(): string {
        const id = (LoggerContext.uniqueIdCounter++).toString(36);
        return `x${id.length == 1 ? ('0'+id) : id.substring(id.length - 2)}`;
    }

    get root(): LoggerContext {
        return this.parentContext ? this.parentContext.root : this;
    }

    id(): string {
        return this.idValue;
    }

    parent(): LoggerContextParent {
        return this.parentContext;
    }

    args(): any {
        return this.argsValue;
    }

    logs(): LoggedLine[] {
        return this.logsArray;
    }

    level(): number {
        return this.levelValue;
    }

    private getCurrentTime(): number {
        return Date.now() - this.startTime;
    }

    timestamp(): string {
        let t = this.getCurrentTime().toString();
        for (let i = t.length; i < 6; i++) {
            t = ' ' + t;
        }
        return t;
    }

    log(...args: any[]): void {
        this.logsArray.push({
            t: this.getCurrentTime(),
            m: 'log',
            args
        });
        const messagePrefix = `${this.id()} ${this.timestamp()}${'  '.repeat(this.level())}}`;
        console.log(messagePrefix, ...args);
    }

    error(...args: any[]): void {
        this.logsArray.push({
            t: this.getCurrentTime(),
            m: 'error',
            args
        });
        const messagePrefix = `${this.id()} ${this.timestamp()}${'  '.repeat(this.level())}}`;
        console.error(messagePrefix, ...args);
    }

    info(...args: any[]): void {
        this.logsArray.push({
            t: this.getCurrentTime(),
            m: 'log',
            args
        });
        const messagePrefix = `${this.id()} ${this.timestamp()}${'  '.repeat(this.level())}}`;
        console.info(messagePrefix, ...args);
    }

    debug(...args: any[]): void {
        this.logsArray.push({
            t: this.getCurrentTime(),
            m: 'log',
            args
        });
        const messagePrefix = `${this.id()} ${this.timestamp()}${'  '.repeat(this.level())}}`;
        console.debug(messagePrefix, ...args);
    }

    warn(...args: any[]): void {
        this.logsArray.push({
            t: this.getCurrentTime(),
            m: 'log',
            args
        });
        const messagePrefix = `${this.id()} ${this.timestamp()}${'  '.repeat(this.level())}}`;
        console.warn(messagePrefix, ...args);
    }
}


export class Logger {
    private name: string;
    static current: LoggerContext;

    constructor(name: string) {
        this.name = name;
    }

    method(methodName: string, args?: any, context?: LoggerContextParent): LoggerContext {
        Logger.current = new LoggerContext(`${this.name}.${methodName}`, args, context);
        return Logger.current;
    }
}

// --- example code ---
/*
// Logger object
const logger = new Logger('MyClass');

class MyClass {
    
    foo(n: number, parent?: LoggerContextParent) {
        const context = logger.method('foo', {n}, parent);
        context.log('log - n:', n);
        setTimeout(() => {
            context.error('error - n:', n);   // this line will be logged after 1000ms
        }, 1000);
    }

    bar(s: string, parent?: LoggerContextParent) {
        const context = logger.method('bar', {s}, parent);
        context.log('log - s:', s);
        setTimeout(() => {
            context.log('log - s:', s);       // this line will be logged after 200ms
        }, 200);
        this.foo(42);
        context.error('error - s:', s);
    }

}

const myClass = new MyClass();
myClass.bar('hello');     // root context AA created
myClass.foo(7);           // root context BB created
// output:
// <root-AA>     0 MyClass.bar() {s: "hello"}
// <root-AA>     0   log - s: "hello"
// <root-AA>     0   MyClass.foo() {n: 42}
// <root-AA>     0     log - n: 42
// <root-AA>     0   error - s: "hello"
// <root-BB>     0 MyClass.foo() {n: 7}
// <root-BB>     0   log - n: 7
// <root-AA>   200   log - s: "hello"
// <root-AA>  1000     error - n: 42
// <root-BB>  1000   error - n: 7
*/


