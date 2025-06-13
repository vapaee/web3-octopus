// w3o-antelope/src/classes/AntelopeAuthSupport.ts
import { W3oContextFactory, W3oAuthSupport, } from "@vapaee/w3o-core";
const logger = new W3oContextFactory('AntelopeAuthSupport');
/**
 * Base class for implementing authentication support specific to Antelope-based networks.
 */
export class AntelopeAuthSupport extends W3oAuthSupport {
    /**
     * Constructs an AntelopeAuthSupport instance with the given support name and context.
     */
    constructor(name, parent) {
        const context = logger.method('constructor', parent);
        super(name, 'antelope', context);
    }
}
