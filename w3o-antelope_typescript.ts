//  Este archivo contiene el código de todo el proyecto de forma concatenada uno tras otro separados por un comentario con la ruta del archivo cuyo código está exactamente a continuación de su nombre 

//  ----------------------- file: w3o-antelope/src/classes/AntelopeAccount.ts ----------------------- 

// w3o-antelope/src/classes/AntelopeAccount.ts

import { W3oContextFactory, W3oContext, W3oAccount, W3oAuthenticator } from '@vapaee/w3o-core';
import { Session } from '@wharfkit/session';

const logger = new W3oContextFactory('AntelopeAccount');

/**
 * Represents a user account for Antelope-based networks using a Wharfkit session.
 */
export class AntelopeAccount extends W3oAccount {

    /**
     * Constructs a new AntelopeAccount instance with address, session and authenticator.
     */
    constructor(
        address: string,
        session: Session,
        auth: W3oAuthenticator,
        parent: W3oContext,
    ) {
        const context = logger.method('constructor', { address, auth, session }, parent);
        super(address, auth as W3oAuthenticator, context);
    }

    /**
     * Returns a snapshot of the current account state.
     */
    snapshot(): any {
        return {
            address: this.getAddress(),
            _class: 'AntelopeAccount',
        };
    }
}


//  ----------------------- file: w3o-antelope/src/classes/AntelopeAuthAnchor.ts ----------------------- 

// w3o-antelope/src/classes/AntelopeAuthAnchor.ts

import {
    W3oContext,
    W3oContextFactory,
    W3oAuthSupportName,
    W3oInstance,
    W3oTransaction,
    W3oTransactionResponse,
    W3oAccount,
    W3oNetworkName,
    W3oAuthenticator,
    W3oError,
    W3oModule,
} from '@vapaee/w3o-core';

import { AntelopeAuthSupport } from './AntelopeAuthSupport';
import { Observable, take } from 'rxjs';
import { WharfkitInstance } from './AntelopeWharfkit';
import { AntelopeAccount } from './AntelopeAccount';
import { Session } from '@wharfkit/session';
import { AntelopeTransaction } from '../types';
import { AntelopeNetwork } from './AntelopeNetwork';

const logger = new W3oContextFactory('AntelopeAuthAnchor');

/**
 * Represents the response of a transaction in Antelope, with simplified wait method.
 */
export class AntelopeTransactionResponse extends W3oTransactionResponse {
    constructor(hash: string) {
        super(hash);
    }

    /**
     * Simulates waiting for transaction confirmation by emitting a success.
     */
    wait(): Observable<any> {
        return new Observable<any>((observer) => {
            observer.next({ status: 'success' });
            observer.complete();
        });
    }
}

/**
 * Anchor-based authentication support for Antelope networks.
 */
export class AntelopeAuthAnchor extends AntelopeAuthSupport {

    /**
     * Constructs the AntelopeAuthAnchor module with 'anchor' as support name.
     */
    constructor(parent: W3oContext) {
        const context = logger.method('constructor', parent);
        super('anchor' as W3oAuthSupportName, context);
    }

    /**
     * Returns the module version.
     */
    override get w3oVersion(): string {
        return '1.0.0';
    }

    /**
     * Returns the module name.
     */
    override get w3oName(): string {
        return 'antelope.auth.anchor';
    }

    /**
     * Lists required dependencies for this module.
     */
    override get w3oRequire(): string[] {
        return [
            'antelope.auth.support@1.0.0',
        ];
    }

    /**
     * Indicates that this authenticator is not read-only.
     */
    override isReadOnly(): boolean {
        return false;
    }

    /**
     * Initializes the module with its dependencies and logs success.
     */
    override init(octopus: W3oInstance, requirements: W3oModule[], parent: W3oContext): void {
        const context = logger.method('init', { octopus, requirements }, parent);
        super.init(octopus, requirements, context);
        logger.info('AntelopeAuthAnchor OK!', { w3oId: super.w3oId, octopus, requirements });
    }

    /**
     * Returns a snapshot of the module's current state.
     */
    override snapshot(): any {
        return {
            ... super.snapshot(),
            _class: 'AntelopeAuthAnchor',
        };
    }

    /**
     * Extracts the Wharfkit instance from a W3oAuthenticator.
     */
    getWharfkitFrom(auth: W3oAuthenticator, parent: W3oContext): WharfkitInstance {
        const context = logger.method('getWharfkitFrom', { auth }, parent);
        if (auth) {
            if (auth.network instanceof AntelopeNetwork) {
                const wharfkit = auth.network.wharfkit;
                logger.info('Wharfkit found in network', wharfkit);
                return wharfkit;
            } else {
                context.error('No wharfkit found in network', { network: auth.network, auth });
                throw new W3oError(W3oError.SESSION_NOT_FOUND, { auth });
            }
        }
        context.error('No wharfkit found in auth', { auth });
        throw new W3oError(W3oError.SESSION_NOT_FOUND, { auth });
    }

    /**
     * Extracts the Wharfkit instance from a network name.
     */
    getWharfkitFromNetworkName(networkName: W3oNetworkName, parent: W3oContext): WharfkitInstance {
        const context = logger.method('getWharfkitFromNetworkName', { networkName }, parent);
        const network = this.octopus.networks.getNetwork(networkName, context);
        if (network instanceof AntelopeNetwork) {
            return network.wharfkit;
        }
        context.error('No wharfkit found in network', { network });
        throw new W3oError(W3oError.SESSION_NOT_FOUND, { network });
    }

    /**
     * Saves a Wharfkit session in the authenticator's storage.
     */
    private setWharfkitSession(authenticator: W3oAuthenticator, session: Session, parent: W3oContext): string {
        logger.method('setWharfkitSession', { session, authenticator, parent });
        const accountname = session.actor.toString();
        authenticator.onSessionChange$.subscribe(() => {
            if (!!authenticator.session) {
                authenticator.session.storage.set<Session>('wharfkit.session', session);
                logger.info(`✅Logged in as ${accountname}`);
            }
        });
        return accountname;
    }

    /**
     * Retrieves the Wharfkit session from the authenticator.
     */
    public getWharfkitSession(authenticator: W3oAuthenticator, parent: W3oContext): Session {
        const context = logger.method('getWharfkitSession', { authenticator, parent });
        const session = authenticator.session.storage.get<Session>('wharfkit.session') as Session;
        if (!session) {
            context.error('No wharfkit session found in auth');
            throw new W3oError(W3oError.SESSION_MISSING_KEY, { 'key': 'wharfkit.session', authenticator });
        }
        logger.info('Wharfkit session found', session);
        return session;
    }

    /**
     * Internal helper that handles shared login/restore session logic.
     */
    private authenticate(
        auth: W3oAuthenticator,
        networkName: W3oNetworkName,
        parent: W3oContext,
        action: (wharfkit: WharfkitInstance, ctx: W3oContext) => Promise<Session | undefined>,
        initialLabel: string,
        failMessage: string
    ): Observable<W3oAccount> {
        return new Observable<W3oAccount>(observer => {
            const context = logger.method(initialLabel, { auth, networkName }, parent);

            try {
                const wharfkit = this.getWharfkitFrom(auth, context);
                const network = this.octopus.networks.getNetwork(networkName, context);
                logger.log(`${initialLabel}():`, { wharfkit, network });

                action(wharfkit, context).then(session => {
                    logger.info(`${initialLabel}() ->`, { session });
                    if (session) {
                        const address = this.setWharfkitSession(auth, session, context);
                        const account = new AntelopeAccount(address, session, auth, context);
                        observer.next(account as W3oAccount);
                        observer.complete();

                        // we suscribe to session.onLogout$ to execute logout in this class
                        const sub = auth.onSessionChange$.asObservable().subscribe({
                            next: (sessionId: string) => {
                                if (sessionId) {
                                    sub.unsubscribe();
                                    const w3oSession = this.octopus.sessions.getSession(sessionId, context);
                                    if (w3oSession) {
                                        w3oSession.onLogout$.asObservable().pipe(
                                            take(1)
                                        ).subscribe({
                                            next: () => {
                                                logger.log(`${initialLabel}() -> logout()`);
                                                this.logout(auth, context)
                                            }
                                        })
                                    }
                                }
                            }
                        });
                    } else if (initialLabel === 'login') {
                        context.error(failMessage, { session });
                        throw new W3oError(W3oError.SESSION_NOT_FOUND, { session });
                    }
                }).catch(error => {
                    context.error(failMessage, error);
                    observer.error(error);
                });
            } catch (error) {
                context.error('ERROR:', error);
                observer.error(error);
            }
        });
    }

    /**
     * Initiates login flow to the given network.
     */
    override login(
        auth: W3oAuthenticator,
        networkName: W3oNetworkName,
        parent: W3oContext
    ): Observable<W3oAccount> {
        return this.authenticate(
            auth,
            networkName,
            parent,
            (wharfkit, ctx) => wharfkit.login(ctx),
            'login',
            'Login failed'
        );
    }

    /**
     * Attempts to restore a previous session automatically.
     */
    override autoLogin(
        auth: W3oAuthenticator,
        networkName: W3oNetworkName,
        parent: W3oContext
    ): Observable<W3oAccount> {
        return this.authenticate(
            auth,
            networkName,
            parent,
            (wharfkit, ctx) => wharfkit.restoreSession(ctx),
            'autoLogin',
            'Auto login failed'
        );
    }

    /**
     * Logs out from the current Wharfkit session.
     */
    override logout(auth: W3oAuthenticator, parent: W3oContext): void {
        const context = logger.method('logout', { auth }, parent);
        try {
            const wharfkit = this.getWharfkitFrom(auth, context);
            wharfkit.logout(context);
        } catch (error) {
            context.error('ERROR:', error);
            throw new W3oError(W3oError.SESSION_NOT_FOUND, { auth });
        }
    }

    /**
     * Signs a transaction using Wharfkit and returns a transaction response.
     */
    override signTransaction(auth: W3oAuthenticator, trx: W3oTransaction, parent: W3oContext): Observable<AntelopeTransactionResponse> {
        const context = logger.method('signTransaction', { auth, trx, parent });
        const session = this.getWharfkitSession(auth, context);
        this.getWharfkitFrom(auth, context);
        const transaction = trx as AntelopeTransaction;
        return new Observable<AntelopeTransactionResponse>((observer) => {
            session.transact(transaction).then((response) => {
                logger.info('Transaction signed successfully', response);
                const txId = response.response?.['transaction_id'] as string || 'Unknown TX';
                const transactionResponse = new AntelopeTransactionResponse(txId);
                transactionResponse.wait().subscribe((receipt) => {
                    logger.info('Transaction receipt', receipt);
                    observer.next(transactionResponse);
                    observer.complete();
                });
            }).catch((error) => {
                context.error('Transaction signing failed', error);
                observer.error(error);
            });
        });
    }
}


//  ----------------------- file: w3o-antelope/src/classes/AntelopeAuthSupport.ts ----------------------- 

// w3o-antelope/src/classes/AntelopeAuthSupport.ts

import {
    W3oContext,
    W3oContextFactory,
    W3oAuthSupport,
    W3oAuthSupportName,
    W3oNetworkType,
} from "@vapaee/w3o-core";

const logger = new W3oContextFactory('AntelopeAuthSupport');

/**
 * Base class for implementing authentication support specific to Antelope-based networks.
 */
export abstract class AntelopeAuthSupport extends W3oAuthSupport {
    /**
     * Constructs an AntelopeAuthSupport instance with the given support name and context.
     */
    constructor(
        name: W3oAuthSupportName,
        parent: W3oContext
    ) {
        const context = logger.method('constructor', parent);
        super(name, 'antelope' as W3oNetworkType, context);
    }
}


//  ----------------------- file: w3o-antelope/src/classes/AntelopeChains.ts ----------------------- 

// w3o-antelope/src/classes/AntelopeChains.ts

import { W3oContextFactory, W3oContext, W3oNetworkSettings, W3oNetworkLinks, W3oNetworkName, W3oNetworkType } from '@vapaee/w3o-core';
import { Chains } from '@wharfkit/common';
import { W3oAntelopeNetworkSettings } from '../types';
import { AntelopeNetwork } from './AntelopeNetwork';

const type = 'antelope' as W3oNetworkType;
const w3oRequire = ['antelope.network.support@1.0.0'];
const w3oVersion = '1.0.0';

// ---- EOS ----

const EOSConfigJSON: W3oAntelopeNetworkSettings = {
    w3oName: 'antelope.network.eos',
    w3oVersion,
    w3oRequire,
    type,
    name: 'eos' as W3oNetworkName,
    chain: Chains.EOS,
    chainId: Chains.EOS.id.toString(),
    displayName: Chains.EOS.name,
    rpcUrl: 'https://eos.greymass.com',
    tokensUrl: 'assets/tokens_eos.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://eosnetwork.com',
        wallet: ''
    } as W3oNetworkLinks
};

export class EOSNetwork extends AntelopeNetwork {
    constructor(settings: Partial<W3oNetworkSettings>, parent: W3oContext) {
        super(
            { ...EOSConfigJSON, chain: Chains.EOS },
            (new W3oContextFactory('EOSNetwork')).method('constructor', {settings}, parent)
        );
    }
}

// ---- FIO ----

const FIOConfigJSON: W3oAntelopeNetworkSettings = {
    w3oName: 'antelope.network.fio',
    w3oVersion,
    w3oRequire,
    type,
    name: 'fio' as W3oNetworkName,
    chain: Chains.FIO,
    chainId: Chains.FIO.id.toString(),
    displayName: Chains.FIO.name,
    rpcUrl: 'https://fio.greymass.com',
    tokensUrl: 'assets/tokens_fio.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://fioprotocol.io',
        wallet: ''
    } as W3oNetworkLinks
};

export class FIONetwork extends AntelopeNetwork {
    constructor(settings: Partial<W3oNetworkSettings>, parent: W3oContext) {
        super(
            { ...FIOConfigJSON, chain: Chains.FIO },
            (new W3oContextFactory('FIONetwork')).method('constructor', {settings}, parent)
        );
    }
}

// ---- FIO (Testnet) ----

const FIOTestnetConfigJSON: W3oAntelopeNetworkSettings = {
    w3oName: 'antelope.network.fio-testnet',
    w3oVersion,
    w3oRequire,
    type,
    name: 'fio-testnet' as W3oNetworkName,
    chain: Chains.FIOTestnet,
    chainId: Chains.FIOTestnet.id.toString(),
    displayName: Chains.FIOTestnet.name,
    rpcUrl: 'https://testnet.fioprotocol.io',
    tokensUrl: 'assets/tokens_fiotestnet.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://fioprotocol.io',
        wallet: ''
    } as W3oNetworkLinks
};

export class FIOTestnetNetwork extends AntelopeNetwork {
    constructor(settings: Partial<W3oNetworkSettings>, parent: W3oContext) {
        super(
            { ...FIOTestnetConfigJSON, chain: Chains.FIOTestnet },
            (new W3oContextFactory('FIOTestnetNetwork')).method('constructor', {settings}, parent)
        );
    }
}

// ---- Jungle4 ----

const Jungle4ConfigJSON: W3oAntelopeNetworkSettings = {
    w3oName: 'antelope.network.jungle4',
    w3oVersion,
    w3oRequire,
    type,
    name: 'jungle4' as W3oNetworkName,
    chain: Chains.Jungle4,
    chainId: Chains.Jungle4.id.toString(),
    displayName: Chains.Jungle4.name,
    rpcUrl: 'https://jungle4.greymass.com',
    tokensUrl: 'assets/tokens_jungle4.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://jungle.bloks.io',
        wallet: ''
    } as W3oNetworkLinks
};

export class Jungle4Network extends AntelopeNetwork {
    constructor(settings: Partial<W3oNetworkSettings>, parent: W3oContext) {
        super(
            { ...Jungle4ConfigJSON, chain: Chains.Jungle4 },
            (new W3oContextFactory('Jungle4Network')).method('constructor', {settings}, parent)
        );
    }
}

// ---- Kylin (Testnet) ----

const KylinTestnetConfigJSON: W3oAntelopeNetworkSettings = {
    w3oName: 'antelope.network.kylin-testnet',
    w3oVersion,
    w3oRequire,
    type,
    name: 'kylin-testnet' as W3oNetworkName,
    chain: Chains.KylinTestnet,
    chainId: Chains.KylinTestnet.id.toString(),
    displayName: Chains.KylinTestnet.name,
    rpcUrl: 'https://kylin.eosn.io',
    tokensUrl: 'assets/tokens_kylin.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://kylin.bloks.io',
        wallet: ''
    } as W3oNetworkLinks
};

export class KylinTestnetNetwork extends AntelopeNetwork {
    constructor(settings: Partial<W3oNetworkSettings>, parent: W3oContext) {
        super(
            { ...KylinTestnetConfigJSON, chain: Chains.KylinTestnet },
            (new W3oContextFactory('KylinTestnetNetwork')).method('constructor', {settings}, parent)
        );
    }
}


// ---- Libre ----

const LibreConfigJSON: W3oAntelopeNetworkSettings = {
    w3oName: 'antelope.network.libre',
    w3oVersion,
    w3oRequire,
    type,
    name: 'libre' as W3oNetworkName,
    chain: Chains.Libre,
    chainId: Chains.Libre.id.toString(),
    displayName: Chains.Libre.name,
    rpcUrl: 'https://api.libre.org',
    tokensUrl: 'assets/tokens_libre.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://libre.org',
        wallet: ''
    } as W3oNetworkLinks
};

export class LibreNetwork extends AntelopeNetwork {
    constructor(settings: Partial<W3oNetworkSettings>, parent: W3oContext) {
        super(
            { ...LibreConfigJSON, chain: Chains.Libre },
            (new W3oContextFactory('LibreNetwork')).method('constructor', {settings}, parent)
        );
    }
}

// ---- Libre (Testnet) ----

const LibreTestnetConfigJSON: W3oAntelopeNetworkSettings = {
    w3oName: 'antelope.network.libre-testnet',
    w3oVersion,
    w3oRequire,
    type,
    name: 'libre-testnet' as W3oNetworkName,
    chain: Chains.LibreTestnet,
    chainId: Chains.LibreTestnet.id.toString(),
    displayName: Chains.LibreTestnet.name,
    rpcUrl: 'https://testnet.libre.org',
    tokensUrl: 'assets/tokens_libretestnet.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://libre.org',
        wallet: ''
    } as W3oNetworkLinks
};

export class LibreTestnetNetwork extends AntelopeNetwork {
    constructor(settings: Partial<W3oNetworkSettings>, parent: W3oContext) {
        super(
            { ...LibreTestnetConfigJSON, chain: Chains.LibreTestnet },
            (new W3oContextFactory('LibreTestnetNetwork')).method('constructor', {settings}, parent)
        );
    }
}


// ---- Proton ----

const ProtonConfigJSON: W3oAntelopeNetworkSettings = {
    w3oName: 'antelope.network.proton',
    w3oVersion,
    w3oRequire,
    type,
    name: 'proton' as W3oNetworkName,
    chain: Chains.Proton,
    chainId: Chains.Proton.id.toString(),
    displayName: Chains.Proton.name,
    rpcUrl: 'https://proton.greymass.com',
    tokensUrl: 'assets/tokens_proton.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://protonchain.com',
        wallet: 'https://wallet.protonchain.com'
    } as W3oNetworkLinks
};

export class ProtonNetwork extends AntelopeNetwork {
    constructor(settings: Partial<W3oNetworkSettings>, parent: W3oContext) {
        super(
            { ...ProtonConfigJSON, chain: Chains.Proton },
            (new W3oContextFactory('ProtonNetwork')).method('constructor', {settings}, parent)
        );
    }
}

// ---- Proton (Testnet) ----

const ProtonTestnetConfigJSON: W3oAntelopeNetworkSettings = {
    w3oName: 'antelope.network.proton-testnet',
    w3oVersion,
    w3oRequire,
    type,
    name: 'proton-testnet' as W3oNetworkName,
    chain: Chains.ProtonTestnet,
    chainId: Chains.ProtonTestnet.id.toString(),
    displayName: Chains.ProtonTestnet.name,
    rpcUrl: 'https://testnet.protonchain.com',
    tokensUrl: 'assets/tokens_protontestnet.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://protonchain.com',
        wallet: 'https://wallet.protonchain.com'
    } as W3oNetworkLinks
};

export class ProtonTestnetNetwork extends AntelopeNetwork {
    constructor(settings: Partial<W3oNetworkSettings>, parent: W3oContext) {
        super(
            { ...ProtonTestnetConfigJSON, chain: Chains.ProtonTestnet },
            (new W3oContextFactory('ProtonTestnetNetwork')).method('constructor', {settings}, parent)
        );
    }
}


// ---- Telos ----

const TelosZeroConfigJSON: W3oAntelopeNetworkSettings = {
    w3oName: 'antelope.network.telos',
    w3oVersion,
    w3oRequire,
    type,
    name: 'telos' as W3oNetworkName,
    chain: Chains.Telos,
    chainId: Chains.Telos.id.toString(),
    displayName: Chains.Telos.name,
    rpcUrl: 'https://mainnet.telos.net',
    tokensUrl: 'assets/tokens_mainnet.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://telos.net',
        wallet: 'https://wallet.telos.net'
    } as W3oNetworkLinks
};

export class TelosZeroNetwork extends AntelopeNetwork {
    constructor(settings: Partial<W3oNetworkSettings>, parent: W3oContext) {
        super(
            { ...TelosZeroConfigJSON, chain: Chains.Telos },
            (new W3oContextFactory('TelosZeroNetwork')).method('constructor', {settings}, parent)
        );
    }
}

// ---- Telos (Testnet) ----

const TelosZeroTestnetConfigJSON: W3oAntelopeNetworkSettings = {
    w3oName: 'antelope.network.telos-testnet',
    w3oVersion,
    w3oRequire,
    type,
    name: 'telos-testnet' as W3oNetworkName,
    chain: Chains.TelosTestnet,
    chainId: Chains.TelosTestnet.id.toString(),
    displayName: 'Telos Zero Testnet',
    rpcUrl: 'https://testnet.telos.net',
    tokensUrl: 'assets/tokens_testnet.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://telos.net',
        wallet: 'https://wallet.telos.net'
    } as W3oNetworkLinks
};

export class TelosZeroTestnetNetwork extends AntelopeNetwork {
    constructor(settings: Partial<W3oNetworkSettings>, parent: W3oContext) {
        super(
            { ...TelosZeroTestnetConfigJSON, chain: Chains.TelosTestnet },
            (new W3oContextFactory('TelosZeroTestnetNetwork')).method('constructor', {settings}, parent)
        );
    }
}


// ---- UX ----

const UXConfigJSON: W3oAntelopeNetworkSettings = {
    w3oName: 'antelope.network.ux',
    w3oVersion,
    w3oRequire,
    type,
    name: 'ux' as W3oNetworkName,
    chain: Chains.UX,
    chainId: Chains.UX.id.toString(),
    displayName: Chains.UX.name,
    rpcUrl: 'https://api.uxnetwork.io',
    tokensUrl: 'assets/tokens_ux.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://uxnetwork.io',
        wallet: ''
    } as W3oNetworkLinks
};

export class UXNetwork extends AntelopeNetwork {
    constructor(settings: Partial<W3oNetworkSettings>, parent: W3oContext) {
        super(
            { ...UXConfigJSON, chain: Chains.UX },
            (new W3oContextFactory('UXNetwork')).method('constructor', {settings}, parent)
        );
    }
}

// ---- WAX ----

const WAXConfigJSON: W3oAntelopeNetworkSettings = {
    w3oName: 'antelope.network.wax',
    w3oVersion,
    w3oRequire,
    type,
    name: 'wax' as W3oNetworkName,
    chain: Chains.WAX,
    chainId: Chains.WAX.id.toString(),
    displayName: Chains.WAX.name,
    rpcUrl: 'https://wax.greymass.com',
    tokensUrl: 'assets/tokens_wax.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://wax.io',
        wallet: ''
    } as W3oNetworkLinks
};

export class WAXNetwork extends AntelopeNetwork {
    constructor(settings: Partial<W3oNetworkSettings>, parent: W3oContext) {
        super(
            { ...WAXConfigJSON, chain: Chains.WAX },
            (new W3oContextFactory('WAXNetwork')).method('constructor', {settings}, parent)
        );
    }
}

// ---- WAX (Testnet) ----

const WAXTestnetConfigJSON: W3oAntelopeNetworkSettings = {
    w3oName: 'antelope.network.wax-testnet',
    w3oVersion,
    w3oRequire,
    type,
    name: 'wax-testnet' as W3oNetworkName,
    chain: Chains.WAXTestnet,
    chainId: Chains.WAXTestnet.id.toString(),
    displayName: Chains.WAXTestnet.name,
    rpcUrl: 'https://wax-testnet.greymass.com',
    tokensUrl: 'assets/tokens_waxtestnet.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://wax.io',
        wallet: ''
    } as W3oNetworkLinks
};

export class WAXTestnetNetwork extends AntelopeNetwork {
    constructor(settings: Partial<W3oNetworkSettings>, parent: W3oContext) {
        super(
            { ...WAXTestnetConfigJSON, chain: Chains.WAXTestnet },
            (new W3oContextFactory('WAXTestnetNetwork')).method('constructor', {settings}, parent)
        );
    }
}

// ---- XPR ----

const XPRConfigJSON: W3oAntelopeNetworkSettings = {
    w3oName: 'antelope.network.xpr',
    w3oVersion,
    w3oRequire,
    type,
    name: 'xpr' as W3oNetworkName,
    chain: Chains.XPR,
    chainId: Chains.XPR.id.toString(),
    displayName: Chains.XPR.name,
    rpcUrl: 'https://xpr.greymass.com',
    tokensUrl: 'assets/tokens_xpr.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://protonchain.com',
        wallet: 'https://wallet.protonchain.com'
    } as W3oNetworkLinks
};

export class XPRNetwork extends AntelopeNetwork {
    constructor(settings: Partial<W3oNetworkSettings>, parent: W3oContext) {
        super(
            { ...XPRConfigJSON, chain: Chains.XPR },
            (new W3oContextFactory('XPRNetwork')).method('constructor', {settings}, parent)
        );
    }
}

// ---- XPR (Testnet) ----

const XPRTestnetConfigJSON: W3oAntelopeNetworkSettings = {
    w3oName: 'antelope.network.xpr-testnet',
    w3oVersion,
    w3oRequire,
    type,
    name: 'xpr-testnet' as W3oNetworkName,
    chain: Chains.XPRTestnet,
    chainId: Chains.XPRTestnet.id.toString(),
    displayName: Chains.XPRTestnet.name,
    rpcUrl: 'https://testnet.protonchain.com',
    tokensUrl: 'assets/tokens_xprtestnet.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://protonchain.com',
        wallet: 'https://wallet.protonchain.com'
    } as W3oNetworkLinks
};

export class XPRTestnetNetwork extends AntelopeNetwork {
    constructor(settings: Partial<W3oNetworkSettings>, parent: W3oContext) {
        super(
            { ...XPRTestnetConfigJSON, chain: Chains.XPRTestnet },
            (new W3oContextFactory('XPRTestnetNetwork')).method('constructor', {settings}, parent)
        );
    }
}


//  ----------------------- file: w3o-antelope/src/classes/AntelopeContractManager.ts ----------------------- 

// w3o-antelope/src/classes/AntelopeChains.ts

import {
    W3oContext,
    W3oContextFactory,
    W3oAddress,
    W3oContract,
    W3oContractManager,
    W3oNetwork,
    W3oNetworkSettings,
} from "@vapaee/w3o-core";

import { Observable } from "rxjs";
import { AntelopeNetwork } from "./AntelopeNetwork";

const logger = new W3oContextFactory('AntelopeContractManager');

/**
 * Contract manager implementation for Antelope networks, extending the base contract manager.
 */
export class AntelopeContractManager extends W3oContractManager {

    /**
     * Constructs an AntelopeContractManager with specific settings and associated network.
     */
    constructor(
        settings: W3oNetworkSettings,
        network: AntelopeNetwork,
        parent: W3oContext
    ) {
        const context = logger.method('constructor', {settings}, parent);
        super(settings, network as W3oNetwork, context);
    }

    /**
     * Stub method to fetch a contract (not yet implemented).
     */
    fetchContract(address: W3oAddress, parent: W3oContext): Observable<W3oContract | null> {
        const context = logger.method('fetchContract', {address}, parent);
        context.error('fetchContract not implemented');
        return new Observable<W3oContract | null>();
    }
}


//  ----------------------- file: w3o-antelope/src/classes/AntelopeError.ts ----------------------- 

// w3o-antelope/src/classes/AntelopeError.ts

import { W3oError } from "@vapaee/w3o-core";

/**
 * Custom error class for Antelope-specific errors within Web3 Octopus.
 */
export class AntelopeError extends W3oError {

    /**
     * Constructs a new AntelopeError with a predefined message and optional payload.
     */
    constructor(error: { message: string, code: number }, payload?: any) {
        super(error, payload);
    }

    /**
     * Error indicating that the Wharfkit instance could not be found.
     */
    public static readonly WHARFKIT_NOT_FOUND = { message: 'Wharfkit not found', code: 2000 };

}


//  ----------------------- file: w3o-antelope/src/classes/AntelopeNetwork.ts ----------------------- 

// w3o-antelope/src/classes/AntelopeNetwork.ts

import {
    W3oContext,
    W3oContextFactory,
    W3oContractManager,
    W3oNetwork,
    W3oToken,
    W3oModule,
    W3oHttpClient,
} from "@vapaee/w3o-core";

import { Observable } from "rxjs";
import { AntelopeContractManager } from "./AntelopeContractManager";
import { W3oAntelopeNetworkSettings } from "../types";
import { AntelopeWharfkit, WharfkitInstance } from "./AntelopeWharfkit";
import { Name } from "@wharfkit/antelope";

const logger = new W3oContextFactory('AntelopeNetwork');

/**
 * Network implementation for Antelope-based chains, handling settings, wharfkit integration and EOSIO RPC.
 */
export class AntelopeNetwork extends W3oNetwork {

    private _settings!: W3oAntelopeNetworkSettings;
    private _wharfkit!: WharfkitInstance;

    /**
     * Constructs an AntelopeNetwork instance and initializes Wharfkit if settings are valid.
     */
    constructor(
        settings: W3oAntelopeNetworkSettings,
        parent: W3oContext
    ) {
        const context = logger.method('constructor', {chain: settings.displayName, settings}, parent);
        if (!settings.httpClient) {
            settings.httpClient = {
                get: <T>(url: string): Observable<T> => {
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
            } as W3oHttpClient;
        }

        super(settings, context);
        this._settings = settings;

        this.initialized$.subscribe((result) => {
            if (result) {
                this._wharfkit = AntelopeWharfkit.wharfkit(this.octopus.settings.appName, settings, context);
                logger.log('Wharfkit initialized', { wharfkit: this._wharfkit });
            } else {
                context.error(`Module(${this.w3oId}) not initialized correctly`);
            }
        });

        W3oModule.registerModule(this, context);
    }

    /**
     * Returns the network settings specific to Antelope.
     */
    get antelopeSettings(): W3oAntelopeNetworkSettings {
        return this._settings;
    }

    /**
     * Returns the Wharfkit instance or throws if not initialized.
     */
    get wharfkit(): WharfkitInstance {
        if (!this._wharfkit) {
            throw new Error(`Wharfkit not initialized. Module(${this.w3oId}). Try to initialize yourself after W3oModule constructor`);
        }
        return this._wharfkit;
    }

    /**
     * Returns the version declared in network settings.
     */
    override get w3oVersion(): string {
        return this.antelopeSettings?.w3oVersion ?? '';
    }

    /**
     * Returns the module name declared in network settings.
     */
    override get w3oName(): string {
        return this.antelopeSettings?.w3oName ?? '';
    }

    /**
     * Returns the dependency list declared in network settings.
     */
    override get w3oRequire(): string[] {
        return this.antelopeSettings?.w3oRequire ?? [];
    }

    /**
     * Returns a snapshot of the internal state of this module.
     */
    override snapshot(): any {
        return {
            ... super.snapshot(),
            _class: 'AntelopeNetwork',
            settings: this.settings,
        };
    }

    /**
     * Creates a contract manager specific to Antelope networks.
     */
    override createContractManager(network: W3oNetwork, parent: W3oContext): W3oContractManager {
        const context = logger.method('createContractManager', {chain: network.name, network}, parent);
        if (network instanceof AntelopeNetwork) {
            logger.info('AntelopeNetwork contract manager created', parent);
            const manager = new AntelopeContractManager(this.settings, network, context);
            return manager;
        } else {
            context.error(`Invalid network type: Expected AntelopeNetwork, got ${network.constructor.name}`, parent);
            throw new Error(`Invalid network type: ${network.constructor.name}`);
        }
    }

    /**
     * Stub method to get the system token (not yet implemented).
     */
    override getSystemToken(): W3oToken {
        const context = logger.method('getSystemToken', undefined);
        context.error('getSystemToken not implemented');
        return {} as W3oToken;
    }

    /**
     * Stub method to update network state (not yet implemented).
     */
    override updateState(): Observable<void> {
        const context = logger.method('updateState', undefined);
        context.error('updateState not implemented');
        return new Observable<void>();
    }

    /**
     * Executes a query against a smart contract table using Wharfkit.
     */
    override queryContract(params: { [key: string]: any }): Observable<any> {
        const context = logger.method('queryContract', {params});
        return new Observable<any>((observer) => {
            this.wharfkit.accountKit.client.v1.chain.get_table_rows(params as any).then((result: any) => {
                logger.info('Query result:', {result});
                observer.next(result);
                observer.complete();
            }).catch((error: any) => {
                context.error('Query error:', {error});
                observer.error(error);
            });
        });
    }

    /**
     * Validates if an account exists on chain using Wharfkit.
     */
    override validateAccount(username: string, parent: W3oContext): Observable<boolean> {
        const context = logger.method('validateAccount', {username}, parent);
        return new Observable<boolean>(subscriber => {
            this.wharfkit.accountKit.client.v1.chain.get_account(Name.from(username)).then((result: any) => {
                logger.info('Account data:', {result});
                subscriber.next(true);
                subscriber.complete();
            }).catch((error) => {
                context.error('Account failed:', {username, error});
                subscriber.next(false);
                subscriber.complete();
            });
        });
    }
}


//  ----------------------- file: w3o-antelope/src/classes/AntelopeTokensService.ts ----------------------- 

// w3o-antelope/src/classes/AntelopeTokensService.ts

import {
    W3oContext,
    W3oContextFactory,
    W3oInstance,
    W3oService,
    W3oModule,
    W3oBalance,
    W3oAuthenticator,
    W3oToken,
    W3oTransferStatus,
    W3oTransferSummary,
    W3oError,
} from "@vapaee/w3o-core";
import { BehaviorSubject, combineLatest, Observable, of, Subject, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { AntelopeTransferSummary } from "../types";

const logger = new W3oContextFactory('AntelopeTokensService');

/**
 * Service responsible for managing token balances and transfers on Antelope networks.
 */
export class AntelopeTokensService extends W3oService {

    constructor(path: string, parent: W3oContext) {
        const context = logger.method('constructor', { path }, parent);
        super(path, context);
    }

    /**
     * Returns the current version of this service.
     */
    get w3oVersion(): string {
        return '1.0.0';
    }

    /**
     * Returns the service name used for module identification.
     */
    get w3oName(): string {
        return 'antelope.service.tokens';
    }

    /**
     * Returns the list of module requirements for this service.
     */
    get w3oRequire(): string[] {
        return [
            'antelope.auth.anchor@1.0.0',
            'antelope.network.support@1.0.0',
        ];
    }

    /**
     * Initializes the service with provided octopus instance and requirements.
     */
    override init(octopus: W3oInstance, requirements: W3oModule[], parent: W3oContext): void {
        const context = logger.method('init', { octopus, requirements }, parent);
        logger.info('AntelopeTokensService OK!', super.w3oId);
        super.init(octopus, requirements, context);
    }

    /**
     * Returns or creates the shared BehaviorSubject of balances.
     */
    public getBalances$(auth: W3oAuthenticator, parent: W3oContext): BehaviorSubject<W3oBalance[]> {
        const context = logger.method('getBalances$', { auth }, parent);
        let balances$ = auth.session.storage.get('balances$') as BehaviorSubject<W3oBalance[]>;
        if (!balances$) {
            logger.info('Creating new balances observable: Observable<W3oBalance[]>', { auth });
            balances$ = this.fetchAllBalances(auth, context);
        }
        return balances$;
    }

    /**
     * Fetches all balances grouped by token contract and returns a BehaviorSubject.
     */
    private fetchAllBalances(auth: W3oAuthenticator, parent: W3oContext): BehaviorSubject<W3oBalance[]> {
        const context = logger.method('fetchAllBalances', { auth }, parent);
        const tokens$ = auth.network.tokens$;
        let balances$ = auth.session.storage.get('balances$') as BehaviorSubject<W3oBalance[]>;
        if (!balances$) {
            logger.info('Creating new balances observable: BehaviorSubject<W3oBalance[]>', { auth });
            balances$ = new BehaviorSubject<W3oBalance[]>([]);
            auth.session.storage.set('balances$', balances$);
        }

        tokens$.subscribe(tokens => {
            const tokensByContract = tokens.reduce((acc, token) => {
                if (!acc[token.account]) {
                    acc[token.account] = [];
                }
                acc[token.account].push(token);
                return acc;
            }, {} as Record<string, W3oToken[]>);

            const queries = Object.keys(tokensByContract).map(contract => {
                const params = {
                    json: true,
                    code: contract,
                    scope: auth.session.address?.toString(),
                    table: 'accounts',
                    limit: 100,
                };
                return auth.network.queryContract(params).pipe(
                    map((result: {rows?: {balance: string}[]}) => {
                        return tokensByContract[contract].map(token => {
                            if (!result?.rows?.length) {
                                console.warn(`⚠️ No balance found for ${token.symbol}. Returning zero balance.`);
                                return { amount: { value: 0, formatted: this.formatBalance(0, token) }, token };
                            }
                            const matchingRow = result.rows.find(row => {
                                if (row.balance) {
                                    const [ , symbol ] = row.balance.split(' ');
                                    return symbol === token.symbol;
                                }
                                return false;
                            });
                            if (!matchingRow) {
                                console.warn(`⚠️ No balance found for ${token.symbol}. Returning zero balance.`);
                                return { amount: { value: 0, formatted: this.formatBalance(0, token) }, token };
                            }
                            const [amountStr] = matchingRow.balance.split(' ');
                            const value = parseFloat(amountStr) * Math.pow(10, token.precision);
                            return { amount: { value, formatted: this.formatBalance(value, token) }, token };
                        });
                    }),
                    catchError(err => {
                        context.error('Error querying contract for ' + contract, err);
                        return of(tokensByContract[contract].map(token => ({
                            amount: { value: 0, formatted: this.formatBalance(0, token) },
                            token
                        })));
                    })
                );
            });

            if (queries.length) {
                combineLatest(queries).subscribe(balancesArrays => {
                    this.addAllBalancesToState(balances$, balancesArrays.flat(), context);
                }, error => {
                    context.error('Error combining contract queries', error);
                });
            } else {
                balances$.next([]);
            }
        });

        return balances$;
    }

    /**
     * Updates the balance for a single token.
     */
    public updateSingleBalance(auth: W3oAuthenticator, token: W3oToken, parent: W3oContext): void {
        const context = logger.method('updateSingleBalance', { auth, token }, parent);
        const balances$ = this.getBalances$(auth, context);
        this.fetchSingleBalance(auth, token, context).subscribe(balance => {
            this.addSingleBalanceToState(balances$, balance, context);
        }, error => {
            context.error(`❌ Error updating single balance for ${token.symbol}:`, error);
        });
    }

    /**
     * Forces update of all token balances.
     */
    public updateAllBalances(auth: W3oAuthenticator, parent: W3oContext): void {
        const context = logger.method('updateAllBalances', { auth }, parent);
        this.getBalances$(auth, context);
        this.fetchAllBalances(auth, context).subscribe(balances => {
            logger.info('Updating all balances:', balances);
        }, error => {
            context.error('❌ Error updating all balances:', error);
        });
    }

    /**
     * Polls until the token balance changes or a timeout occurs.
     */
    public waitUntilBalanceChanges(
        auth: W3oAuthenticator,
        token: W3oToken,
        delay: number,
        maxSeconds: number,
        parent: W3oContext
    ): Observable<W3oBalance> {
        const context = logger.method('waitUntilBalanceChanges', { auth, token, delay, maxSeconds }, parent);
        return new Observable<W3oBalance>(observer => {
            const startTime = Date.now();
            const check = () => {
                this.fetchSingleBalance(auth, token, context).subscribe(balance => {
                    const current = this.getBalances$(auth, context).getValue().find(b => b.token.symbol === token.symbol);
                    if (balance.amount.value !== current?.amount.value) {
                        this.addSingleBalanceToState(this.getBalances$(auth, context), balance, context);
                        observer.next(balance);
                        observer.complete();
                    } else if ((Date.now() - startTime) / 1000 >= maxSeconds) {
                        observer.error(new Error('Timeout: Balance did not change within the specified time.'));
                    } else {
                        setTimeout(check, 1000);
                    }
                }, err => {
                    context.error('❌ Error checking balance change', err);
                    observer.error(err);
                });
            };
            setTimeout(check, delay * 1000);
        });
    }

    /**
     * Fetches a single balance for a given token from the blockchain.
     */
    private fetchSingleBalance(
        auth: W3oAuthenticator,
        token: W3oToken,
        parent: W3oContext
    ): Observable<W3oBalance> {
        const context = logger.method('fetchSingleBalance', { auth, token }, parent);
        const session = auth.session;
        if (!session?.address) {
            context.error('No active session.');
            return throwError(() => new W3oError(W3oError.SESSION_WITHOUT_ACCOUNT, { session }));
        }
        if (!session.network) {
            context.error('No valid network.');
            return throwError(() => new W3oError(W3oError.SESSION_WITHOUT_NETWORK, { session }));
        }
        const params = {
            json: true,
            code: token.account,
            scope: session.address.toString(),
            table: 'accounts',
            limit: 100,
        };
        return auth.network.queryContract(params).pipe(
            map((result: any) => {
                if (!result?.rows?.length) {
                    console.warn(`⚠️ No balance found for ${token.symbol}. Returning zero balance.`);
                    return { amount: { value: 0, formatted: this.formatBalance(0, token) }, token };
                }
                const matchingRow = result.rows.find((row: any) => {
                    if (row.balance) {
                        const [ , symbol ] = row.balance.split(' ');
                        return symbol === token.symbol;
                    }
                    return false;
                });
                if (!matchingRow) {
                    console.warn(`⚠️ No balance found for ${token.symbol}. Returning zero balance.`);
                    return { amount: { value: 0, formatted: this.formatBalance(0, token) }, token };
                }
                const [amountStr] = matchingRow.balance.split(' ');
                const value = parseFloat(amountStr) * Math.pow(10, token.precision);
                return { amount: { value, formatted: this.formatBalance(value, token) }, token };
            }),
            catchError(error => {
                context.error(`❌ Error fetching balance for ${token.symbol}:`, error);
                return of({ amount: { value: 0, formatted: this.formatBalance(0, token) }, token });
            })
        );
    }

    /**
     * Adds or updates a token balance in the BehaviorSubject state.
     */
    private addSingleBalanceToState(
        balances$: BehaviorSubject<W3oBalance[]>,
        balance: W3oBalance,
        context: W3oContext
    ) {
        logger.method('addSingleBalanceToState', { balance }, context);
        const current = balances$.getValue();
        const idx = current.findIndex(b => b.token.symbol === balance.token.symbol);
        if (idx !== -1) {
            if (current[idx].amount.value !== balance.amount.value) {
                current[idx] = balance;
                balances$.next([...current]);
            } else {
                logger.log(`⚠️ No change detected in balance for ${balance.token.symbol}.`);
            }
        } else {
            balances$.next([...current, balance]);
        }
    }

    /**
     * Replaces all token balances in the BehaviorSubject state.
     */
    private addAllBalancesToState(
        balances$: BehaviorSubject<W3oBalance[]>,
        balances: W3oBalance[],
        context: W3oContext,
    ) {
        logger.method('addAllBalancesToState', { balances }, context);
        balances$.next(balances);
    }

    /**
     * Formats a token balance according to its precision.
     */
    private formatBalance(rawAmount: number, token: W3oToken): string {
        const factor = Math.pow(10, token.precision);
        return (rawAmount / factor).toFixed(token.precision);
    }

    /**
     * Returns or creates the shared BehaviorSubject that holds transfer statuses.
     */
    public getTransferStatus$(auth: W3oAuthenticator, parent: W3oContext): BehaviorSubject<Map<string, W3oTransferStatus>> {
        logger.method('getTransferStatus$', { auth }, parent);
        let transferStatus$ = auth.session.storage.get('transferStatus$') as BehaviorSubject<Map<string, W3oTransferStatus>>;
        if (!transferStatus$) {
            logger.info('Creating new transferStatus observable: BehaviorSubject<Map<string, TransferStatus>>', { auth });
            transferStatus$ = new BehaviorSubject<Map<string, W3oTransferStatus>>(new Map<string, W3oTransferStatus>());
            auth.session.storage.set('transferStatus$', transferStatus$);
        }
        return transferStatus$;
    }

    /**
     * Returns an observable transfer status for a given token symbol and authenticator.
     */
    public getTransferStatusForAuth(auth: W3oAuthenticator, tokenSymbol: string, parent: W3oContext): Observable<W3oTransferStatus> {
        return this.getTransferStatus$(auth, parent).asObservable().pipe(
            map(statusMap => statusMap.get(tokenSymbol) || { state: 'none' } as W3oTransferStatus)
        );
    }

    /**
     * Returns an observable transfer status for a given token symbol using the current session.
     */
    public getTransferStatus(tokenSymbol: string, parent: W3oContext): Observable<W3oTransferStatus> {
        const context = logger.method('getTransferStatus', { tokenSymbol }, parent);
        const session = this.octopus.sessions.current;
        if (!session) {
            context.error('No active session');
            return of({ state: 'none' } as W3oTransferStatus);
        }
        const auth = session.authenticator;
        return this.getTransferStatus$(auth, parent).asObservable().pipe(
            map(statusMap => statusMap.get(tokenSymbol) || { state: 'none' } as W3oTransferStatus)
        );
    }

    /**
     * Sets the transfer status for a specific token.
     */
    private setTransferStatus(
        auth: W3oAuthenticator,
        tokenSymbol: string,
        state: 'none' | 'success' | 'failure',
        message?: string,
        summary?: W3oTransferSummary,
        parent?: W3oContext
    ): void {
        const context = logger.method('setTransferStatus', { auth, tokenSymbol, state }, parent);
        const transferStatus$ = this.getTransferStatus$(auth, context);
        const statusMap = transferStatus$.getValue();
        statusMap.set(tokenSymbol, { state, message, summary });
        transferStatus$.next(statusMap);
    }

    /**
     * Resets the transfer status cycle for a specific token.
     */
    public resetTransferCycle(auth: W3oAuthenticator, tokenSymbol: string, parent: W3oContext): void {
        this.setTransferStatus(auth, tokenSymbol, 'none', undefined, undefined, parent);
    }

    /**
     * Resets transfer status for all tokens known to the authenticator's network.
     */
    public resetAllTransfers(auth: W3oAuthenticator, parent: W3oContext): void {
        const context = logger.method('resetAllTransfers', {}, parent);
        auth.network.tokens$.subscribe(tokenList => {
            tokenList.forEach(token => {
                this.resetTransferCycle(auth, token.symbol, context);
            });
        });
    }

    /**
     * Transfers a token and updates the transfer status accordingly.
     */
    public transferToken(
        auth: W3oAuthenticator,
        to: string,
        quantity: string,
        token: W3oToken,
        memo: string = '',
        parent: W3oContext
    ): Observable<AntelopeTransferSummary> {
        const context = logger.method('transferToken', { auth, to, quantity, token, memo }, parent);

        const from = auth.account.address;
        if (!from) {
            const errorMessage = 'No active session.';
            context.error(errorMessage);
            this.setTransferStatus(auth, token.symbol, 'failure', errorMessage, undefined, context);
            return throwError(() => new W3oError(W3oError.AUTH_WITHOUT_ACCOUNT, { auth }));
        }

        const result$ = new Subject<AntelopeTransferSummary>();
        try {
            const action = {
                account: token.account,
                name: 'transfer',
                authorization: [{ actor: from, permission: 'active' }],
                data: { from, to, quantity, memo },
            };
            logger.info('Sending transfer transaction', action);

            auth.session.signTransaction({ action }, context).subscribe({
                next: (result) => {
                    const txId = result.hash;
                    logger.info(`Transaction successful: ${txId}`);

                    const summary: AntelopeTransferSummary = {
                        from,
                        to,
                        amount: quantity,
                        transaction: txId,
                        memo,
                    };

                    this.setTransferStatus(auth, token.symbol, 'success', `Transferred ${quantity} to ${to}. TX: ${txId}`, summary, context);

                    this.fetchSingleBalance(auth, token, context).subscribe(() => {
                        logger.info(`Balance updated for ${token.symbol}`);
                    }, err => {
                        context.error(`Error updating balance for ${token.symbol}`, err);
                        new W3oError(W3oError.TRANSACTION_ERROR, { auth });
                    });
                },
                error: (error) => {
                    const errorMessage = error instanceof Error ? error.message : 'Transaction failed: Unknown error';
                    context.error('Transaction failed', error);
                    this.setTransferStatus(auth, token.symbol, 'failure', errorMessage, undefined, context);
                    result$.error(error);
                },
                complete: () => {
                    logger.info('Transaction completed');
                    result$.complete();
                }
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Transaction failed: Unknown error';
            context.error('Transaction failed', error);
            this.setTransferStatus(auth, token.symbol, 'failure', errorMessage, undefined, context);
        }

        return result$.asObservable();
    }

    /**
     * Returns a snapshot of the service state including its class name.
     */
    override snapshot(): any {
        return {
            ...super.snapshot(),
            _class: 'AntelopeTokensService',
        };
    }
}


//  ----------------------- file: w3o-antelope/src/classes/AntelopeWharfkit.ts ----------------------- 

// w3o-antelope/src/classes/AntelopeWharfkit.ts

import { APIClient } from '@wharfkit/antelope';
import { AccountKit } from '@wharfkit/account';
import { SessionKit, Session } from '@wharfkit/session';
import { WebRenderer } from '@wharfkit/web-renderer';
import { WalletPluginAnchor } from '@wharfkit/wallet-plugin-anchor';
import { WalletPluginCleos } from '@wharfkit/wallet-plugin-cleos';
import { W3oAntelopeNetworkSettings } from '../types';
import { W3oContextFactory, W3oContext } from '@vapaee/w3o-core';

const logger = new W3oContextFactory('WharfkitInstance');

/**
 * Provides a wrapper for managing Wharfkit session and account instances with contextual logging
 */
export class WharfkitInstance {

    /**
     * id of the WharfkitInstance
     * @type {number}
     * @memberof WharfkitInstance
     * */
    public id: number = Math.floor(Math.random() * 1000);

    /**
     * Creates a new instance of WharfkitInstance with the provided session and account kits
     * @param sessionKit - The SessionKit instance for managing sessions
     * @param accountKit - The AccountKit instance for managing accounts
     * @param parent - The parent context for logging
     */
    constructor(
        public readonly sessionKit: SessionKit,
        public readonly accountKit: AccountKit,
        parent: W3oContext
    ) {
        logger.method('constructor', {id: this.id}, parent);
    }

    private __currentSession?: Session;

    /**
     * Validates if the given EOSIO account exists
     */
    public async validateAccount(username: string): Promise<boolean> {
        try {
            await this.accountKit.load(username);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Initiates login flow and stores the session
     */
    public async login(parent: W3oContext): Promise<Session> {
        logger.method('login', {id: this.id}, parent);
        logger.info('Logging in...');
        const { session } = await this.sessionKit.login();
        this.__currentSession = session;
        logger.info('Login successful', { session });
        return session;
    }

    /**
     * Logs out the current session
     */
    public logout(parent: W3oContext): void {
        logger.method('logout', { id: this.id, currentSession: this.__currentSession, sessionKit: this.sessionKit }, parent);
        if (this.__currentSession) {
            this.sessionKit.logout(this.__currentSession);
            this.__currentSession = undefined;
        }
    }

    /**
     * Attempts to restore a previously active session
     */
    public async restoreSession(parent: W3oContext): Promise<Session | undefined> {
        logger.method('restoreSession', { id: this.id, sessionKit: this.sessionKit }, parent);
        const session = await this.sessionKit.restore();
        this.__currentSession = session;
        if (session) {
            logger.info('Session restored', { session });
        } else {
            logger.info('No session to restore');
        }
        return session;
    }

    /**
     * Returns the currently active session, if any
     */
    public get currentSession(): Session | undefined {
        return this.__currentSession;
    }

    /**
     * Provides access to the underlying EOSIO API client from the session
     */
    public get client() {
        return this.__currentSession?.client;
    }

    /**
     * Returns a snapshot of the service state including its class name.
     */
    public snapshot(): any {
        return {
            _class: 'WharfkitInstance',
            currentSession: this.__currentSession,
            sessionKit: this.sessionKit,
            accountKit: this.accountKit,
        };
    }

}

/**
 * Utility class for creating Wharfkit-related instances for session and account management
 */
export class AntelopeWharfkit {

    /**
     * Creates a SessionKit instance configured for the given app and Antelope network
     */
    public static createSessionKit(appName: string, network: W3oAntelopeNetworkSettings, parent: W3oContext) {
        logger.method('createSessionKit', { appName, network }, parent);
        const sessionKit = new SessionKit({
            appName: appName,
            chains: [
                {
                    id: network.chainId,
                    url: network.rpcUrl
                }
            ],
            ui: new WebRenderer(),
            walletPlugins: [
                new WalletPluginAnchor(),
                new WalletPluginCleos()
            ]
        });
        return sessionKit;
    }

    /**
     * Creates an AccountKit instance configured for the specified Antelope network
     */
    public static createAccountKit(network: W3oAntelopeNetworkSettings, parent: W3oContext) {
        logger.method('createAccountKit', { network }, parent);
        const client = new APIClient({ url: network.rpcUrl });
        const accountKit = new AccountKit(network.chain, { client });
        return accountKit;
    }

    /**
     * Returns a fully initialized WharfkitInstance including SessionKit and AccountKit
     */
    public static wharfkit(appName: string, network: W3oAntelopeNetworkSettings, parent: W3oContext): WharfkitInstance {
        const context = logger.method('wharfkit', { appName, network }, parent);
        const sessionKit = AntelopeWharfkit.createSessionKit(appName, network, context);
        const accountKit = AntelopeWharfkit.createAccountKit(network, context);
        return new WharfkitInstance(sessionKit, accountKit, context);
    }
}


//  ----------------------- file: w3o-antelope/src/classes/index.ts ----------------------- 

export * from './AntelopeAuthSupport';
export * from './AntelopeError';
export * from './AntelopeAuthAnchor';
export * from './AntelopeContractManager';
export * from './AntelopeNetwork';
export * from './AntelopeTokensService';
export * from './AntelopeChains';
export * from './AntelopeWharfkit';


//  ----------------------- file: w3o-antelope/src/index.ts ----------------------- 

export * from './types';
export * from './classes';


//  ----------------------- file: w3o-antelope/src/types/index.ts ----------------------- 

export * from './w3o-interfaces';



//  ----------------------- file: w3o-antelope/src/types/w3o-interfaces.ts ----------------------- 

// w3o-antelope/src/types/w3o-interfaces.ts

import {
    W3oNetworkSettings,
    W3oTransaction,
    W3oTransferStatus,
    W3oTransferSummary,
} from "@vapaee/w3o-core";
import { ActionType, AnyAction, AnyTransaction } from "@wharfkit/antelope";
import { ChainDefinition } from "@wharfkit/common";
import { SigningRequest } from "@wharfkit/session";

/**
 * Extended network settings specific to Antelope-based chains
 */
export interface W3oAntelopeNetworkSettings extends W3oNetworkSettings {
    chain: ChainDefinition;         // Antelope chain definition
    w3oVersion: string;             // Version of the Antelope module
    w3oName: string;                // Name of the Antelope module
    w3oRequire: string[];           // Required modules or dependencies
}

/**
 * Extended transfer status including optional Antelope-specific summary
 */
export interface AntelopeTransferStatus extends W3oTransferStatus {
    summary?: AntelopeTransferSummary;
}

/**
 * Transfer summary specific to Antelope including memo field
 */
export interface AntelopeTransferSummary extends W3oTransferSummary {
    memo: string; // Memo field for the transfer
}

/**
 * Transaction structure for Antelope, supporting full tx, single/multiple actions and ESR
 */
export interface AntelopeTransaction extends W3oTransaction {
    transaction?: AnyTransaction;          // Full transaction object
    action?: AnyAction;                    // Single action
    actions?: AnyAction[];                 // Multiple actions
    request?: SigningRequest | string;     // Signing request or ESR URI
    context_free_actions?: ActionType[];   // Optional context-free actions
    context_free_data?: string[];          // Optional context-free data
}


//  ----------------------- file: w3o-antelope/src/version.ts ----------------------- 

export const version = '1.0.0';


