// w3o-ethereum/src/types/w3o-interfaces.ts

import {
    W3oNetworkSettings,
    W3oTransaction,
    W3oTransferStatus,
    W3oTransferSummary,
} from "@vapaee/w3o-core";

/**
 * Extended network settings for Ethereum based chains
 */
export interface W3oEthereumNetworkSettings extends W3oNetworkSettings {
    w3oVersion: string;
    w3oName: string;
    w3oRequire: string[];
    symbol?: string;
    nativeCurrency?: string;
    decimals?: number;
}

export interface EthereumTransferStatus extends W3oTransferStatus {
    summary?: EthereumTransferSummary;
}

export interface EthereumTransferSummary extends W3oTransferSummary {
    memo?: string;
}

export interface EthereumTransaction extends W3oTransaction {
    to?: string;
    value?: string | number;
    data?: string;
    gasLimit?: string | number;
    gasPrice?: string | number;
}
