import { W3oContext, W3oInstance, W3oService, W3oModule, W3oBalance, W3oAuthenticator, W3oToken, W3oTransferStatus } from "@vapaee/w3o-core";
import { BehaviorSubject, Observable } from "rxjs";
import { AntelopeTransferSummary } from "../types";
/**
 * Service responsible for managing token balances and transfers on Antelope networks.
 */
export declare class AntelopeTokensService extends W3oService {
    constructor(path: string, parent: W3oContext);
    /**
     * Returns the current version of this service.
     */
    get w3oVersion(): string;
    /**
     * Returns the service name used for module identification.
     */
    get w3oName(): string;
    /**
     * Returns the list of module requirements for this service.
     */
    get w3oRequire(): string[];
    /**
     * Initializes the service with provided octopus instance and requirements.
     */
    init(octopus: W3oInstance, requirements: W3oModule[], parent: W3oContext): void;
    /**
     * Returns or creates the shared BehaviorSubject of balances.
     */
    getBalances$(auth: W3oAuthenticator, parent: W3oContext): BehaviorSubject<W3oBalance[]>;
    /**
     * Fetches all balances grouped by token contract and returns a BehaviorSubject.
     */
    private fetchAllBalances;
    /**
     * Updates the balance for a single token.
     */
    updateSingleBalance(auth: W3oAuthenticator, token: W3oToken, parent: W3oContext): void;
    /**
     * Forces update of all token balances.
     */
    updateAllBalances(auth: W3oAuthenticator, parent: W3oContext): void;
    /**
     * Polls until the token balance changes or a timeout occurs.
     */
    waitUntilBalanceChanges(auth: W3oAuthenticator, token: W3oToken, delay: number, maxSeconds: number, parent: W3oContext): Observable<W3oBalance>;
    /**
     * Fetches a single balance for a given token from the blockchain.
     */
    private fetchSingleBalance;
    /**
     * Adds or updates a token balance in the BehaviorSubject state.
     */
    private addSingleBalanceToState;
    /**
     * Replaces all token balances in the BehaviorSubject state.
     */
    private addAllBalancesToState;
    /**
     * Formats a token balance according to its precision.
     */
    private formatBalance;
    /**
     * Returns or creates the shared BehaviorSubject that holds transfer statuses.
     */
    getTransferStatus$(auth: W3oAuthenticator, parent: W3oContext): BehaviorSubject<Map<string, W3oTransferStatus>>;
    /**
     * Returns an observable transfer status for a given token symbol and authenticator.
     */
    getTransferStatusForAuth(auth: W3oAuthenticator, tokenSymbol: string, parent: W3oContext): Observable<W3oTransferStatus>;
    /**
     * Returns an observable transfer status for a given token symbol using the current session.
     */
    getTransferStatus(tokenSymbol: string, parent: W3oContext): Observable<W3oTransferStatus>;
    /**
     * Sets the transfer status for a specific token.
     */
    private setTransferStatus;
    /**
     * Resets the transfer status cycle for a specific token.
     */
    resetTransferCycle(auth: W3oAuthenticator, tokenSymbol: string, parent: W3oContext): void;
    /**
     * Resets transfer status for all tokens known to the authenticator's network.
     */
    resetAllTransfers(auth: W3oAuthenticator, parent: W3oContext): void;
    /**
     * Transfers a token and updates the transfer status accordingly.
     */
    transferToken(auth: W3oAuthenticator, to: string, quantity: string, token: W3oToken, memo: string | undefined, parent: W3oContext): Observable<AntelopeTransferSummary>;
    /**
     * Returns a snapshot of the service state including its class name.
     */
    snapshot(): any;
}
//# sourceMappingURL=AntelopeTokensService.d.ts.map