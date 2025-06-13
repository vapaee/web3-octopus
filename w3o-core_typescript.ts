//  Este archivo contiene el código de todo el proyecto de forma concatenada uno tras otro separados por un comentario con la ruta del archivo cuyo código está exactamente a continuación de su nombre 

//  ----------------------- file: w3o-core/src/classes/W3oAccount.ts ----------------------- 

import { W3oContextFactory, W3oContext } from './W3oContext';
import { W3oAuthenticator } from './W3oAuthenticator';

const logger = new W3oContextFactory('W3oAccount');

/**
 * Represents a user account, including minimal data and a reference to its authenticator.
 */
export abstract class W3oAccount {
    // Internal address value for the account
    private readonly __address: string;

    // Reference to the authenticator that created this account
    private readonly __authenticator: W3oAuthenticator;

    constructor(
        address: string,
        authenticator: W3oAuthenticator,
        parent: W3oContext
    ) {
        logger.method('constructor', { authenticator }, parent);
        this.__address = address;
        this.__authenticator = authenticator;

        this.__authenticator.onSessionChange$.subscribe((id) => {
            logger.log('session change detected', { id });
        });
    }

    /**
     * Returns the account address.
     */
    get address(): string {
        return this.__address;
    }

    /**
     * Returns the authenticator associated with this account.
     */
    get authenticator(): W3oAuthenticator {
        return this.__authenticator;
    }

    /**
     * Returns the account address (legacy method, use the getter instead).
     */
    getAddress(): string {
        return this.__address;
    }

    /**
     * Abstract method to take a snapshot of the account state.
     */
    abstract snapshot(): any;
}


//  ----------------------- file: w3o-core/src/classes/W3oAuthManager.ts ----------------------- 

// w3o-core/src/classes/W3oContractManager.ts

import { BehaviorSubject, filter, Observable, take } from 'rxjs';
import {
    W3oAuthInstance,
    W3oAuthSupportName,
    W3oGlobalSettings,
    W3oNetworkType,
    W3oInstance,
    W3oNetworkName
} from '../types';

import { W3oContextFactory, W3oContext } from './W3oContext';
import { W3oAuthSupport } from './W3oAuthSupport';
import { W3oNetwork } from './W3oNetwork';
import { W3oAuthenticator } from './W3oAuthenticator';
import { W3oSession } from './W3oSession';
import { W3oError } from './W3oError';
import { W3oManager } from './W3oManager';

const logger = new W3oContextFactory('W3oAuthManager');

/**
 * Auth manager that handles available authenticators and user login/logout flows
 */
export class W3oAuthManager extends W3oManager implements W3oAuthInstance {
    private __byType: { [authType: W3oNetworkType | string]: W3oAuthSupport[] } = {};
    private __byName: { [authName: W3oAuthSupportName | string]: W3oAuthSupport } = {};

    octopus!: W3oInstance;

    constructor(
        settings: W3oGlobalSettings,
        parent: W3oContext
    ) {
        logger.method('constructor', { settings }, parent);
        super('W3oAuthManager');
    }

    /**
     * Initializes the auth manager with the Octopus instance
     */
    init(octopus: W3oInstance, parent: W3oContext) {
        logger.method('init', { octopus }, parent);
        this.octopus = octopus;
        if (this.__initCalled) {
            throw new W3oError(W3oError.ALREADY_INITIALIZED, {
                name: 'W3oAuthManager',
                message: 'Auth manager already initialized'
            });
        }
        this.__initCalled = true;
        this.__initialized$.next(true);
    }

    /**
     * Adds an auth support provider to the manager before initialization
     */
    addAuthSupport(auth: W3oAuthSupport, parent: W3oContext): void {
        logger.method('add', { auth }, parent);
        if (this.__initCalled) {
            throw new W3oError(W3oError.ALREADY_INITIALIZED, { auth });
        }
        this.__byName[auth.name] = auth;
        if (!this.__byType[auth.type]) {
            this.__byType[auth.type] = [];
        }
        this.__byType[auth.type].push(auth);
    }

    /**
     * Retrieves an authenticator support by its name
     */
    get(name: string): W3oAuthSupport {
        return this.__byName[name];
    }

    /**
     * Lists available authenticator supports by network type
     */
    list(type: string): W3oAuthSupport[] {
        return this.__byType[type];
    }

    /**
     * Creates a new authenticator instance from a registered support
     */
    createAuthenticator(name: W3oAuthSupportName, network: W3oNetwork, parent: W3oContext): W3oAuthenticator {
        logger.method('createAuthenticator', { name, network }, parent);
        const auth = this.get(name);
        if (!auth) {
            throw new W3oError(W3oError.AUTH_SUPPORT_NOT_FOUND, { name });
        }
        return auth.createAuthenticator(network, parent);
    }

    /**
     * Authenticates user (interactive login)
     */
    login(parent: W3oContext): Observable<W3oSession>;
    login(
        chain: W3oNetworkName,
        network: W3oNetworkType,
        authName: W3oAuthSupportName,
        parent: W3oContext
    ): Observable<W3oSession>;
    login(
        networkNameOrParent: W3oNetworkName | W3oContext,
        networkType?: W3oNetworkType,
        authName?: W3oAuthSupportName,
        parent?: W3oContext
    ): Observable<W3oSession> {
        return this.__authenticate('login', networkNameOrParent, networkType, authName, parent);
    }

    /**
     * Attempts automatic login using cached session
     */
    autoLogin(parent: W3oContext): Observable<W3oSession>;
    autoLogin(
        chain: W3oNetworkName,
        network: W3oNetworkType,
        authName: W3oAuthSupportName,
        parent: W3oContext
    ): Observable<W3oSession>;
    autoLogin(
        networkNameOrParent: W3oNetworkName | W3oContext,
        networkType?: W3oNetworkType,
        authName?: W3oAuthSupportName,
        parent?: W3oContext
    ): Observable<W3oSession> {
        return this.__authenticate('autoLogin', networkNameOrParent, networkType, authName, parent);
    }

    /**
     * Internal authentication routine used by login and autoLogin
     */
    private __authenticate(
        method: 'login' | 'autoLogin',
        networkNameOrParent: W3oNetworkName | W3oContext,
        networkType?: W3oNetworkType,
        authName?: W3oAuthSupportName,
        parent?: W3oContext
    ): Observable<W3oSession> {
        if (typeof networkNameOrParent !== 'string') {
            const context = logger.method(method, networkNameOrParent);
            const network = this.octopus.networks.current as W3oNetwork;
            const authList = this.list(network.type);
            const defaultAuthName = authList[0]?.name;
            context.assert(!!defaultAuthName, 'No default authenticator found for network type', { networkType: network.type });
            return this.__authenticate(method, network.name, network.type, defaultAuthName, networkNameOrParent);
        }

        const networkName = networkNameOrParent;
        const context = logger.method(method, { networkName, networkType, authName }, parent!);
        const auth = this.get(authName!);

        if (!auth) {
            throw new W3oError(W3oError.AUTH_SUPPORT_NOT_FOUND, { authName });
        }

        const subject = new BehaviorSubject<W3oSession | null>(null);
        const exec = () => {
            try {
                const networkInstance = this.octopus.networks.getNetwork(networkName, context);
                const authenticator = auth.createAuthenticator(networkInstance, context);
                authenticator[method](networkName, context).subscribe({
                    next: account => {
                        const session = this.octopus.sessions.createCurrentSession(
                            account.getAddress(),
                            authenticator,
                            networkInstance,
                            context
                        );
                        subject.next(session);
                        subject.complete();
                    },
                    error: err => subject.error(err)
                });
            } catch (error) {
                context.error(error);
                subject.error(error);
            }
        };

        if (method === 'autoLogin') {
            this.octopus.whenReady.pipe(take(1)).subscribe(() => exec());
        } else {
            exec();
        }

        return subject.pipe(filter(session => session !== null)) as Observable<W3oSession>;
    }

    /**
     * Logs out from the current session
     */
    logout(parent: W3oContext): Observable<void> {
        const context = logger.method('logout', parent);
        const session = this.octopus.sessions.current;
        if (!session) {
            throw new W3oError(W3oError.SESSION_NOT_FOUND, { sessions: this.octopus.sessions.snapshot() });
        }
        session.logout(context);
        return session.onLogout$;
    }

    /**
     * Captures a snapshot of the current auth manager state
     */
    snapshot(): any {
        const snapshot = {
            byType: {} as { [authType: string]: any[] },
            byName: [] as string[],
        };

        for (const type in this.__byType) {
            snapshot.byType[type] = this.__byType[type].map(auth => auth.snapshot());
        }

        snapshot.byName.push(...Object.keys(this.__byName));

        return snapshot;
    }
}


//  ----------------------- file: w3o-core/src/classes/W3oAuthSupport.ts ----------------------- 

// w3o-core/src/classes/W3oAuthManager.ts

import { Observable } from 'rxjs';
import {
    W3oAuthSupportName,
    W3oNetworkName,
    W3oNetworkType,
    W3oTransaction
} from '../types';
import { W3oContextFactory, W3oContext } from './W3oContext';
import { W3oModule } from './W3oModule';
import { W3oAuthenticator } from './W3oAuthenticator';
import { W3oTransactionResponse } from './W3oTransactionResponse';
import { W3oAccount } from './W3oAccount';
import { W3oNetwork } from './W3oNetwork';

const logger = new W3oContextFactory('W3oAuthSupport');

/**
 * Abstract class that represents a user authenticator
 */
export abstract class W3oAuthSupport extends W3oModule {
    constructor(
        public readonly name: W3oAuthSupportName,
        public readonly type: W3oNetworkType,
        parent: W3oContext,
    ) {
        const context = logger.method('constructor', { name, type }, parent);
        super(context);
    }

    /**
     * Method to create an authenticator
     */
    createAuthenticator(network: W3oNetwork, parent: W3oContext): W3oAuthenticator {
        const context = logger.method('createAuthenticator', {network}, parent);
        return new W3oAuthenticator(this, network, context);
    }

    /**
     * Abstract method to check if the authenticator is read-only
     */
    abstract isReadOnly(): boolean;

    /**
     * Abstract method to sign a transaction
     */
    abstract signTransaction(auth: W3oAuthenticator, trx: W3oTransaction, parent: W3oContext): Observable<W3oTransactionResponse>;

    /**
     * Abstract method to log in to a specific network
     */
    abstract login(auth: W3oAuthenticator, network: W3oNetworkName, parent: W3oContext): Observable<W3oAccount>;

    /**
     * Abstract method to automatically log in to a specific network
     */
    abstract autoLogin(auth: W3oAuthenticator, network: W3oNetworkName, parent: W3oContext): Observable<W3oAccount>;

    /**
     * Abstract method to log out
     */
    abstract logout(auth: W3oAuthenticator, parent: W3oContext): void;
}


//  ----------------------- file: w3o-core/src/classes/W3oAuthenticator.ts ----------------------- 

// w3o-core/src/classes/W3oAuthenticator.ts


import {Observable, Subject } from 'rxjs';
import {
    W3oAddress,
    W3oNetworkName,
    W3oTransaction
} from '../types';

import { W3oContextFactory, W3oContext } from './W3oContext';
import { W3oAccount } from './W3oAccount';
import { W3oAuthSupport } from './W3oAuthSupport';
import { W3oError } from './W3oError';
import { W3oTransactionResponse } from './W3oTransactionResponse';
import { W3oSession } from './W3oSession';
import { W3oNetwork } from './W3oNetwork';

const logger = new W3oContextFactory('W3oAuthenticator');

/**
 * Class that encapsulates authentication logic, session association,
 * and transaction signing for a specific network using a given support.
 * Is responsible for managing user authentication using a specific support strategy,
 * including login, logout, session handling and transaction signing.
 */
export class W3oAuthenticator {
    private __account: W3oAccount | null = null;
    private __session: W3oSession | null = null;

    /**
     * Emits when the session ID changes
     */
    public onSessionChange$: Subject<string> = new Subject<string>();

    constructor(
        public readonly support: W3oAuthSupport,
        public readonly network: W3oNetwork,
        parent: W3oContext,
    ) {
        logger.method('constructor', { support }, parent);
    }

    /**
     * Returns the authenticated account or throws if not logged in
     */
    get account(): W3oAccount {
        if (!this.__account) {
            throw new W3oError(W3oError.ACCOUNT_NOT_LOGGED, { authenticator: this });
        }
        return this.__account;
    }

    /**
     * Returns the authenticator's name
     */
    get name(): string {
        return this.support.name;
    }

    /**
     * Returns the authenticator's type
     */
    get type(): string {
        return this.support.type;
    }

    /**
     * Returns the current session ID or empty string
     */
    get sessionId(): string {
        return this.session.id ?? '';
    }

    /**
     * Returns the current session or throws if not set
     */
    get session(): W3oSession {
        if (!this.__session) {
            throw new W3oError(W3oError.SESSION_NOT_SET, { authenticator: this });
        }
        return this.__session;
    }

    /**
     * Internally sets the session ID and emits session change event
     */
    private setSessionId(sessionId: string, parent: W3oContext): void {
        logger.method('setSessionId', { sessionId }, parent);
        this.onSessionChange$.next(sessionId);
    }

    /**
     * Sets the session if not already set, otherwise throws
     */
    setSession(session: W3oSession, parent: W3oContext): void {
        const context = logger.method('setSession', { session: session.id }, parent);
        if (this.__session) {
            throw new W3oError(W3oError.SESSION_ALREADY_SET, { authenticator: this, session });
        }
        this.__session = session;
        this.setSessionId(session.id, context);
    }

    /**
     * Returns true if the account is logged in
     */
    isLogged(): boolean {
        return this.__account !== null;
    }

    /**
     * Returns the account address
     */
    getAddress(): W3oAddress {
        return this.account.getAddress();
    }

    /**
     * Returns the authenticated account or null
     */
    getAccount(): W3oAccount | null {
        return this.__account;
    }

    /**
     * Checks if the authenticator is in read-only mode
     */
    isReadOnly(): boolean {
        return this.support.isReadOnly();
    }

    /**
     * Delegates transaction signing to the support and emits response
     */
    signTransaction(trx: W3oTransaction, parent: W3oContext): Observable<W3oTransactionResponse> {
        const context = logger.method('signTransaction', { trx }, parent);
        if (this.isReadOnly()) {
            throw new W3oError(W3oError.READ_ONLY_AUTHENTICATOR, { authenticator: this });
        }
        return new Observable<W3oTransactionResponse>(subscriber => {
            try {
                const response = this.support.signTransaction(this, trx, context);
                response.subscribe({
                    next: (res) => subscriber.next(res),
                    error: (err) => subscriber.error(err),
                    complete: () => subscriber.complete(),
                });
            } catch (error) {
                context.error(error);
                subscriber.error(error);
            }
        });
    }

    /**
     * Starts login process through the support layer
     */
    login(networkName: W3oNetworkName, parent: W3oContext): Observable<W3oAccount> {
        const context = logger.method('login', { networkName }, parent);
        return new Observable<W3oAccount>(subscriber => {
            try {
                const accountObservable = this.support.login(this, networkName, context);
                accountObservable.subscribe({
                    next: (account) => {
                        logger.log('this.support.login.subscribe() -> result', { account: account.getAddress() });
                        this.__account = account;
                        subscriber.next(account);
                    },
                    error: (err) => subscriber.error(err),
                    complete: () => subscriber.complete(),
                });
            } catch (error) {
                context.error((error as Error).message);
                subscriber.error(error);
            }
        });
    }

    /**
     * Attempts auto-login through the support layer
     */
    autoLogin(network: W3oNetworkName, parent: W3oContext): Observable<W3oAccount> {
        const context = logger.method('autoLogin', { network }, parent);
        return new Observable<W3oAccount>(subscriber => {
            try {
                const accountObservable = this.support.autoLogin(this, network, context);
                accountObservable.subscribe({
                    next: (account) => {
                        this.__account = account;
                        subscriber.next(account);
                    },
                    error: (err) => subscriber.error(err),
                    complete: () => subscriber.complete(),
                });
            } catch (error) {
                context.error((error as Error).message);
                subscriber.error(error);
            }
        });
    }

    /**
     * Logs out the current account and removes its session
     */
    logout(parent: W3oContext): void {
        const context = logger.method('logout', parent);
        try {
            this.support.logout(this, context);
            this.__account = null;
            this.__session = null;
        } catch (error) {
            context.error((error as Error).message);
        }
    }

    /**
     * Returns a snapshot of the internal state
     */
    snapshot(): any {
        return {
            _class: 'W3oAuthenticator',
            account: this.__account?.snapshot(),
            session: this.__session?.snapshot(),
            support: this.support.snapshot(),
            network: this.network.snapshot(),
        };
    }
}


//  ----------------------- file: w3o-core/src/classes/W3oContext.ts ----------------------- 

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
                    // TODO: Handle context timeout
                    // console.warn(
                    //     'Warning: context not dismissed after 10 seconds',
                    //     this
                    // );
                    // this.dismiss();
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


//  ----------------------- file: w3o-core/src/classes/W3oContract.ts ----------------------- 

// w3o-core/src/classes/W3oContract.ts

import {
    W3oContractABI
} from '../types';
import { W3oContextFactory, W3oContext } from './W3oContext';

const logger = new W3oContextFactory('W3oContract');

/**
 * Base class for blockchain contracts providing address, name, and ABI metadata
 */
export abstract class W3oContract {

    constructor(
        public readonly address: string,
        public readonly name: string,
        public readonly abi: W3oContractABI,
        parent: W3oContext
    ) {
        logger.method('constructor', { address, name, abi }, parent);
    }

    /**
     * Returns a snapshot of the contract's public metadata
     */
    snapshot(): any {
        return {
            address: this.address,
            name: this.name,
            abi: this.abi,
        };
    }
}


//  ----------------------- file: w3o-core/src/classes/W3oContractManager.ts ----------------------- 

// w3o-core/src/classes/W3oContractManager.ts

import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import {
    W3oAddress,
    W3oNetworkSettings,
} from '../types';
import { W3oContextFactory, W3oContext } from './W3oContext';
import { W3oContract } from './W3oContract';
import { W3oNetwork } from './W3oNetwork';

const logger = new W3oContextFactory('W3oContractManager');

/**
 * Abstract manager for contracts, handles retrieval and caching of contract instances
 */
export abstract class W3oContractManager {
    private __contracts: { [address: string]: W3oContract | null } = {};

    constructor(
        public readonly settings: W3oNetworkSettings,
        public readonly network: W3oNetwork,
        parent: W3oContext
    ) {
        logger.method('constructor', { network }, parent);
    }

    /**
     * Returns a list of all cached contract instances (excluding nulls)
     */
    get list(): W3oContract[] {
        return Object.values(this.__contracts).filter(contract => contract !== null) as W3oContract[];
    }

    /**
     * Returns a list of all contract addresses stored in the cache
     */
    get addresses(): W3oAddress[] {
        return Object.keys(this.__contracts).map(address => address as W3oAddress);
    }

    /**
     * Adds a contract to the cache
     */
    addContract(address: W3oAddress, contract: W3oContract | null, parent: W3oContext): void {
        logger.method('addContract', { address, contract }, parent);
        if (contract) {
            this.__contracts[address] = contract;
            logger.info(`Contract added at address: ${address}`);
        } else {
            logger.warn(`No contract provided for address: ${address}`);
        }
    }

    /**
     * Retrieves a contract by address from cache or fetches it from blockchain
     */
    getContract(address: W3oAddress, parent: W3oContext): Observable<W3oContract | null> {
        const context = logger.method('getContract', { address }, parent);
        const contract = this.__contracts[address];
        if (contract !== undefined) {
            return from(Promise.resolve(contract));
        }
        return this.fetchContract(address, context).pipe(
            mergeMap(fetchedContract => {
                if (fetchedContract) {
                    this.addContract(address, fetchedContract, context);
                } else {
                    this.__contracts[address] = null;
                }
                return from(Promise.resolve(fetchedContract));
            })
        );
    }

    /**
     * Returns the current list of cached contract instances
     */
    getContracts(parent: W3oContext): W3oContract[] {
        logger.method('getContracts', parent);
        return this.list;
    }

    /**
     * Gets a token contract from network tokens, fetching it if needed
     */
    getTokenContract(symbol: string, parent: W3oContext): Observable<W3oContract | null> {
        const context = logger.method('getTokenContract', { symbol }, parent);
        const token = this.network.getToken(symbol, parent);
        if (!token) {
            logger.warn(`No token found with symbol: ${symbol}`, parent);
            return from(Promise.resolve(null));
        }
        const existingContract = this.list.find(contract => contract.address === token.address) || null;
        if (existingContract) {
            logger.info(`Token contract found with symbol: ${symbol}`, parent);
            return from(Promise.resolve(existingContract));
        }
        return this.fetchContract(token.address as W3oAddress, context).pipe(
            mergeMap(fetchedContract => {
                if (fetchedContract) {
                    this.addContract(token.address as W3oAddress, fetchedContract, context);
                }
                return from(Promise.resolve(fetchedContract));
            })
        );
    }

    /**
     * Abstract method to fetch a contract from blockchain by its address
     */
    abstract fetchContract(address: W3oAddress, parent: W3oContext): Observable<W3oContract | null>;

    /**
     * Returns a snapshot of all contracts currently cached
     */
    snapshot(): any {
        return {
            contracts: this.list.map(contract => contract.snapshot()),
        };
    }
}



//  ----------------------- file: w3o-core/src/classes/W3oDefaultHttpClient.ts ----------------------- 

// w3o-core/src/classes/W3oDefaultHttpClient.ts

import { Observable } from "rxjs";
import { W3oHttpClient } from "../types";

/**
 * Default HTTP client using Fetch API to implement GET requests as observables
 */
export class W3oDefaultHttpClient implements W3oHttpClient {

    /**
     * Performs a GET request and returns an observable with the response JSON
     */
    get<T>(url: string): Observable<T> {
        return new Observable<T>(subscriber => {
            fetch(url, { method: 'GET' })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    subscriber.next(data as T);
                    subscriber.complete();
                })
                .catch(error => {
                    subscriber.error(error);
                });
        });
    }
}


//  ----------------------- file: w3o-core/src/classes/W3oError.ts ----------------------- 

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


//  ----------------------- file: w3o-core/src/classes/W3oManager.ts ----------------------- 

// w3o-core/src/classes/W3oManager.ts

import { BehaviorSubject, filter, take, Observable, map } from 'rxjs';
import { W3oContextFactory } from './W3oContext';

const logger = new W3oContextFactory('W3oManager');

/**
 * Base class for managers that support initialization lifecycle tracking
 */
export class W3oManager {
    protected __initCalled = false;
    protected __initialized$ = new BehaviorSubject<boolean>(false);

    constructor(
        private managerName: string = 'W3oManager'
    ) {
        logger.method('constructor', { managerName });
        this.whenReady.subscribe(() => {
            W3oContextFactory.current?.log(`✅ ${this.managerName} ready!`);
        });
    }

    /**
     * Observable that emits true when the manager is initialized
     */
    get initialized$(): Observable<boolean> {
        return this.__initialized$.asObservable().pipe(
            filter((value) => value),
            take(1)
        );
    }

    /**
     * Returns current initialized state of the manager
     */
    get initialized(): boolean {
        return this.__initialized$.value;
    }

    /**
     * Emits once when initialization is complete
     */
    get whenReady(): Observable<void> {
        return this.initialized$.pipe(
            filter((value) => value),
            take(1),
            map(() => {
                return;
            })
        );
    }
}


//  ----------------------- file: w3o-core/src/classes/W3oModule.ts ----------------------- 

// w3o-core/src/classes/W3oModule.ts

import {
    BehaviorSubject,
    filter,
    Observable,
    take
} from 'rxjs';
import { W3oContextFactory, W3oContext } from './W3oContext';
import { W3oInstance } from '../types';

const logger = new W3oContextFactory('W3oModule');

/**
 * Abstract class that represents a reusable module with name, version and dependencies
 */
export abstract class W3oModule {
    // Static registry of all registered modules
    static modules: { [w3oId: string]: W3oModule } = {};

    /**
     * Registers a module in the static registry
     */
    static registerModule(module: W3oModule, parent: W3oContext): void {
        logger.method('registerModule', { w3oId: module.w3oId, module }, parent);
        if (W3oModule.modules[module.w3oId]) {
            throw new Error(`Module ${module.w3oId} already registered`);
        }
        W3oModule.modules[module.w3oId] = module;
    }

    /**
     * Returns a module from the registry by its ID
     */
    static getModule(w3oId: string, parent: W3oContext): W3oModule | undefined {
        logger.method('getModule', { w3oId }, parent);
        return W3oModule.modules[w3oId];
    }

    /**
     * Returns the full list of registered modules
     */
    static getModules(parent: W3oContext): W3oModule[] {
        logger.method('getModules', {}, parent);
        return Object.values(W3oModule.modules);
    }

    private __octopus!: W3oInstance;
    private __requirements!: W3oModule[];
    private __initialized$: BehaviorSubject<W3oModule | false> = new BehaviorSubject<W3oModule | false>(false);

    constructor(
        parent: W3oContext,
    ) {
        const context = logger.method('constructor', parent);

        const [name, version] = this.w3oId.split('@');
        if (!!name && !!version) {
            W3oModule.registerModule(this, context);
        } else {
            setTimeout(() => {
                if (!W3oModule.modules[this.w3oId]) {
                    context.error('Module not registered. Try to register yourself after W3oModule constructor', { w3oId: this.w3oId });
                }
            }, 0);
        }
    }

    /**
     * Observable that emits once the module is initialized
     */
    get initialized$(): Observable<W3oModule> {
        return this.__initialized$.asObservable().pipe(
            filter((value): value is W3oModule => value !== false),
            take(1),
        );
    }

    /**
     * Returns whether the module has been initialized
     */
    get initialized(): boolean {
        return this.__initialized$.getValue() !== false;
    }

    /**
     * Accessor for the Octopus instance, throws if not initialized
     */
    get octopus(): W3oInstance {
        if (!this.__octopus) {
            throw new Error(`Module(${this.w3oId}) not initialized. Try to initialize yourself after W3oModule constructor`);
        }
        return this.__octopus;
    }

    /**
     * Accessor for the list of module requirements, throws if not initialized
     */
    get requirements(): W3oModule[] {
        if (!this.__requirements) {
            throw new Error(`Module(${this.w3oId}) not initialized. Try to initialize yourself after W3oModule constructor`);
        }
        return this.__requirements;
    }

    /**
     * Initializes the module with Octopus instance and resolved dependencies
     */
    init(octopus: W3oInstance, requirements: W3oModule[], parent: W3oContext): void {
        logger.method('init', { w3oId: this.w3oId, octopus, requirements }, parent);
        this.__octopus = octopus;
        this.__requirements = requirements;
        this.__initialized$.next(this);
    }

    /**
     * Abstract: Returns module version
     */
    abstract get w3oVersion(): string;

    /**
     * Abstract: Returns module name
     */
    abstract get w3oName(): string;

    /**
     * Abstract: Returns list of module dependencies as w3oIds
     */
    abstract get w3oRequire(): string[];

    /**
     * Computed property combining module name and version
     */
    public get w3oId(): string {
        return this.w3oName + '@' + this.w3oVersion;
    }

    /**
     * Returns a snapshot of this module’s metadata
     */
    snapshot() {
        return {
            w3oId: this.w3oId,
            w3oName: this.w3oName,
            w3oVersion: this.w3oVersion,
            w3oRequire: this.w3oRequire,
        };
    }
}


//  ----------------------- file: w3o-core/src/classes/W3oModuleConcept.ts ----------------------- 

// w3o-core/src/classes/W3oModuleConcept.ts

import { W3oContextFactory, W3oContext } from './W3oContext';
import { W3oModule } from './W3oModule';

const logger = new W3oContextFactory('W3oModuleConcept');

/**
 * Class that represents a typed module (authenticator, network or service) with strongly typed data
 */
export class W3oModuleConcept<T> extends W3oModule {
    constructor(
        private readonly moduleId: { v: string, n: string, r: string[] },
        public readonly data: T,
        parent: W3oContext,
    ) {
        const context = logger.method('constructor', parent);
        super(context);

        const [name, version] = [moduleId.n, moduleId.v];
        if (!!name && !!version) {
            W3oModule.registerModule(this, context);
        } else {
            context.error('Module not registered. review the moduleId', { moduleId });
        }
    }

    /**
     * Returns the version of this module
     */
    override get w3oVersion(): string {
        return this.moduleId?.v ?? '';
    }

    /**
     * Returns the name of this module
     */
    override get w3oName(): string {
        return this.moduleId?.n ?? '';
    }

    /**
     * Returns the list of required module IDs
     */
    override get w3oRequire(): string[] {
        return this.moduleId?.r ?? [];
    }
}


//  ----------------------- file: w3o-core/src/classes/W3oModuleManager.ts ----------------------- 

// w3o-core/src/classes/W3oModuleManager.ts

import { combineLatest, tap, filter, take } from 'rxjs';
import {
    W3oGlobalSettings,
    W3oModuleInstance,
    W3oInstance
} from '../types';
import { W3oContextFactory, W3oContext } from './W3oContext';
import { W3oModule } from './W3oModule';
import { W3oError } from './W3oError';
import { W3oManager } from './W3oManager';

const logger = new W3oContextFactory('W3oModuleManager');

/**
 * Class that implements a module manager
 */
export class W3oModuleManager extends W3oManager implements W3oModuleInstance {

    constructor(
        settings: W3oGlobalSettings,
        parent: W3oContext
    ) {
        logger.method('constructor', { settings }, parent);
        super('W3oModuleManager');
    }

    /**
     * Initializes the module manager and all registered modules with their dependencies
     */
    init(octopus: W3oInstance, parent: W3oContext): void {
        const context = logger.method('init', { octopus, modules: Object.keys(W3oModule.modules).toString() }, parent);
        if (this.__initCalled) {
            throw new W3oError(W3oError.ALREADY_INITIALIZED, { name: 'W3oModuleManager', message: 'Module manager already initialized' });
        }
        this.__initCalled = true;
        const registeredModules = W3oModule.modules;
        const list = Object.values(registeredModules);

        for (const w3oId in registeredModules) {
            const module = W3oModule.getModule(w3oId, context);
            if (!module) {
                context.error('Module not found', { w3oId });
                continue;
            }
            logger.debug('processing module', module.w3oId, 'with requirements', module.w3oRequire, { module });

            if (module.w3oRequire.length === 0) {
                module.init(octopus, [], context);
                continue;
            }

            const resolvedModules = module.w3oRequire.map((req) => {
                const [reqName, reqRange] = req.split('@');
                logger.debug('resolving requirement', { reqName, reqRange });
                const candidates = list.filter((m) => m.w3oId.startsWith(reqName));
                logger.debug('candidates', { candidates });
                const requirementsMet = candidates.find((m) => {
                    const actualVersion = m.w3oId.replace(`${reqName}@`, '');
                    const range = reqRange || actualVersion;
                    return this.versionSatisfies(actualVersion, range, context);
                });
                if (requirementsMet) {
                    return requirementsMet;
                } else {
                    context.error(
                        W3oError.MODULE_REQUIREMENTS_NOT_MET,
                        {
                            module: module.w3oId,
                            requirement: req,
                            message: `Module ${module.w3oId} requires module ${req} to be registered and initialized`
                        }
                    );
                    return null;
                }
            });

            const requirementsSubjects = (resolvedModules as W3oModule[]).map((m) => m.initialized$);

            combineLatest(requirementsSubjects).pipe(
                filter((value) => value.every((v) => !!v)),
                take(1)
            ).subscribe((requirements) => {
                const missingInit = (resolvedModules as W3oModule[])
                    .filter((m) => !m.initialized)
                    .map((m) => m.w3oId);
                if (missingInit.length) {
                    context.error(
                        W3oError.MODULE_REQUIREMENTS_NOT_MET,
                        {
                            module: module.w3oId,
                            not_initialized: missingInit,
                            message: `Module ${module.w3oId} requires modules ${missingInit.join(', ')} to be initialized`
                        }
                    );
                } else {
                    module.init(octopus, requirements, context);
                }
            });
        }

        combineLatest(list.map((m) => m.initialized$)).pipe(
            filter((value) => value.every((v) => !!v)),
            take(1),
            tap(() => {
                this.__initialized$.next(true);
                logger.log('ModuleManager initialized', { modules: Object.keys(W3oModule.modules).toString() });
            })
        ).subscribe();
    }

    /**
     * Parses a version string like '1.2.3' into numeric components
     */
    private parseVersion(version: string): number[] {
        return version.split('.').map((num) => parseInt(num, 10));
    }

    /**
     * Checks if an actual version satisfies the requested semver range
     */
    private versionSatisfies(actualVersion: string, range: string, parent: W3oContext): boolean {
        logger.method('versionSatisfies', { actualVersion, range }, parent);
        const actual = this.parseVersion(actualVersion);
        if (range.startsWith('^')) {
            const base = this.parseVersion(range.slice(1));
            return actual[0] === base[0] &&
                (actual[1] > base[1] || (actual[1] === base[1] && actual[2] >= base[2]));
        }
        if (range.startsWith('~')) {
            const base = this.parseVersion(range.slice(1));
            return actual[0] === base[0] &&
                actual[1] === base[1] &&
                actual[2] >= base[2];
        }
        const expected = this.parseVersion(range);
        const satisfies = actual[0] === expected[0] && actual[1] === expected[1] && actual[2] === expected[2];
        logger.debug('version satisfies', { satisfies, actual, expected });
        return satisfies;
    }

    /**
     * Registers a module in the global module registry
     */
    registerModule(module: W3oModule, parent: W3oContext): void {
        const context = logger.method('registerModule', { w3oId: module.w3oId, module }, parent);
        W3oModule.registerModule(module, context);
    }

    /**
     * Gets a module by its ID from the global registry
     */
    getModule<T extends W3oModule = W3oModule>(w3oId: string, parent: W3oContext): T | undefined {
        const context = logger.method('getModule', { w3oId }, parent);
        return W3oModule.getModule(w3oId, context) as T;
    }

    /**
     * Gets all registered modules from the global registry
     */
    getModules(parent: W3oContext): W3oModule[] {
        const context = logger.method('getModules', {}, parent);
        return W3oModule.getModules(context);
    }
}


//  ----------------------- file: w3o-core/src/classes/W3oNetwork.ts ----------------------- 

// w3o-core/src/classes/W3oNetwork.ts

import { Observable } from 'rxjs';

import {
    W3oInstance,
    W3oNetworkName,
    W3oNetworkSettings,
    W3oNetworkType,
} from '../types';

import { W3oContextFactory, W3oContext } from './W3oContext';
import { W3oModule } from './W3oModule';
import { W3oContractManager } from './W3oContractManager';
import { W3oToken } from './W3oToken';
import { W3oDefaultHttpClient } from './W3oDefaultHttpClient';
import { W3oTokenList } from './W3oTokenList';

const logger = new W3oContextFactory('W3oNetwork');

/**
 * Abstract class that represents a specific blockchain network with token and contract management capabilities.
 */
export abstract class W3oNetwork extends W3oModule {

    private __contractCtrl: W3oContractManager;
    private __tokenlist: W3oTokenList;

    constructor(
        public readonly settings: W3oNetworkSettings,
        parent: W3oContext
    ) {
        const context = logger.method('constructor', {settings}, parent);
        if (!settings.httpClient) {
            settings.httpClient = new W3oDefaultHttpClient();
        }
        super(context);
        this.__contractCtrl = this.createContractManager(this, context);
        this.__tokenlist = new W3oTokenList(settings.httpClient!, settings.tokensUrl);
    }

    /**
     * Getter to retrieve the network type.
     */
    get type(): W3oNetworkType {
        return this.settings.type;
    }

    /**
     * Getter to retrieve the network name.
     */
    get name(): W3oNetworkName {
        return this.settings.name;
    }

    /**
     * Getter to obtain an observable stream of tokens available on the network.
     */
    get tokens$(): Observable<W3oToken[]> {
        return this.__tokenlist.list$;
    }

    /**
     * Getter to obtain the current token list available on the network.
     */
    get tokens(): W3oToken[] {
        return this.__tokenlist.list;
    }

    /**
     * Initializes the network module and fetches its tokens.
     */
    override init(octopus: W3oInstance, requirements: W3oModule[], parent: W3oContext): void {
        const context = logger.method('init', { w3oId: this.w3oId, octopus, requirements }, parent);
        this.fetchTokens(context).subscribe(tokens => {
            logger.info('Tokens fetched', { tokens });
            super.init(octopus, requirements, context);
        });
    }

    /**
     * Loads the token list from the configured source.
     */
    fetchTokens(parent: W3oContext): Observable<W3oToken[]> {
        const context = logger.method('fetchTokens', { w3oId: this.w3oId }, parent);
        return this.__tokenlist.load(context);
    }

    /**
     * Returns the network type (redundant alias to `type`).
     */
    getNetworkType(): W3oNetworkType {
        return this.type;
    }

    /**
     * Finds a token by its symbol or address.
     */
    getToken(token: string, parent: W3oContext): W3oToken | null {
        logger.method('getToken', {token}, parent);
        return this.tokens.find(t => t.symbol === token || t.address === token) || null;
    }

    /**
     * Returns the contract manager associated with this network.
     */
    getContractManager(): W3oContractManager {
        return this.__contractCtrl;
    }

    /**
     * Abstract method to create the specific contract manager for the network.
     */
    abstract createContractManager(network: W3oNetwork, parent: W3oContext): W3oContractManager;

    /**
     * Abstract method to retrieve the native system token of the network.
     */
    abstract getSystemToken(): W3oToken;

    /**
     * Abstract method to update the internal state of the network.
     */
    abstract updateState(): Observable<void>;

    /**
     * Abstract method to perform a read-only query to a smart contract.
     */
    abstract queryContract(params: { [key: string]: any }): Observable<any>;

    /**
     * Validates if a given address is a valid account on the network.
     */
    validateAccount(address: string, parent: W3oContext): Observable<boolean> {
        logger.method('validateAccount', {address}, parent);
        return new Observable<boolean>(subscriber => {
            subscriber.next(true); // Simulate a successful validation (Ethereum, Solana, etc.)
            subscriber.complete();
        });
    }
}


//  ----------------------- file: w3o-core/src/classes/W3oNetworkManager.ts ----------------------- 

// w3o-core/src/classes/W3oNetworkManager.ts

import { BehaviorSubject } from 'rxjs';
import {
    W3oGlobalSettings,
    W3oNetworkInstance,
    W3oNetworkName,
    W3oInstance,
} from '../types';

import { W3oContextFactory, W3oContext } from './W3oContext';
import { W3oNetwork } from './W3oNetwork';
import { W3oError } from './W3oError';
import { W3oManager } from './W3oManager';

const logger = new W3oContextFactory('W3oNetworkManager');

/**
 * Manager that handles registration, retrieval and switching of blockchain networks
 */
export class W3oNetworkManager extends W3oManager implements W3oNetworkInstance {
    private __networks: W3oNetwork[] = [];

    public onNetworkChange$: BehaviorSubject<W3oNetworkName | null> = new BehaviorSubject<string | null>(null);

    octopus!: W3oInstance;

    constructor(
        settings: W3oGlobalSettings,
        parent: W3oContext
    ) {
        logger.method('constructor', { settings }, parent);
        super('W3oNetworkManager');
    }

    /**
     * Returns the name of the currently selected network
     */
    get currentNetworkName(): string | null {
        return this.onNetworkChange$.value;
    }

    /**
     * Returns the currently selected network instance
     */
    get current(): W3oNetwork {
        const name = this.currentNetworkName;
        if (!name) {
            throw new W3oError(W3oError.NETWORK_NOT_FOUND, { name, snapshot: this.snapshot() });
        }
        return this.getNetwork(name, W3oContextFactory.current!);
    }

    /**
     * Returns the list of registered network instances
     */
    get list(): W3oNetwork[] {
        return this.__networks;
    }

    /**
     * Initializes the network manager with the Octopus instance
     */
    init(
        octopus: W3oInstance,
        parent: W3oContext
    ): void {
        logger.method('init', { octopus }, parent);
        this.octopus = octopus;
        if (this.__initCalled) {
            throw new W3oError(W3oError.ALREADY_INITIALIZED, { name: 'W3oNetworkManager', message: 'Network manager already initialized' });
        }
        this.__initCalled = true;
        this.__initialized$.next(true);
    }

    /**
     * Adds a network to the list of managed networks
     */
    addNetwork(network: W3oNetwork, parent: W3oContext): void {
        logger.method('addNetwork', { network }, parent);
        if (this.__initCalled) {
            throw new W3oError(W3oError.ALREADY_INITIALIZED, { name: 'W3oNetworkManager', message: 'Network manager already initialized' });
        }
        this.__networks.push(network);
    }

    /**
     * Gets a network instance by its name
     */
    getNetwork(name: W3oNetworkName, parent: W3oContext): W3oNetwork {
        logger.method('getNetwork', { name }, parent);
        const network = this.__networks.find(network => network.settings.name === name);
        if (!network) {
            throw new W3oError(W3oError.NETWORK_NOT_FOUND, { name, snapshot: this.snapshot() });
        }
        return network;
    }

    /**
     * Sets the current network by name
     */
    setCurrentNetwork(name: W3oNetworkName, parent: W3oContext): void {
        const context = logger.method('setCurrentNetwork', { name }, parent);
        const net = this.getNetwork(name, context) as W3oNetwork;
        if (!net) {
            throw new W3oError(W3oError.NETWORK_NOT_FOUND, { name, snapshot: this.snapshot() });
        }
        this.onNetworkChange$.next(name);
    }

    /**
     * Gets the current network instance
     */
    getCurrentNetwork(): W3oNetwork {
        return this.current;
    }

    /**
     * Updates the state of all registered networks (sequentially)
     */
    async updateState(): Promise<void> {
        for (const network of this.__networks) {
            await network.updateState();
        }
    }

    /**
     * Returns a snapshot of the internal state of the network manager
     */
    snapshot(): any {
        return {
            _class: 'W3oNetworkManager',
            networks: this.__networks.map(network => network.snapshot()),
            currentNetworkName: this.currentNetworkName,
        };
    }
}


//  ----------------------- file: w3o-core/src/classes/W3oService.ts ----------------------- 

// w3o-core/src/classes/W3oNetworkManager.ts

import { W3oContextFactory, W3oContext } from "./W3oContext";
import { W3oModule } from "./W3oModule";

const logger = new W3oContextFactory('W3oService');

/**
 * Abstract class that represents a service module with a specific path
 */
export abstract class W3oService extends W3oModule {
    constructor(
        public path: string,
        parent: W3oContext,
    ) {
        const context = logger.method('constructor', { path }, parent);
        super(context);
    }

    /**
     * Returns a snapshot of the internal state of the service, including its path
     */
    override snapshot(): any {
        return {
            ...super.snapshot(),
            path: this.path,
        };
    }
}


//  ----------------------- file: w3o-core/src/classes/W3oSession.ts ----------------------- 

// w3o-core/src/classes/W3oSession.ts

import { Observable, Subject } from 'rxjs';
import { W3oAddress, W3oSessionInstance, W3oTransaction } from '../types';

import { W3oContextFactory, W3oContext } from './W3oContext';
import { W3oAuthenticator } from './W3oAuthenticator';
import { W3oNetwork } from './W3oNetwork';
import { W3oStorage } from './W3oStorage';
import { W3oTransactionResponse } from './W3oTransactionResponse';

const logger = new W3oContextFactory('W3oSession');

/**
 * Represents a session, including methods to access the associated account and network,
 * store and retrieve data, and take a snapshot of the internal state.
 */
export class W3oSession {

    /**
     * Static property that provides the separator used to build the session ID
     */
    public static readonly ID_SEPARATOR = '--';

    /**
     * Subject to emit and complete when logout is triggered
     */
    onLogout$: Subject<any> = new Subject<any>();

    /**
     * Custom storage for session-scoped user data
     */
    public readonly storage: W3oStorage = new W3oStorage();

    /**
     * Internal identifier for the session
     */
    private __id: string = '';

    constructor(
        public readonly manager: W3oSessionInstance,
        public readonly address: W3oAddress,
        public readonly authenticator: W3oAuthenticator,
        public readonly network: W3oNetwork,
        parent: W3oContext,
    ) {
        logger.method('constructor', {address, authenticator, network}, parent);
        this.__id = `${address}${W3oSession.ID_SEPARATOR}${authenticator.name}${W3oSession.ID_SEPARATOR}${network.name}`;
    }

    /**
     * Getter to retrieve the session ID
     */
    get id(): string {
        return this.__id;
    }

    /**
     * Performs logout: triggers authenticator logout, deletes session from manager, and emits logout event
     */
    logout(parent: W3oContext) {
        const context = logger.method('logout', parent);
        this.authenticator.logout(context);
        this.manager.deleteSession(this.id, context);
        this.onLogout$.next(null);
        this.onLogout$.complete();
    }

    /**
     * Signs a transaction using the authenticator support
     */
    signTransaction(transaction: W3oTransaction, parent: W3oContext): Observable<W3oTransactionResponse> {
        const context = logger.method('transact', {transaction}, parent);
        return this.authenticator.support.signTransaction(this.authenticator, transaction, context);
    }

    /**
     * Returns a snapshot of the session's current internal state
     */
    snapshot(): any {
        return {
            authenticator: this.authenticator.snapshot(),
            network: this.network.snapshot(),
            storage: this.storage.snapshot(),
        };
    }
}


//  ----------------------- file: w3o-core/src/classes/W3oSessionManager.ts ----------------------- 

// w3o-core/src/classes/W3oSessionManager.ts

import { BehaviorSubject, mapTo, Observable, Subject, tap, throwError } from 'rxjs';

import {
    W3oAddress,
    W3oGlobalSettings,
    W3oInstance,
    W3oSessionInstance
} from '../types';
import { W3oContextFactory, W3oContext } from './W3oContext';
import { W3oNetwork } from './W3oNetwork';
import { W3oAuthenticator } from './W3oAuthenticator';
import { W3oSession } from './W3oSession';
import { W3oError } from './W3oError';
import { W3oManager } from './W3oManager';

const logger = new W3oContextFactory('W3oSessionManager');

interface W3oStoredSessions {
    currentSessionId: string | null;
    sessions: string[];
}

const STORAGE_KEY = 'w3o-sessions';

/**
 * Manages user sessions including creation, retrieval, deletion, and persistence.
 */
export class W3oSessionManager extends W3oManager implements W3oSessionInstance {
    /**
     * Stores all active sessions indexed by session ID.
     */
    private __sessions: { [key: string]: W3oSession } = {};

    /**
     * Flag indicating whether multiple sessions are allowed.
     */
    private __multiSession: boolean;

    /**
     * Flag indicating whether autoLogin is enabled.
     */
    private __autologin = false;

    /**
     * BehaviorSubject that holds the current active session.
     */
    private __current$: BehaviorSubject<W3oSession | null> = new BehaviorSubject<W3oSession | null>(null);

    /**
     * Reference to the Octopus instance that initialized the manager.
     */
    octopus!: W3oInstance;

    constructor(
        settings: W3oGlobalSettings,
        parent: W3oContext
    ) {
        const context = logger.method('constructor', { settings }, parent);
        super('W3oSessionManager');
        this.__multiSession = settings.multiSession;
        this.__autologin = settings.autoLogin;

        this.__current$.subscribe((session) => {
            logger.log('session change detected', { session });
            this.saveSessions(context);
        });
    }

    /**
     * Observable stream of the current session.
     */
    get current$(): Observable<W3oSession | null> {
        return this.__current$.asObservable();
    }

    /**
     * Returns the ID of the current session, or null if no session is set.
     */
    get currentSessionId(): string | null {
        const session = this.__current$.value;
        return session ? session.id : null;
    }

    /**
     * Returns the current session instance, or null if not set.
     */
    get current(): W3oSession | null {
        return this.__current$.value;
    }

    /**
     * Returns a list of all stored session instances.
     */
    get list(): W3oSession[] {
        return Object.values(this.__sessions);
    }

    /**
     * Indicates whether multiple sessions are supported.
     */
    get isMultiSession(): boolean {
        return this.__multiSession;
    }

    /**
     * Initializes the session manager with an octopus instance and subscribes to network change events.
     */
    init(octopus: W3oInstance, parent: W3oContext): void {
        logger.method('init', { octopus }, parent);
        if (this.__initCalled) {
            throw new W3oError(
                W3oError.ALREADY_INITIALIZED,
                { name: 'W3oSessionManager', message: 'Session manager already initialized' }
            );
        }
        this.__initCalled = true;
        this.octopus = octopus;
        octopus.networks.onNetworkChange$.subscribe(() => {
            logger.debug('network change detected -> clearing current session');
            this.__current$.next(null);
        });
        this.__initialized$.next(true);
    }

    /**
     * Creates a new session for a specific address, authenticator, and network.
     */
    createSession(address: W3oAddress, authenticator: W3oAuthenticator, network: W3oNetwork, parent: W3oContext): W3oSession {
        const context = logger.method('createSession', { address, authenticator, network }, parent);
        const session = new W3oSession(this, address, authenticator, network, context);
        if (this.__sessions[session.id]) {
            throw new W3oError(W3oError.SESSION_ALREADY_EXISTS, { id: session.id });
        }
        this.__sessions[session.id] = session;
        authenticator.setSession(session, context);
        return session;
    }

    /**
     * Creates a new session and sets it as the current session.
     */
    createCurrentSession(address: W3oAddress, authenticator: W3oAuthenticator, network: W3oNetwork, parent: W3oContext): W3oSession {
        const context = logger.method('createCurrentSession', { address, authenticator, network }, parent);
        const session = this.createSession(address, authenticator, network, context);
        this.setCurrentSession(session.id, parent);
        return session;
    }

    /**
     * Retrieves a session by ID or throws if not found.
     */
    getSession(id: string, parent: W3oContext): W3oSession {
        logger.method('getSession', { id }, parent);
        const session = this.__sessions[id];
        if (!session) {
            throw new W3oError(W3oError.SESSION_NOT_FOUND, { id });
        }
        return session;
    }

    /**
     * Retrieves a session from the context instance. (Currently hardcoded context.sessionId)
     */
    getSessionFromContext(parent: W3oContext): W3oSession {
        logger.method('getSessionFromContext', parent);
        const session = this.__sessions['context.sessionId'];
        if (!session) {
            throw new W3oError(W3oError.SESSION_NOT_FOUND, { id: 'context.sessionId' });
        }
        return session;
    }

    /**
     * Returns a list of all existing sessions.
     */
    getSessions(parent: W3oContext): W3oSession[] {
        logger.method('getSessions', parent);
        return this.list;
    }

    /**
     * Deletes the session with the specified ID.
     * If it is the current session, another is selected or current is set to null.
     */
    deleteSession(id: string, parent: W3oContext): void {
        logger.method('deleteSession', { id }, parent);
        const isCurrent = this.currentSessionId === id;
        if (!this.__sessions[id]) {
            throw new W3oError(W3oError.SESSION_NOT_FOUND, { id });
        }
        const deletedSession = this.__sessions[id];
        delete this.__sessions[id];

        logger.log('Deleted session', { deletedSession });
        if (isCurrent) {
            const sessions = this.list;
            if (sessions.length > 0) {
                logger.log('Switching to the first session', { sessions });
                this.__current$.next(sessions[0]);
            } else {
                logger.log('No sessions left, setting current session to null');
                this.__current$.next(null);
            }
        }
    }

    /**
     * Sets the session with the given ID as the current session.
     */
    setCurrentSession(id: string, parent: W3oContext): void {
        logger.method('setCurrentSession', { id }, parent);
        const session = this.__sessions[id];
        if (!session) {
            throw new W3oError(W3oError.SESSION_NOT_FOUND, { id });
        }
        this.__current$.next(session);
    }

    /**
     * Returns the current session instance.
     */
    getCurrentSession(parent: W3oContext): W3oSession | null {
        logger.method('getCurrentSession', parent);
        return this.current;
    }

    /**
     * Saves session information to localStorage.
     */
    saveSessions(parent: W3oContext): void {
        logger.method('saveSessions', parent);
        const stored: W3oStoredSessions = {
            currentSessionId: this.currentSessionId,
            sessions: Object.keys(this.__sessions),
        };
        logger.log('Saving sessions to local storage', { stored });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    }

    /**
     * Loads sessions from localStorage and optionally performs autologin.
     */
    loadSessions(parent: W3oContext): Observable<void> {
        const context = logger.method('loadSessions', { currentSessionId: this.currentSessionId }, parent);
        const result$ = new Subject<void>();

        if (this.list.length > 0) {
            result$.error(new W3oError(
                W3oError.SESSION_ALREADY_EXISTS,
                { id: this.currentSessionId, message: 'close all sessions before loading' }
            ));
        }

        let stored: string | null = null;
        try {
            stored = localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            result$.error(new W3oError(
                W3oError.SESSION_LOAD_ERROR,
                { message: (e as Error).message }
            ));
        }

        if (!!stored) {
            let isFirstSession = true;
            const data = JSON.parse(stored) as W3oStoredSessions;
            context.log('sessions found in local storage', { data });

            const separator = W3oSession.ID_SEPARATOR;
            for (const id of data.sessions) {
                const [address, authenticatorName, networkName] = id.split(separator);
                const network = this.octopus.networks.getNetwork(networkName, context);
                const authenticator = this.octopus.auth.createAuthenticator(authenticatorName, network, context);
                console.log('There are ', data.sessions.length, ' sessions in local storage', { address, authenticatorName, networkName });
                if (isFirstSession) {
                    this.createCurrentSession(address, authenticator, network, context);
                    isFirstSession = false;
                } else {
                    this.createSession(address, authenticator, network, context);
                }
            }

            if (this.__autologin && data.currentSessionId) {
                const session = this.__sessions[data.currentSessionId];
                if (!session) {
                    return throwError(() => new W3oError(
                        W3oError.SESSION_NOT_FOUND,
                        { id: data.currentSessionId, message: 'could not perform autologin' }
                    ));
                }
                return session.authenticator
                    .autoLogin(session.network.settings.name, context)
                    .pipe(
                        tap(() => this.setCurrentSession(session.id, context)),
                        mapTo(void 0)
                    );
            }
        } else {
            context.log('no sessions found in local storage');
        }

        result$.next();
        result$.complete();
        return result$.pipe(
            tap(() => context.log('autoLogin completed')),
            mapTo(void 0)
        );
    }

    /**
     * Returns a snapshot of the internal session manager state.
     */
    snapshot(): any {
        return {
            currentSessionId: this.currentSessionId,
            sessionsKeys: Object.keys(this.__sessions),
            sessions: this.__sessions,
        };
    }
}


//  ----------------------- file: w3o-core/src/classes/W3oStorage.ts ----------------------- 

// w3o-core/src/classes/W3oStorage.ts

export type W3oMappingType = { [key: string]: any };

/**
 * Simple key/value store for sharing data across a context tree.
 */
export class W3oStorage {
    private data: W3oMappingType = {};

    /**
     * Stores a value under the specified key.
     * @param key - The key to associate with the value.
     * @param value - The value to store.
     */
    public set<T>(key: string, value: T): void {
        this.data[key] = value;
    }

    /**
     * Retrieves a value by its key.
     * @param key - The key of the value to retrieve.
     * @returns The stored value or undefined if not found.
     */
    public get<T = any>(key: string): T | undefined {
        return this.data[key] as T | undefined;
    }

    /**
     * Removes a value by its key.
     * @param key - The key of the value to remove.
     */
    public remove(key: string): void {
        delete this.data[key];
    }

    /**
     * Checks if a key exists in the storage.
     * @param key - The key to check.
     * @returns True if the key exists, false otherwise.
     */
    public has(key: string): boolean {
        return this.data.hasOwnProperty(key);
    }

    /**
     * Returns all keys currently stored.
     * @returns An array of keys.
     */
    public keys(): string[] {
        return Object.keys(this.data);
    }

    /**
     * Clears all stored data.
     */
    public clear(): void {
        this.data = {};
    }

    /**
     * Returns a snapshot (shallow copy) of the current storage state.
     * @returns An object representing the stored key-value pairs.
     */
    public snapshot(): W3oMappingType {
        return { ...this.data };
    }
}


//  ----------------------- file: w3o-core/src/classes/W3oToken.ts ----------------------- 

// w3o-core/src/classes/W3oToken.ts

/**
 * Represents a token, including methods to get information about the token and its associated contract
 */
export class W3oToken {

    constructor(
        public readonly data: {
            [key: string]: any;
        }
    ) {}

    /**
     * * Getter for the token name
     */
    get name(): string {
        return this.getDisplayName();
    }

    /**
     * Getter for the token symbol
     */
    get symbol(): string {
        return this.getSymbol();
    }

    /**
     * Getter for the token contract address
     */
    get account(): string {
        return this.getContractAddress();
    }

    /**
     * Getter for the token contract address
     */
    get address(): string {
        return this.getContractAddress();
    }

    /**
     * Getter for the token precision (decimals)
     */
    get precision(): number {
        return this.getDecimals();
    }

    /**
     * Getter for the token logo URL
     */
    get logo(): string {
        return this.getIconUrl();
    }

    /**
     * Getter for the token chain.
     */
    get chain(): string {
        return 'chain?';
    }

    // If this class is overridden by a subclass, the subclass must implement this methods:

    /**
     * Getter to know if the token is a system token
     * @returns boolean - true if the token is a system token, false otherwise
     */
    isSystemToken(): boolean {
        return this.data['isSystemToken'] ?? false;
    }

    /**
     * Getter for the Icon URL of the token
     * @returns boolean - true if the token is a native token, false otherwise
     */
    getIconUrl(): string {
        return this.data['iconUrl'] ?? this.data['icon'] ?? this.data['logo'] ?? '/asstets/icons/tokens/unknown.svg';
    }

    /**
     * Getter for the display name of the token
     * @returns string - the display name of the token (Ethereum, Bitcoin, etc.)
     */
    getDisplayName(): string {
        return this.data['displayName'] ?? this.data['name'] ?? 'Unknown Token';
    }

    /**
     * Getter for the symbol of the token
     * @returns string - the symbol of the token (ETH, BTC, etc.)
     */
    getSymbol(): string {
        return this.data['symbol'] ?? 'UNKNOWN';
    }

    /**
     * Getter for the decimals or precision of the token
     * @returns number - the number of decimals for the token (18, 8, etc.) - default is 18
     *
     */
    getDecimals(): number {
        return this.data['decimals'] ?? this.data['precision'] ?? 18;
    }

    /**
     * Getter for the USD price of the token (if available)
     * @returns number - the USD price of the token (if available) - default is 0
     */
    getUSDPrice(): number {
        return this.data['usdPrice'] ?? 0;
    }

    /**
     * Getter for the contract address of the token
     * @returns string - the contract address of the token (if available) - default is '0x'
     */
    getContractAddress(): string {
        return this.data['address'] ?? this.data['contract'] ?? this.data['account'] ?? '0x';
    }

    /**
     * Takes and returns a snapshot of the token's state
     * @returns any
     */
    snapshot(): any {
        return {
            name: this.name,
            symbol: this.symbol,
            account: this.account,
            address: this.address,
            precision: this.precision,
            logo: this.logo,
            chain: this.chain,
            data: this.data,
        }
    }
}


//  ----------------------- file: w3o-core/src/classes/W3oTokenList.ts ----------------------- 

// w3o-core/src/classes/W3oTokenList.ts

import { BehaviorSubject, Observable } from "rxjs";
import { W3oContext, W3oContextFactory } from "./W3oContext";
import { W3oToken } from "./W3oToken";
import { W3oHttpClient, W3oTokenData } from "../types";

const logger = new W3oContextFactory('W3oTokenList');

/**
 * Represents a list of tokens and provides methods to query them by symbol or address
 */
export class W3oTokenList {
    private readonly __list$ = new BehaviorSubject<W3oToken[]>([]);

    constructor(
        private http: W3oHttpClient,
        private url: string,
    ) {}

    /**
     * Observable that emits the current token list
     */
    get list$(): Observable<W3oToken[]> {
        return this.__list$.asObservable();
    }

    /**
     * Returns the current token list value
     */
    get list(): W3oToken[] {
        return this.__list$.getValue();
    }

    /**
     * Loads the token list from a remote source via HTTP and emits it
     */
    public load(parent: W3oContext): Observable<W3oToken[]> {
        logger.method('load', parent);
        this.http.get<W3oTokenData[]>(this.url).subscribe({
            next: tokens => {
                this.__list$.next(tokens.map(data => new W3oToken(data)));
            },
            error: err => console.error('Error loading token list:', err),
        });
        return this.__list$.asObservable();
    }

    /**
     * Returns all tokens in the list
     */
    getTokens(): W3oToken[] {
        return this.__list$.getValue();
    }

    /**
     * Returns tokens that match the given symbol
     */
    getTokensBySymbol(symbol: string): W3oToken[] {
        return this.__list$.getValue().filter(token => token.symbol === symbol);
    }

    /**
     * Returns tokens that match the given address
     */
    getTokensByAddress(address: string): W3oToken[] {
        return this.__list$.getValue().filter(token => token.address === address);
    }

    /**
     * Returns the first token found by symbol or address
     */
    getToken(symbolOrAddress: string): W3oToken | null {
        const tokenBySymbol = this.getTokensBySymbol(symbolOrAddress);
        if (tokenBySymbol.length > 0) {
            return tokenBySymbol[0];
        }
        const tokenByAddress = this.getTokensByAddress(symbolOrAddress);
        if (tokenByAddress.length > 0) {
            return tokenByAddress[0];
        }
        return null;
    }

    /**
     * Returns a snapshot of the token list state
     */
    snapshot(): any {
        return {
            list: this.__list$.getValue().map(token => token.snapshot()),
            url: this.url,
        };
    }
}


//  ----------------------- file: w3o-core/src/classes/W3oTransactionResponse.ts ----------------------- 

// w3o-core/src/classes/W3oTransactionResponse.ts

import { Observable } from 'rxjs';
import { W3oTransactionReceipt } from '../types';

/**
 * Represents a transaction response, including its hash and a method to await the receipt
 */
export abstract class W3oTransactionResponse {

    constructor(public hash: string) {}

    /**
     * Abstract method that returns an observable which emits the transaction receipt when available
     */
    abstract wait(): Observable<W3oTransactionReceipt>;
}


//  ----------------------- file: w3o-core/src/classes/Web3Octopus.ts ----------------------- 

// w3o-core/src/classes/Web3Octopus.ts

import { BehaviorSubject, combineLatest, filter, map, Observable } from 'rxjs';
import {
    W3oGlobalSettings,
    W3oInstance,
    W3oIServices,
    W3oNetworkSupportSettings,
} from '../types';

import { W3oContextFactory, W3oContext } from './W3oContext';
import { W3oAuthManager } from './W3oAuthManager';
import { W3oService } from './W3oService';
import { W3oNetworkManager } from './W3oNetworkManager';
import { W3oSessionManager } from './W3oSessionManager';
import { W3oModuleManager } from './W3oModuleManager';
import { W3oError } from './W3oError';
import { W3oModuleConcept } from './W3oModuleConcept';

const logger = new W3oContextFactory('Web3Octopus');

const defaultSettings: W3oGlobalSettings = {
    appName: 'w3o-app',
    multiSession: false,
    autoLogin: true,
};

interface WithSnapshot {
    snapshot(): any;
}

/**
 * Main singleton class that acts as the entry point, includes methods to add network support, register modules, and initialize the state
 */
export class Web3Octopus<Tw3o extends W3oIServices & WithSnapshot> implements W3oInstance {

    private __initCalled = false;
    public onInitialized$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.__initCalled);
    public onManagersReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private __authCtrl: W3oAuthManager | null = null;
    private __networkCtrl: W3oNetworkManager | null = null;
    private __sessionCtrl: W3oSessionManager | null = null;
    private __moduleCtrl: W3oModuleManager | null = null;
    private __services: W3oService[] = [];
    private __serviceCtrl: Tw3o | null = null;
    private __supportFor: { [type: string]: W3oNetworkSupportSettings } = {};
    private __settings: W3oGlobalSettings | null = null;

    private static __instance: W3oInstance | null = null;

    /**
     * Returns the static Octopus singleton instance
     */
    static get instance(): W3oInstance {
        if (!Web3Octopus.__instance) {
            throw new W3oError(W3oError.OCTOPUS_INSTANCE_NOT_FOUND);
        }
        return Web3Octopus.__instance;
    }

    constructor(parent?: W3oContext) {
        logger.method('constructor', parent);
        Web3Octopus.__instance = this;
    }

    /**
     * Returns the session manager instance
     */
    get sessions(): W3oSessionManager {
        if (!this.__sessionCtrl) {
            throw new W3oError(W3oError.SESSION_NOT_FOUND);
        }
        return this.__sessionCtrl;
    }

    /**
     * Returns the network manager instance
     */
    get networks(): W3oNetworkManager {
        if (!this.__networkCtrl) {
            throw new W3oError(W3oError.NETWORK_MANAGER_NOT_CREATED);
        }
        return this.__networkCtrl;
    }

    /**
     * Returns the initialized state
     */
    get initialized(): boolean {
        return this.__initCalled;
    }

    /**
     * Returns the authentication manager instance
     */
    get auth(): W3oAuthManager {
        if (!this.__authCtrl) {
            throw new W3oError(W3oError.AUTH_MANAGER_NOT_CREATED);
        }
        return this.__authCtrl;
    }

    /**
     * Returns the module manager instance
     */
    get modules(): W3oModuleManager {
        if (!this.__moduleCtrl) {
            throw new W3oError(W3oError.MODULE_MANAGER_NOT_CREATED);
        }
        return this.__moduleCtrl;
    }

    /**
     * Returns the services instance object
     */
    get services(): Tw3o {
        if (!this.__serviceCtrl) {
            throw new W3oError(W3oError.SERVICE_OBJECT_NOT_FOUND);
        }
        return this.__serviceCtrl;
    }

    /**
     * Returns the initialized settings
     */
    get settings(): W3oGlobalSettings {
        if (!this.__settings) {
            throw new W3oError(W3oError.SETTINGS_NOT_FOUND);
        }
        return this.__settings;
    }

    /**
     * Observable that emits once Octopus is fully initialized
     */
    get whenReady(): Observable<void> {
        return this.onInitialized$.pipe(
            filter(initialized => initialized),
            map(() => undefined)
        );
    }

    /**
     * Gets support settings for a given network type
     */
    getSupportFor(type: string): W3oNetworkSupportSettings {
        logger.method('getSupportFor', { type });
        if (!this.__supportFor[type]) {
            throw new W3oError(W3oError.SUPPORT_NOT_FOUND, { type });
        }
        return this.__supportFor[type];
    }

    /**
     * Adds support for a new network type before initialization
     */
    addNetworkSupport(support: W3oNetworkSupportSettings, parent?: W3oContext): void {
        const context = logger.method('addNetworkSupport', { support }, parent);
        if (this.__initCalled) {
            throw new W3oError(W3oError.ALREADY_INITIALIZED, { name: 'Web3Octopus', message: 'Network support can only be added before initialization' });
        }

        const sub = this.onManagersReady$.pipe(
            filter(initialized => initialized)
        ).subscribe(() => {
            logger.log('processing support', support.type, 'with requirements', support.networks, support.auth, { support });

            for (const network of support.networks) {
                this.networks.addNetwork(network, context);
            }

            for (const auth of support.auth) {
                this.auth.addAuthSupport(auth, context);
            }

            if (support.networks.length > 0) {
                new W3oModuleConcept(
                    { v: '1.0.0', n: `${support.type}.network.support`, r: [] },
                    { support },
                    context
                );
            }

            if (support.auth.length > 0) {
                new W3oModuleConcept(
                    { v: '1.0.0', n: `${support.type}.auth.support`, r: [`${support.type}.network.support`] },
                    { auth: support.auth },
                    context
                );
            }

            new W3oModuleConcept(
                { v: '1.0.0', n: `${support.type}.global.support`, r: [`${support.type}.network.support`, `${support.type}.auth.support`] },
                { support },
                context
            );

            if (!this.networks.currentNetworkName) {
                this.networks.setCurrentNetwork(support.networks[0].name, context);
            }

            sub.unsubscribe();
        });
    }

    /**
     * Initializes the framework with provided settings
     */
    init(settings: W3oGlobalSettings = defaultSettings, parent?: W3oContext): void {
        const context = logger.method('init', parent);
        if (this.__initCalled) {
            throw new W3oError(W3oError.ALREADY_INITIALIZED, { name: 'Web3Octopus', message: 'Web3Octopus can only be initialized once' });
        }

        const octopus = this;
        this.__settings = settings;
        this.__networkCtrl = new W3oNetworkManager(settings, context);
        this.__sessionCtrl = new W3oSessionManager(settings, context);
        this.__authCtrl = new W3oAuthManager(settings, context);
        this.__moduleCtrl = new W3oModuleManager(settings, context);
        this.__serviceCtrl = this.createServiceCustomInstance(context);
        this.onManagersReady$.next(true);

        this.modules.init(octopus, context);
        this.auth.init(octopus, context);
        this.sessions.init(octopus, context);
        this.networks.init(octopus, context);

        combineLatest([
            this.modules.whenReady,
            this.auth.whenReady,
            this.sessions.whenReady,
            this.networks.whenReady,
        ]).pipe(
            map(() => {
                this.__initCalled = true;
                this.onInitialized$.next(true);
                logger.log('Web3Octopus is ready!!', { octopus });
            })
        ).subscribe(() => {
            logger.log('Web3Octopus is ready!!', { octopus });
        });
    }

    /**
     * Internal method to instantiate the service object tree
     */
    private createServiceCustomInstance(parent?: W3oContext): Tw3o {
        logger.method('createServiceCustomInstance', parent);
        const servicesObject: Tw3o = { snapshot: () => ({}) } as Tw3o;

        for (const service of this.__services) {
            logger.log('processing service', service.path);
            const path = service.path.split('.');
            let currentLevel = servicesObject as unknown as { [part: string]: W3oService };
            for (let i = 0; i < path.length; i++) {
                const part = path[i];
                if (i === path.length - 1) {
                    currentLevel[part] = service;
                } else {
                    if (!currentLevel[part]) {
                        currentLevel[part] = {} as W3oService;
                    }
                    currentLevel = currentLevel[part] as unknown as { [part: string]: W3oService };
                }
            }
        }

        (servicesObject as unknown as WithSnapshot).snapshot = () => {
            const snapshot: any = {};
            const createSnapshot = (src: any, dest: any) => {
                for (const key in src) {
                    if (src[key] instanceof W3oService) {
                        dest[key] = src[key].snapshot();
                    } else if (typeof src[key] === 'object' && src[key] !== null) {
                        dest[key] = {};
                        createSnapshot(src[key], dest[key]);
                    }
                }
            };
            createSnapshot(servicesObject, snapshot);
            return snapshot;
        };

        return servicesObject as Tw3o;
    }

    /**
     * Registers the service modules to be instantiated during initialization
     */
    registerServices(services: W3oService[], parent?: W3oContext): void {
        logger.method('registerServices', { services }, parent);
        this.__services.push(...services);
    }

    /**
     * Returns a snapshot of the current state of Octopus and its subsystems
     */
    snapshot(): any {
        if (!this.__initCalled) {
            throw new W3oError(W3oError.NOT_INITIALIZED, { message: 'snapshots can only be taken after initialization' });
        }
        return {
            class: 'Web3Octopus',
            auth: this.auth.snapshot(),
            networks: this.networks.snapshot(),
            sessions: this.sessions.snapshot(),
            services: this.services.snapshot(),
        };
    }
}


//  ----------------------- file: w3o-core/src/classes/index.ts ----------------------- 


// Basics
export * from './W3oStorage';
export * from './W3oContext';
export * from './W3oError';
export * from './W3oTransactionResponse';
export * from './W3oContract';
export * from './W3oModule';
export * from './W3oModuleConcept';
export * from './W3oManager';
export * from './W3oDefaultHttpClient';

// Authentication
export * from './W3oAuthenticator';
export * from './W3oAccount';

export * from './W3oService';
export * from './W3oToken';
export * from './W3oTokenList';
export * from './W3oNetwork';
export * from './W3oSession';
export * from './W3oAuthSupport';

export * from './W3oModuleManager';
export * from './W3oNetworkManager';
export * from './W3oContractManager';
export * from './W3oSessionManager';

export * from './Web3Octopus';

export * from './W3oAuthManager';


//  ----------------------- file: w3o-core/src/index.ts ----------------------- 

export * from './types';
export * from './classes';


//  ----------------------- file: w3o-core/src/types/index.ts ----------------------- 

// export * from './___window-eth_d_ts';
export * from './w3o-types';
export * from './w3o-interfaces';



//  ----------------------- file: w3o-core/src/types/w3o-interfaces.ts ----------------------- 

// w3o-code/src/types/w3o-interfaces.ts

import { Observable } from 'rxjs';
import {
    W3oAuthenticator,
    W3oAuthSupport,
    W3oContext,
    W3oModule,
    W3oNetwork,
    W3oSession,
    W3oToken
} from '../classes';
import {
    W3oAddress,
    W3oAuthSupportName,
    W3oNetworkName,
    W3oNetworkType
} from './w3o-types';

/**
 * Represents an HTTP client capable of making GET requests.
 */
export interface W3oHttpClient {
    get<T>(url: string): Observable<T>;
}

/**
 * Represents data required to create a token on a network.
 */
export interface W3oTokenData {
    address: string;
    symbol: string;
    name: string;
    decimals: number;
    logoURI?: string;
}

/**
 * Represents a generic transaction in Web3 Octopus.
 * To be specified by each implementation.
 */
export interface W3oTransaction {}

/**
 * Represents the receipt of a transaction in Web3 Octopus.
 * To be specified by each implementation.
 */
export interface W3oTransactionReceipt {}

/**
 * Represents useful links for a specific network.
 */
export interface W3oNetworkLinks {
    explorer: string;
    bridge: string;
    ecosystem: string;
    website: string;
    wallet: string;
}

/**
 * Represents settings for a specific network.
 */
export interface W3oNetworkSettings {
    type: W3oNetworkType;
    name: W3oNetworkName;
    chainId: string;
    displayName: string;
    links: W3oNetworkLinks;
    rpcUrl: string;
    tokensUrl: string;
    httpClient?: W3oHttpClient;
}

/**
 * Represents global settings for the Web3 Octopus instance.
 */
export interface W3oGlobalSettings {
    /**
     * If false, only one session is maintained and the user is logged out if the network changes.
     * If true, multiple sessions are maintained and the current session is set to null on network change until explicitly set.
     */
    multiSession: boolean;

    /**
     * If true, Octopus will attempt to automatically log in the user when a session is found in local storage.
     */
    autoLogin: boolean;

    /**
     * Application name used for identifying storage entries and session management.
     */
    appName: string;
}

/**
 * Represents the ABI of a contract.
 * To be specified by each implementation.
 */
export interface W3oContractABI {}

/**
 * Represents support settings for multiple networks and authenticators.
 */
export interface W3oNetworkSupportSettings {
    type: W3oNetworkType;
    auth: W3oAuthSupport[];
    networks: W3oNetwork[];
}

/**
 * Represents a generic services interface allowing snapshotting of state.
 */
export interface W3oIServices {
    snapshot(): any;
}

/**
 * Represents the main abstract instance of Web3 Octopus.
 */
export interface W3oInstance {
    settings: W3oGlobalSettings;
    sessions: W3oSessionInstance;
    networks: W3oNetworkInstance;
    auth: W3oAuthInstance;
    modules: W3oModuleInstance;
    getSupportFor(type: string): W3oNetworkSupportSettings;
    initialized: boolean;
    whenReady: Observable<void>;
}

/**
 * Represents the session management instance.
 */
export interface W3oSessionInstance {
    snapshot(): unknown;
    loadSessions(context: W3oContext): Observable<void>;
    current: W3oSession | null;
    createCurrentSession(address: W3oAddress, authenticator: W3oAuthenticator, network: W3oNetwork, parent: W3oContext): W3oSession;
    deleteSession(id: string, parent: W3oContext): void;
    createSession(address: W3oAddress, authenticator: W3oAuthenticator, network: W3oNetwork, parent: W3oContext): W3oSession;
    getSession(id: string, parent: W3oContext): W3oSession;
}

/**
 * Represents the network management instance.
 */
export interface W3oNetworkInstance {
    getNetwork(name: W3oNetworkName, parent: W3oContext): W3oNetwork;
    onNetworkChange$: Observable<W3oNetworkName | null>;
    currentNetworkName: string | null;
    current: W3oNetwork;
}

/**
 * Represents the authentication management instance.
 */
export interface W3oAuthInstance {
    createAuthenticator(name: W3oAuthSupportName, network: W3oNetwork, parent: W3oContext): W3oAuthenticator;
}

/**
 * Represents the module management instance.
 */
export interface W3oModuleInstance {
    registerModule(module: W3oModule, parent: W3oContext): void;
    getModule<T extends W3oModule = W3oModule>(w3oId: string, parent: W3oContext): T | undefined;
    getModules(parent: W3oContext): W3oModule[];
}

/**
 * Represents the status of a transfer operation.
 */
export type W3oTransferStatus = {
    state: 'none' | 'success' | 'failure';
    message?: string;
    summary?: W3oTransferSummary;
};

/**
 * Represents the summary details of a transfer.
 */
export interface W3oTransferSummary {
    from: string;
    to: string;
    amount: string;
    transaction: string;
}

/**
 * Represents a token balance with its value and formatted string.
 */
export interface W3oBalance {
    amount: {
        value: number;
        formatted: string;
    };
    token: W3oToken;
}


//  ----------------------- file: w3o-core/src/types/w3o-types.ts ----------------------- 

// w3o-code/src/types/w3o-types.ts

/**
 * Represents the type of blockchain supported by Web3 Octopus
 */
export type W3oNetworkType = 'ethereum' | 'antelope' | 'solana';

/**
 * Represents the identifier for a specific authenticator (e.g., 'metamask', 'walletconnect')
 */
export type W3oAuthSupportName = string;

/**
 * Represents the name of a specific network instance (e.g., 'telos', 'ethereum', 'bsc-testnet')
 */
export type W3oNetworkName = string;

/**
 * Represents a blockchain address (e.g., account or contract address)
 */
export type W3oAddress = string;


//  ----------------------- file: w3o-core/src/version.ts ----------------------- 

export const version = '1.0.0';


