// w3o-antelope/src/types/w3o-interfaces.ts

import {
    W3oNetworkSettings,
    W3oTransaction,
    W3oTransferStatus,
    W3oTransferSummary,
    W3oAuthenticator,
    W3oContext,
    W3oBalance,
    W3oToken,
} from "@vapaee/w3o-core";
import { BehaviorSubject, Observable } from "rxjs";
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
 * Aggregated resources information for an Antelope account
 */
export interface AntelopeBalanceBreakdown {
    total: string;              // Total TLOS owned by the user
    liquid: string;             // Liquid TLOS available for transfers
    rexStaked: string;          // Amount of TLOS in REX including savings
    rexDeposits: string;        // Amount of TLOS deposited in REX fund
    cpuStaked: string;          // TLOS staked for CPU
    netStaked: string;          // TLOS staked for NET
    refunding: string;          // TLOS pending refund from unstaking
    delegatedToOthers: string;  // TLOS delegated to other accounts
    delegatedByOthers: string;  // TLOS others have delegated to this account
    ramTotal: string;           // Total RAM bytes owned
    ramAvailable: string;       // Available RAM bytes
}

/** Structure describing usage limits for a resource */
export interface AntelopeResourceLimit {
    used: number;
    available: number;
    max: number;
}

/** Public key and weight pair inside a permission */
export interface AntelopeKeyWeight {
    key: string;
    weight: number;
}

/** Authorization details required for a permission */
export interface AntelopePermissionAuth {
    threshold: number;
    keys: AntelopeKeyWeight[];
    accounts: unknown[];
    waits: unknown[];
}

/** Account permission entry */
export interface AntelopePermission {
    perm_name: string;
    parent: string;
    required_auth: AntelopePermissionAuth;
    linked_actions: unknown[];
}

/** Resources owned by an account */
export interface AntelopeTotalResources {
    owner: string;
    net_weight: string;
    cpu_weight: string;
    ram_bytes: number;
}

/** Self delegated bandwidth information */
export interface AntelopeSelfDelegatedBandwidth {
    from: string;
    to: string;
    net_weight: string;
    cpu_weight: string;
}

/** Pending refund request */
export interface AntelopeRefundRequest {
    owner: string;
    request_time: string;
    net_amount: string;
    cpu_amount: string;
}

/** Voting related information */
export interface AntelopeVoterInfo {
    owner: string;
    proxy: string;
    producers: string[];
    staked: number;
    last_stake: number;
    last_vote_weight: string;
    proxied_vote_weight: string;
    is_proxy: number;
    flags1: number;
    reserved2: number;
    reserved3: string;
}

/** Maturity date/amount pair inside REX info */
export interface AntelopeRexMaturity {
    first: string;
    second: string | number;
}

/** REX related information */
export interface AntelopeRexInfo {
    version: number;
    owner: string;
    vote_stake: string;
    rex_balance: string;
    matured_rex: string;
    rex_maturities: AntelopeRexMaturity[];
}

/** Full account data returned by `get_account` */
export interface AntelopeAccountData {
    account_name: string;
    head_block_num: number;
    head_block_time: string;
    privileged: boolean;
    last_code_update: string;
    created: string;
    core_liquid_balance?: string;
    ram_quota: number;
    net_weight: number;
    cpu_weight: number;
    net_limit: AntelopeResourceLimit;
    cpu_limit: AntelopeResourceLimit;
    ram_usage: number;
    permissions: AntelopePermission[];
    total_resources?: AntelopeTotalResources;
    self_delegated_bandwidth?: AntelopeSelfDelegatedBandwidth;
    refund_request?: AntelopeRefundRequest | null;
    voter_info?: AntelopeVoterInfo;
    rex_info?: AntelopeRexInfo;
    subjective_cpu_bill_limit: AntelopeResourceLimit;
    eosio_any_linked_actions: unknown[];
}

/** Row of the `rexbal` table */
export interface AntelopeRexbalRow {
    version: number;
    owner: string;
    vote_stake: string;
    rex_balance: string;
    matured_rex: string;
    rex_maturities: AntelopeRexMaturity[];
}

/** Query result for the `rexbal` table */
export interface AntelopeRexbalTable {
    rows: AntelopeRexbalRow[];
}

/** Row of the `rexfund` table */
export interface AntelopeRexfundRow {
    owner: string;
    balance: string;
}

/** Query result for the `rexfund` table */
export interface AntelopeRexfundTable {
    rows: AntelopeRexfundRow[];
}

/** Detailed resource usage information */
export interface AntelopeResource {
    total: number;
    used: number;
    percent: number;
    available: number;
}

/** CPU/NET/RAM resources information */
export interface AntelopeResources {
    cpu: AntelopeResource;
    net: AntelopeResource;
    ram: AntelopeResource;
}

/** Complete resources state object */
export interface AntelopeResourcesState {
    balance: AntelopeBalanceBreakdown;
    resources: AntelopeResources;
    account: AntelopeAccountData | null;
}
