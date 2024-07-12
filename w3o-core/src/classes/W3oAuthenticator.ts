// w3o-core/src/classes/W3oAuthenticator.ts

import { Observable } from 'rxjs';
import {
    Logger,
    LoggerContext,
    W3oAccount,
    W3oError,
    W3oTransactionResponse,
    Web3Octopus,
} from '.';
import {
    W3oAddress,
    W3oNetworkName,
    W3oTransaction
} from '../types';
import { W3oAuthSupport } from './W3oAuthSupport';

const logger = new Logger('W3oAuthenticator');

export class W3oAuthenticator {
    private __account: W3oAccount | null = null;
    private __sessionId: string = '';
    
    constructor(
        public readonly support: W3oAuthSupport
    ) {
        
    }

    // Getter to obtain the user's account (throws an exception if not authenticated)
    get account(): W3oAccount {
        if (!this.__account) {
            throw new W3oError(W3oError.ACCOUNT_NOT_LOGGED, {authenticator: this});
        }
        return this.__account;
    }

    // Getter to obtain the authenticator's name from its support
    get name(): string {
        return this.support.name;
    }

    // Getter to obtain the authenticator's type from its support
    get type(): string {
        return this.support.type;
    }

    // Getter to obtain the session ID
    get sessionId(): string {
        return this.__sessionId;
    }

    // Method to set the session ID (throws exception if the session is already set)
    setSessionId(sessionId: string, parent: LoggerContext): void {
        logger.method('setSessionId', {sessionId}, parent);
        if (this.__sessionId !== '') {
            throw new W3oError(W3oError.SESSION_ALREADY_SET, {authenticator: this, sessionId});
        }
        this.__sessionId = sessionId;
    }

    // Method to check if the user is authenticated
    isLogged(): boolean {
        return this.account !== null;
    }

    // Method to obtain the user's address
    getAddress(): W3oAddress {
        return this.account.getAddress();
    }

    // Method to obtain the user's account or null if not authenticated
    getAccount(): W3oAccount | null {
        return this.__account;
    }

    // Method to check if the authenticator is read-only
    isReadOnly(): boolean {
        return this.support.isReadOnly();
    }

    // Method to sign a transaction
    signTransaction(trx: W3oTransaction, parent: LoggerContext): Observable<W3oTransactionResponse> {
        const context = logger.method('signTransaction', {trx}, parent);
        return new Observable<W3oTransactionResponse>(subscriber => {
            try {
                const response = this.support.signTransaction(trx, context);
                response.subscribe({
                    next: (res) => subscriber.next(res),
                    error: (err) => subscriber.error(err),
                    complete: () => subscriber.complete(),
                });
            } catch (error) {
                context.error((error as Error).message);
                subscriber.error(error);
            }
        });
    }

    // Method to log in to a specific network
    login(network: W3oNetworkName, parent: LoggerContext): Observable<W3oAccount> {
        const context = logger.method('login', {network}, parent);
        return new Observable<W3oAccount>(subscriber => { 
            try {
                const accountObservable = this.support.login(network, context);
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

    // Method to automatically log in to a specific network
    autoLogin(network: W3oNetworkName, address: W3oAddress, parent: LoggerContext): Observable<W3oAccount> {
        const context = logger.method('autoLogin', {network, address}, parent);
        return new Observable<W3oAccount>(subscriber => {
            try {
                const accountObservable = this.support.autoLogin(network, address, context);
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

    // Method to log out
    logout(parent: LoggerContext): void {
        const context = logger.method('logout', undefined, parent);
        try {
            this.support.logout(context);
            this.__account = null;
            Web3Octopus.instance.sessions.deleteSession(this.sessionId, context);
            this.__sessionId = '';
        } catch (error) {
            context.error((error as Error).message);
        }
    }

    // Method to take a snapshot of the authenticator's state
    snapshot(): any {
        return {
            account: this.__account ? this.__account.snapshot() : null,
            support: this.support.snapshot(),
        };
    }
}
