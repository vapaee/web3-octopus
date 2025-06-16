// w3o-code/src/types/w3o-interfaces.ts

import { Observable } from 'rxjs';
import {
    W3oAuthenticator,
    W3oChainSupport,
    W3oContext,
    W3oModule,
    W3oNetwork,
    W3oSession,
    W3oToken
} from '../classes';
import {
    W3oAddress,
    W3oNetworkName,
    W3oNetworkType
} from './w3o-types';

/**
 * Represents an HTTP client capable of making GET requests.
 */
export interface W3oHttpClient {
    get<T>(url: string): Observable<T>;
    post<T>(url: string, body: unknown): Observable<T>;
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
    chain: W3oChainSupport;
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
    setCurrentNetwork(name: W3oNetworkName, parent: W3oContext): void;
    current$: Observable<W3oNetwork>;
    currentNetworkName: string | null;
    current: W3oNetwork;
}

/**
 * Represents the authentication management instance.
 */
export interface W3oAuthInstance {
    createAuthenticator(network: W3oNetwork, parent: W3oContext): W3oAuthenticator;
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
