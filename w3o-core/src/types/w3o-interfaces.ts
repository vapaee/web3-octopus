import {
    W3oAuthenticator,
    W3oNetwork
} from "../classes";

import {
    W3oNetworkName
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
    name: W3oNetworkName;
    chainId: string;
    displayName: string;
    links: W3oNetworkLinks;
}

// Representa el ABI de un contrato, debe ser especificado por cada implementación
export interface W3oContractABI {}

// Representa la configuración de soporte para múltiples redes y autenticadores
export interface W3oSupportSettings<T> {
    auth: W3oAuthenticator<T>[];
    networks: W3oNetwork<T>[];
}
