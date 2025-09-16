// w3o-ethereum/src/types/w3o-interfaces.ts

import {
    W3oNetworkSettings,
    W3oTransaction,
    W3oTransferStatus,
    W3oTransferSummary,
    W3oNetworkType,
    W3oNetworkName,
    W3oNetworkLinks,
} from "@vapaee/w3o-core";
import { ethers } from "ethers";
import { EthereumContract } from "../classes/EthereumContract";

/**
 * Extended network settings for Ethereum based chains
 */
export interface W3oEthereumNetworkSettings extends W3oNetworkSettings {
    w3oVersion: string;
    w3oName: string;
    w3oRequire: string[];
    type: W3oNetworkType;
    name: W3oNetworkName;
    chainId: string; // number as string
    displayName: string; // Danem of the blockchian
    rpcUrl: string;
    tokensUrl: string; // url of a json file containing the known token list
    symbol?: string;
    nativeCurrency?: string;
    decimals?: number;
    links: W3oNetworkLinks;
}

export interface EthereumTransferStatus extends W3oTransferStatus {
    summary?: EthereumTransferSummary;
}

export interface EthereumTransferSummary extends W3oTransferSummary {
    memo?: string;
}

/**
 * Ethereum-specific transaction (adds native value in wei)
 * */
export interface EthereumTransaction extends W3oTransaction {
    contract: EthereumContract;
    function: string;
    params: any;
    value?: ethers.BigNumber; // only used for payable calls or native transfers
}