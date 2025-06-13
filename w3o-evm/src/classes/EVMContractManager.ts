// w3o-antelope/src/classes/EVMChains.ts

import {
    W3oContext,
    W3oContextFactory,
    W3oAddress,
    W3oContract,
    W3oContractManager,
    W3oNetwork,
    W3oNetworkSettings,
} from "@vapaee/w3o-core";

import { Observable } from "rxjs";
import { EVMNetwork } from "./EVMNetwork";

const logger = new W3oContextFactory('EVMContractManager');

/**
 * Contract manager implementation for EVM networks, extending the base contract manager.
 */
export class EVMContractManager extends W3oContractManager {

    /**
     * Constructs an EVMContractManager with specific settings and associated network.
     */
    constructor(
        settings: W3oNetworkSettings,
        network: EVMNetwork,
        parent: W3oContext
    ) {
        const context = logger.method('constructor', {settings}, parent);
        super(settings, network as W3oNetwork, context);
    }

    /**
     * Stub method to fetch a contract (not yet implemented).
     */
    fetchContract(address: W3oAddress, parent: W3oContext): Observable<W3oContract | null> {
        const context = logger.method('fetchContract', {address}, parent);
        context.error('fetchContract not implemented');
        return new Observable<W3oContract | null>();
    }
}
