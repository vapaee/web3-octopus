// w3o-ethereum/src/classes/EthereumContractManager.ts

import {
    W3oContext,
    W3oContextFactory,
    W3oAddress,
    W3oContract,
    W3oContractManager,
    W3oNetwork,
    W3oNetworkSettings,
} from '@vapaee/w3o-core';
import { Observable, from } from 'rxjs';
import { ethers } from 'ethers';

const logger = new W3oContextFactory('EthereumContractManager');

/**
 * Contract manager implementation for Ethereum networks, extending the base contract manager.
 */
export class EthereumContractManager extends W3oContractManager {
    private provider: ethers.providers.Provider;

    /**
     * Constructs a new EthereumContractManager.
     * @param settings - Network settings including rpcUrl.
     * @param network - The EthereumNetwork instance associated.
     * @param parent - Parent context for logging.
     */
    constructor(
        settings: W3oNetworkSettings,
        network: W3oNetwork,
        parent: W3oContext
    ) {
        const context = logger.method('constructor', { settings }, parent);
        super(settings, network, context);
        this.provider = new ethers.providers.JsonRpcProvider(settings.rpcUrl);
    }

    /**
     * Fetches a contract by its address and returns a W3oContract instance or null.
     * Uses a minimal ABI placeholder; for real usage, developer should provide full ABI.
     * @param address - The contract address on Ethereum.
     * @param parent - Parent context for logging.
     */
    fetchContract(address: W3oAddress, parent: W3oContext): Observable<W3oContract | null> {
        const context = logger.method('fetchContract', { address }, parent);
        // Minimal ERC-20 ABI fragment for demonstration (balanceOf, symbol, decimals).
        const minimalAbi = [
            'function name() view returns (string)',
            'function symbol() view returns (string)',
            'function decimals() view returns (uint8)',
        ];
        return from(
            (async (): Promise<W3oContract | null> => {
                try {
                    const contract = new ethers.Contract(address, minimalAbi, this.provider);
                    // Attempt to call name to verify contract exists
                    await contract.name();
                    // Wrap into a W3oContract subclass if needed; here returning generic W3oContract
                    return new (class extends W3oContract {
                        constructor() {
                            super(address, address, minimalAbi, context);
                        }
                    })();
                } catch (error) {
                    context.error('Error fetching contract:', error);
                    return null;
                }
            })()
        );
    }
}
