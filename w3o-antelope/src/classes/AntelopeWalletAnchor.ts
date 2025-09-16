// w3o-ethereum/src/classes/AntelopeWalletAnchor.ts

import {
    W3oContextFactory,
    W3oContext,
    W3oAuthenticator,
    W3oNetworkName,
    W3oAccount,
    W3oTransaction,
    W3oInstance,
    W3oModule,
    W3oError,
    W3oTransactionResponse,
    W3oAddress,
} from '@vapaee/w3o-core';
import { AntelopeWallet } from './AntelopeWallet';
import { Observable } from 'rxjs';
import { WharfkitInstance } from './AntelopeWharfkit';
import { AntelopeChainSupport, AntelopeTransactionResponse } from './AntelopeChainSupport';
import { AntelopeTransaction } from '../types';
import { AntelopeAccount } from './AntelopeAccount';
import { Session } from '@wharfkit/session';

const logger = new W3oContextFactory('AntelopeWalletAnchor');

/**
 * Represents a user account for Ethereum networks.
 */
export class AntelopeWalletAnchor extends AntelopeWallet {
    support!: AntelopeChainSupport;

    constructor(parent?: W3oContext) {
        const context = logger.method('constructor', parent);
        super('anchor', context);
    }

    override get w3oVersion(): string { return '1.1.0'; }
    override get w3oName(): string { return 'antelope.wallet.anchor'; }
    override get w3oRequire(): string[] { return ['antelope.chain.support@^1.0.0']; }

    override init(octopus: W3oInstance, requirements: W3oModule[], parent: W3oContext): void {
        const context = logger.method('init', { octopus, requirements }, parent);
        super.init(octopus, requirements, context);
        console.assert(requirements[0] instanceof AntelopeChainSupport, 'ERROR: requirements missmatch');
        this.support = requirements[0] as AntelopeChainSupport;
        logger.info('AntelopeWalletAnchor OK!', this.w3oId);
    }

    private getWharfkit(networkName: W3oNetworkName, parent: W3oContext): WharfkitInstance {
        const context = logger.method('init', { networkName }, parent);
        return this.support.getWharfkit(networkName, context);
    }

    private getWharfkitSession(authenticator: W3oAuthenticator, parent: W3oContext): Session {
        logger.method('init', { authenticator }, parent);
        const session = authenticator.session.storage.get<Session>('wharfkit.session') as Session;
        if (!session) {
            throw new W3oError(W3oError.SESSION_MISSING_KEY, { key: 'wharfkit.session', authenticator });
        }
        return session;
    }

    private setWharfkitSession(authenticator: W3oAuthenticator, session: Session, parent: W3oContext): string {
        logger.method('setWharfkitSession', { session }, parent);
        const accountname = session.actor.toString();
        authenticator.onSessionChange$.subscribe(() => {
            if (authenticator.session) {
                authenticator.session.storage.set<Session>('wharfkit.session', session);
                logger.info(`✅Logged in as ${accountname}`);
            }
        });
        return accountname;
    }

    private authenticate(
        auth: W3oAuthenticator,
        networkName: W3oNetworkName,
        parent: W3oContext,
        action: (wharfkit: WharfkitInstance, ctx: W3oContext) => Promise<Session | undefined>
    ): Observable<W3oAccount> {
        return new Observable(observer => {
            const context = logger.method('authenticate', { networkName }, parent);
            try {
                const wharfkit = this.getWharfkit(networkName, context);
                action(wharfkit, context).then(session => {
                    if (session) {
                        const address = this.setWharfkitSession(auth, session, context);
                        observer.next(new AntelopeAccount(address, session, auth, context));
                        observer.complete();
                    } else {
                        observer.error('session not found');
                    }
                }).catch(err => { observer.error(err); });
            } catch (e) { observer.error(e); }
        });
    }    
    
    override login(auth: W3oAuthenticator, networkName: W3oNetworkName, parent: W3oContext): Observable<W3oAccount> {
        return this.authenticate(auth, networkName, parent, (wk, ctx) => wk.login(ctx));
    }

    override autoLogin(auth: W3oAuthenticator, address: W3oAddress, networkName: W3oNetworkName, parent: W3oContext): Observable<W3oAccount> {
        return this.authenticate(auth, networkName, parent, (wk, ctx) => wk.restoreSession(address, ctx));
    }

    override logout(auth: W3oAuthenticator, parent: W3oContext): void {
        const session = this.getWharfkitSession(auth, parent);
        const wk = this.getWharfkit(auth.network.name, parent);
        if (session) {
            wk.logout(parent);
        }
    }

    override signTransaction(auth: W3oAuthenticator, trx: W3oTransaction, parent: W3oContext): Observable<W3oTransactionResponse> {
        const context = logger.method('signTransaction', { trx }, parent);
        const session = this.getWharfkitSession(auth, context);
        const transaction = trx as AntelopeTransaction;
        return new Observable(observer => {
            session.transact(transaction).then(response => {
                const txId = response.response?.['transaction_id'] as string || 'Unknown TX';
                observer.next(new AntelopeTransactionResponse(txId));
                observer.complete();
            }).catch(err => observer.error(err));
        });
    }

    snapshot(): any {
        return {
            ...super.snapshot(),
            _class: 'AntelopeWalletAnchor',
        };
    }
}
