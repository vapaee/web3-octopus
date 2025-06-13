import {
  ABI,
  ABIDecoder,
  ABIEncoder,
  Action,
  Authority,
  Bytes,
  Checksum256,
  Name,
  PermissionLevel,
  Serializer,
  Signature,
  Struct,
  TimePointSec,
  Transaction,
  TypeAlias,
  UInt16,
  UInt32,
  UInt8,
  Variant,
  isInstanceOf
} from "./chunk-ADGX27WK.js";
import {
  __async,
  __decorate,
  __spreadProps,
  __spreadValues
} from "./chunk-J75W5ZEG.js";

// node_modules/@wharfkit/signing-request/lib/signing-request.m.js
var baseCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
var lookup = new Uint8Array(256);
for (let i = 0; i < 62; i++) {
  lookup[baseCharset.charCodeAt(i)] = i;
}
lookup[43] = lookup[45] = 62;
lookup[47] = lookup[95] = 63;
function encode(data, urlSafe = true) {
  const byteLength = data.byteLength;
  const byteRemainder = byteLength % 3;
  const mainLength = byteLength - byteRemainder;
  const charset = baseCharset + (urlSafe ? "-_" : "+/");
  const parts = [];
  let a;
  let b;
  let c;
  let d;
  let chunk;
  for (let i = 0; i < mainLength; i += 3) {
    chunk = data[i] << 16 | data[i + 1] << 8 | data[i + 2];
    a = (chunk & 16515072) >> 18;
    b = (chunk & 258048) >> 12;
    c = (chunk & 4032) >> 6;
    d = chunk & 63;
    parts.push(charset[a] + charset[b] + charset[c] + charset[d]);
  }
  if (byteRemainder === 1) {
    chunk = data[mainLength];
    a = (chunk & 252) >> 2;
    b = (chunk & 3) << 4;
    parts.push(charset[a] + charset[b]);
  } else if (byteRemainder === 2) {
    chunk = data[mainLength] << 8 | data[mainLength + 1];
    a = (chunk & 64512) >> 10;
    b = (chunk & 1008) >> 4;
    c = (chunk & 15) << 2;
    parts.push(charset[a] + charset[b] + charset[c]);
  }
  return parts.join("");
}
function decode(input) {
  const byteLength = input.length * 0.75;
  const data = new Uint8Array(byteLength);
  let a;
  let b;
  let c;
  let d;
  let p = 0;
  for (let i = 0; i < input.length; i += 4) {
    a = lookup[input.charCodeAt(i)];
    b = lookup[input.charCodeAt(i + 1)];
    c = lookup[input.charCodeAt(i + 2)];
    d = lookup[input.charCodeAt(i + 3)];
    data[p++] = a << 2 | b >> 4;
    data[p++] = (b & 15) << 4 | c >> 2;
    data[p++] = (c & 3) << 6 | d & 63;
  }
  return data;
}
var base64u = Object.freeze({
  __proto__: null,
  encode,
  decode
});
var ChainName;
(function(ChainName2) {
  ChainName2[ChainName2["UNKNOWN"] = 0] = "UNKNOWN";
  ChainName2[ChainName2["EOS"] = 1] = "EOS";
  ChainName2[ChainName2["TELOS"] = 2] = "TELOS";
  ChainName2[ChainName2["JUNGLE"] = 3] = "JUNGLE";
  ChainName2[ChainName2["KYLIN"] = 4] = "KYLIN";
  ChainName2[ChainName2["WORBLI"] = 5] = "WORBLI";
  ChainName2[ChainName2["BOS"] = 6] = "BOS";
  ChainName2[ChainName2["MEETONE"] = 7] = "MEETONE";
  ChainName2[ChainName2["INSIGHTS"] = 8] = "INSIGHTS";
  ChainName2[ChainName2["BEOS"] = 9] = "BEOS";
  ChainName2[ChainName2["WAX"] = 10] = "WAX";
  ChainName2[ChainName2["PROTON"] = 11] = "PROTON";
  ChainName2[ChainName2["FIO"] = 12] = "FIO";
})(ChainName || (ChainName = {}));
var ChainId = class ChainId2 extends Checksum256 {
  static from(value) {
    if (isInstanceOf(value, this)) {
      return value;
    }
    if (typeof value === "number") {
      value = ChainIdLookup.get(value);
      if (!value) {
        throw new Error("Unknown chain id alias");
      }
    }
    return super.from(value);
  }
  get chainVariant() {
    const name = this.chainName;
    if (name !== ChainName.UNKNOWN) {
      return ChainIdVariant.from(["chain_alias", name]);
    }
    return ChainIdVariant.from(this);
  }
  get chainName() {
    const cid = this.hexString;
    for (const [n, id] of ChainIdLookup) {
      if (id === cid) {
        return n;
      }
    }
    return ChainName.UNKNOWN;
  }
};
ChainId = __decorate([TypeAlias("chain_id")], ChainId);
var ChainAlias = class ChainAlias2 extends UInt8 {
};
ChainAlias = __decorate([TypeAlias("chain_alias")], ChainAlias);
var ChainIdVariant = class ChainIdVariant2 extends Variant {
  get chainId() {
    if (isInstanceOf(this.value, ChainId)) {
      return this.value;
    }
    return ChainId.from(Number(this.value.value));
  }
};
ChainIdVariant = __decorate([Variant.type("variant_id", [ChainAlias, ChainId])], ChainIdVariant);
var ChainIdLookup = /* @__PURE__ */ new Map([[ChainName.EOS, "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"], [ChainName.TELOS, "4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11"], [ChainName.JUNGLE, "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473"], [ChainName.KYLIN, "5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191"], [ChainName.WORBLI, "73647cde120091e0a4b85bced2f3cfdb3041e266cbbe95cee59b73235a1b3b6f"], [ChainName.BOS, "d5a3d18fbb3c084e3b1f3fa98c21014b5f3db536cc15d08f9f6479517c6a3d86"], [ChainName.MEETONE, "cfe6486a83bad4962f232d48003b1824ab5665c36778141034d75e57b956e422"], [ChainName.INSIGHTS, "b042025541e25a472bffde2d62edd457b7e70cee943412b1ea0f044f88591664"], [ChainName.BEOS, "b912d19a6abd2b1b05611ae5be473355d64d95aeff0c09bedc8c166cd6468fe4"], [ChainName.WAX, "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4"], [ChainName.PROTON, "384da888112027f0321850a169f737c33e53b388aad48b5adace4bab97f437e0"], [ChainName.FIO, "21dcae42c0182200e93f954a074011f9048a7624c6fe81d3c9541a614a88bd1c"]]);
var RequestFlags_1;
var AccountName = class AccountName2 extends Name {
};
AccountName = __decorate([TypeAlias("account_name")], AccountName);
var PermissionName = class PermissionName2 extends Name {
};
PermissionName = __decorate([TypeAlias("permission_name")], PermissionName);
var IdentityV2 = class IdentityV22 extends Struct {
};
__decorate([Struct.field(PermissionLevel, {
  optional: true
})], IdentityV2.prototype, "permission", void 0);
IdentityV2 = __decorate([Struct.type("identity")], IdentityV2);
var IdentityV3 = class IdentityV32 extends Struct {
};
__decorate([Struct.field("name")], IdentityV3.prototype, "scope", void 0);
__decorate([Struct.field(PermissionLevel, {
  optional: true
})], IdentityV3.prototype, "permission", void 0);
IdentityV3 = __decorate([Struct.type("identity")], IdentityV3);
var RequestVariantV2 = class RequestVariantV22 extends Variant {
};
RequestVariantV2 = __decorate([Variant.type("variant_req", [Action, {
  type: Action,
  array: true
}, Transaction, IdentityV2])], RequestVariantV2);
var RequestVariantV3 = class RequestVariantV32 extends Variant {
};
RequestVariantV3 = __decorate([Variant.type("variant_req", [Action, {
  type: Action,
  array: true
}, Transaction, IdentityV3])], RequestVariantV3);
var RequestFlags = RequestFlags_1 = class RequestFlags2 extends UInt8 {
  get broadcast() {
    return (Number(this) & RequestFlags_1.broadcast) !== 0;
  }
  set broadcast(enabled) {
    this.setFlag(RequestFlags_1.broadcast, enabled);
  }
  get background() {
    return (Number(this) & RequestFlags_1.background) !== 0;
  }
  set background(enabled) {
    this.setFlag(RequestFlags_1.background, enabled);
  }
  setFlag(flag, enabled) {
    if (enabled) {
      this.value = UInt8.from(Number(this) | flag).value;
    } else {
      this.value = UInt8.from(Number(this) & ~flag).value;
    }
  }
};
RequestFlags.broadcast = 1 << 0;
RequestFlags.background = 1 << 1;
RequestFlags = RequestFlags_1 = __decorate([TypeAlias("request_flags")], RequestFlags);
var InfoPair = class InfoPair2 extends Struct {
};
__decorate([Struct.field("string")], InfoPair.prototype, "key", void 0);
__decorate([Struct.field("bytes")], InfoPair.prototype, "value", void 0);
InfoPair = __decorate([Struct.type("info_pair")], InfoPair);
var RequestDataV2 = class RequestDataV22 extends Struct {
};
__decorate([Struct.field(ChainIdVariant)], RequestDataV2.prototype, "chain_id", void 0);
__decorate([Struct.field(RequestVariantV2)], RequestDataV2.prototype, "req", void 0);
__decorate([Struct.field(RequestFlags)], RequestDataV2.prototype, "flags", void 0);
__decorate([Struct.field("string")], RequestDataV2.prototype, "callback", void 0);
__decorate([Struct.field(InfoPair, {
  array: true
})], RequestDataV2.prototype, "info", void 0);
RequestDataV2 = __decorate([Struct.type("signing_request")], RequestDataV2);
var RequestDataV3 = class RequestDataV32 extends Struct {
};
__decorate([Struct.field(ChainIdVariant)], RequestDataV3.prototype, "chain_id", void 0);
__decorate([Struct.field(RequestVariantV3)], RequestDataV3.prototype, "req", void 0);
__decorate([Struct.field(RequestFlags)], RequestDataV3.prototype, "flags", void 0);
__decorate([Struct.field("string")], RequestDataV3.prototype, "callback", void 0);
__decorate([Struct.field(InfoPair, {
  array: true
})], RequestDataV3.prototype, "info", void 0);
RequestDataV3 = __decorate([Struct.type("signing_request")], RequestDataV3);
var RequestSignature = class RequestSignature2 extends Struct {
};
__decorate([Struct.field("name")], RequestSignature.prototype, "signer", void 0);
__decorate([Struct.field("signature")], RequestSignature.prototype, "signature", void 0);
RequestSignature = __decorate([Struct.type("request_signature")], RequestSignature);
var IdentityProof_1;
var IdentityProof = IdentityProof_1 = class IdentityProof2 extends Struct {
  static from(value) {
    if (isInstanceOf(value, IdentityProof_1)) {
      return value;
    } else if (typeof value === "string") {
      return IdentityProof_1.fromString(value);
    } else {
      return super.from(value);
    }
  }
  /**
   * Create a new instance from an EOSIO authorization header string.
   * "EOSIO <base64payload>"
   */
  static fromString(string) {
    const parts = string.split(" ");
    if (parts.length !== 2 || parts[0] !== "EOSIO") {
      throw new Error("Invalid IdentityProof string");
    }
    const data = decode(parts[1]);
    return Serializer.decode({
      data,
      type: IdentityProof_1
    });
  }
  /** Create a new instance from a callback payload. */
  static fromPayload(payload, options = {}) {
    const request = SigningRequest.from(payload.req, options);
    if (!(request.version >= 3 && request.isIdentity())) {
      throw new Error("Not an identity request");
    }
    return this.from({
      chainId: payload.cid || request.getChainId(),
      scope: request.getIdentityScope(),
      expiration: payload.ex,
      signer: {
        actor: payload.sa,
        permission: payload.sp
      },
      signature: payload.sig
    });
  }
  /**
   * Transaction this proof resolves to.
   * @internal
   */
  get transaction() {
    const action = Action.from({
      account: "",
      name: "identity",
      authorization: [this.signer],
      data: IdentityV3.from({
        scope: this.scope,
        permission: this.signer
      })
    });
    return Transaction.from({
      ref_block_num: 0,
      ref_block_prefix: 0,
      expiration: this.expiration,
      actions: [action]
    });
  }
  /**
   * Recover the public key that signed this proof.
   */
  recover() {
    return this.signature.recoverDigest(this.transaction.signingDigest(this.chainId));
  }
  /**
   * Verify that given authority signed this proof.
   * @param auth The accounts signing authority.
   * @param currentTime Time to verify expiry against, if unset will use system time.
   */
  verify(auth, currentTime) {
    const now = TimePointSec.from(currentTime || /* @__PURE__ */ new Date()).toMilliseconds();
    return now < this.expiration.toMilliseconds() && Authority.from(auth).hasPermission(this.recover());
  }
  /**
   * Encode the proof to an `EOSIO` auth header string.
   */
  toString() {
    const data = Serializer.encode({
      object: this
    });
    return `EOSIO ${encode(data.array, false)}`;
  }
};
__decorate([Struct.field(ChainId)], IdentityProof.prototype, "chainId", void 0);
__decorate([Struct.field(Name)], IdentityProof.prototype, "scope", void 0);
__decorate([Struct.field(TimePointSec)], IdentityProof.prototype, "expiration", void 0);
__decorate([Struct.field(PermissionLevel)], IdentityProof.prototype, "signer", void 0);
__decorate([Struct.field(Signature)], IdentityProof.prototype, "signature", void 0);
IdentityProof = IdentityProof_1 = __decorate([Struct.type("identity_proof")], IdentityProof);
var ProtocolVersion = 3;
var PlaceholderName = Name.from("............1");
var PlaceholderPermission = Name.from("............2");
var PlaceholderAuth = PermissionLevel.from({
  actor: PlaceholderName,
  permission: PlaceholderPermission
});
var SigningRequest = class _SigningRequest {
  /**
   * Create a new signing request.
   * Normally not used directly, see the `create` and `from` class methods.
   */
  constructor(version, data, zlib, abiProvider, signature) {
    if (data.flags.broadcast && data.req.variantName === "identity") {
      throw new Error("Invalid request (identity request cannot be broadcast)");
    }
    this.version = version;
    this.data = data;
    this.zlib = zlib;
    this.abiProvider = abiProvider;
    this.signature = signature;
  }
  /** Return the identity ABI for given version. */
  static identityAbi(version) {
    const abi = Serializer.synthesize(this.identityType(version));
    abi.actions = [{
      name: "identity",
      type: "identity",
      ricardian_contract: ""
    }];
    return abi;
  }
  /** Return the ABISerializableType identity type for given version. */
  static identityType(version) {
    return version === 2 ? IdentityV2 : IdentityV3;
  }
  /** Return the ABISerializableType storage type for given version. */
  static storageType(version) {
    return version === 2 ? RequestDataV2 : RequestDataV3;
  }
  /** Create a new signing request. */
  static create(_0) {
    return __async(this, arguments, function* (args, options = {}) {
      let actions;
      if (args.action) {
        actions = [args.action];
      } else if (args.actions) {
        actions = args.actions;
      } else if (args.transaction) {
        actions = args.transaction.actions || [];
      } else {
        actions = [];
      }
      const requiredAbis = actions.filter((action) => !Bytes.isBytes(action.data) && action.data.constructor.abiName === void 0).map((action) => Name.from(action.account));
      const abis = {};
      if (requiredAbis.length > 0) {
        const provider = options.abiProvider;
        if (!provider) {
          throw new Error("Missing abi provider");
        }
        const accountAbis = yield Promise.all(requiredAbis.map((account) => provider.getAbi(account)));
        for (const [idx, abi] of accountAbis.entries()) {
          abis[requiredAbis[idx].toString()] = abi;
        }
      }
      return this.createSync(args, options, abis);
    });
  }
  /**
   * Synchronously create a new signing request.
   * @throws If an un-encoded action with no abi def is encountered.
   */
  static createSync(args, options = {}, abis = {}) {
    let version = 2;
    const data = {};
    const encode2 = (action) => encodeAction(action, abis);
    if (args.chainId === null) {
      version = 3;
    }
    if (args.identity !== void 0) {
      if (args.identity.scope) {
        version = 3;
      }
      data.req = ["identity", this.identityType(version).from(args.identity)];
    } else if (args.action && !args.actions && !args.transaction) {
      data.req = ["action", encode2(args.action)];
    } else if (args.actions && !args.action && !args.transaction) {
      if (args.actions.length === 1) {
        data.req = ["action", encode2(args.actions[0])];
      } else {
        data.req = ["action[]", args.actions.map(encode2)];
      }
    } else if (args.transaction && !args.action && !args.actions) {
      const tx = args.transaction;
      if (tx.expiration === void 0) {
        tx.expiration = "1970-01-01T00:00:00.000";
      }
      if (tx.ref_block_num === void 0) {
        tx.ref_block_num = 0;
      }
      if (tx.ref_block_prefix === void 0) {
        tx.ref_block_prefix = 0;
      }
      if (tx.context_free_actions === void 0) {
        tx.context_free_actions = [];
      }
      if (tx.transaction_extensions === void 0) {
        tx.transaction_extensions = [];
      }
      if (tx.delay_sec === void 0) {
        tx.delay_sec = 0;
      }
      if (tx.max_cpu_usage_ms === void 0) {
        tx.max_cpu_usage_ms = 0;
      }
      if (tx.max_net_usage_words === void 0) {
        tx.max_net_usage_words = 0;
      }
      if (tx.actions === void 0) {
        tx.actions = [];
      }
      if (tx.context_free_actions === void 0) {
        tx.context_free_actions = [];
      }
      tx.actions = tx.actions.map(encode2);
      data.req = ["transaction", tx];
    } else {
      throw new TypeError("Invalid arguments: Must have exactly one of action, actions or transaction");
    }
    if (args.chainId === null) {
      data.chain_id = ChainIdVariant.from(["chain_alias", 0]);
    } else {
      data.chain_id = ChainId.from(args.chainId || ChainName.EOS).chainVariant;
    }
    const flags = RequestFlags.from(0);
    let callback = "";
    flags.broadcast = args.broadcast !== void 0 ? args.broadcast : data.req[0] !== "identity";
    if (typeof args.callback === "string") {
      callback = args.callback;
    } else if (typeof args.callback === "object") {
      callback = args.callback.url;
      flags.background = args.callback.background || false;
    }
    data.flags = flags;
    data.callback = callback;
    data.info = [];
    if (typeof args.info === "object") {
      for (const key in args.info) {
        const isOwn = Object.prototype.hasOwnProperty.call(args.info, key);
        if (isOwn) {
          let value = args.info[key];
          if (typeof value === "string") {
            value = Bytes.from(value, "utf8");
          } else if (!(value instanceof Bytes)) {
            value = Serializer.encode({
              object: value
            });
          }
          data.info.push({
            key,
            value
          });
        }
      }
    }
    if (args.chainIds && args.chainId === null) {
      const ids = args.chainIds.map((id) => ChainId.from(id).chainVariant);
      data.info.push({
        key: "chain_ids",
        value: Serializer.encode({
          object: ids,
          type: {
            type: ChainIdVariant,
            array: true
          }
        })
      });
    }
    const req = new _SigningRequest(version, this.storageType(version).from(data), options.zlib, options.abiProvider);
    if (options.signatureProvider) {
      req.sign(options.signatureProvider);
    }
    return req;
  }
  /** Creates an identity request. */
  static identity(args, options = {}) {
    let permission = {
      actor: args.account || PlaceholderName,
      permission: args.permission || PlaceholderPermission
    };
    if (permission.actor === PlaceholderName && permission.permission === PlaceholderPermission) {
      permission = void 0;
    }
    return this.createSync(__spreadProps(__spreadValues({}, args), {
      identity: {
        permission,
        scope: args.scope
      },
      broadcast: false
    }), options);
  }
  /**
   * Create a request from a chain id and serialized transaction.
   * @param chainId The chain id where the transaction is valid.
   * @param serializedTransaction The serialized transaction.
   * @param options Creation options.
   */
  static fromTransaction(chainId, serializedTransaction, options = {}) {
    const id = ChainId.from(chainId);
    serializedTransaction = Bytes.from(serializedTransaction);
    const encoder = new ABIEncoder();
    encoder.writeByte(2);
    encoder.writeArray(Serializer.encode({
      object: id.chainVariant
    }).array);
    encoder.writeByte(2);
    encoder.writeArray(Bytes.from(serializedTransaction).array);
    encoder.writeByte(RequestFlags.broadcast);
    encoder.writeByte(0);
    encoder.writeByte(0);
    return _SigningRequest.fromData(encoder.getData(), options);
  }
  /** Creates a signing request from encoded `esr:` uri string. */
  static from(uri, options = {}) {
    if (typeof uri !== "string") {
      throw new Error("Invalid request uri");
    }
    const [, path] = uri.split(":");
    const data = decode(path.startsWith("//") ? path.slice(2) : path);
    return _SigningRequest.fromData(data, options);
  }
  static fromData(data, options = {}) {
    data = Bytes.from(data);
    const header = data.array[0];
    const version = header & ~(1 << 7);
    if (version !== 2 && version !== 3) {
      throw new Error("Unsupported protocol version");
    }
    let payload = data.droppingFirst(1);
    if ((header & 1 << 7) !== 0) {
      if (!options.zlib) {
        throw new Error("Compressed URI needs zlib");
      }
      payload = Bytes.from(options.zlib.inflateRaw(payload.array));
    }
    const decoder = new ABIDecoder(payload.array);
    const req = Serializer.decode({
      data: decoder,
      type: this.storageType(version)
    });
    let sig;
    if (decoder.canRead()) {
      sig = Serializer.decode({
        data: decoder,
        type: RequestSignature
      });
    }
    return new _SigningRequest(version, req, options.zlib, options.abiProvider, sig);
  }
  /**
   * Sign the request, mutating.
   * @param signatureProvider The signature provider that provides a signature for the signer.
   */
  sign(signatureProvider) {
    const message = this.getSignatureDigest();
    this.signature = RequestSignature.from(signatureProvider.sign(message));
  }
  /**
   * Get the signature digest for this request.
   */
  getSignatureDigest() {
    const prefix = [this.version, 114, 101, 113, 117, 101, 115, 116];
    return Checksum256.hash(Bytes.from(prefix).appending(this.getData()));
  }
  /**
   * Set the signature data for this request, mutating.
   * @param signer Account name of signer.
   * @param signature The signature string.
   */
  setSignature(signer, signature) {
    this.signature = RequestSignature.from({
      signer,
      signature
    });
  }
  /**
   * Set the request callback, mutating.
   * @param url Where the callback should be sent.
   * @param background Whether the callback should be sent in the background.
   */
  setCallback(url, background) {
    this.data.callback = url;
    this.data.flags.background = background;
  }
  /**
   * Set broadcast flag.
   * @param broadcast Whether the transaction should be broadcast by receiver.
   */
  setBroadcast(broadcast) {
    this.data.flags.broadcast = broadcast;
  }
  /**
   * Encode this request into an `esr:` uri.
   * @argument compress Whether to compress the request data using zlib,
   *                    defaults to true if omitted and zlib is present;
   *                    otherwise false.
   * @argument slashes Whether add slashes after the protocol scheme, i.e. `esr://`.
   *                   Defaults to true.
   * @returns An esr uri string.
   */
  encode(compress, slashes, scheme = "esr:") {
    const shouldCompress = compress !== void 0 ? compress : this.zlib !== void 0;
    if (shouldCompress && this.zlib === void 0) {
      throw new Error("Need zlib to compress");
    }
    let header = this.version;
    const data = this.getData();
    const sigData = this.getSignatureData();
    let array = new Uint8Array(data.byteLength + sigData.byteLength);
    array.set(data, 0);
    array.set(sigData, data.byteLength);
    if (shouldCompress) {
      const deflated = this.zlib.deflateRaw(array);
      if (array.byteLength > deflated.byteLength) {
        header |= 1 << 7;
        array = deflated;
      }
    }
    const out = new Uint8Array(1 + array.byteLength);
    out[0] = header;
    out.set(array, 1);
    if (slashes !== false) {
      scheme += "//";
    }
    return scheme + encode(out);
  }
  /** Get the request data without header or signature. */
  getData() {
    return Serializer.encode({
      object: this.data
    }).array;
  }
  /** Get signature data, returns an empty array if request is not signed. */
  getSignatureData() {
    if (!this.signature) {
      return new Uint8Array(0);
    }
    return Serializer.encode({
      object: this.signature
    }).array;
  }
  /** ABI definitions required to resolve request. */
  getRequiredAbis() {
    return this.getRawActions().filter((action) => !isIdentity(action)).map((action) => action.account).filter((value, index, self) => self.indexOf(value) === index);
  }
  /** Whether TaPoS values are required to resolve request. */
  requiresTapos() {
    const tx = this.getRawTransaction();
    return !this.isIdentity() && !hasTapos(tx);
  }
  /** Resolve required ABI definitions. */
  fetchAbis(abiProvider) {
    return __async(this, null, function* () {
      const required = this.getRequiredAbis();
      if (required.length > 0) {
        const provider = abiProvider || this.abiProvider;
        if (!provider) {
          throw new Error("Missing ABI provider");
        }
        const abis = /* @__PURE__ */ new Map();
        yield Promise.all(required.map((account) => __async(this, null, function* () {
          abis.set(account.toString(), ABI.from(yield provider.getAbi(account)));
        })));
        return abis;
      } else {
        return /* @__PURE__ */ new Map();
      }
    });
  }
  /**
   * Decode raw actions actions to object representations.
   * @param abis ABI defenitions required to decode all actions.
   * @param signer Placeholders in actions will be resolved to signer if set.
   */
  resolveActions(abis, signer) {
    return this.getRawActions().map((rawAction) => {
      let abi;
      if (isIdentity(rawAction)) {
        abi = this.constructor.identityAbi(this.version);
      } else {
        const rawAbi = abis.get(rawAction.account.toString());
        if (!rawAbi) {
          throw new Error(`Missing ABI definition for ${rawAction.account}`);
        }
        abi = ABI.from(rawAbi);
      }
      const type = abi.getActionType(rawAction.name);
      if (!type) {
        throw new Error(`Missing type for action ${rawAction.account}:${rawAction.name} in ABI`);
      }
      let data = rawAction.decodeData(abi);
      let authorization = rawAction.authorization;
      if (signer) {
        const signerPerm = PermissionLevel.from(signer);
        const resolve = (value) => {
          if (value instanceof Name) {
            if (value.equals(PlaceholderName)) {
              return signerPerm.actor;
            } else if (value.equals(PlaceholderPermission)) {
              return signerPerm.permission;
            } else {
              return value;
            }
          } else if (Array.isArray(value)) {
            return value.map(resolve);
          } else if (typeof value === "object" && value !== null) {
            for (const key of Object.keys(value)) {
              value[key] = resolve(value[key]);
            }
            return value;
          } else {
            return value;
          }
        };
        data = resolve(data);
        authorization = authorization.map((auth) => {
          let {
            actor,
            permission
          } = auth;
          if (actor.equals(PlaceholderName)) {
            actor = signerPerm.actor;
          }
          if (permission.equals(PlaceholderPermission)) {
            permission = signerPerm.permission;
          }
          if (permission.equals(PlaceholderName)) {
            permission = signerPerm.permission;
          }
          return PermissionLevel.from({
            actor,
            permission
          });
        });
      }
      return __spreadProps(__spreadValues({}, rawAction), {
        authorization,
        data
      });
    });
  }
  resolveTransaction(abis, signer, ctx = {}) {
    const tx = this.getRawTransaction();
    if (!this.isIdentity() && !hasTapos(tx)) {
      if (ctx.expiration !== void 0 && ctx.ref_block_num !== void 0 && ctx.ref_block_prefix !== void 0) {
        tx.expiration = TimePointSec.from(ctx.expiration);
        tx.ref_block_num = UInt16.from(ctx.ref_block_num, "truncate");
        tx.ref_block_prefix = UInt32.from(ctx.ref_block_prefix);
      } else if (ctx.block_num !== void 0 && ctx.ref_block_prefix !== void 0 && ctx.timestamp !== void 0) {
        tx.expiration = expirationTime(ctx.timestamp, ctx.expire_seconds);
        tx.ref_block_num = UInt16.from(ctx.block_num, "truncate");
        tx.ref_block_prefix = UInt32.from(ctx.ref_block_prefix);
      } else {
        throw new Error("Invalid transaction context, need either a reference block or explicit TaPoS values");
      }
    } else if (this.isIdentity() && this.version > 2) {
      tx.expiration = ctx.expiration ? TimePointSec.from(ctx.expiration) : expirationTime(ctx.timestamp, ctx.expire_seconds);
    }
    const actions = this.resolveActions(abis, signer);
    const context_free_actions = tx.context_free_actions;
    return __spreadProps(__spreadValues({}, tx), {
      context_free_actions,
      actions
    });
  }
  resolve(abis, signer, ctx = {}) {
    const tx = this.resolveTransaction(abis, signer, ctx);
    const actions = tx.actions.map((action) => {
      let abi;
      if (isIdentity(action)) {
        abi = this.constructor.identityAbi(this.version);
      } else {
        abi = abis.get(action.account.toString());
      }
      if (!abi) {
        throw new Error(`Missing ABI definition for ${action.account}`);
      }
      const type = abi.getActionType(action.name);
      const data = Serializer.encode({
        object: action.data,
        type,
        abi
      });
      return Action.from(__spreadProps(__spreadValues({}, action), {
        data
      }));
    });
    const transaction = Transaction.from(__spreadProps(__spreadValues({}, tx), {
      actions
    }));
    let chainId;
    if (this.isMultiChain()) {
      if (!ctx.chainId) {
        throw new Error("Missing chosen chain ID for multi-chain request");
      }
      chainId = ChainId.from(ctx.chainId);
      const ids = this.getChainIds();
      if (ids && !ids.some((id) => chainId.equals(id))) {
        throw new Error("Trying to resolve for chain ID not defined in request");
      }
    } else {
      chainId = this.getChainId();
    }
    return new ResolvedSigningRequest(this, PermissionLevel.from(signer), transaction, tx, chainId);
  }
  /**
   * Get the id of the chain where this request is valid.
   * @returns The 32-byte chain id as hex encoded string.
   */
  getChainId() {
    return this.data.chain_id.chainId;
  }
  /**
   * Chain IDs this request is valid for, only valid for multi chain requests. Value of `null` when `isMultiChain` is true denotes any chain.
   */
  getChainIds() {
    if (!this.isMultiChain()) {
      return null;
    }
    const ids = this.getInfoKey("chain_ids", {
      type: ChainIdVariant,
      array: true
    });
    if (ids) {
      return ids.map((id) => id.chainId);
    }
    return null;
  }
  /**
   * Set chain IDs this request is valid for, only considered for multi chain requests.
   */
  setChainIds(ids) {
    const value = ids.map((id) => ChainId.from(id).chainVariant);
    this.setInfoKey("chain_ids", value, {
      type: ChainIdVariant,
      array: true
    });
  }
  /**
   * True if chainId is set to chain alias `0` which indicates that the request is valid for any chain.
   */
  isMultiChain() {
    return this.data.chain_id.variantIdx === 0 && this.data.chain_id.value.equals(ChainName.UNKNOWN);
  }
  /** Return the actions in this request with action data encoded. */
  getRawActions() {
    const req = this.data.req;
    switch (req.variantName) {
      case "action":
        return [req.value];
      case "action[]":
        return req.value;
      case "identity": {
        if (this.version === 2) {
          const id = req.value;
          let data = "0101000000000000000200000000000000";
          let authorization = [PlaceholderAuth];
          if (id.permission) {
            data = Serializer.encode({
              object: id
            });
            authorization = [id.permission];
          }
          const action = Action.from({
            account: "",
            name: "identity",
            authorization,
            data
          });
          delete action.abi;
          return [action];
        } else {
          let {
            scope,
            permission
          } = req.value;
          if (!permission) {
            permission = PlaceholderAuth;
          }
          const data = Serializer.encode({
            object: {
              scope,
              permission
            },
            type: IdentityV3
          });
          const action = Action.from({
            account: "",
            name: "identity",
            authorization: [permission],
            data
          });
          delete action.abi;
          return [action];
        }
      }
      case "transaction":
        return req.value.actions;
      default:
        throw new Error("Invalid signing request data");
    }
  }
  /** Unresolved transaction. */
  getRawTransaction() {
    const req = this.data.req;
    switch (req.variantName) {
      case "transaction":
        return Transaction.from(__spreadValues({}, req.value));
      case "action":
      case "action[]":
      case "identity":
        return Transaction.from({
          actions: this.getRawActions(),
          context_free_actions: [],
          transaction_extensions: [],
          expiration: "1970-01-01T00:00:00.000",
          ref_block_num: 0,
          ref_block_prefix: 0,
          max_cpu_usage_ms: 0,
          max_net_usage_words: 0,
          delay_sec: 0
        });
      default:
        throw new Error("Invalid signing request data");
    }
  }
  /** Whether the request is an identity request. */
  isIdentity() {
    return this.data.req.variantName === "identity";
  }
  /** Whether the request should be broadcast by signer. */
  shouldBroadcast() {
    if (this.isIdentity()) {
      return false;
    }
    return this.data.flags.broadcast;
  }
  /**
   * Present if the request is an identity request and requests a specific account.
   * @note This returns `nil` unless a specific identity has been requested,
   *       use `isIdentity` to check id requests.
   */
  getIdentity() {
    if (!this.isIdentity()) {
      return null;
    }
    const id = this.data.req.value;
    if (id.permission && !id.permission.actor.equals(PlaceholderName)) {
      return id.permission.actor;
    }
    return null;
  }
  /**
   * Present if the request is an identity request and requests a specific permission.
   * @note This returns `nil` unless a specific permission has been requested,
   *       use `isIdentity` to check id requests.
   */
  getIdentityPermission() {
    if (!this.isIdentity()) {
      return null;
    }
    const id = this.data.req.value;
    if (id.permission && !id.permission.permission.equals(PlaceholderPermission)) {
      return id.permission.permission;
    }
    return null;
  }
  /**
   * Present if the request is an identity request and requests a specific permission.
   * @note This returns `nil` unless a specific permission has been requested,
   *       use `isIdentity` to check id requests.
   */
  getIdentityScope() {
    if (!this.isIdentity() || this.version <= 2) {
      return null;
    }
    const id = this.data.req.value;
    return id.scope;
  }
  /** Get raw info dict */
  getRawInfo() {
    const rv = {};
    for (const {
      key,
      value
    } of this.data.info) {
      rv[key] = value;
    }
    return rv;
  }
  getRawInfoKey(key) {
    const pair = this.data.info.find((pair2) => pair2.key === key);
    if (pair) {
      return pair.value;
    }
  }
  setRawInfoKey(key, value) {
    let pair = this.data.info.find((pair2) => pair2.key === key);
    if (!pair) {
      pair = InfoPair.from({
        key,
        value
      });
      this.data.info.push(pair);
    } else {
      pair.value = Bytes.from(value);
    }
  }
  /** Set a metadata key. */
  setInfoKey(key, object, type) {
    let data;
    if (typeof object === "string" && !type) {
      data = Bytes.from(object, "utf8");
    } else {
      data = Serializer.encode({
        object,
        type
      });
    }
    this.setRawInfoKey(key, data);
  }
  getInfoKey(key, type) {
    const data = this.getRawInfoKey(key);
    if (data) {
      if (type) {
        return Serializer.decode({
          data,
          type
        });
      } else {
        return data.utf8String;
      }
    }
  }
  /** Return a deep copy of this request. */
  clone() {
    let signature;
    if (this.signature) {
      signature = RequestSignature.from(JSON.parse(JSON.stringify(this.signature)));
    }
    const RequestData = this.constructor.storageType(this.version);
    const data = RequestData.from(JSON.parse(JSON.stringify(this.data)));
    return new _SigningRequest(this.version, data, this.zlib, this.abiProvider, signature);
  }
  // Convenience methods.
  toString() {
    return this.encode();
  }
  toJSON() {
    return this.encode();
  }
};
var ResolvedSigningRequest = class {
  constructor(request, signer, transaction, resolvedTransaction, chainId) {
    this.request = request;
    this.signer = signer;
    this.transaction = transaction;
    this.resolvedTransaction = resolvedTransaction;
    this.chainId = chainId;
  }
  /** Recreate a resolved request from a callback payload. */
  static fromPayload(_0) {
    return __async(this, arguments, function* (payload, options = {}) {
      const request = SigningRequest.from(payload.req, options);
      const abis = yield request.fetchAbis();
      return request.resolve(abis, {
        actor: payload.sa,
        permission: payload.sp
      }, {
        ref_block_num: payload.rbn,
        ref_block_prefix: payload.rid,
        expiration: payload.ex,
        chainId: payload.cid || request.getChainId()
      });
    });
  }
  get serializedTransaction() {
    return Serializer.encode({
      object: this.transaction
    }).array;
  }
  get signingDigest() {
    return this.transaction.signingDigest(this.chainId);
  }
  get signingData() {
    return this.transaction.signingData(this.chainId);
  }
  getCallback(signatures, blockNum) {
    const {
      callback,
      flags
    } = this.request.data;
    if (!callback || callback.length === 0) {
      return null;
    }
    if (!signatures || signatures.length === 0) {
      throw new Error("Must have at least one signature to resolve callback");
    }
    const sigs = signatures.map((sig) => Signature.from(sig));
    const payload = {
      sig: String(sigs[0]),
      tx: String(this.transaction.id),
      rbn: String(this.transaction.ref_block_num),
      rid: String(this.transaction.ref_block_prefix),
      ex: String(this.transaction.expiration),
      req: this.request.encode(),
      sa: String(this.signer.actor),
      sp: String(this.signer.permission),
      cid: String(this.chainId)
    };
    for (const [n, sig] of sigs.slice(1).entries()) {
      payload[`sig${n}`] = String(sig);
    }
    if (blockNum) {
      payload.bn = String(UInt32.from(blockNum));
    }
    const url = callback.replace(/({{([a-z0-9]+)}})/g, (_1, _2, m) => {
      return payload[m] || "";
    });
    return {
      background: flags.background,
      payload,
      url
    };
  }
  getIdentityProof(signature) {
    if (!this.request.isIdentity()) {
      throw new Error("Not a identity request");
    }
    return IdentityProof.from({
      chainId: this.chainId,
      scope: this.request.getIdentityScope(),
      expiration: this.transaction.expiration,
      signer: this.signer,
      signature
    });
  }
};
function encodeAction(action, abis) {
  if (Bytes.isBytes(action.data) || action.data.constructor.abiName !== void 0) {
    return Action.from(action);
  }
  const abi = abis[String(Name.from(action.account))];
  if (!abi) {
    throw new Error(`Missing ABI for ${action.account}`);
  }
  const data = Action.from(action, abi);
  delete data.abi;
  return data;
}
function isIdentity(action) {
  const account = Name.from(action.account);
  const name = Name.from(action.name);
  return account.rawValue.equals(0) && name.equals("identity");
}
function hasTapos(tx) {
  return !(tx.expiration.equals(0) && tx.ref_block_num.equals(0) && tx.ref_block_prefix.equals(0));
}
function expirationTime(timestamp, expireSeconds = 60) {
  const ts = TimePointSec.from(timestamp || /* @__PURE__ */ new Date());
  const exp = UInt32.from(expireSeconds);
  return TimePointSec.fromInteger(ts.value.adding(exp));
}

// node_modules/@wharfkit/abicache/lib/abicache.m.js
var ABICache = class {
  constructor(client) {
    this.client = client;
    this.cache = /* @__PURE__ */ new Map();
    this.pending = /* @__PURE__ */ new Map();
  }
  getAbi(account) {
    return __async(this, null, function* () {
      const key = String(account);
      let record = this.cache.get(key);
      if (!record) {
        let getAbi = this.pending.get(key);
        if (!getAbi) {
          getAbi = this.client.v1.chain.get_raw_abi(account);
          this.pending.set(key, getAbi);
        }
        const response = yield getAbi;
        this.pending.delete(key);
        if (response.abi) {
          record = ABI.from(response.abi);
          this.cache.set(key, record);
        } else {
          throw new Error(`ABI for ${key} could not be loaded.`);
        }
      }
      return record;
    });
  }
  setAbi(account, abiDef, merge = false) {
    const key = String(account);
    const abi = ABI.from(abiDef);
    const existing = this.cache.get(key);
    if (merge && existing) {
      this.cache.set(key, ABI.from({
        action_results: mergeAndDeduplicate(existing.action_results, abi.action_results),
        types: mergeAndDeduplicate(existing.types, abi.types, "new_type_name"),
        structs: mergeAndDeduplicate(existing.structs, abi.structs),
        actions: mergeAndDeduplicate(existing.actions, abi.actions),
        tables: mergeAndDeduplicate(existing.tables, abi.tables),
        ricardian_clauses: mergeAndDeduplicate(existing.ricardian_clauses, abi.ricardian_clauses, "id"),
        variants: mergeAndDeduplicate(existing.variants, abi.variants),
        version: abi.version
      }));
    } else {
      this.cache.set(key, abi);
    }
  }
};
function mergeAndDeduplicate(array1, array2, byField = "name") {
  return array2.reduce((acc, current) => {
    if (!acc.some((obj) => String(obj[byField]) === String(current[byField]))) {
      acc.push(current);
    }
    return acc;
  }, array1.slice());
}

export {
  base64u,
  ChainName,
  ChainId,
  ChainAlias,
  ChainIdVariant,
  AccountName,
  PermissionName,
  IdentityV2,
  IdentityV3,
  RequestVariantV2,
  RequestVariantV3,
  RequestFlags,
  InfoPair,
  RequestDataV2,
  RequestDataV3,
  RequestSignature,
  IdentityProof,
  ProtocolVersion,
  PlaceholderName,
  PlaceholderPermission,
  PlaceholderAuth,
  SigningRequest,
  ResolvedSigningRequest,
  ABICache
};
/*! Bundled license information:

@wharfkit/signing-request/lib/signing-request.m.js:
  (**
   * EOSIO Signing Request v3.2.0
   * https://github.com/greymass/eosio-signing-request
   *
   * @license
   * Copyright © 2021 Greymass Inc.
   * 
   * Permission is hereby granted, free of charge, to any person
   * obtaining a copy of this software and associated documentation
   * files (the “Software”), to deal in the Software without
   * restriction, including without limitation the rights to use,
   * copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the
   * Software is furnished to do so, subject to the following
   * conditions:
   * 
   * The above copyright notice and this permission notice shall be
   * included in all copies or substantial portions of the Software.
   * 
   * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
   * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
   * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
   * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
   * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
   * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
   * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
   * OTHER DEALINGS IN THE SOFTWARE.
   * 
   * YOU ACKNOWLEDGE THAT THIS SOFTWARE IS NOT DESIGNED, LICENSED OR
   * INTENDED FOR USE IN THE DESIGN, CONSTRUCTION, OPERATION OR
   * MAINTENANCE OF ANY MILITARY FACILITY.
   *)
*/
//# sourceMappingURL=chunk-IG4OCRBK.js.map
