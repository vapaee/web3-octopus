// w3o-ethereum/src/classes/EthereumAuthSupport.ts

import {
    W3oContext,
    W3oContextFactory,
    W3oAuthSupport,
    W3oAuthSupportName,
    W3oNetworkType,
} from "@vapaee/w3o-core";

const logger = new W3oContextFactory('EthereumAuthSupport');

/**
 * Base class for implementing authentication support for Ethereum based networks.
 */
export abstract class EthereumAuthSupport extends W3oAuthSupport {
    constructor(
        name: W3oAuthSupportName,
        parent: W3oContext
    ) {
        const context = logger.method('constructor', parent);
        super(name, 'ethereum' as W3oNetworkType, context);
    }
}
