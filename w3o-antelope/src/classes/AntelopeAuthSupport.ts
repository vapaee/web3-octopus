// w3o-antelope/src/classes/AntelopeAuthSupport.ts

import {
    W3oContext,
    W3oContextFactory,
    W3oAuthSupport,
    W3oAuthSupportName,
    W3oNetworkType,
} from "@vapaee/w3o-core";

const logger = new W3oContextFactory('AntelopeAuthSupport');

/**
 * Base class for implementing authentication support specific to Antelope-based networks.
 */
export abstract class AntelopeAuthSupport extends W3oAuthSupport {
    /**
     * Constructs an AntelopeAuthSupport instance with the given support name and context.
     */
    constructor(
        name: W3oAuthSupportName,
        parent: W3oContext
    ) {
        const context = logger.method('constructor', parent);
        super(name, 'antelope' as W3oNetworkType, context);
    }
}
