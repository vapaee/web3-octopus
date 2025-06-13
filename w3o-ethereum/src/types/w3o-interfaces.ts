// w3o-ethereum/src/types/w3o-interfaces.ts

import {
    W3oNetworkSettings,
    W3oTransaction,
    W3oTransferStatus,
    W3oTransferSummary,
} from '@vapaee/w3o-core';
import { BigNumber } from 'ethers';

/**
 * Extended network settings specific to Ethereum-based chains.
 */
export interface W3oEthereumNetworkSettings extends W3oNetworkSettings {
    chainId: string;           // Numeric chain ID as string
    w3oVersion: string;        // Version of the Ethereum module
    w3oName: string;           // Name of the Ethereum module
    w3oRequire: string[];      // Required modules or dependencies
}

/**
 * Extended transfer status including optional Ethereum-specific summary.
 */
export interface EthereumTransferStatus extends W3oTransferStatus {
    summary?: EthereumTransferSummary;
}

/**
 * Transfer summary specific to Ethereum including transaction hash.
 */
export interface EthereumTransferSummary extends W3oTransferSummary {
    transactionHash: string;
}

/**
 * Transaction structure for Ethereum, including contract call or raw transaction data.
 */
export interface EthereumTransaction extends W3oTransaction {
    to: string;                    // Recipient address
    value?: BigNumber;             // Amount of Ether to send
    data?: string;                 // Encoded contract data
    gasLimit?: BigNumber;          // Gas limit for the transaction
}
