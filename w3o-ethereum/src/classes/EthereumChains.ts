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
    tokensUrl: 'assets/tokens-ethereum-ethereum-mainnet.json',
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
    tokensUrl: 'assets/tokens-ethereum-goerli.json',
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

const TelosEVMConfigJSON: W3oEthereumNetworkSettings = {
    w3oName: 'ethereum.network.telos-evm',
    w3oVersion,
    w3oRequire,
    type,
    name: 'telos-evm' as W3oNetworkName,
    chainId: '40',
    displayName: 'Telos EVM',
    rpcUrl: 'https://mainnet.telos.net/evm',
    tokensUrl: 'assets/tokens-ethereum-telos-evm.json',
    links: {
        explorer: 'https://teloscan.io',
        bridge: '',
        ecosystem: '',
        website: 'https://telos.net',
        wallet: ''
    } as W3oNetworkLinks
};

export class TelosEVMNetwork extends EthereumNetwork {
    constructor(settings: Partial<W3oNetworkSettings>, parent: W3oContext) {
        super(
            { ...TelosEVMConfigJSON },
            (new W3oContextFactory('TelosEVMNetwork')).method('constructor', { settings }, parent)
        );
    }
}

const TelosEVMTestnetConfigJSON: W3oEthereumNetworkSettings = {
    w3oName: 'ethereum.network.telos-evm-testnet',
    w3oVersion,
    w3oRequire,
    type,
    name: 'telos-evm-testnet' as W3oNetworkName,
    chainId: '41',
    displayName: 'Telos EVM Testnet',
    rpcUrl: 'https://testnet.telos.net/evm',
    tokensUrl: 'assets/tokens-ethereum-telos-evm-testnet.json',
    links: {
        explorer: 'https://testnet.teloscan.io',
        bridge: '',
        ecosystem: '',
        website: 'https://telos.net',
        wallet: ''
    } as W3oNetworkLinks
};

export class TelosEVMTestnetNetwork extends EthereumNetwork {
    constructor(settings: Partial<W3oNetworkSettings>, parent: W3oContext) {
        super(
            { ...TelosEVMTestnetConfigJSON },
            (new W3oContextFactory('TelosEVMTestnetNetwork')).method('constructor', { settings }, parent)
        );
    }
}
