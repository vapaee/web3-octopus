// w3o-antelope/src/classes/AntelopeChains.ts

import { W3oContextFactory, W3oContext, W3oNetworkLinks, W3oNetworkName, W3oNetworkType } from '@vapaee/w3o-core';
import { Chains } from '@wharfkit/common';
import { W3oAntelopeNetworkSettings } from '../types';
import { W3oNetwork } from '@vapaee/w3o-core';

const type = 'antelope' as W3oNetworkType;
const w3oRequire = ['antelope.network.support@1.0.0'];
const w3oVersion = '1.0.0';

// ---- EOS ----

const EOSConfigJSON: W3oAntelopeNetworkSettings = {
    w3oName: 'antelope.network.eos',
    w3oVersion,
    w3oRequire,
    type,
    name: 'eos' as W3oNetworkName,
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
    } as W3oNetworkLinks
};

export class EOSNetwork extends W3oNetwork {
    constructor(settings: Partial<W3oAntelopeNetworkSettings>, parent: W3oContext) {
        super(
            { ...EOSConfigJSON, ...settings } as W3oAntelopeNetworkSettings,
            (new W3oContextFactory('EOSNetwork')).method('constructor', {settings}, parent)
        );
    }

    override get w3oVersion(): string {
        return w3oVersion;
    }

    override get w3oRequire(): string[] {
        return w3oRequire;
    }

    override get w3oName(): string {
        return 'antelope.network.eos';
    }
}

// ---- FIO ----

const FIOConfigJSON: W3oAntelopeNetworkSettings = {
    w3oName: 'antelope.network.fio',
    w3oVersion,
    w3oRequire,
    type,
    name: 'fio' as W3oNetworkName,
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
    } as W3oNetworkLinks
};

export class FIONetwork extends W3oNetwork {
    constructor(settings: Partial<W3oAntelopeNetworkSettings>, parent: W3oContext) {
        super(
            { ...FIOConfigJSON, ...settings } as W3oAntelopeNetworkSettings,
            (new W3oContextFactory('FIONetwork')).method('constructor', {settings}, parent)
        );
    }

    override get w3oVersion(): string {
        return w3oVersion;
    }

    override get w3oRequire(): string[] {
        return w3oRequire;
    }

    override get w3oName(): string {
        return 'antelope.network.fio';
    }
}

// ---- FIO (Testnet) ----

const FIOTestnetConfigJSON: W3oAntelopeNetworkSettings = {
    w3oName: 'antelope.network.fio-testnet',
    w3oVersion,
    w3oRequire,
    type,
    name: 'fio-testnet' as W3oNetworkName,
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
    } as W3oNetworkLinks
};

export class FIOTestnetNetwork extends W3oNetwork {
    constructor(settings: Partial<W3oAntelopeNetworkSettings>, parent: W3oContext) {
        super(
            { ...FIOTestnetConfigJSON, ...settings } as W3oAntelopeNetworkSettings,
            (new W3oContextFactory('FIOTestnetNetwork')).method('constructor', {settings}, parent)
        );
    }
    
    override get w3oVersion(): string {
        return w3oVersion;
    }

    override get w3oRequire(): string[] {
        return w3oRequire;
    }

    override get w3oName(): string {
        return 'antelope.network.fio-testnet';
    }
}

// ---- Jungle4 ----

const Jungle4ConfigJSON: W3oAntelopeNetworkSettings = {
    w3oName: 'antelope.network.jungle4',
    w3oVersion,
    w3oRequire,
    type,
    name: 'jungle4' as W3oNetworkName,
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
    } as W3oNetworkLinks
};

export class Jungle4Network extends W3oNetwork {
    constructor(settings: Partial<W3oAntelopeNetworkSettings>, parent: W3oContext) {
        super(
            { ...Jungle4ConfigJSON, ...settings } as W3oAntelopeNetworkSettings,
            (new W3oContextFactory('Jungle4Network')).method('constructor', {settings}, parent)
        );
    }

    override get w3oVersion(): string {
        return w3oVersion;
    }

    override get w3oRequire(): string[] {
        return w3oRequire;
    }

    override get w3oName(): string {
        return 'antelope.network.jungle4';
    }
}

// ---- Kylin (Testnet) ----

const KylinTestnetConfigJSON: W3oAntelopeNetworkSettings = {
    w3oName: 'antelope.network.kylin-testnet',
    w3oVersion,
    w3oRequire,
    type,
    name: 'kylin-testnet' as W3oNetworkName,
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
    } as W3oNetworkLinks
};

export class KylinTestnetNetwork extends W3oNetwork {
    constructor(settings: Partial<W3oAntelopeNetworkSettings>, parent: W3oContext) {
        super(
            { ...KylinTestnetConfigJSON, ...settings } as W3oAntelopeNetworkSettings,
            (new W3oContextFactory('KylinTestnetNetwork')).method('constructor', {settings}, parent)
        );
    }

    override get w3oVersion(): string {
        return w3oVersion;
    }

    override get w3oRequire(): string[] {
        return w3oRequire;
    }

    override get w3oName(): string {
        return 'antelope.network.kylin-testnet';
    }
}


// ---- Libre ----

const LibreConfigJSON: W3oAntelopeNetworkSettings = {
    w3oName: 'antelope.network.libre',
    w3oVersion,
    w3oRequire,
    type,
    name: 'libre' as W3oNetworkName,
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
    } as W3oNetworkLinks
};

export class LibreNetwork extends W3oNetwork {
    constructor(settings: Partial<W3oAntelopeNetworkSettings>, parent: W3oContext) {
        super(
            { ...LibreConfigJSON, ...settings } as W3oAntelopeNetworkSettings,
            (new W3oContextFactory('LibreNetwork')).method('constructor', {settings}, parent)
        );
    }

    override get w3oVersion(): string {
        return w3oVersion;
    }

    override get w3oRequire(): string[] {
        return w3oRequire;
    }

    override get w3oName(): string {
        return 'antelope.network.libre';
    }
}

// ---- Libre (Testnet) ----

const LibreTestnetConfigJSON: W3oAntelopeNetworkSettings = {
    w3oName: 'antelope.network.libre-testnet',
    w3oVersion,
    w3oRequire,
    type,
    name: 'libre-testnet' as W3oNetworkName,
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
    } as W3oNetworkLinks
};

export class LibreTestnetNetwork extends W3oNetwork {
    constructor(settings: Partial<W3oAntelopeNetworkSettings>, parent: W3oContext) {
        super(
            { ...LibreTestnetConfigJSON, ...settings } as W3oAntelopeNetworkSettings,
            (new W3oContextFactory('LibreTestnetNetwork')).method('constructor', {settings}, parent)
        );
    }

    override get w3oVersion(): string {
        return w3oVersion;
    }

    override get w3oRequire(): string[] {
        return w3oRequire;
    }

    override get w3oName(): string {
        return 'antelope.network.libre-testnet';
    }
}


// ---- Proton ----

const ProtonConfigJSON: W3oAntelopeNetworkSettings = {
    w3oName: 'antelope.network.proton',
    w3oVersion,
    w3oRequire,
    type,
    name: 'proton' as W3oNetworkName,
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
    } as W3oNetworkLinks
};

export class ProtonNetwork extends W3oNetwork {
    constructor(settings: Partial<W3oAntelopeNetworkSettings>, parent: W3oContext) {
        super(
            { ...ProtonConfigJSON, ...settings } as W3oAntelopeNetworkSettings,
            (new W3oContextFactory('ProtonNetwork')).method('constructor', {settings}, parent)
        );
    }

    override get w3oVersion(): string {
        return w3oVersion;
    }

    override get w3oRequire(): string[] {
        return w3oRequire;
    }

    override get w3oName(): string {
        return 'antelope.network.proton';
    }
}

// ---- Proton (Testnet) ----

const ProtonTestnetConfigJSON: W3oAntelopeNetworkSettings = {
    w3oName: 'antelope.network.proton-testnet',
    w3oVersion,
    w3oRequire,
    type,
    name: 'proton-testnet' as W3oNetworkName,
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
    } as W3oNetworkLinks
};

export class ProtonTestnetNetwork extends W3oNetwork {
    constructor(settings: Partial<W3oAntelopeNetworkSettings>, parent: W3oContext) {
        super(
            { ...ProtonTestnetConfigJSON, ...settings } as W3oAntelopeNetworkSettings,
            (new W3oContextFactory('ProtonTestnetNetwork')).method('constructor', {settings}, parent)
        );
    }
    
    override get w3oVersion(): string {
        return w3oVersion;
    }

    override get w3oRequire(): string[] {
        return w3oRequire;
    }

    override get w3oName(): string {
        return 'antelope.network.proton-testnet';
    }
}


// ---- Telos ----

const TelosZeroConfigJSON: W3oAntelopeNetworkSettings = {
    w3oName: 'antelope.network.telos',
    w3oVersion,
    w3oRequire,
    type,
    name: 'telos' as W3oNetworkName,
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
    } as W3oNetworkLinks
};

export class TelosZeroNetwork extends W3oNetwork {
    constructor(settings: Partial<W3oAntelopeNetworkSettings>, parent: W3oContext) {
        super(
            { ...TelosZeroConfigJSON, ...settings } as W3oAntelopeNetworkSettings,
            (new W3oContextFactory('TelosZeroNetwork')).method('constructor', {settings}, parent)
        );
    }

    override get w3oVersion(): string {
        return w3oVersion;
    }

    override get w3oRequire(): string[] {
        return w3oRequire;
    }

    override get w3oName(): string {
        return 'antelope.network.telos'
    }

}

// ---- Telos (Testnet) ----

const TelosZeroTestnetConfigJSON: W3oAntelopeNetworkSettings = {
    w3oName: 'antelope.network.telos-testnet',
    w3oVersion,
    w3oRequire,
    type,
    name: 'telos-testnet' as W3oNetworkName,
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
    } as W3oNetworkLinks
};

export class TelosZeroTestnetNetwork extends W3oNetwork {
    constructor(settings: Partial<W3oAntelopeNetworkSettings>, parent: W3oContext) {
        super(
            { ...TelosZeroTestnetConfigJSON, ...settings } as W3oAntelopeNetworkSettings,
            (new W3oContextFactory('TelosZeroTestnetNetwork')).method('constructor', {settings}, parent)
        );
    }

    override get w3oVersion(): string {
        return w3oVersion;
    }

    override get w3oRequire(): string[] {
        return w3oRequire;
    }

    override get w3oName(): string {
        return 'antelope.network.telos-testnet';
    }

}


// ---- UX ----

const UXConfigJSON: W3oAntelopeNetworkSettings = {
    w3oName: 'antelope.network.ux',
    w3oVersion,
    w3oRequire,
    type,
    name: 'ux' as W3oNetworkName,
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
    } as W3oNetworkLinks
};

export class UXNetwork extends W3oNetwork {
    constructor(settings: Partial<W3oAntelopeNetworkSettings>, parent: W3oContext) {
        super(
            { ...UXConfigJSON, ...settings } as W3oAntelopeNetworkSettings,
            (new W3oContextFactory('UXNetwork')).method('constructor', {settings}, parent)
        );
    }

    override get w3oVersion(): string {
        return w3oVersion;
    }

    override get w3oRequire(): string[] {
        return w3oRequire;
    }

    override get w3oName(): string {
        return 'antelope.network.ux';
    }
}

// ---- WAX ----

const WAXConfigJSON: W3oAntelopeNetworkSettings = {
    w3oName: 'antelope.network.wax',
    w3oVersion,
    w3oRequire,
    type,
    name: 'wax' as W3oNetworkName,
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
    } as W3oNetworkLinks
};

export class WAXNetwork extends W3oNetwork {
    constructor(settings: Partial<W3oAntelopeNetworkSettings>, parent: W3oContext) {
        super(
            { ...WAXConfigJSON, ...settings } as W3oAntelopeNetworkSettings,
            (new W3oContextFactory('WAXNetwork')).method('constructor', {settings}, parent)
        );
    }

    override get w3oVersion(): string {
        return w3oVersion;
    }

    override get w3oRequire(): string[] {
        return w3oRequire;
    }

    override get w3oName(): string {
        return 'antelope.network.wax';
    }
}

// ---- WAX (Testnet) ----

const WAXTestnetConfigJSON: W3oAntelopeNetworkSettings = {
    w3oName: 'antelope.network.wax-testnet',
    w3oVersion,
    w3oRequire,
    type,
    name: 'wax-testnet' as W3oNetworkName,
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
    } as W3oNetworkLinks
};

export class WAXTestnetNetwork extends W3oNetwork {
    constructor(settings: Partial<W3oAntelopeNetworkSettings>, parent: W3oContext) {
        super(
            { ...WAXTestnetConfigJSON, ...settings } as W3oAntelopeNetworkSettings,
            (new W3oContextFactory('WAXTestnetNetwork')).method('constructor', {settings}, parent)
        );
    }

    override get w3oVersion(): string {
        return w3oVersion;
    }

    override get w3oRequire(): string[] {
        return w3oRequire;
    }

    override get w3oName(): string {
        return 'antelope.network.wax-testnet';
    }
}

// ---- XPR ----

const XPRConfigJSON: W3oAntelopeNetworkSettings = {
    w3oName: 'antelope.network.xpr',
    w3oVersion,
    w3oRequire,
    type,
    name: 'xpr' as W3oNetworkName,
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
    } as W3oNetworkLinks
};

export class XPRNetwork extends W3oNetwork {
    constructor(settings: Partial<W3oAntelopeNetworkSettings>, parent: W3oContext) {
        super(
            { ...XPRConfigJSON, ...settings } as W3oAntelopeNetworkSettings,
            (new W3oContextFactory('XPRNetwork')).method('constructor', {settings}, parent)
        );
    }

    override get w3oVersion(): string {
        return w3oVersion;
    }

    override get w3oRequire(): string[] {
        return w3oRequire;
    }

    override get w3oName(): string {
        return 'antelope.network.xpr';
    }
}

// ---- XPR (Testnet) ----

const XPRTestnetConfigJSON: W3oAntelopeNetworkSettings = {
    w3oName: 'antelope.network.xpr-testnet',
    w3oVersion,
    w3oRequire,
    type,
    name: 'xpr-testnet' as W3oNetworkName,
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
    } as W3oNetworkLinks
};

export class XPRTestnetNetwork extends W3oNetwork {
    constructor(settings: Partial<W3oAntelopeNetworkSettings>, parent: W3oContext) {
        super(
            { ...XPRTestnetConfigJSON, ...settings } as W3oAntelopeNetworkSettings,
            (new W3oContextFactory('XPRTestnetNetwork')).method('constructor', {settings}, parent)
        );
    }

    override get w3oVersion(): string {
        return w3oVersion;
    }

    override get w3oRequire(): string[] {
        return w3oRequire;
    }

    override get w3oName(): string {
        return 'antelope.network.xpr-testnet';
    }
}
