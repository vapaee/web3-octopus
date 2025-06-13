import { W3oContext, W3oAddress, W3oContract, W3oContractManager, W3oNetworkSettings } from "@vapaee/w3o-core";
import { Observable } from "rxjs";
import { AntelopeNetwork } from "./AntelopeNetwork";
/**
 * Contract manager implementation for Antelope networks, extending the base contract manager.
 */
export declare class AntelopeContractManager extends W3oContractManager {
    /**
     * Constructs an AntelopeContractManager with specific settings and associated network.
     */
    constructor(settings: W3oNetworkSettings, network: AntelopeNetwork, parent: W3oContext);
    /**
     * Stub method to fetch a contract (not yet implemented).
     */
    fetchContract(address: W3oAddress, parent: W3oContext): Observable<W3oContract | null>;
}
//# sourceMappingURL=AntelopeContractManager.d.ts.map