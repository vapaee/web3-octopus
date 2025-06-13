// w3o-antelope/src/classes/AntelopeChains.ts
import { W3oContextFactory } from '@vapaee/w3o-core';
import { Chains } from '@wharfkit/common';
import { AntelopeNetwork } from './AntelopeNetwork';
const type = 'antelope';
const w3oRequire = ['antelope.network.support@1.0.0'];
const w3oVersion = '1.0.0';
// ---- EOS ----
const EOSConfigJSON = {
    w3oName: 'antelope.network.eos',
    w3oVersion,
    w3oRequire,
    type,
    name: 'eos',
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
    }
};
export class EOSNetwork extends AntelopeNetwork {
    constructor(settings, parent) {
        super({ ...EOSConfigJSON, chain: Chains.EOS }, (new W3oContextFactory('EOSNetwork')).method('constructor', { settings }, parent));
    }
}
// ---- FIO ----
const FIOConfigJSON = {
    w3oName: 'antelope.network.fio',
    w3oVersion,
    w3oRequire,
    type,
    name: 'fio',
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
    }
};
export class FIONetwork extends AntelopeNetwork {
    constructor(settings, parent) {
        super({ ...FIOConfigJSON, chain: Chains.FIO }, (new W3oContextFactory('FIONetwork')).method('constructor', { settings }, parent));
    }
}
// ---- FIO (Testnet) ----
const FIOTestnetConfigJSON = {
    w3oName: 'antelope.network.fio-testnet',
    w3oVersion,
    w3oRequire,
    type,
    name: 'fio-testnet',
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
    }
};
export class FIOTestnetNetwork extends AntelopeNetwork {
    constructor(settings, parent) {
        super({ ...FIOTestnetConfigJSON, chain: Chains.FIOTestnet }, (new W3oContextFactory('FIOTestnetNetwork')).method('constructor', { settings }, parent));
    }
}
// ---- Jungle4 ----
const Jungle4ConfigJSON = {
    w3oName: 'antelope.network.jungle4',
    w3oVersion,
    w3oRequire,
    type,
    name: 'jungle4',
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
    }
};
export class Jungle4Network extends AntelopeNetwork {
    constructor(settings, parent) {
        super({ ...Jungle4ConfigJSON, chain: Chains.Jungle4 }, (new W3oContextFactory('Jungle4Network')).method('constructor', { settings }, parent));
    }
}
// ---- Kylin (Testnet) ----
const KylinTestnetConfigJSON = {
    w3oName: 'antelope.network.kylin-testnet',
    w3oVersion,
    w3oRequire,
    type,
    name: 'kylin-testnet',
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
    }
};
export class KylinTestnetNetwork extends AntelopeNetwork {
    constructor(settings, parent) {
        super({ ...KylinTestnetConfigJSON, chain: Chains.KylinTestnet }, (new W3oContextFactory('KylinTestnetNetwork')).method('constructor', { settings }, parent));
    }
}
// ---- Libre ----
const LibreConfigJSON = {
    w3oName: 'antelope.network.libre',
    w3oVersion,
    w3oRequire,
    type,
    name: 'libre',
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
    }
};
export class LibreNetwork extends AntelopeNetwork {
    constructor(settings, parent) {
        super({ ...LibreConfigJSON, chain: Chains.Libre }, (new W3oContextFactory('LibreNetwork')).method('constructor', { settings }, parent));
    }
}
// ---- Libre (Testnet) ----
const LibreTestnetConfigJSON = {
    w3oName: 'antelope.network.libre-testnet',
    w3oVersion,
    w3oRequire,
    type,
    name: 'libre-testnet',
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
    }
};
export class LibreTestnetNetwork extends AntelopeNetwork {
    constructor(settings, parent) {
        super({ ...LibreTestnetConfigJSON, chain: Chains.LibreTestnet }, (new W3oContextFactory('LibreTestnetNetwork')).method('constructor', { settings }, parent));
    }
}
// ---- Proton ----
const ProtonConfigJSON = {
    w3oName: 'antelope.network.proton',
    w3oVersion,
    w3oRequire,
    type,
    name: 'proton',
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
    }
};
export class ProtonNetwork extends AntelopeNetwork {
    constructor(settings, parent) {
        super({ ...ProtonConfigJSON, chain: Chains.Proton }, (new W3oContextFactory('ProtonNetwork')).method('constructor', { settings }, parent));
    }
}
// ---- Proton (Testnet) ----
const ProtonTestnetConfigJSON = {
    w3oName: 'antelope.network.proton-testnet',
    w3oVersion,
    w3oRequire,
    type,
    name: 'proton-testnet',
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
    }
};
export class ProtonTestnetNetwork extends AntelopeNetwork {
    constructor(settings, parent) {
        super({ ...ProtonTestnetConfigJSON, chain: Chains.ProtonTestnet }, (new W3oContextFactory('ProtonTestnetNetwork')).method('constructor', { settings }, parent));
    }
}
// ---- Telos ----
const TelosZeroConfigJSON = {
    w3oName: 'antelope.network.telos',
    w3oVersion,
    w3oRequire,
    type,
    name: 'telos',
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
    }
};
export class TelosZeroNetwork extends AntelopeNetwork {
    constructor(settings, parent) {
        super({ ...TelosZeroConfigJSON, chain: Chains.Telos }, (new W3oContextFactory('TelosZeroNetwork')).method('constructor', { settings }, parent));
    }
}
// ---- Telos (Testnet) ----
const TelosZeroTestnetConfigJSON = {
    w3oName: 'antelope.network.telos-testnet',
    w3oVersion,
    w3oRequire,
    type,
    name: 'telos-testnet',
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
    }
};
export class TelosZeroTestnetNetwork extends AntelopeNetwork {
    constructor(settings, parent) {
        super({ ...TelosZeroTestnetConfigJSON, chain: Chains.TelosTestnet }, (new W3oContextFactory('TelosZeroTestnetNetwork')).method('constructor', { settings }, parent));
    }
}
// ---- UX ----
const UXConfigJSON = {
    w3oName: 'antelope.network.ux',
    w3oVersion,
    w3oRequire,
    type,
    name: 'ux',
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
    }
};
export class UXNetwork extends AntelopeNetwork {
    constructor(settings, parent) {
        super({ ...UXConfigJSON, chain: Chains.UX }, (new W3oContextFactory('UXNetwork')).method('constructor', { settings }, parent));
    }
}
// ---- WAX ----
const WAXConfigJSON = {
    w3oName: 'antelope.network.wax',
    w3oVersion,
    w3oRequire,
    type,
    name: 'wax',
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
    }
};
export class WAXNetwork extends AntelopeNetwork {
    constructor(settings, parent) {
        super({ ...WAXConfigJSON, chain: Chains.WAX }, (new W3oContextFactory('WAXNetwork')).method('constructor', { settings }, parent));
    }
}
// ---- WAX (Testnet) ----
const WAXTestnetConfigJSON = {
    w3oName: 'antelope.network.wax-testnet',
    w3oVersion,
    w3oRequire,
    type,
    name: 'wax-testnet',
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
    }
};
export class WAXTestnetNetwork extends AntelopeNetwork {
    constructor(settings, parent) {
        super({ ...WAXTestnetConfigJSON, chain: Chains.WAXTestnet }, (new W3oContextFactory('WAXTestnetNetwork')).method('constructor', { settings }, parent));
    }
}
// ---- XPR ----
const XPRConfigJSON = {
    w3oName: 'antelope.network.xpr',
    w3oVersion,
    w3oRequire,
    type,
    name: 'xpr',
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
    }
};
export class XPRNetwork extends AntelopeNetwork {
    constructor(settings, parent) {
        super({ ...XPRConfigJSON, chain: Chains.XPR }, (new W3oContextFactory('XPRNetwork')).method('constructor', { settings }, parent));
    }
}
// ---- XPR (Testnet) ----
const XPRTestnetConfigJSON = {
    w3oName: 'antelope.network.xpr-testnet',
    w3oVersion,
    w3oRequire,
    type,
    name: 'xpr-testnet',
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
    }
};
export class XPRTestnetNetwork extends AntelopeNetwork {
    constructor(settings, parent) {
        super({ ...XPRTestnetConfigJSON, chain: Chains.XPRTestnet }, (new W3oContextFactory('XPRTestnetNetwork')).method('constructor', { settings }, parent));
    }
}
