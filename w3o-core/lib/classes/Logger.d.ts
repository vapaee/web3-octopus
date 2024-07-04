type LogMethod = 'log' | 'error';
interface LoggedLine {
    t: number;
    m: LogMethod;
    args: any[];
}
type LoggerContextParent = LoggerContext | undefined;
declare class LoggerContext {
    private static uniqueIdCounter;
    private idValue;
    private parentContext?;
    private methodName;
    private argsValue;
    private logsArray;
    private levelValue;
    private startTime;
    constructor(methodName: string, args: any, parent?: LoggerContextParent);
    static generateUniqueId(): string;
    get root(): LoggerContext;
    id(): string;
    parent(): LoggerContextParent;
    args(): any;
    logs(): LoggedLine[];
    level(): number;
    private getCurrentTime;
    timestamp(): string;
    log(...args: any[]): void;
    error(...args: any[]): void;
}
export declare class Logger {
    private name;
    constructor(name: string);
    method(methodName: string, args: any, context?: LoggerContextParent): LoggerContext;
}
export {};
