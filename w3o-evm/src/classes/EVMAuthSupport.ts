// w3o-antelope/src/classes/EVMAuthSupport.ts

import {
    W3oContext,
    W3oContextFactory,
    W3oAuthSupport,
    W3oAuthSupportName,
    W3oNetworkType,
} from "@vapaee/w3o-core";

const logger = new W3oContextFactory('EVMAuthSupport');

/**
 * Base class for implementing authentication support specific to EVM-based networks.
 */
export abstract class EVMAuthSupport extends W3oAuthSupport {
    /**
     * Constructs an EVMAuthSupport instance with the given support name and context.
     */
    constructor(
        name: W3oAuthSupportName,
        parent: W3oContext
    ) {
        const context = logger.method('constructor', parent);
        super(name, 'antelope' as W3oNetworkType, context);
    }
}
