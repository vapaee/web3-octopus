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

/**
 * Represents the set of resources associated with an Antelope account.
 */
export interface AntelopeResources {
    total: string;
    liquid: string;
    rexStaked: string;
    rexDeposits: string;
    cpuStaked: string;
    netStaked: string;
    refunding: string;
    delegatedToOthers: string;
    delegatedByOthers: string;
    ramTotal: string;
    ramAvailable: string;
}
