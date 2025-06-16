import { W3oNetworkSettings, W3oTransaction, W3oTransferStatus, W3oTransferSummary } from "@vapaee/w3o-core";
import { ActionType, AnyAction, AnyTransaction } from "@wharfkit/antelope";
import { ChainDefinition } from "@wharfkit/common";
import { SigningRequest } from "@wharfkit/session";
/**
 * Extended network settings specific to Antelope-based chains
 */
export interface W3oAntelopeNetworkSettings extends W3oNetworkSettings {
    chain: ChainDefinition;
    w3oVersion: string;
    w3oName: string;
    w3oRequire: string[];
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
    memo: string;
}
/**
 * Transaction structure for Antelope, supporting full tx, single/multiple actions and ESR
 */
export interface AntelopeTransaction extends W3oTransaction {
    transaction?: AnyTransaction;
    action?: AnyAction;
    actions?: AnyAction[];
    request?: SigningRequest | string;
    context_free_actions?: ActionType[];
    context_free_data?: string[];
}
//# sourceMappingURL=w3o-interfaces.d.ts.map