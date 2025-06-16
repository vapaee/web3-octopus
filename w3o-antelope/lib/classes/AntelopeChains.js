// w3o-antelope/src/classes/AntelopeChains.ts
import { W3oContextFactory } from '@vapaee/w3o-core';
import { Chains } from '@wharfkit/common';
import { W3oNetwork } from '@vapaee/w3o-core';
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
    tokensUrl: 'assets/tokens-antelope-eos.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://eosnetwork.com',
        wallet: ''
    }
};
export class EOSNetwork extends W3oNetwork {
    constructor(settings, parent) {
        super({ ...EOSConfigJSON, ...settings }, (new W3oContextFactory('EOSNetwork')).method('constructor', { settings }, parent));
    }
    get w3oVersion() {
        return w3oVersion;
    }
    get w3oRequire() {
        return w3oRequire;
    }
    get w3oName() {
        return 'antelope.network.eos';
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
    tokensUrl: 'assets/tokens-antelope-fio.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://fioprotocol.io',
        wallet: ''
    }
};
export class FIONetwork extends W3oNetwork {
    constructor(settings, parent) {
        super({ ...FIOConfigJSON, ...settings }, (new W3oContextFactory('FIONetwork')).method('constructor', { settings }, parent));
    }
    get w3oVersion() {
        return w3oVersion;
    }
    get w3oRequire() {
        return w3oRequire;
    }
    get w3oName() {
        return 'antelope.network.fio';
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
    tokensUrl: 'assets/tokens-antelope-fio-testnet.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://fioprotocol.io',
        wallet: ''
    }
};
export class FIOTestnetNetwork extends W3oNetwork {
    constructor(settings, parent) {
        super({ ...FIOTestnetConfigJSON, ...settings }, (new W3oContextFactory('FIOTestnetNetwork')).method('constructor', { settings }, parent));
    }
    get w3oVersion() {
        return w3oVersion;
    }
    get w3oRequire() {
        return w3oRequire;
    }
    get w3oName() {
        return 'antelope.network.fio-testnet';
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
    tokensUrl: 'assets/tokens-antelope-jungle4.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://jungle.bloks.io',
        wallet: ''
    }
};
export class Jungle4Network extends W3oNetwork {
    constructor(settings, parent) {
        super({ ...Jungle4ConfigJSON, ...settings }, (new W3oContextFactory('Jungle4Network')).method('constructor', { settings }, parent));
    }
    get w3oVersion() {
        return w3oVersion;
    }
    get w3oRequire() {
        return w3oRequire;
    }
    get w3oName() {
        return 'antelope.network.jungle4';
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
    tokensUrl: 'assets/tokens-antelope-kylin-testnet.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://kylin.bloks.io',
        wallet: ''
    }
};
export class KylinTestnetNetwork extends W3oNetwork {
    constructor(settings, parent) {
        super({ ...KylinTestnetConfigJSON, ...settings }, (new W3oContextFactory('KylinTestnetNetwork')).method('constructor', { settings }, parent));
    }
    get w3oVersion() {
        return w3oVersion;
    }
    get w3oRequire() {
        return w3oRequire;
    }
    get w3oName() {
        return 'antelope.network.kylin-testnet';
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
    tokensUrl: 'assets/tokens-antelope-libre.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://libre.org',
        wallet: ''
    }
};
export class LibreNetwork extends W3oNetwork {
    constructor(settings, parent) {
        super({ ...LibreConfigJSON, ...settings }, (new W3oContextFactory('LibreNetwork')).method('constructor', { settings }, parent));
    }
    get w3oVersion() {
        return w3oVersion;
    }
    get w3oRequire() {
        return w3oRequire;
    }
    get w3oName() {
        return 'antelope.network.libre';
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
    tokensUrl: 'assets/tokens-antelope-libre-testnet.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://libre.org',
        wallet: ''
    }
};
export class LibreTestnetNetwork extends W3oNetwork {
    constructor(settings, parent) {
        super({ ...LibreTestnetConfigJSON, ...settings }, (new W3oContextFactory('LibreTestnetNetwork')).method('constructor', { settings }, parent));
    }
    get w3oVersion() {
        return w3oVersion;
    }
    get w3oRequire() {
        return w3oRequire;
    }
    get w3oName() {
        return 'antelope.network.libre-testnet';
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
    tokensUrl: 'assets/tokens-antelope-proton.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://protonchain.com',
        wallet: 'https://wallet.protonchain.com'
    }
};
export class ProtonNetwork extends W3oNetwork {
    constructor(settings, parent) {
        super({ ...ProtonConfigJSON, ...settings }, (new W3oContextFactory('ProtonNetwork')).method('constructor', { settings }, parent));
    }
    get w3oVersion() {
        return w3oVersion;
    }
    get w3oRequire() {
        return w3oRequire;
    }
    get w3oName() {
        return 'antelope.network.proton';
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
    tokensUrl: 'assets/tokens-antelope-proton-testnet.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://protonchain.com',
        wallet: 'https://wallet.protonchain.com'
    }
};
export class ProtonTestnetNetwork extends W3oNetwork {
    constructor(settings, parent) {
        super({ ...ProtonTestnetConfigJSON, ...settings }, (new W3oContextFactory('ProtonTestnetNetwork')).method('constructor', { settings }, parent));
    }
    get w3oVersion() {
        return w3oVersion;
    }
    get w3oRequire() {
        return w3oRequire;
    }
    get w3oName() {
        return 'antelope.network.proton-testnet';
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
    tokensUrl: 'assets/tokens-antelope-telos.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://telos.net',
        wallet: 'https://wallet.telos.net'
    }
};
export class TelosZeroNetwork extends W3oNetwork {
    constructor(settings, parent) {
        super({ ...TelosZeroConfigJSON, ...settings }, (new W3oContextFactory('TelosZeroNetwork')).method('constructor', { settings }, parent));
    }
    get w3oVersion() {
        return w3oVersion;
    }
    get w3oRequire() {
        return w3oRequire;
    }
    get w3oName() {
        return 'antelope.network.telos';
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
    tokensUrl: 'assets/tokens-antelope-telos-testnet.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://telos.net',
        wallet: 'https://wallet.telos.net'
    }
};
export class TelosZeroTestnetNetwork extends W3oNetwork {
    constructor(settings, parent) {
        super({ ...TelosZeroTestnetConfigJSON, ...settings }, (new W3oContextFactory('TelosZeroTestnetNetwork')).method('constructor', { settings }, parent));
    }
    get w3oVersion() {
        return w3oVersion;
    }
    get w3oRequire() {
        return w3oRequire;
    }
    get w3oName() {
        return 'antelope.network.telos-testnet';
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
    tokensUrl: 'assets/tokens-antelope-ux.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://uxnetwork.io',
        wallet: ''
    }
};
export class UXNetwork extends W3oNetwork {
    constructor(settings, parent) {
        super({ ...UXConfigJSON, ...settings }, (new W3oContextFactory('UXNetwork')).method('constructor', { settings }, parent));
    }
    get w3oVersion() {
        return w3oVersion;
    }
    get w3oRequire() {
        return w3oRequire;
    }
    get w3oName() {
        return 'antelope.network.ux';
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
    tokensUrl: 'assets/tokens-antelope-wax.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://wax.io',
        wallet: ''
    }
};
export class WAXNetwork extends W3oNetwork {
    constructor(settings, parent) {
        super({ ...WAXConfigJSON, ...settings }, (new W3oContextFactory('WAXNetwork')).method('constructor', { settings }, parent));
    }
    get w3oVersion() {
        return w3oVersion;
    }
    get w3oRequire() {
        return w3oRequire;
    }
    get w3oName() {
        return 'antelope.network.wax';
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
    tokensUrl: 'assets/tokens-antelope-wax-testnet.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://wax.io',
        wallet: ''
    }
};
export class WAXTestnetNetwork extends W3oNetwork {
    constructor(settings, parent) {
        super({ ...WAXTestnetConfigJSON, ...settings }, (new W3oContextFactory('WAXTestnetNetwork')).method('constructor', { settings }, parent));
    }
    get w3oVersion() {
        return w3oVersion;
    }
    get w3oRequire() {
        return w3oRequire;
    }
    get w3oName() {
        return 'antelope.network.wax-testnet';
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
    tokensUrl: 'assets/tokens-antelope-xpr.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://protonchain.com',
        wallet: 'https://wallet.protonchain.com'
    }
};
export class XPRNetwork extends W3oNetwork {
    constructor(settings, parent) {
        super({ ...XPRConfigJSON, ...settings }, (new W3oContextFactory('XPRNetwork')).method('constructor', { settings }, parent));
    }
    get w3oVersion() {
        return w3oVersion;
    }
    get w3oRequire() {
        return w3oRequire;
    }
    get w3oName() {
        return 'antelope.network.xpr';
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
    tokensUrl: 'assets/tokens-antelope-xpr-testnet.json',
    links: {
        explorer: '',
        bridge: '',
        ecosystem: '',
        website: 'https://protonchain.com',
        wallet: 'https://wallet.protonchain.com'
    }
};
export class XPRTestnetNetwork extends W3oNetwork {
    constructor(settings, parent) {
        super({ ...XPRTestnetConfigJSON, ...settings }, (new W3oContextFactory('XPRTestnetNetwork')).method('constructor', { settings }, parent));
    }
    get w3oVersion() {
        return w3oVersion;
    }
    get w3oRequire() {
        return w3oRequire;
    }
    get w3oName() {
        return 'antelope.network.xpr-testnet';
    }
}
