// w3o-antelope/src/classes/EVMChains.ts

import { W3oContextFactory, W3oContext, W3oNetworkSettings, W3oNetworkLinks, W3oNetworkName, W3oNetworkType } from '@vapaee/w3o-core';
import { Chains } from '@wharfkit/common';
import { W3oEVMNetworkSettings } from '../types';
import { EVMNetwork } from './EVMNetwork';

const type = 'antelope' as W3oNetworkType;
const w3oRequire = ['antelope.network.support@1.0.0'];
const w3oVersion = '1.0.0';

// ---- EOS ----

const EOSConfigJSON: W3oEVMNetworkSettings = {
    w3oName: 'antelope.network.eos',
    w3oVersion,
    w3oRequire,
    type,
    name: 'eos' as W3oNetworkName,
    chain: Chains.EOS,
    chainId: Chains.EOS.id.toString(),
    displayName: Chains.EOS.name,
    rpcUrl: 'https://eos.greymass.com',
    tokensUrl: 'assets/tokens_eos.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://eosnetwork.com',
        wallet: ''
    } as W3oNetworkLinks
};

export class EOSNetwork extends EVMNetwork {
    constructor(settings: Partial<W3oNetworkSettings>, parent: W3oContext) {
        super(
            { ...EOSConfigJSON, chain: Chains.EOS },
            (new W3oContextFactory('EOSNetwork')).method('constructor', {settings}, parent)
        );
    }
}

// ---- FIO ----

const FIOConfigJSON: W3oEVMNetworkSettings = {
    w3oName: 'antelope.network.fio',
    w3oVersion,
    w3oRequire,
    type,
    name: 'fio' as W3oNetworkName,
    chain: Chains.FIO,
    chainId: Chains.FIO.id.toString(),
    displayName: Chains.FIO.name,
    rpcUrl: 'https://fio.greymass.com',
    tokensUrl: 'assets/tokens_fio.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://fioprotocol.io',
        wallet: ''
    } as W3oNetworkLinks
};

export class FIONetwork extends EVMNetwork {
    constructor(settings: Partial<W3oNetworkSettings>, parent: W3oContext) {
        super(
            { ...FIOConfigJSON, chain: Chains.FIO },
            (new W3oContextFactory('FIONetwork')).method('constructor', {settings}, parent)
        );
    }
}

// ---- FIO (Testnet) ----

const FIOTestnetConfigJSON: W3oEVMNetworkSettings = {
    w3oName: 'antelope.network.fio-testnet',
    w3oVersion,
    w3oRequire,
    type,
    name: 'fio-testnet' as W3oNetworkName,
    chain: Chains.FIOTestnet,
    chainId: Chains.FIOTestnet.id.toString(),
    displayName: Chains.FIOTestnet.name,
    rpcUrl: 'https://testnet.fioprotocol.io',
    tokensUrl: 'assets/tokens_fiotestnet.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://fioprotocol.io',
        wallet: ''
    } as W3oNetworkLinks
};

export class FIOTestnetNetwork extends EVMNetwork {
    constructor(settings: Partial<W3oNetworkSettings>, parent: W3oContext) {
        super(
            { ...FIOTestnetConfigJSON, chain: Chains.FIOTestnet },
            (new W3oContextFactory('FIOTestnetNetwork')).method('constructor', {settings}, parent)
        );
    }
}

// ---- Jungle4 ----

const Jungle4ConfigJSON: W3oEVMNetworkSettings = {
    w3oName: 'antelope.network.jungle4',
    w3oVersion,
    w3oRequire,
    type,
    name: 'jungle4' as W3oNetworkName,
    chain: Chains.Jungle4,
    chainId: Chains.Jungle4.id.toString(),
    displayName: Chains.Jungle4.name,
    rpcUrl: 'https://jungle4.greymass.com',
    tokensUrl: 'assets/tokens_jungle4.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://jungle.bloks.io',
        wallet: ''
    } as W3oNetworkLinks
};

export class Jungle4Network extends EVMNetwork {
    constructor(settings: Partial<W3oNetworkSettings>, parent: W3oContext) {
        super(
            { ...Jungle4ConfigJSON, chain: Chains.Jungle4 },
            (new W3oContextFactory('Jungle4Network')).method('constructor', {settings}, parent)
        );
    }
}

// ---- Kylin (Testnet) ----

const KylinTestnetConfigJSON: W3oEVMNetworkSettings = {
    w3oName: 'antelope.network.kylin-testnet',
    w3oVersion,
    w3oRequire,
    type,
    name: 'kylin-testnet' as W3oNetworkName,
    chain: Chains.KylinTestnet,
    chainId: Chains.KylinTestnet.id.toString(),
    displayName: Chains.KylinTestnet.name,
    rpcUrl: 'https://kylin.eosn.io',
    tokensUrl: 'assets/tokens_kylin.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://kylin.bloks.io',
        wallet: ''
    } as W3oNetworkLinks
};

export class KylinTestnetNetwork extends EVMNetwork {
    constructor(settings: Partial<W3oNetworkSettings>, parent: W3oContext) {
        super(
            { ...KylinTestnetConfigJSON, chain: Chains.KylinTestnet },
            (new W3oContextFactory('KylinTestnetNetwork')).method('constructor', {settings}, parent)
        );
    }
}


// ---- Libre ----

const LibreConfigJSON: W3oEVMNetworkSettings = {
    w3oName: 'antelope.network.libre',
    w3oVersion,
    w3oRequire,
    type,
    name: 'libre' as W3oNetworkName,
    chain: Chains.Libre,
    chainId: Chains.Libre.id.toString(),
    displayName: Chains.Libre.name,
    rpcUrl: 'https://api.libre.org',
    tokensUrl: 'assets/tokens_libre.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://libre.org',
        wallet: ''
    } as W3oNetworkLinks
};

export class LibreNetwork extends EVMNetwork {
    constructor(settings: Partial<W3oNetworkSettings>, parent: W3oContext) {
        super(
            { ...LibreConfigJSON, chain: Chains.Libre },
            (new W3oContextFactory('LibreNetwork')).method('constructor', {settings}, parent)
        );
    }
}

// ---- Libre (Testnet) ----

const LibreTestnetConfigJSON: W3oEVMNetworkSettings = {
    w3oName: 'antelope.network.libre-testnet',
    w3oVersion,
    w3oRequire,
    type,
    name: 'libre-testnet' as W3oNetworkName,
    chain: Chains.LibreTestnet,
    chainId: Chains.LibreTestnet.id.toString(),
    displayName: Chains.LibreTestnet.name,
    rpcUrl: 'https://testnet.libre.org',
    tokensUrl: 'assets/tokens_libretestnet.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://libre.org',
        wallet: ''
    } as W3oNetworkLinks
};

export class LibreTestnetNetwork extends EVMNetwork {
    constructor(settings: Partial<W3oNetworkSettings>, parent: W3oContext) {
        super(
            { ...LibreTestnetConfigJSON, chain: Chains.LibreTestnet },
            (new W3oContextFactory('LibreTestnetNetwork')).method('constructor', {settings}, parent)
        );
    }
}


// ---- Proton ----

const ProtonConfigJSON: W3oEVMNetworkSettings = {
    w3oName: 'antelope.network.proton',
    w3oVersion,
    w3oRequire,
    type,
    name: 'proton' as W3oNetworkName,
    chain: Chains.Proton,
    chainId: Chains.Proton.id.toString(),
    displayName: Chains.Proton.name,
    rpcUrl: 'https://proton.greymass.com',
    tokensUrl: 'assets/tokens_proton.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://protonchain.com',
        wallet: 'https://wallet.protonchain.com'
    } as W3oNetworkLinks
};

export class ProtonNetwork extends EVMNetwork {
    constructor(settings: Partial<W3oNetworkSettings>, parent: W3oContext) {
        super(
            { ...ProtonConfigJSON, chain: Chains.Proton },
            (new W3oContextFactory('ProtonNetwork')).method('constructor', {settings}, parent)
        );
    }
}

// ---- Proton (Testnet) ----

const ProtonTestnetConfigJSON: W3oEVMNetworkSettings = {
    w3oName: 'antelope.network.proton-testnet',
    w3oVersion,
    w3oRequire,
    type,
    name: 'proton-testnet' as W3oNetworkName,
    chain: Chains.ProtonTestnet,
    chainId: Chains.ProtonTestnet.id.toString(),
    displayName: Chains.ProtonTestnet.name,
    rpcUrl: 'https://testnet.protonchain.com',
    tokensUrl: 'assets/tokens_protontestnet.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://protonchain.com',
        wallet: 'https://wallet.protonchain.com'
    } as W3oNetworkLinks
};

export class ProtonTestnetNetwork extends EVMNetwork {
    constructor(settings: Partial<W3oNetworkSettings>, parent: W3oContext) {
        super(
            { ...ProtonTestnetConfigJSON, chain: Chains.ProtonTestnet },
            (new W3oContextFactory('ProtonTestnetNetwork')).method('constructor', {settings}, parent)
        );
    }
}


// ---- Telos ----

const TelosZeroConfigJSON: W3oEVMNetworkSettings = {
    w3oName: 'antelope.network.telos',
    w3oVersion,
    w3oRequire,
    type,
    name: 'telos' as W3oNetworkName,
    chain: Chains.Telos,
    chainId: Chains.Telos.id.toString(),
    displayName: Chains.Telos.name,
    rpcUrl: 'https://mainnet.telos.net',
    tokensUrl: 'assets/tokens_mainnet.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://telos.net',
        wallet: 'https://wallet.telos.net'
    } as W3oNetworkLinks
};

export class TelosZeroNetwork extends EVMNetwork {
    constructor(settings: Partial<W3oNetworkSettings>, parent: W3oContext) {
        super(
            { ...TelosZeroConfigJSON, chain: Chains.Telos },
            (new W3oContextFactory('TelosZeroNetwork')).method('constructor', {settings}, parent)
        );
    }
}

// ---- Telos (Testnet) ----

const TelosZeroTestnetConfigJSON: W3oEVMNetworkSettings = {
    w3oName: 'antelope.network.telos-testnet',
    w3oVersion,
    w3oRequire,
    type,
    name: 'telos-testnet' as W3oNetworkName,
    chain: Chains.TelosTestnet,
    chainId: Chains.TelosTestnet.id.toString(),
    displayName: 'Telos Zero Testnet',
    rpcUrl: 'https://testnet.telos.net',
    tokensUrl: 'assets/tokens_testnet.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://telos.net',
        wallet: 'https://wallet.telos.net'
    } as W3oNetworkLinks
};

export class TelosZeroTestnetNetwork extends EVMNetwork {
    constructor(settings: Partial<W3oNetworkSettings>, parent: W3oContext) {
        super(
            { ...TelosZeroTestnetConfigJSON, chain: Chains.TelosTestnet },
            (new W3oContextFactory('TelosZeroTestnetNetwork')).method('constructor', {settings}, parent)
        );
    }
}


// ---- UX ----

const UXConfigJSON: W3oEVMNetworkSettings = {
    w3oName: 'antelope.network.ux',
    w3oVersion,
    w3oRequire,
    type,
    name: 'ux' as W3oNetworkName,
    chain: Chains.UX,
    chainId: Chains.UX.id.toString(),
    displayName: Chains.UX.name,
    rpcUrl: 'https://api.uxnetwork.io',
    tokensUrl: 'assets/tokens_ux.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://uxnetwork.io',
        wallet: ''
    } as W3oNetworkLinks
};

export class UXNetwork extends EVMNetwork {
    constructor(settings: Partial<W3oNetworkSettings>, parent: W3oContext) {
        super(
            { ...UXConfigJSON, chain: Chains.UX },
            (new W3oContextFactory('UXNetwork')).method('constructor', {settings}, parent)
        );
    }
}

// ---- WAX ----

const WAXConfigJSON: W3oEVMNetworkSettings = {
    w3oName: 'antelope.network.wax',
    w3oVersion,
    w3oRequire,
    type,
    name: 'wax' as W3oNetworkName,
    chain: Chains.WAX,
    chainId: Chains.WAX.id.toString(),
    displayName: Chains.WAX.name,
    rpcUrl: 'https://wax.greymass.com',
    tokensUrl: 'assets/tokens_wax.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://wax.io',
        wallet: ''
    } as W3oNetworkLinks
};

export class WAXNetwork extends EVMNetwork {
    constructor(settings: Partial<W3oNetworkSettings>, parent: W3oContext) {
        super(
            { ...WAXConfigJSON, chain: Chains.WAX },
            (new W3oContextFactory('WAXNetwork')).method('constructor', {settings}, parent)
        );
    }
}

// ---- WAX (Testnet) ----

const WAXTestnetConfigJSON: W3oEVMNetworkSettings = {
    w3oName: 'antelope.network.wax-testnet',
    w3oVersion,
    w3oRequire,
    type,
    name: 'wax-testnet' as W3oNetworkName,
    chain: Chains.WAXTestnet,
    chainId: Chains.WAXTestnet.id.toString(),
    displayName: Chains.WAXTestnet.name,
    rpcUrl: 'https://wax-testnet.greymass.com',
    tokensUrl: 'assets/tokens_waxtestnet.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://wax.io',
        wallet: ''
    } as W3oNetworkLinks
};

export class WAXTestnetNetwork extends EVMNetwork {
    constructor(settings: Partial<W3oNetworkSettings>, parent: W3oContext) {
        super(
            { ...WAXTestnetConfigJSON, chain: Chains.WAXTestnet },
            (new W3oContextFactory('WAXTestnetNetwork')).method('constructor', {settings}, parent)
        );
    }
}

// ---- XPR ----

const XPRConfigJSON: W3oEVMNetworkSettings = {
    w3oName: 'antelope.network.xpr',
    w3oVersion,
    w3oRequire,
    type,
    name: 'xpr' as W3oNetworkName,
    chain: Chains.XPR,
    chainId: Chains.XPR.id.toString(),
    displayName: Chains.XPR.name,
    rpcUrl: 'https://xpr.greymass.com',
    tokensUrl: 'assets/tokens_xpr.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://protonchain.com',
        wallet: 'https://wallet.protonchain.com'
    } as W3oNetworkLinks
};

export class XPRNetwork extends EVMNetwork {
    constructor(settings: Partial<W3oNetworkSettings>, parent: W3oContext) {
        super(
            { ...XPRConfigJSON, chain: Chains.XPR },
            (new W3oContextFactory('XPRNetwork')).method('constructor', {settings}, parent)
        );
    }
}

// ---- XPR (Testnet) ----

const XPRTestnetConfigJSON: W3oEVMNetworkSettings = {
    w3oName: 'antelope.network.xpr-testnet',
    w3oVersion,
    w3oRequire,
    type,
    name: 'xpr-testnet' as W3oNetworkName,
    chain: Chains.XPRTestnet,
    chainId: Chains.XPRTestnet.id.toString(),
    displayName: Chains.XPRTestnet.name,
    rpcUrl: 'https://testnet.protonchain.com',
    tokensUrl: 'assets/tokens_xprtestnet.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://protonchain.com',
        wallet: 'https://wallet.protonchain.com'
    } as W3oNetworkLinks
};

export class XPRTestnetNetwork extends EVMNetwork {
    constructor(settings: Partial<W3oNetworkSettings>, parent: W3oContext) {
        super(
            { ...XPRTestnetConfigJSON, chain: Chains.XPRTestnet },
            (new W3oContextFactory('XPRTestnetNetwork')).method('constructor', {settings}, parent)
        );
    }
}
