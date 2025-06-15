// w3o-ethereum/src/classes/EthereumContractManager.ts

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
import { ethers } from "ethers";
import { EthereumNetwork } from "./EthereumNetwork";

const logger = new W3oContextFactory('EthereumContractManager');

/**
 * Contract manager implementation for Ethereum networks.
 */
export class EthereumContractManager extends W3oContractManager {
    constructor(
        settings: W3oNetworkSettings,
        network: EthereumNetwork,
        parent: W3oContext
    ) {
        const context = logger.method('constructor', { settings }, parent);
        super(settings, network as W3oNetwork, context);
    }

    fetchContract(address: W3oAddress, parent: W3oContext): Observable<W3oContract | null> {
        const context = logger.method('fetchContract', { address }, parent);
        return new Observable<W3oContract | null>((observer) => {
            try {
                new ethers.Contract(address, [], (this.network as EthereumNetwork).client);
                observer.next({ address, name: '', abi: [] } as unknown as W3oContract);
                observer.complete();
            } catch (error) {
                context.error('fetchContract error', error);
                observer.error(error);
            }
        });
    }
}
