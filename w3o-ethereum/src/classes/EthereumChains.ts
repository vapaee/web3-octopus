// w3o-ethereum/src/classes/EthereumChains.ts

import { W3oContextFactory, W3oContext, W3oNetworkSettings, W3oNetworkLinks, W3oNetworkName, W3oNetworkType } from '@vapaee/w3o-core';
import { W3oEthereumNetworkSettings } from '../types';
import { EthereumNetwork } from './EthereumNetwork';

const type = 'ethereum' as W3oNetworkType;
const w3oRequire = ['ethereum.network.support@1.0.0'];
const w3oVersion = '1.0.0';

const EthereumMainnetConfigJSON: W3oEthereumNetworkSettings = {
    w3oName: 'ethereum.network.mainnet',
    w3oVersion,
    w3oRequire,
    type,
    name: 'ethereum-mainnet' as W3oNetworkName,
    chainId: '1',
    displayName: 'Ethereum Mainnet',
    rpcUrl: 'https://mainnet.infura.io/v3/your_project_id',
    tokensUrl: 'assets/tokens_mainnet.json',
    links: {
        explorer: 'https://etherscan.io',
        bridge: '',
        ecosystem: '',
        website: 'https://ethereum.org',
        wallet: ''
    } as W3oNetworkLinks
};

export class EthereumMainnetNetwork extends EthereumNetwork {
    constructor(settings: Partial<W3oNetworkSettings>, parent: W3oContext) {
        super(
            { ...EthereumMainnetConfigJSON },
            (new W3oContextFactory('EthereumMainnetNetwork')).method('constructor', { settings }, parent)
        );
    }
}

const GoerliConfigJSON: W3oEthereumNetworkSettings = {
    w3oName: 'ethereum.network.goerli',
    w3oVersion,
    w3oRequire,
    type,
    name: 'goerli' as W3oNetworkName,
    chainId: '5',
    displayName: 'Goerli Testnet',
    rpcUrl: 'https://goerli.infura.io/v3/your_project_id',
    tokensUrl: 'assets/tokens_goerli.json',
    links: {
        explorer: 'https://goerli.etherscan.io',
        bridge: '',
        ecosystem: '',
        website: 'https://goerli.net',
        wallet: ''
    } as W3oNetworkLinks
};

export class GoerliNetwork extends EthereumNetwork {
    constructor(settings: Partial<W3oNetworkSettings>, parent: W3oContext) {
        super(
            { ...GoerliConfigJSON },
            (new W3oContextFactory('GoerliNetwork')).method('constructor', { settings }, parent)
        );
    }
}
