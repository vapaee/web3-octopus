// w3o-ethereum/src/classes/EthereumChains.ts

import { W3oContextFactory, W3oContext, W3oNetworkSettings, W3oNetworkLinks, W3oNetworkName, W3oNetworkType } from '@vapaee/w3o-core';
import { EthereumNetwork } from './EthereumNetwork';

const logger = new W3oContextFactory('EthereumChains');

const type = 'ethereum' as W3oNetworkType;

/**
 * Configuration for Ethereum Mainnet.
 */
const EthereumMainnetConfig: W3oNetworkSettings = {
    type,
    name: 'ethereum' as W3oNetworkName,
    chainId: '1',
    displayName: 'Ethereum Mainnet',
    rpcUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
    tokensUrl: 'assets/tokens_ethereum.json',
    links: {
        explorer: 'https://etherscan.io',
        bridge: '',
        ecosystem: 'https://ethereum.org',
        website: 'https://ethereum.org',
        wallet: 'https://metamask.io',
    } as W3oNetworkLinks,
};

/**
 * Configuration for Ethereum Ropsten Testnet.
 */
const EthereumRopstenConfig: W3oNetworkSettings = {
    type,
    name: 'ropsten' as W3oNetworkName,
    chainId: '3',
    displayName: 'Ethereum Ropsten Testnet',
    rpcUrl: 'https://ropsten.infura.io/v3/YOUR_INFURA_PROJECT_ID',
    tokensUrl: 'assets/tokens_ropsten.json',
    links: {
        explorer: 'https://ropsten.etherscan.io',
        bridge: '',
        ecosystem: 'https://ethereum.org',
        website: 'https://ethereum.org',
        wallet: 'https://metamask.io',
    } as W3oNetworkLinks,
};

export class EthereumMainnet extends EthereumNetwork {
    constructor(parent: W3oContext) {
        super(EthereumMainnetConfig, (new W3oContextFactory('EthereumMainnet')).method('constructor', {}, parent));
    }
}

export class EthereumRopsten extends EthereumNetwork {
    constructor(parent: W3oContext) {
        super(EthereumRopstenConfig, (new W3oContextFactory('EthereumRopsten')).method('constructor', {}, parent));
    }
}
