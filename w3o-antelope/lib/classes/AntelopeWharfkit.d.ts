import { APIClient } from '@wharfkit/antelope';
import { AccountKit } from '@wharfkit/account';
import { SessionKit, Session } from '@wharfkit/session';
import { W3oAntelopeNetworkSettings } from '../types';
import { W3oContext } from '@vapaee/w3o-core';
/**
 * Provides a wrapper for managing Wharfkit session and account instances with contextual logging
 */
export declare class WharfkitInstance {
    readonly sessionKit: SessionKit;
    readonly accountKit: AccountKit;
    /**
     * id of the WharfkitInstance
     * @type {number}
     * @memberof WharfkitInstance
     * */
    id: number;
    /**
     * Creates a new instance of WharfkitInstance with the provided session and account kits
     * @param sessionKit - The SessionKit instance for managing sessions
     * @param accountKit - The AccountKit instance for managing accounts
     * @param parent - The parent context for logging
     */
    constructor(sessionKit: SessionKit, accountKit: AccountKit, parent: W3oContext);
    private __currentSession?;
    /**
     * Validates if the given EOSIO account exists
     */
    validateAccount(username: string): Promise<boolean>;
    /**
     * Initiates login flow and stores the session
     */
    login(parent: W3oContext): Promise<Session>;
    /**
     * Logs out the current session
     */
    logout(parent: W3oContext): void;
    /**
     * Attempts to restore a previously active session
     */
    restoreSession(parent: W3oContext): Promise<Session | undefined>;
    /**
     * Returns the currently active session, if any
     */
    get currentSession(): Session | undefined;
    /**
     * Provides access to the underlying EOSIO API client from the session
     */
    get client(): APIClient | undefined;
    /**
     * Returns a snapshot of the service state including its class name.
     */
    snapshot(): any;
}
/**
 * Utility class for creating Wharfkit-related instances for session and account management
 */
export declare class AntelopeWharfkit {
    /**
     * Creates a SessionKit instance configured for the given app and Antelope network
     */
    static createSessionKit(appName: string, network: W3oAntelopeNetworkSettings, parent: W3oContext): SessionKit;
    /**
     * Creates an AccountKit instance configured for the specified Antelope network
     */
    static createAccountKit(network: W3oAntelopeNetworkSettings, parent: W3oContext): AccountKit<{
        account_name: import("@wharfkit/antelope").Name;
        head_block_num: import("@wharfkit/antelope").UInt32;
        head_block_time: import("@wharfkit/antelope").TimePoint;
        privileged: boolean;
        last_code_update: import("@wharfkit/antelope").TimePoint;
        created: import("@wharfkit/antelope").TimePoint;
        core_liquid_balance?: import("@wharfkit/antelope").Asset;
        ram_quota: import("@wharfkit/antelope").Int64;
        net_weight: import("@wharfkit/antelope").Int64;
        cpu_weight: import("@wharfkit/antelope").Int64;
        net_limit: {
            used: import("@wharfkit/antelope").Int64;
            available: import("@wharfkit/antelope").Int64;
            max: import("@wharfkit/antelope").Int64;
            last_usage_update_time: import("@wharfkit/antelope").TimePoint;
            current_used: import("@wharfkit/antelope").Int64;
            equals(other: any): boolean;
            toJSON(): any;
        };
        cpu_limit: {
            used: import("@wharfkit/antelope").Int64;
            available: import("@wharfkit/antelope").Int64;
            max: import("@wharfkit/antelope").Int64;
            last_usage_update_time: import("@wharfkit/antelope").TimePoint;
            current_used: import("@wharfkit/antelope").Int64;
            equals(other: any): boolean;
            toJSON(): any;
        };
        subjective_cpu_bill_limit: {
            used: import("@wharfkit/antelope").Int64;
            available: import("@wharfkit/antelope").Int64;
            max: import("@wharfkit/antelope").Int64;
            last_usage_update_time: import("@wharfkit/antelope").TimePoint;
            current_used: import("@wharfkit/antelope").Int64;
            equals(other: any): boolean;
            toJSON(): any;
        };
        ram_usage: import("@wharfkit/antelope").UInt64;
        permissions: {
            perm_name: import("@wharfkit/antelope").Name;
            parent: import("@wharfkit/antelope").Name;
            required_auth: import("@wharfkit/antelope").Authority;
            linked_actions: {
                account: import("@wharfkit/antelope").Name;
                action: import("@wharfkit/antelope").Name;
                equals(other: any): boolean;
                toJSON(): any;
            }[];
            equals(other: any): boolean;
            toJSON(): any;
        }[];
        total_resources: {
            owner: import("@wharfkit/antelope").Name;
            net_weight: import("@wharfkit/antelope").Asset;
            cpu_weight: import("@wharfkit/antelope").Asset;
            ram_bytes: import("@wharfkit/antelope").UInt64;
            equals(other: any): boolean;
            toJSON(): any;
        };
        self_delegated_bandwidth?: {
            from: import("@wharfkit/antelope").Name;
            to: import("@wharfkit/antelope").Name;
            net_weight: import("@wharfkit/antelope").Asset;
            cpu_weight: import("@wharfkit/antelope").Asset;
            equals(other: any): boolean;
            toJSON(): any;
        };
        refund_request?: {
            owner: import("@wharfkit/antelope").Name;
            request_time: import("@wharfkit/antelope").TimePoint;
            net_amount: import("@wharfkit/antelope").Asset;
            cpu_amount: import("@wharfkit/antelope").Asset;
            equals(other: any): boolean;
            toJSON(): any;
        };
        voter_info?: {
            owner: import("@wharfkit/antelope").Name;
            proxy: import("@wharfkit/antelope").Name;
            producers: import("@wharfkit/antelope").Name[];
            staked?: import("@wharfkit/antelope").Int64;
            last_vote_weight: import("@wharfkit/antelope").Float64;
            proxied_vote_weight: import("@wharfkit/antelope").Float64;
            is_proxy: boolean;
            flags1?: import("@wharfkit/antelope").UInt32;
            reserved2: import("@wharfkit/antelope").UInt32;
            reserved3: string;
            equals(other: any): boolean;
            toJSON(): any;
        };
        rex_info?: {
            version: import("@wharfkit/antelope").UInt32;
            owner: import("@wharfkit/antelope").Name;
            vote_stake: import("@wharfkit/antelope").Asset;
            rex_balance: import("@wharfkit/antelope").Asset;
            matured_rex: import("@wharfkit/antelope").Int64;
            rex_maturities: {
                key?: import("@wharfkit/antelope").TimePoint;
                value?: import("@wharfkit/antelope").Int64;
                first?: import("@wharfkit/antelope").TimePoint;
                second?: import("@wharfkit/antelope").Int64;
                equals(other: any): boolean;
                toJSON(): any;
            }[];
            equals(other: any): boolean;
            toJSON(): any;
        };
        getPermission(permission: import("@wharfkit/antelope").NameType): {
            perm_name: import("@wharfkit/antelope").Name;
            parent: import("@wharfkit/antelope").Name;
            required_auth: import("@wharfkit/antelope").Authority;
            linked_actions: {
                account: import("@wharfkit/antelope").Name;
                action: import("@wharfkit/antelope").Name;
                equals(other: any): boolean;
                toJSON(): any;
            }[];
            equals(other: any): boolean;
            toJSON(): any;
        };
        equals(other: any): boolean;
        toJSON(): any;
    }>;
    /**
     * Returns a fully initialized WharfkitInstance including SessionKit and AccountKit
     */
    static wharfkit(appName: string, network: W3oAntelopeNetworkSettings, parent: W3oContext): WharfkitInstance;
}
//# sourceMappingURL=AntelopeWharfkit.d.ts.map