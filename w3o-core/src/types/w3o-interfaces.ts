import { BehaviorSubject } from "rxjs";
import {
    LoggerContext,
    W3oAuthenticator,
    W3oNetwork,
    W3oSession
} from "../classes";
import { W3oAuthSupport } from "../classes/W3oAuthSupport";

import {
    W3oAddress,
    W3oAuthSupportName,
    W3oNetworkName,
    W3oNetworkType
} from "./w3o-types";

// Representa una transacción genérica en Web3 Octopus, debe ser especificada por cada implementación
export interface W3oTransaction {}

// Representa el recibo de una transacción, debe ser especificado por cada implementación
export interface W3oTransactionReceipt {}

// Representa los enlaces útiles para una red específica
export interface W3oNetworkLinks {
    explorer: string;
    bridge: string;
    ecosystem: string;
    website: string;
    wallet: string;
}

// Representa la configuración de una red específica
export interface W3oNetworkSettings {
    type: W3oNetworkType;
    name: W3oNetworkName;
    chainId: string;
    displayName: string;
    links: W3oNetworkLinks;
}

// 
export interface W3oGlobalSettings {
    // if multiSession is false, W3oSessionManager we maintain always one open session and logout the user if the network changes
    // if multiSession is true, W3oSessionManager will maintain multiple open sessions
    // if the user changes the network, the current session will be set to null until a specific session is set as current
    multiSession: boolean;

    // if autoLogin is true, Octopus will try to login the user automatically if a session is found on the local storage as current
    autoLogin: boolean;
}

// Representa el ABI de un contrato, debe ser especificado por cada implementación
export interface W3oContractABI {}

// Representa la configuración de soporte para múltiples redes y autenticadores
export interface W3oNetworkSupportSettings {
    type: W3oNetworkType;
    auth: W3oAuthSupport[];
    networks: W3oNetwork[];
}

export interface W3oIServices {
    snapshot(): any;
}

// --------------------------------------------------------------------------------------------
// Representa la estructura básica abstracta de la instancia principal de Web3 Octopus
export interface W3oInstance {
    sessions: W3oSessionInstance;
    networks: W3oNetworkInstance;
    auth: W3oAuthInstance;
    modules: W3oModuleInstance;
}

export interface W3oSessionInstance {
    createCurrentSession(address: W3oAddress, authenticator: W3oAuthenticator, network: W3oNetwork, parent: LoggerContext): W3oSession;
    deleteSession(id: string, parent: LoggerContext): void;
}

export interface W3oNetworkInstance {
    getNetwork(name: W3oNetworkName, parent: LoggerContext): W3oNetwork
    onNetworkChange$: BehaviorSubject<W3oNetworkName | null>
}

export interface W3oAuthInstance {
    createAuthenticator(name: W3oAuthSupportName, parent: LoggerContext): W3oAuthenticator;
}

export interface W3oModuleInstance {

}