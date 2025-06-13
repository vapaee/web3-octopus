import {
  ChainDefinition,
  Logo
} from "./chunk-2TATSEGQ.js";
import {
  ABICache,
  ChainId,
  RequestDataV2,
  RequestDataV3,
  RequestSignature,
  ResolvedSigningRequest,
  SigningRequest
} from "./chunk-IG4OCRBK.js";
import {
  APIClient,
  Action,
  Checksum256,
  FetchProvider,
  Name,
  PermissionLevel,
  Serializer,
  SignedTransaction,
  Struct,
  Transaction,
  pako
} from "./chunk-ADGX27WK.js";
import {
  __async,
  __decorate,
  __spreadProps,
  __spreadValues
} from "./chunk-J75W5ZEG.js";

// node_modules/@wharfkit/session/lib/session.m.js
var LoginHookTypes;
(function(LoginHookTypes2) {
  LoginHookTypes2["beforeLogin"] = "beforeLogin";
  LoginHookTypes2["afterLogin"] = "afterLogin";
})(LoginHookTypes || (LoginHookTypes = {}));
var LoginContext = class {
  constructor(options) {
    this.arbitrary = {};
    this.chains = [];
    this.hooks = {
      afterLogin: [],
      beforeLogin: []
    };
    this.uiRequirements = {
      requiresChainSelect: true,
      requiresPermissionSelect: true,
      requiresPermissionEntry: false,
      requiresWalletSelect: true
    };
    this.walletPlugins = [];
    this.appName = String(options.appName);
    if (options.arbitrary) {
      this.arbitrary = options.arbitrary;
    }
    if (options.chains) {
      this.chains = options.chains;
    }
    if (options.chain) {
      this.chain = options.chain;
    }
    this.fetch = options.fetch;
    this.permissionLevel = options.permissionLevel;
    this.walletPlugins = options.walletPlugins || [];
    this.ui = options.ui;
    options.loginPlugins?.forEach((plugin) => {
      plugin.register(this);
    });
  }
  addHook(t, hook) {
    this.hooks[t].push(hook);
  }
  getClient(chain) {
    return new APIClient({
      provider: new FetchProvider(chain.url, {
        fetch: this.fetch
      })
    });
  }
  get esrOptions() {
    return {
      zlib: pako
    };
  }
};
var AbstractLoginPlugin = class {
};
var BaseLoginPlugin = class extends AbstractLoginPlugin {
  register() {
  }
};
var TransactHookTypes;
(function(TransactHookTypes2) {
  TransactHookTypes2["beforeSign"] = "beforeSign";
  TransactHookTypes2["afterSign"] = "afterSign";
  TransactHookTypes2["afterBroadcast"] = "afterBroadcast";
})(TransactHookTypes || (TransactHookTypes = {}));
var TransactContext = class {
  constructor(options) {
    this.hooks = {
      afterBroadcast: [],
      afterSign: [],
      beforeSign: []
    };
    this.abiCache = options.abiCache;
    this.appName = String(options.appName);
    this.chain = options.chain;
    this.client = options.client;
    this.createRequest = options.createRequest;
    this.fetch = options.fetch;
    this.permissionLevel = options.permissionLevel;
    if (options.storage) {
      this.storage = options.storage;
    }
    this.transactPluginsOptions = options.transactPluginsOptions || {};
    this.ui = options.ui;
    options.transactPlugins?.forEach((plugin) => {
      plugin.register(this);
    });
  }
  get accountName() {
    return this.permissionLevel.actor;
  }
  get permissionName() {
    return this.permissionLevel.permission;
  }
  get esrOptions() {
    return {
      abiProvider: this.abiCache,
      zlib: pako
    };
  }
  addHook(t, hook) {
    switch (t) {
      case TransactHookTypes.beforeSign: {
        this.hooks[t].push(hook);
        break;
      }
      case TransactHookTypes.afterSign:
      case TransactHookTypes.afterBroadcast: {
        this.hooks[t].push(hook);
        break;
      }
    }
  }
  getInfo() {
    return __async(this, null, function* () {
      let info = this.info;
      if (this.info) {
        info = this.info;
      } else {
        this.info = info = yield this.client.v1.chain.get_info();
      }
      return info;
    });
  }
  resolve(request, expireSeconds = 120) {
    return __async(this, null, function* () {
      let resolveArgs = {
        chainId: this.chain.id
      };
      if (request.requiresTapos()) {
        const info = yield this.getInfo();
        const header = info.getTransactionHeader(expireSeconds);
        resolveArgs = __spreadValues(__spreadValues({}, resolveArgs), header);
      }
      const abis = yield request.fetchAbis(this.abiCache);
      return request.resolve(abis, this.permissionLevel, resolveArgs);
    });
  }
};
var TransactRevisions = class {
  constructor(request) {
    this.revisions = [];
    this.addRevision({
      request,
      signatures: []
    }, "original", true);
  }
  addRevision(response, code, allowModify) {
    let modified = false;
    const previous = this.revisions[this.revisions.length - 1];
    if (previous) {
      modified = previous.response.request !== String(response.request);
    }
    this.revisions.push({
      allowModify,
      code: String(code),
      modified,
      response: {
        request: String(response.request),
        signatures: response.signatures ? Serializer.objectify(response.signatures) : []
      }
    });
  }
};
var AbstractTransactPlugin = class {
};
var BaseTransactPlugin = class extends AbstractTransactPlugin {
  get id() {
    return "base-transact-plugin";
  }
  register() {
  }
};
function getFetch(options) {
  if (options && options.fetch) {
    return options.fetch;
  }
  if (typeof window !== "undefined" && window.fetch) {
    return window.fetch.bind(window);
  }
  if (typeof global !== "undefined" && global.fetch) {
    return global.fetch.bind(global);
  }
  throw new Error("Missing fetch");
}
function appendAction(request, action) {
  const newAction = Action.from(action);
  const cloned = request.clone();
  switch (cloned.data.req.variantName) {
    case "action": {
      cloned.data.req.value = [cloned.data.req.value, newAction];
      cloned.data.req.variantIdx = 1;
      break;
    }
    case "action[]": {
      const array = cloned.data.req.value;
      array.push(newAction);
      cloned.data.req.value = array;
      break;
    }
    case "transaction": {
      const tx = cloned.data.req.value;
      tx.actions.push(newAction);
      cloned.data.req.value = tx;
      break;
    }
    default: {
      throw new Error("unknown data req type");
    }
  }
  return cloned;
}
function prependAction(request, action) {
  const newAction = Action.from(action);
  const cloned = request.clone();
  switch (cloned.data.req.variantName) {
    case "action": {
      cloned.data.req.value = [newAction, cloned.data.req.value];
      cloned.data.req.variantIdx = 1;
      break;
    }
    case "action[]": {
      const array = cloned.data.req.value;
      array.unshift(newAction);
      cloned.data.req.value = array;
      break;
    }
    case "transaction": {
      const tx = cloned.data.req.value;
      tx.actions.unshift(newAction);
      cloned.data.req.value = tx;
      break;
    }
    default: {
      throw new Error("unknown data req type");
    }
  }
  return cloned;
}
var Session = class {
  get data() {
    return this._data;
  }
  set data(data) {
    this._data = data;
  }
  constructor(args, options = {}) {
    this.abis = [];
    this.allowModify = true;
    this.broadcast = true;
    this.expireSeconds = 120;
    this.transactPluginsOptions = {};
    this._data = {};
    this.serialize = () => {
      const serializableData = {
        chain: this.chain.id,
        actor: this.permissionLevel.actor,
        permission: this.permissionLevel.permission,
        walletPlugin: {
          id: this.walletPlugin.id,
          data: this.walletPlugin.data
        }
      };
      if (Object.keys(this._data).length > 0) {
        serializableData.data = this.data;
      }
      return Serializer.objectify(serializableData);
    };
    this.chain = ChainDefinition.from(args.chain);
    if (args.permissionLevel) {
      this.permissionLevel = PermissionLevel.from(args.permissionLevel);
    } else if (args.actor && args.permission) {
      this.permissionLevel = PermissionLevel.from(`${args.actor}@${args.permission}`);
    } else {
      throw new Error("Either a permissionLevel or actor/permission must be provided when creating a new Session.");
    }
    this.walletPlugin = args.walletPlugin;
    if (options.appName) {
      this.appName = String(options.appName);
    }
    if (options.abis) {
      this.abis = [...options.abis];
    }
    if (options.contracts) {
      this.abis.push(...options.contracts.map((c) => ({
        account: c.account,
        abi: c.abi
      })));
    }
    if (options.allowModify !== void 0) {
      this.allowModify = options.allowModify;
    }
    if (options.broadcast !== void 0) {
      this.broadcast = options.broadcast;
    }
    if (options.expireSeconds) {
      this.expireSeconds = options.expireSeconds;
    }
    if (options.fetch) {
      this.fetch = options.fetch;
    } else {
      this.fetch = getFetch(options);
    }
    if (options.storage) {
      this.storage = options.storage;
    }
    if (options.transactPlugins) {
      this.transactPlugins = options.transactPlugins;
    } else {
      this.transactPlugins = [new BaseTransactPlugin()];
    }
    if (options.transactPluginsOptions) {
      this.transactPluginsOptions = options.transactPluginsOptions;
    }
    if (options.abiCache) {
      this.abiCache = options.abiCache;
    } else {
      this.abiCache = new ABICache(this.client);
    }
    if (options.ui) {
      this.ui = options.ui;
    }
  }
  get actor() {
    return this.permissionLevel.actor;
  }
  get permission() {
    return this.permissionLevel.permission;
  }
  get client() {
    return new APIClient({
      provider: new FetchProvider(this.chain.url, {
        fetch: this.fetch
      })
    });
  }
  setEndpoint(url) {
    this.chain.url = url;
  }
  upgradeTransaction(args) {
    const anyArgs = args;
    if (args.actions && (anyArgs.expiration || anyArgs.ref_block_num || anyArgs.ref_block_prefix || anyArgs.max_net_usage_words || anyArgs.max_cpu_usage_ms || anyArgs.delay_sec)) {
      return args = {
        transaction: __spreadValues({
          expiration: "1970-01-01T00:00:00",
          ref_block_num: 0,
          ref_block_prefix: 0,
          max_net_usage_words: 0,
          max_cpu_usage_ms: 0,
          delay_sec: 0
        }, anyArgs)
      };
    }
    if (args.context_free_actions || args.context_free_data) {
      const actions = args.actions || [args.action];
      delete args.action;
      return {
        transaction: __spreadValues({
          expiration: "1970-01-01T00:00:00",
          ref_block_num: 0,
          ref_block_prefix: 0,
          max_net_usage_words: 0,
          max_cpu_usage_ms: 0,
          delay_sec: 0,
          context_free_actions: [],
          context_free_data: [],
          actions
        }, anyArgs)
      };
    }
    return args;
  }
  storageType(version) {
    return version === 2 ? RequestDataV2 : RequestDataV3;
  }
  cloneRequest(request, abiCache) {
    let signature;
    if (request.signature) {
      signature = RequestSignature.from(JSON.parse(JSON.stringify(request.signature)));
    }
    const RequestData = this.storageType(request.version);
    const data = RequestData.from(JSON.parse(JSON.stringify(request.data)));
    return new SigningRequest(request.version, data, pako, abiCache, signature);
  }
  createRequest(args, abiCache) {
    return __async(this, null, function* () {
      let request;
      const options = {
        abiProvider: abiCache,
        zlib: pako
      };
      if (args.request && args.request instanceof SigningRequest) {
        request = this.cloneRequest(args.request, abiCache);
      } else if (args.request) {
        request = SigningRequest.from(args.request, options);
      } else {
        args = this.upgradeTransaction(args);
        request = yield SigningRequest.create(__spreadProps(__spreadValues({}, args), {
          chainId: this.chain.id
        }), options);
      }
      request.setBroadcast(false);
      return request;
    });
  }
  updateRequest(previous, modified, abiCache) {
    return __async(this, null, function* () {
      const updatedRequest = this.cloneRequest(modified, abiCache);
      const info = updatedRequest.getRawInfo();
      previous.data.info.forEach((metadata) => {
        if (info[metadata.key]) {
          console.warn(`During an updateRequest call, the previous request had already set the metadata key of "${metadata.key}" which will not be overwritten.`);
        }
        updatedRequest.setRawInfoKey(metadata.key, metadata.value);
      });
      return updatedRequest;
    });
  }
  transact(args, options) {
    return __async(this, null, function* () {
      try {
        const expireSeconds = options && options.expireSeconds ? options.expireSeconds : this.expireSeconds;
        const willBroadcast = options && typeof options.broadcast !== "undefined" ? options.broadcast : this.broadcast;
        const abiCache = this.getMergedAbiCache(args, options);
        const transactPlugins = options?.transactPlugins || this.transactPlugins;
        const transactPluginsOptions = options?.transactPluginsOptions || this.transactPluginsOptions;
        let allowModify = options && typeof options.allowModify !== "undefined" ? options.allowModify : this.allowModify;
        const context = new TransactContext({
          abiCache,
          appName: this.appName,
          chain: this.chain,
          client: this.client,
          createRequest: (a) => this.createRequest(a, abiCache),
          fetch: this.fetch,
          permissionLevel: this.permissionLevel,
          storage: this.storage,
          transactPlugins,
          transactPluginsOptions,
          ui: this.ui
        });
        if (context.ui) {
          yield context.ui.onTransact();
          for (const translation of transactPlugins.map((transactPlugin) => this.getPluginTranslations(transactPlugin))) {
            context.ui.addTranslations(translation);
          }
        }
        let request = yield this.createRequest(args, abiCache);
        const result = {
          chain: this.chain,
          request,
          resolved: void 0,
          returns: [],
          revisions: new TransactRevisions(request),
          signatures: [],
          signer: this.permissionLevel,
          transaction: void 0
        };
        for (const hook of context.hooks.beforeSign) {
          const response = yield hook(request.clone(), context);
          if (response) {
            result.revisions.addRevision(response, String(hook), allowModify);
            if (allowModify) {
              request = yield this.updateRequest(request, response.request, abiCache);
            }
            if (response.signatures) {
              result.signatures = [...result.signatures, ...response.signatures];
              allowModify = false;
            }
          }
        }
        result.request = request;
        result.resolved = yield context.resolve(request, expireSeconds);
        result.transaction = result.resolved.resolvedTransaction;
        if (context.ui) {
          yield context.ui.onSign();
          context.ui.addTranslations(this.getPluginTranslations(this.walletPlugin));
        }
        const walletResponse = yield this.walletPlugin.sign(result.resolved, context);
        result.signatures.push(...walletResponse.signatures);
        if (walletResponse.resolved) {
          const {
            resolved
          } = walletResponse;
          const requestWasModified = !result.resolved.transaction.equals(resolved.transaction);
          if (requestWasModified) {
            if (allowModify) {
              result.request = resolved.request;
              result.resolved = resolved;
              result.transaction = resolved.resolvedTransaction;
            } else {
              throw new Error(`The ${this.walletPlugin.metadata.name} plugin modified the transaction when it was not allowed to.`);
            }
          }
        }
        for (const hook of context.hooks.afterSign) yield hook(result, context);
        if (context.ui) {
          yield context.ui.onSignComplete();
        }
        if (willBroadcast) {
          if (context.ui) {
            yield context.ui.onBroadcast();
          }
          const signed = SignedTransaction.from(__spreadProps(__spreadValues({}, result.resolved.transaction), {
            signatures: result.signatures
          }));
          result.response = yield context.client.v1.chain.send_transaction(signed);
          if (result.response.processed && result.response.processed.action_traces) {
            result.returns = yield processReturnValues(result.response, abiCache);
          }
          for (const hook of context.hooks.afterBroadcast) yield hook(result, context);
          if (context.ui) {
            yield context.ui.onBroadcastComplete();
          }
        }
        if (context.ui) {
          yield context.ui.onTransactComplete();
        }
        return result;
      } catch (error) {
        if (error.response && error.response.json) {
          const {
            json
          } = error.response;
          if (json.error && json.error.details) {
            const e = new Error(json.error.details[0].message);
            if (this.ui) {
              yield this.ui.onError(e);
            }
            throw e;
          }
        } else {
          if (this.ui) {
            yield this.ui.onError(error);
          }
        }
        throw new Error(error);
      }
    });
  }
  signTransaction(transaction) {
    return __async(this, null, function* () {
      const context = new TransactContext({
        abiCache: this.abiCache,
        chain: this.chain,
        client: this.client,
        createRequest: (args) => this.createRequest(args, this.abiCache),
        fetch: this.fetch,
        permissionLevel: this.permissionLevel
      });
      const request = yield SigningRequest.create({
        transaction,
        chainId: this.chain.id
      }, context.esrOptions);
      request.setBroadcast(false);
      const resolvedRequest = new ResolvedSigningRequest(request, this.permissionLevel, Transaction.from(transaction), Serializer.objectify(Transaction.from(transaction)), ChainId.from(this.chain.id));
      const walletResponse = yield this.walletPlugin.sign(resolvedRequest, context);
      return walletResponse.signatures;
    });
  }
  getPluginTranslations(transactPlugin) {
    if (!transactPlugin.translations) {
      return {};
    }
    const prefixed = {};
    const languages = Object.keys(transactPlugin.translations);
    languages.forEach((lang) => {
      if (transactPlugin.translations) {
        prefixed[lang] = {
          [transactPlugin.id]: transactPlugin.translations[lang]
        };
      }
    });
    return prefixed;
  }
  getMergedAbiCache(args, options) {
    const abiCache = options?.abiCache || this.abiCache;
    if (!abiCache["setAbi"]) {
      throw new Error("Custom `abiCache` does not support `setAbi` method.");
    }
    this.abis.forEach((def) => abiCache.setAbi(def.account, def.abi));
    if (options?.abis) {
      options.abis.forEach((def) => abiCache.setAbi(def.account, def.abi));
    }
    if (options?.contracts) {
      options.contracts.forEach((c) => abiCache.setAbi(c.account, c.abi));
    }
    if (args.action && args.action["abi"]) {
      abiCache.setAbi(args.action.account, args.action["abi"], true);
    }
    if (args.actions) {
      args.actions.forEach((action) => {
        if (action["abi"]) {
          abiCache.setAbi(action.account, action["abi"], true);
        }
      });
    }
    if (args.transaction && args.transaction.actions) {
      args.transaction.actions.forEach((action) => {
        if (action["abi"]) {
          abiCache.setAbi(action.account, action["abi"], true);
        }
      });
    }
    return abiCache;
  }
};
function processReturnValues(response, abiCache) {
  return __async(this, null, function* () {
    const decoded = [];
    for (const actionTrace of response.processed.action_traces) {
      if (actionTrace.return_value_hex_data) {
        const contract = Name.from(actionTrace.act.account);
        const action = Name.from(actionTrace.act.name);
        const abi = yield abiCache.getAbi(contract);
        const returnType = abi.action_results.find((a) => Name.from(a.name).equals(action));
        if (returnType) {
          try {
            const data = Serializer.decode({
              data: actionTrace.return_value_hex_data,
              type: returnType.result_type,
              abi
            });
            decoded.push({
              contract,
              action,
              hex: actionTrace.return_value_hex_data,
              data,
              returnType
            });
          } catch (error) {
            console.warn(`Error decoding return value for ${contract}::${action}:`, error);
            decoded.push({
              contract,
              action,
              hex: actionTrace.return_value_hex_data,
              data: "",
              returnType
            });
          }
        } else {
          console.warn(`No return type found for ${contract}::${action}`);
          decoded.push({
            contract,
            action,
            hex: actionTrace.return_value_hex_data,
            data: "",
            returnType: {
              name: action,
              result_type: ""
            }
          });
        }
      }
    }
    return decoded;
  });
}
var BrowserLocalStorage = class {
  constructor(keyPrefix = "") {
    this.keyPrefix = keyPrefix;
  }
  write(key, data) {
    return __async(this, null, function* () {
      localStorage.setItem(this.storageKey(key), data);
    });
  }
  read(key) {
    return __async(this, null, function* () {
      return localStorage.getItem(this.storageKey(key));
    });
  }
  remove(key) {
    return __async(this, null, function* () {
      localStorage.removeItem(this.storageKey(key));
    });
  }
  storageKey(key) {
    return `wharf-${this.keyPrefix}-${key}`;
  }
};
var WalletPluginMetadata_1;
var WalletPluginMetadata = WalletPluginMetadata_1 = class WalletPluginMetadata2 extends Struct {
  static from(data) {
    return new WalletPluginMetadata_1(__spreadProps(__spreadValues({}, data), {
      logo: data.logo ? Logo.from(data.logo) : void 0
    }));
  }
};
__decorate([Struct.field("string", {
  optional: true
})], WalletPluginMetadata.prototype, "name", void 0);
__decorate([Struct.field("string", {
  optional: true
})], WalletPluginMetadata.prototype, "description", void 0);
__decorate([Struct.field(Logo, {
  optional: true
})], WalletPluginMetadata.prototype, "logo", void 0);
__decorate([Struct.field("string", {
  optional: true
})], WalletPluginMetadata.prototype, "homepage", void 0);
__decorate([Struct.field("string", {
  optional: true
})], WalletPluginMetadata.prototype, "download", void 0);
__decorate([Struct.field("string", {
  optional: true
})], WalletPluginMetadata.prototype, "publicKey", void 0);
WalletPluginMetadata = WalletPluginMetadata_1 = __decorate([Struct.type("wallet_plugin_metadata")], WalletPluginMetadata);
var AbstractWalletPlugin = class {
  constructor() {
    this._data = {};
    this.config = {
      requiresChainSelect: true,
      requiresPermissionSelect: false,
      requiresPermissionEntry: false
    };
    this.metadata = new WalletPluginMetadata({});
  }
  get data() {
    return this._data;
  }
  set data(data) {
    this._data = data;
  }
  serialize() {
    return {
      id: this.id,
      data: this.data
    };
  }
};
var AccountCreationPluginMetadata_1;
var AccountCreationPluginMetadata = AccountCreationPluginMetadata_1 = class AccountCreationPluginMetadata2 extends Struct {
  static from(data) {
    return new AccountCreationPluginMetadata_1(__spreadProps(__spreadValues({}, data), {
      logo: data.logo ? Logo.from(data.logo) : void 0
    }));
  }
};
__decorate([Struct.field("string")], AccountCreationPluginMetadata.prototype, "name", void 0);
__decorate([Struct.field("string", {
  optional: true
})], AccountCreationPluginMetadata.prototype, "description", void 0);
__decorate([Struct.field(Logo, {
  optional: true
})], AccountCreationPluginMetadata.prototype, "logo", void 0);
__decorate([Struct.field("string", {
  optional: true
})], AccountCreationPluginMetadata.prototype, "homepage", void 0);
AccountCreationPluginMetadata = AccountCreationPluginMetadata_1 = __decorate([Struct.type("account_creation_plugin_metadata")], AccountCreationPluginMetadata);
var CreateAccountContext = class {
  constructor(options) {
    this.accountCreationPlugins = [];
    this.uiRequirements = {
      requiresChainSelect: true,
      requiresPluginSelect: true
    };
    this.appName = String(options.appName);
    if (options.chains) {
      this.chains = options.chains;
    }
    if (options.chain) {
      this.chain = options.chain;
    }
    this.fetch = options.fetch;
    this.ui = options.ui;
    if (options.accountCreationPlugins) {
      this.accountCreationPlugins = options.accountCreationPlugins;
    }
    if (options.uiRequirements) {
      this.uiRequirements = options.uiRequirements;
    }
  }
  getClient(chain) {
    return new APIClient({
      provider: new FetchProvider(chain.url, {
        fetch: this.fetch
      })
    });
  }
};
var AbstractAccountCreationPlugin = class {
  constructor() {
    this.config = {
      requiresChainSelect: true
    };
    this.metadata = new AccountCreationPluginMetadata({});
  }
};
var SessionKit = class {
  constructor(args, options = {}) {
    this.abis = [];
    this.allowModify = true;
    this.expireSeconds = 120;
    this.transactPluginsOptions = {};
    this.accountCreationPlugins = [];
    this.appName = String(args.appName);
    this.chains = args.chains.map((chain) => ChainDefinition.from(chain));
    this.ui = args.ui;
    this.walletPlugins = args.walletPlugins;
    if (options.fetch) {
      this.fetch = options.fetch;
    } else {
      this.fetch = getFetch(options);
    }
    if (options.abis) {
      this.abis = [...options.abis];
    }
    if (options.contracts) {
      this.abis.push(...options.contracts.map((c) => ({
        account: c.account,
        abi: c.abi
      })));
    }
    if (options.loginPlugins) {
      this.loginPlugins = options.loginPlugins;
    } else {
      this.loginPlugins = [new BaseLoginPlugin()];
    }
    if (options.storage) {
      this.storage = options.storage;
    } else {
      this.storage = new BrowserLocalStorage();
    }
    if (options.transactPlugins) {
      this.transactPlugins = options.transactPlugins;
    } else {
      this.transactPlugins = [new BaseTransactPlugin()];
    }
    if (typeof options.allowModify !== "undefined") {
      this.allowModify = options.allowModify;
    }
    if (options.expireSeconds) {
      this.expireSeconds = options.expireSeconds;
    }
    if (options.transactPluginsOptions) {
      this.transactPluginsOptions = options.transactPluginsOptions;
    }
    if (options.accountCreationPlugins) {
      this.accountCreationPlugins = options.accountCreationPlugins;
    }
  }
  setEndpoint(id, url) {
    const modifiedChains = [...this.chains];
    const chainId = Checksum256.from(id);
    const chainIndex = this.chains.findIndex((c) => c.id.equals(chainId));
    if (chainIndex < 0) {
      throw new Error("Chain with specified ID not found.");
    }
    modifiedChains[chainIndex].url = url;
    this.chains = modifiedChains;
  }
  getChainDefinition(id, override) {
    const chains = override ? override : this.chains;
    const chainId = Checksum256.from(id);
    const chain = chains.find((c) => c.id.equals(chainId));
    if (!chain) {
      throw new Error(`No chain defined with an ID of: ${chainId}`);
    }
    return chain;
  }
  createAccount(options) {
    return __async(this, null, function* () {
      try {
        if (this.accountCreationPlugins.length === 0) {
          throw new Error("No account creation plugins available.");
        }
        let chain = options?.chain;
        let requiresChainSelect = !chain;
        let requiresPluginSelect = !options?.pluginId;
        let accountCreationPlugin;
        if (options?.pluginId) {
          requiresPluginSelect = false;
          accountCreationPlugin = this.accountCreationPlugins.find((p) => p.id === options.pluginId);
          if (!accountCreationPlugin) {
            throw new Error("Invalid account creation plugin selected.");
          }
          if (accountCreationPlugin?.config.requiresChainSelect !== void 0) {
            requiresChainSelect = accountCreationPlugin?.config.requiresChainSelect;
          }
          if (!accountCreationPlugin.config.requiresChainSelect && accountCreationPlugin.config.supportedChains && accountCreationPlugin.config.supportedChains.length === 1) {
            chain = accountCreationPlugin.config.supportedChains[0];
          }
        }
        let chains = this.chains;
        if (accountCreationPlugin && accountCreationPlugin?.config.supportedChains?.length) {
          chains = chains.filter((availableChain) => {
            return accountCreationPlugin?.config.supportedChains?.find((c) => {
              return c.id.equals(availableChain.id);
            });
          });
        }
        const context = new CreateAccountContext({
          accountCreationPlugins: this.accountCreationPlugins,
          appName: this.appName,
          chain,
          chains,
          fetch: this.fetch,
          ui: this.ui,
          uiRequirements: {
            requiresChainSelect,
            requiresPluginSelect
          }
        });
        if (requiresPluginSelect || requiresChainSelect) {
          const response = yield context.ui.onAccountCreate(context);
          const pluginId = options?.pluginId || response.pluginId;
          if (!pluginId) {
            throw new Error("No account creation plugin selected.");
          }
          accountCreationPlugin = context.accountCreationPlugins.find((p) => p.id === pluginId);
          if (!accountCreationPlugin) {
            throw new Error("No account creation plugin selected.");
          }
          if (!accountCreationPlugin.config.requiresChainSelect && accountCreationPlugin.config.supportedChains && accountCreationPlugin.config.supportedChains.length === 1) {
            context.chain = accountCreationPlugin.config.supportedChains[0];
          }
          if (response.chain) {
            context.chain = this.getChainDefinition(response.chain, context.chains);
          }
          if (accountCreationPlugin.config.requiresChainSelect && !context.chain) {
            throw new Error(`Account creation plugin (${pluginId}) requires chain selection, and no chain was selected.`);
          }
        }
        if (!accountCreationPlugin) {
          throw new Error("No account creation plugin selected");
        }
        const accountCreationData = yield accountCreationPlugin.create(context);
        yield context.ui.onAccountCreateComplete();
        return accountCreationData;
      } catch (error) {
        yield this.ui.onError(error);
        throw new Error(error);
      }
    });
  }
  login(options) {
    return __async(this, null, function* () {
      try {
        const context = new LoginContext({
          appName: this.appName,
          arbitrary: options?.arbitrary || {},
          chain: void 0,
          chains: options && options?.chains ? options.chains.map((c) => this.getChainDefinition(c)) : this.chains,
          fetch: this.fetch,
          loginPlugins: this.loginPlugins,
          ui: this.ui,
          walletPlugins: this.walletPlugins.map((plugin) => {
            return {
              config: plugin.config,
              metadata: WalletPluginMetadata.from(plugin.metadata),
              retrievePublicKey: plugin.retrievePublicKey?.bind(plugin)
            };
          })
        });
        yield context.ui.onLogin();
        let walletPlugin = void 0;
        if (this.walletPlugins.length === 1) {
          walletPlugin = this.walletPlugins[0];
          context.walletPluginIndex = 0;
          context.uiRequirements.requiresWalletSelect = false;
        } else if (options?.walletPlugin) {
          const index = this.walletPlugins.findIndex((p) => p.id === options.walletPlugin);
          if (index >= 0) {
            walletPlugin = this.walletPlugins[index];
            context.walletPluginIndex = index;
            context.uiRequirements.requiresWalletSelect = false;
          }
        }
        if (walletPlugin) {
          context.uiRequirements = __spreadValues(__spreadValues({}, context.uiRequirements), walletPlugin.config);
        }
        if (options && options.chain) {
          if (options.chain instanceof ChainDefinition) {
            context.chain = options.chain;
          } else {
            context.chain = this.getChainDefinition(options.chain, context.chains);
          }
          context.uiRequirements.requiresChainSelect = false;
        } else if (context.chains.length === 1) {
          context.chain = context.chains[0];
          context.uiRequirements.requiresChainSelect = false;
        } else {
          context.uiRequirements.requiresChainSelect = true;
        }
        if (options?.permissionLevel) {
          context.permissionLevel = PermissionLevel.from(options.permissionLevel);
          context.uiRequirements.requiresPermissionSelect = false;
        }
        if (context.uiRequirements.requiresChainSelect || context.uiRequirements.requiresPermissionSelect || context.uiRequirements.requiresPermissionEntry || context.uiRequirements.requiresWalletSelect) {
          const uiLoginResponse = yield context.ui.login(context);
          if (uiLoginResponse.walletPluginIndex !== void 0) {
            walletPlugin = this.walletPlugins[uiLoginResponse.walletPluginIndex];
          }
          if (!walletPlugin) {
            throw new Error("UserInterface did not return a valid WalletPlugin index.");
          }
          if (uiLoginResponse.chainId) {
            if (!context.chains.some((c) => c.id.equals(uiLoginResponse.chainId))) {
              throw new Error("UserInterface did not return a chain ID matching the subset of chains.");
            }
            context.chain = this.getChainDefinition(uiLoginResponse.chainId, context.chains);
          }
          if (uiLoginResponse.permissionLevel) {
            context.permissionLevel = PermissionLevel.from(uiLoginResponse.permissionLevel);
          }
        }
        if (!walletPlugin) {
          throw new Error("No WalletPlugin available to perform the login.");
        }
        const {
          supportedChains
        } = walletPlugin.config;
        if (context.chain && supportedChains && supportedChains.length && !supportedChains.includes(String(context.chain.id))) {
          throw new Error(`The wallet plugin '${walletPlugin.metadata.name}' does not support the chain '${context.chain.id}'`);
        }
        for (const hook of context.hooks.beforeLogin) yield hook(context);
        const response = yield walletPlugin.login(context);
        const session = new Session({
          chain: this.getChainDefinition(response.chain),
          permissionLevel: response.permissionLevel,
          walletPlugin
        }, this.getSessionOptions(options));
        for (const hook of context.hooks.afterLogin) yield hook(context);
        this.persistSession(session, options?.setAsDefault);
        yield context.ui.onLoginComplete();
        return {
          context,
          response,
          session
        };
      } catch (error) {
        yield this.ui.onError(error);
        throw new Error(error);
      }
    });
  }
  logoutParams(session, walletPlugin) {
    if (session instanceof Session) {
      return {
        session,
        appName: this.appName
      };
    } else {
      return {
        session: new Session({
          chain: this.getChainDefinition(session.chain),
          permissionLevel: PermissionLevel.from({
            actor: session.actor,
            permission: session.permission
          }),
          walletPlugin
        }),
        appName: this.appName
      };
    }
  }
  logout(session) {
    return __async(this, null, function* () {
      if (!this.storage) {
        throw new Error("An instance of Storage must be provided to utilize the logout method.");
      }
      yield this.storage.remove("session");
      if (session) {
        const walletPlugin = this.walletPlugins.find((wPlugin) => session?.walletPlugin.id === wPlugin.id);
        if (walletPlugin?.logout) {
          yield walletPlugin.logout(this.logoutParams(session, walletPlugin));
        }
        const sessions = yield this.getSessions();
        if (sessions) {
          let serialized = session;
          if (session instanceof Session) {
            serialized = session.serialize();
          }
          const other = sessions.filter((s) => {
            return !Checksum256.from(s.chain).equals(Checksum256.from(String(serialized.chain))) || !Name.from(s.actor).equals(Name.from(serialized.actor)) || !Name.from(s.permission).equals(Name.from(serialized.permission));
          });
          yield this.storage.write("sessions", JSON.stringify(other));
        }
      } else {
        const sessions = yield this.getSessions();
        yield this.storage.remove("sessions");
        if (sessions) {
          Promise.all(sessions.map((s) => {
            const walletPlugin = this.walletPlugins.find((wPlugin) => s.walletPlugin.id === wPlugin.id);
            if (walletPlugin?.logout) {
              return walletPlugin.logout(this.logoutParams(s, walletPlugin));
            } else {
              return Promise.resolve();
            }
          }));
        }
      }
    });
  }
  restore(args, options) {
    return __async(this, null, function* () {
      if (!args) {
        const data2 = yield this.storage.read("session");
        if (data2) {
          args = JSON.parse(data2);
        } else {
          return;
        }
      }
      if (!args) {
        throw new Error("Either a RestoreArgs object or a Storage instance must be provided.");
      }
      const chainId = Checksum256.from(args.chain instanceof ChainDefinition ? args.chain.id : args.chain);
      let serializedSession;
      const data = yield this.storage.read("sessions");
      if (data) {
        const sessions = JSON.parse(data);
        if (args.actor && args.permission) {
          serializedSession = sessions.find((s) => {
            return args && chainId.equals(s.chain) && s.actor === args.actor && s.permission === args.permission;
          });
        } else {
          serializedSession = sessions.find((s) => {
            return args && chainId.equals(s.chain) && s.default;
          });
        }
      } else {
        if (args.actor && args.permission && args.walletPlugin) {
          serializedSession = {
            chain: String(chainId),
            actor: args.actor,
            permission: args.permission,
            walletPlugin: {
              id: args.walletPlugin.id,
              data: args.walletPlugin.data
            },
            data: args.data
          };
        } else {
          throw new Error("No sessions found in storage. A wallet plugin must be provided.");
        }
      }
      if (!serializedSession) {
        return;
      }
      const walletPlugin = this.walletPlugins.find((p) => {
        if (!args) {
          return false;
        }
        return p.id === serializedSession.walletPlugin.id;
      });
      if (!walletPlugin) {
        throw new Error(`No WalletPlugin found with the ID of: '${serializedSession.walletPlugin.id}'`);
      }
      if (serializedSession.walletPlugin.data) {
        walletPlugin.data = serializedSession.walletPlugin.data;
      }
      if (args.walletPlugin && args.walletPlugin.data) {
        walletPlugin.data = args.walletPlugin.data;
      }
      const session = new Session({
        chain: this.getChainDefinition(serializedSession.chain),
        permissionLevel: PermissionLevel.from({
          actor: serializedSession.actor,
          permission: serializedSession.permission
        }),
        walletPlugin
      }, this.getSessionOptions(options));
      if (serializedSession.data) {
        session.data = serializedSession.data;
      }
      this.persistSession(session, options?.setAsDefault);
      return session;
    });
  }
  restoreAll() {
    return __async(this, null, function* () {
      const sessions = [];
      const serializedSessions = yield this.getSessions();
      if (serializedSessions) {
        for (const s of serializedSessions) {
          const session = yield this.restore(s);
          if (session) {
            sessions.push(session);
          }
        }
      }
      return sessions;
    });
  }
  persistSession(session, setAsDefault = true) {
    return __async(this, null, function* () {
      if (!this.storage) {
        return;
      }
      const serialized = session.serialize();
      serialized.default = setAsDefault;
      if (setAsDefault) {
        this.storage.write("session", JSON.stringify(serialized));
      }
      const existing = yield this.storage.read("sessions");
      if (existing) {
        const stored = JSON.parse(existing);
        const sessions = stored.filter((s) => {
          return !Checksum256.from(s.chain).equals(Checksum256.from(serialized.chain)) || !Name.from(s.actor).equals(Name.from(serialized.actor)) || !Name.from(s.permission).equals(Name.from(serialized.permission));
        }).map((s) => {
          if (session.chain.id.equals(s.chain)) {
            s.default = false;
          }
          return s;
        });
        const orderedSessions = [...sessions, serialized];
        orderedSessions.sort((a, b) => {
          const chain = String(a.chain).localeCompare(String(b.chain));
          const actor = String(a.actor).localeCompare(String(b.actor));
          const permission = String(a.permission).localeCompare(String(b.permission));
          return chain || actor || permission;
        });
        this.storage.write("sessions", JSON.stringify(orderedSessions));
      } else {
        this.storage.write("sessions", JSON.stringify([serialized]));
      }
    });
  }
  getSessions() {
    return __async(this, null, function* () {
      if (!this.storage) {
        throw new Error("No storage instance is available to retrieve sessions from.");
      }
      const data = yield this.storage.read("sessions");
      if (!data) return [];
      try {
        const parsed = JSON.parse(data);
        const filtered = parsed.filter((s) => this.walletPlugins.some((p) => {
          return p.id === s.walletPlugin.id;
        }));
        return filtered;
      } catch (e) {
        throw new Error(`Failed to parse sessions from storage (${e})`);
      }
    });
  }
  getSessionOptions(options) {
    return {
      abis: this.abis,
      allowModify: this.allowModify,
      appName: this.appName,
      expireSeconds: this.expireSeconds,
      fetch: this.fetch,
      storage: this.storage,
      transactPlugins: options?.transactPlugins || this.transactPlugins,
      transactPluginsOptions: options?.transactPluginsOptions || this.transactPluginsOptions,
      ui: this.ui
    };
  }
};
var AbstractUserInterface = class {
  translate(key, options, namespace) {
    throw new Error("The `translate` method must be implemented in this UserInterface. Called with: " + JSON.stringify({
      key,
      options,
      namespace
    }));
  }
  getTranslate(namespace) {
    return (key, options) => this.translate(key, options, namespace);
  }
  addTranslations(translations) {
    throw new Error("The `addTranslations` method must be implemented in this UserInterface. Called with: " + JSON.stringify(translations));
  }
};

export {
  LoginHookTypes,
  LoginContext,
  AbstractLoginPlugin,
  BaseLoginPlugin,
  TransactHookTypes,
  TransactContext,
  TransactRevisions,
  AbstractTransactPlugin,
  BaseTransactPlugin,
  getFetch,
  appendAction,
  prependAction,
  Session,
  BrowserLocalStorage,
  WalletPluginMetadata,
  AbstractWalletPlugin,
  AccountCreationPluginMetadata,
  CreateAccountContext,
  AbstractAccountCreationPlugin,
  SessionKit,
  AbstractUserInterface
};
//# sourceMappingURL=chunk-I73XJDGX.js.map
