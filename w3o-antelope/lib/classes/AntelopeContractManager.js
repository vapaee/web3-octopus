// w3o-antelope/src/classes/AntelopeChains.ts
import { W3oContextFactory, W3oContractManager, } from "@vapaee/w3o-core";
import { Observable } from "rxjs";
const logger = new W3oContextFactory('AntelopeContractManager');
/**
 * Contract manager implementation for Antelope networks, extending the base contract manager.
 */
export class AntelopeContractManager extends W3oContractManager {
    /**
     * Constructs an AntelopeContractManager with specific settings and associated network.
     */
    constructor(settings, network, parent) {
        const context = logger.method('constructor', { settings }, parent);
        super(settings, network, context);
    }
    /**
     * Stub method to fetch a contract (not yet implemented).
     */
    fetchContract(address, parent) {
        const context = logger.method('fetchContract', { address }, parent);
        context.error('fetchContract not implemented');
        return new Observable();
    }
}
