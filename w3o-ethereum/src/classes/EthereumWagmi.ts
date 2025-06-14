// w3o-ethereum/src/classes/EthereumWagmi.ts

import { createConfig, configureChains, Chain } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { W3oContextFactory, W3oContext } from '@vapaee/w3o-core';
import { W3oEthereumNetworkSettings } from '../types';

const logger = new W3oContextFactory('EthereumWagmi');

/**
 * Utility class to manage wagmi configuration for Ethereum networks.
 */
export class EthereumWagmi {
    public static wagmi(network: W3oEthereumNetworkSettings, parent: W3oContext) {
        const context = logger.method('wagmi', { network }, parent);
        void context;
        const chain: Chain = {
            id: parseInt(network.chainId, 10),
            name: network.displayName,
            network: network.name,
            nativeCurrency: {
                decimals: network.decimals ?? 18,
                name: network.nativeCurrency ?? 'ETH',
                symbol: network.symbol ?? 'ETH',
            },
            rpcUrls: {
                default: { http: [network.rpcUrl] },
                public: { http: [network.rpcUrl] }
            },
        };

        const { publicClient, webSocketPublicClient } = configureChains([chain], [
            jsonRpcProvider({ rpc: () => ({ http: network.rpcUrl }) })
        ]);

        const config = createConfig({
            autoConnect: true,
            publicClient,
            webSocketPublicClient,
        });

        return config;
    }
}
