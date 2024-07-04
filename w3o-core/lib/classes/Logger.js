"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class LoggerContext {
    constructor(methodName, args, parent) {
        this.idValue = LoggerContext.generateUniqueId();
        this.parentContext = parent;
        this.methodName = methodName;
        this.argsValue = args;
        this.logsArray = [];
        this.levelValue = parent ? parent.level() + 1 : 0;
        this.startTime = parent ? parent.startTime : Date.now();
        this.log(`${methodName}()`, args);
    }
    static generateUniqueId() {
        const id = (LoggerContext.uniqueIdCounter++).toString(36);
        return `x${id.length == 1 ? ('0' + id) : id.substring(id.length - 2)}`;
    }
    get root() {
        return this.parentContext ? this.parentContext.root : this;
    }
    id() {
        return this.idValue;
    }
    parent() {
        return this.parentContext;
    }
    args() {
        return this.argsValue;
    }
    logs() {
        return this.logsArray;
    }
    level() {
        return this.levelValue;
    }
    getCurrentTime() {
        return Date.now() - this.startTime;
    }
    timestamp() {
        let t = this.getCurrentTime().toString();
        for (let i = t.length; i < 6; i++) {
            t = ' ' + t;
        }
        return t;
    }
    log(...args) {
        this.logsArray.push({
            t: this.getCurrentTime(),
            m: 'log',
            args
        });
        const messagePrefix = `${this.id()} ${this.timestamp()}${'  '.repeat(this.level())}}`;
        console.log(messagePrefix, ...args);
    }
    error(...args) {
        this.logsArray.push({
            t: this.getCurrentTime(),
            m: 'error',
            args
        });
        const messagePrefix = `${this.id()} ${this.timestamp()}${'  '.repeat(this.level())}}`;
        console.error(messagePrefix, ...args);
    }
}
LoggerContext.uniqueIdCounter = 0;
class Logger {
    constructor(name) {
        this.name = name;
    }
    method(methodName, args, context) {
        return new LoggerContext(`${this.name}.${methodName}`, args, context);
    }
}
exports.Logger = Logger;
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
//# sourceMappingURL=Logger.js.map