import { W3oContext, W3oContractManager, W3oNetwork, W3oToken } from "@vapaee/w3o-core";
import { Observable } from "rxjs";
import { W3oAntelopeNetworkSettings } from "../types";
import { WharfkitInstance } from "./AntelopeWharfkit";
/**
 * Network implementation for Antelope-based chains, handling settings, wharfkit integration and EOSIO RPC.
 */
export declare class AntelopeNetwork extends W3oNetwork {
    private _settings;
    private _wharfkit;
    /**
     * Constructs an AntelopeNetwork instance and initializes Wharfkit if settings are valid.
     */
    constructor(settings: W3oAntelopeNetworkSettings, parent: W3oContext);
    /**
     * Returns the network settings specific to Antelope.
     */
    get antelopeSettings(): W3oAntelopeNetworkSettings;
    /**
     * Returns the Wharfkit instance or throws if not initialized.
     */
    get wharfkit(): WharfkitInstance;
    /**
     * Returns the version declared in network settings.
     */
    get w3oVersion(): string;
    /**
     * Returns the module name declared in network settings.
     */
    get w3oName(): string;
    /**
     * Returns the dependency list declared in network settings.
     */
    get w3oRequire(): string[];
    /**
     * Returns a snapshot of the internal state of this module.
     */
    snapshot(): any;
    /**
     * Creates a contract manager specific to Antelope networks.
     */
    createContractManager(network: W3oNetwork, parent: W3oContext): W3oContractManager;
    /**
     * Stub method to get the system token (not yet implemented).
     */
    getSystemToken(): W3oToken;
    /**
     * Stub method to update network state (not yet implemented).
     */
    updateState(): Observable<void>;
    /**
     * Executes a query against a smart contract table using Wharfkit.
     */
    queryContract(params: {
        [key: string]: any;
    }): Observable<any>;
    /**
     * Validates if an account exists on chain using Wharfkit.
     */
    validateAccount(username: string, parent: W3oContext): Observable<boolean>;
}
//# sourceMappingURL=AntelopeNetwork.d.ts.map