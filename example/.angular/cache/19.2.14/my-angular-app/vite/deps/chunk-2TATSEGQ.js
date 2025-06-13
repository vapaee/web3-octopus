import {
  Asset,
  Checksum256,
  Float64,
  Int64,
  Name,
  Struct,
  TimePoint,
  types$1
} from "./chunk-ADGX27WK.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-J75W5ZEG.js";

// node_modules/@wharfkit/common/lib/common.m.js
var Canceled = class _Canceled extends Error {
  constructor(reason, silent = false) {
    super(reason);
    this.silent = false;
    this.silent = silent;
    Object.setPrototypeOf(this, _Canceled.prototype);
  }
};
function cancelable(promise, onCancel) {
  let cancel = null;
  const cancelable2 = new Promise((resolve, reject) => {
    cancel = (reason = "", silent = false) => {
      try {
        if (onCancel) {
          onCancel(new Canceled(reason, silent));
        }
      } catch (e) {
        reject(e);
      }
      return cancelable2;
    };
    promise.then(resolve, reject);
  });
  if (cancel) {
    cancelable2.cancel = cancel;
  }
  return cancelable2;
}
function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
var ExplorerDefinition = class ExplorerDefinition2 extends Struct {
  url(id) {
    return `${this.prefix}${id}${this.suffix}`;
  }
};
__decorate([Struct.field("string")], ExplorerDefinition.prototype, "prefix", void 0);
__decorate([Struct.field("string")], ExplorerDefinition.prototype, "suffix", void 0);
ExplorerDefinition = __decorate([Struct.type("explorer_definition")], ExplorerDefinition);
var Logo_1;
var Logo = Logo_1 = class Logo2 extends Struct {
  static from(data) {
    if (typeof data === "string") {
      return new Logo_1({
        light: data,
        dark: data
      });
    }
    return super.from(data);
  }
  getVariant(variant) {
    return this[variant];
  }
  toString() {
    return this.light;
  }
};
__decorate([Struct.field("string")], Logo.prototype, "dark", void 0);
__decorate([Struct.field("string")], Logo.prototype, "light", void 0);
Logo = Logo_1 = __decorate([Struct.type("logo")], Logo);
var TokenIdentifier = class TokenIdentifier2 extends Struct {
};
__decorate([Struct.field(Checksum256)], TokenIdentifier.prototype, "chain", void 0);
__decorate([Struct.field(Name)], TokenIdentifier.prototype, "contract", void 0);
__decorate([Struct.field(Asset.Symbol)], TokenIdentifier.prototype, "symbol", void 0);
TokenIdentifier = __decorate([Struct.type("token_identifier")], TokenIdentifier);
var TokenMeta = class TokenMeta2 extends Struct {
};
__decorate([Struct.field(TokenIdentifier)], TokenMeta.prototype, "id", void 0);
__decorate([Struct.field("string", {
  optional: true
})], TokenMeta.prototype, "logo", void 0);
TokenMeta = __decorate([Struct.type("token_meta")], TokenMeta);
var TokenBalance = class TokenBalance2 extends Struct {
};
__decorate([Struct.field(Asset)], TokenBalance.prototype, "asset", void 0);
__decorate([Struct.field(Name)], TokenBalance.prototype, "contract", void 0);
__decorate([Struct.field(TokenMeta)], TokenBalance.prototype, "metadata", void 0);
TokenBalance = __decorate([Struct.type("token_balance")], TokenBalance);
var ChainDefinition = class _ChainDefinition {
  constructor(data) {
    this.id = Checksum256.from(data.id);
    this.url = data.url;
    this.logo = data.logo;
    this.explorer = data.explorer;
    this.accountDataType = data.accountDataType;
    this.coinType = data.coinType;
    if (data.systemTokenContract && data.systemTokenSymbol) {
      this.systemToken = TokenIdentifier.from({
        chain: this.id,
        contract: data.systemTokenContract,
        symbol: data.systemTokenSymbol
      });
    }
    if (data.systemToken) {
      this.systemToken = data.systemToken;
    }
  }
  static from(data) {
    return new _ChainDefinition(__spreadProps(__spreadValues({}, data), {
      explorer: data.explorer ? ExplorerDefinition.from(data.explorer) : void 0,
      logo: data.logo ? Logo.from(data.logo) : void 0
    }));
  }
  get name() {
    const indice = chainIdsToIndices.get(String(this.id));
    if (!indice) {
      return "Unknown blockchain";
    }
    return ChainNames[indice];
  }
  getLogo() {
    const id = String(this.id);
    if (this.logo) {
      return Logo.from(this.logo);
    }
    if (chainLogos.has(id)) {
      const logo = chainLogos.get(id);
      if (logo) {
        return Logo.from(logo);
      }
    }
    return void 0;
  }
  equals(def) {
    const other = _ChainDefinition.from(def);
    return this.id.equals(other.id) && this.url === other.url;
  }
};
var ChainNames = {
  EOS: "EOS",
  FIO: "FIO",
  FIOTestnet: "FIO (Testnet)",
  Jungle4: "Jungle 4 (Testnet)",
  KylinTestnet: "Kylin (Testnet)",
  Libre: "Libre",
  LibreTestnet: "Libre (Testnet)",
  Proton: "XPR Network",
  ProtonTestnet: "XPR Network (Testnet)",
  Telos: "Telos",
  TelosTestnet: "Telos (Testnet)",
  UX: "UX Network",
  Vaulta: "Vaulta",
  WAX: "WAX",
  WAXTestnet: "WAX (Testnet)",
  XPR: "XPR Network",
  XPRTestnet: "XPR Network (Testnet)"
};
var TelosAccountVoterInfo = class TelosAccountVoterInfo2 extends types$1.v1.AccountVoterInfo {
};
__decorate([Struct.field(Int64)], TelosAccountVoterInfo.prototype, "last_stake", void 0);
TelosAccountVoterInfo = __decorate([Struct.type("telos_account_voter_info")], TelosAccountVoterInfo);
var TelosAccountObject = class TelosAccountObject2 extends types$1.v1.AccountObject {
};
__decorate([Struct.field(TelosAccountVoterInfo, {
  optional: true
})], TelosAccountObject.prototype, "voter_info", void 0);
TelosAccountObject = __decorate([Struct.type("telos_account_object")], TelosAccountObject);
var WAXAccountVoterInfo = class WAXAccountVoterInfo2 extends types$1.v1.AccountVoterInfo {
};
__decorate([Struct.field(Float64)], WAXAccountVoterInfo.prototype, "unpaid_voteshare", void 0);
__decorate([Struct.field(TimePoint)], WAXAccountVoterInfo.prototype, "unpaid_voteshare_last_updated", void 0);
__decorate([Struct.field(Float64)], WAXAccountVoterInfo.prototype, "unpaid_voteshare_change_rate", void 0);
__decorate([Struct.field(TimePoint)], WAXAccountVoterInfo.prototype, "last_claim_time", void 0);
WAXAccountVoterInfo = __decorate([Struct.type("wax_account_voter_info")], WAXAccountVoterInfo);
var WAXAccountObject = class WAXAccountObject2 extends types$1.v1.AccountObject {
};
__decorate([Struct.field(WAXAccountVoterInfo, {
  optional: true
})], WAXAccountObject.prototype, "voter_info", void 0);
WAXAccountObject = __decorate([Struct.type("wax_account_object")], WAXAccountObject);
var Chains;
(function(Chains2) {
  Chains2.EOS = ChainDefinition.from({
    id: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
    url: "https://eos.greymass.com",
    coinType: 194,
    systemTokenSymbol: "4,EOS",
    systemTokenContract: "eosio.token"
  });
  Chains2.FIO = ChainDefinition.from({
    id: "21dcae42c0182200e93f954a074011f9048a7624c6fe81d3c9541a614a88bd1c",
    url: "https://fio.greymass.com",
    coinType: 235,
    systemTokenSymbol: "9,FIO",
    systemTokenContract: "eosio.token"
  });
  Chains2.FIOTestnet = ChainDefinition.from({
    id: "b20901380af44ef59c5918439a1f9a41d83669020319a80574b804a5f95cbd7e",
    url: "https://fiotestnet.greymass.com",
    systemTokenSymbol: "9,FIO",
    systemTokenContract: "fio.token"
  });
  Chains2.Jungle4 = ChainDefinition.from({
    id: "73e4385a2708e6d7048834fbc1079f2fabb17b3c125b146af438971e90716c4d",
    url: "https://jungle4.greymass.com",
    coinType: 194,
    systemTokenSymbol: "4,EOS",
    systemTokenContract: "eosio.token"
  });
  Chains2.KylinTestnet = ChainDefinition.from({
    id: "5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191",
    url: "https://kylintestnet.greymass.com",
    coinType: 194,
    systemTokenSymbol: "4,EOS",
    systemTokenContract: "eosio.token"
  });
  Chains2.Libre = ChainDefinition.from({
    id: "38b1d7815474d0c60683ecbea321d723e83f5da6ae5f1c1f9fecc69d9ba96465",
    url: "https://libre.greymass.com",
    systemTokenSymbol: "4,LIBRE",
    systemTokenContract: "eosio.token"
  });
  Chains2.LibreTestnet = ChainDefinition.from({
    id: "b64646740308df2ee06c6b72f34c0f7fa066d940e831f752db2006fcc2b78dee",
    url: "https://libretestnet.greymass.com",
    systemTokenSymbol: "4,LIBRE",
    systemTokenContract: "eosio.token"
  });
  Chains2.Proton = ChainDefinition.from({
    id: "384da888112027f0321850a169f737c33e53b388aad48b5adace4bab97f437e0",
    url: "https://proton.greymass.com",
    systemTokenSymbol: "4,XPR",
    systemTokenContract: "eosio.token"
  });
  Chains2.ProtonTestnet = ChainDefinition.from({
    id: "71ee83bcf52142d61019d95f9cc5427ba6a0d7ff8accd9e2088ae2abeaf3d3dd",
    url: "https://proton-testnet.greymass.com",
    systemTokenSymbol: "4,XPR",
    systemTokenContract: "eosio.token"
  });
  Chains2.Telos = ChainDefinition.from({
    id: "4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11",
    url: "https://telos.greymass.com",
    accountDataType: TelosAccountObject,
    coinType: 977,
    systemTokenSymbol: "4,TLOS",
    systemTokenContract: "eosio.token"
  });
  Chains2.TelosTestnet = ChainDefinition.from({
    id: "1eaa0824707c8c16bd25145493bf062aecddfeb56c736f6ba6397f3195f33c9f",
    url: "https://telostestnet.greymass.com",
    accountDataType: TelosAccountObject,
    coinType: 977,
    systemTokenSymbol: "4,TLOS",
    systemTokenContract: "eosio.token"
  });
  Chains2.UX = ChainDefinition.from({
    id: "8fc6dce7942189f842170de953932b1f66693ad3788f766e777b6f9d22335c02",
    url: "https://api.uxnetwork.io",
    systemTokenSymbol: "4,UTX",
    systemTokenContract: "eosio.token"
  });
  Chains2.Vaulta = ChainDefinition.from({
    id: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
    url: "https://eos.greymass.com",
    coinType: 194,
    systemTokenSymbol: "4,A",
    systemTokenContract: "core.vaulta"
  });
  Chains2.WAX = ChainDefinition.from({
    id: "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
    url: "https://wax.greymass.com",
    accountDataType: WAXAccountObject,
    coinType: 14001,
    systemTokenSymbol: "8,WAX",
    systemTokenContract: "eosio.token"
  });
  Chains2.WAXTestnet = ChainDefinition.from({
    id: "f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12",
    url: "https://waxtestnet.greymass.com",
    accountDataType: WAXAccountObject,
    coinType: 14001,
    systemTokenSymbol: "8,WAX",
    systemTokenContract: "eosio.token"
  });
  Chains2.XPR = ChainDefinition.from({
    id: "384da888112027f0321850a169f737c33e53b388aad48b5adace4bab97f437e0",
    url: "https://proton.greymass.com",
    systemTokenSymbol: "4,XPR",
    systemTokenContract: "eosio.token"
  });
  Chains2.XPRTestnet = ChainDefinition.from({
    id: "71ee83bcf52142d61019d95f9cc5427ba6a0d7ff8accd9e2088ae2abeaf3d3dd",
    url: "https://proton-testnet.greymass.com",
    systemTokenSymbol: "4,XPR",
    systemTokenContract: "eosio.token"
  });
})(Chains || (Chains = {}));
var chainIdsToIndices = /* @__PURE__ */ new Map([["21dcae42c0182200e93f954a074011f9048a7624c6fe81d3c9541a614a88bd1c", "FIO"], ["b20901380af44ef59c5918439a1f9a41d83669020319a80574b804a5f95cbd7e", "FIOTestnet"], ["73e4385a2708e6d7048834fbc1079f2fabb17b3c125b146af438971e90716c4d", "Jungle4"], ["5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191", "KylinTestnet"], ["38b1d7815474d0c60683ecbea321d723e83f5da6ae5f1c1f9fecc69d9ba96465", "Libre"], ["b64646740308df2ee06c6b72f34c0f7fa066d940e831f752db2006fcc2b78dee", "LibreTestnet"], ["384da888112027f0321850a169f737c33e53b388aad48b5adace4bab97f437e0", "XPR"], ["71ee83bcf52142d61019d95f9cc5427ba6a0d7ff8accd9e2088ae2abeaf3d3dd", "XPRTestnet"], ["4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11", "Telos"], ["1eaa0824707c8c16bd25145493bf062aecddfeb56c736f6ba6397f3195f33c9f", "TelosTestnet"], ["8fc6dce7942189f842170de953932b1f66693ad3788f766e777b6f9d22335c02", "UX"], ["aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906", "Vaulta"], ["1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4", "WAX"], ["f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12", "WAXTestnet"]]);
var chainLogos = /* @__PURE__ */ new Map([["21dcae42c0182200e93f954a074011f9048a7624c6fe81d3c9541a614a88bd1c", "https://assets.wharfkit.com/chain/fio.png"], ["b20901380af44ef59c5918439a1f9a41d83669020319a80574b804a5f95cbd7e", "https://assets.wharfkit.com/chain/fio.png"], ["2a02a0053e5a8cf73a56ba0fda11e4d92e0238a4a2aa74fccf46d5a910746840", "https://assets.wharfkit.com/chain/jungle.png"], ["73e4385a2708e6d7048834fbc1079f2fabb17b3c125b146af438971e90716c4d", "https://assets.wharfkit.com/chain/jungle.png"], ["38b1d7815474d0c60683ecbea321d723e83f5da6ae5f1c1f9fecc69d9ba96465", "https://assets.wharfkit.com/chain/libre.png"], ["b64646740308df2ee06c6b72f34c0f7fa066d940e831f752db2006fcc2b78dee", "https://assets.wharfkit.com/chain/libre.png"], ["384da888112027f0321850a169f737c33e53b388aad48b5adace4bab97f437e0", "https://assets.wharfkit.com/chain/xprnetwork.png"], ["71ee83bcf52142d61019d95f9cc5427ba6a0d7ff8accd9e2088ae2abeaf3d3dd", "https://assets.wharfkit.com/chain/xprnetwork.png"], ["4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11", "https://assets.wharfkit.com/chain/telos.png"], ["1eaa0824707c8c16bd25145493bf062aecddfeb56c736f6ba6397f3195f33c9f", "https://assets.wharfkit.com/chain/telos.png"], ["aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906", "https://assets.wharfkit.com/chain/vaulta.png"], ["8fc6dce7942189f842170de953932b1f66693ad3788f766e777b6f9d22335c02", "https://assets.wharfkit.com/chain/ux.png"], ["1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4", "https://assets.wharfkit.com/chain/wax.png"], ["f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12", "https://assets.wharfkit.com/chain/wax.png"]]);

export {
  Canceled,
  cancelable,
  ExplorerDefinition,
  Logo,
  TokenIdentifier,
  TokenMeta,
  TokenBalance,
  ChainDefinition,
  ChainNames,
  TelosAccountVoterInfo,
  TelosAccountObject,
  WAXAccountVoterInfo,
  WAXAccountObject,
  Chains,
  chainIdsToIndices,
  chainLogos
};
//# sourceMappingURL=chunk-2TATSEGQ.js.map
