import {
  AbstractWalletPlugin,
  TransactHookTypes,
  WalletPluginMetadata
} from "./chunk-I73XJDGX.js";
import "./chunk-2TATSEGQ.js";
import "./chunk-IG4OCRBK.js";
import {
  Serializer
} from "./chunk-ADGX27WK.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-J75W5ZEG.js";

// node_modules/@wharfkit/wallet-plugin-cleos/lib/wallet-plugin-cleos.m.js
var WalletPluginCleos = class extends AbstractWalletPlugin {
  constructor() {
    super(...arguments);
    this.config = {
      // Should the user interface display a chain selector?
      requiresChainSelect: true,
      // Should the user interface display a permission selector?
      requiresPermissionSelect: false,
      // Should the user interface require input for the permission?
      requiresPermissionEntry: true
    };
    this.metadata = WalletPluginMetadata.from({
      name: "cleos",
      description: "Copy and paste the transactions to sign in cleos.",
      logo: "data:image/png;base64,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",
      homepage: "https://github.com/antelopeio/leap",
      download: "https://github.com/antelopeio/leap"
    });
  }
  /**
   * A unique string identifier for this wallet plugin.
   *
   * It's recommended this is all lower case, no spaces, and only URL-friendly special characters (dashes, underscores, etc)
   */
  get id() {
    return "cleos";
  }
  /**
   * Performs the wallet logic required to login and return the chain and permission level to use.
   *
   * @param options WalletPluginLoginOptions
   * @returns Promise<WalletPluginLoginResponse>
   */
  login(context) {
    return __async(this, null, function* () {
      if (!context.chain) {
        throw new Error("The cleos wallet plugin requires a chain to be selected.");
      }
      if (!context.permissionLevel) {
        throw new Error("The cleos wallet plugin requires a permissionLevel to be specified.");
      }
      return {
        chain: context.chain.id,
        permissionLevel: context.permissionLevel
      };
    });
  }
  /**
   * Performs the wallet logic required to sign a transaction and return the signature.
   *
   * @param chain ChainDefinition
   * @param resolved ResolvedSigningRequest
   * @returns Promise<Signature>
   */
  sign(resolved, context) {
    return __async(this, null, function* () {
      if (!context.ui) {
        throw new Error("The cleos wallet plugin requires a UI to be provided.");
      }
      context.addHook(TransactHookTypes.afterSign, () => __async(null, null, function* () {
        const actions = [];
        for (const action of resolved.transaction.actions) {
          const abi = yield context.abiCache.getAbi(action.account);
          actions.push({
            account: action.account,
            name: action.name,
            authorization: action.authorization,
            data: Serializer.objectify(action.decodeData(abi))
          });
        }
        const decoded = __spreadProps(__spreadValues({}, resolved.transaction), {
          actions
        });
        const command = `cleos -u ${context.chain.url} push transaction '${JSON.stringify(decoded, null, 4)}'`;
        yield context.ui?.prompt({
          title: "Sign with cleos",
          body: "Copy the command to sign the transaction using cleos.",
          elements: [{
            type: "textarea",
            data: {
              content: command
            }
          }, {
            type: "button",
            data: {
              label: "Copy to clipboard",
              onClick: () => {
                if (!navigator.clipboard || !window.isSecureContext) {
                  alert("Copy to clipboard is not supported in this browser. Please copy the command manually.");
                } else {
                  navigator.clipboard.writeText(command);
                }
              }
            }
          }]
        });
      }));
      return {
        signatures: []
      };
    });
  }
};
export {
  WalletPluginCleos
};
/*! Bundled license information:

@wharfkit/wallet-plugin-cleos/lib/wallet-plugin-cleos.m.js:
  (**
   * @wharfkit/wallet-plugin-cleos v1.2.0
   * https://github.com/wharfkit/wallet-plugin-cleos
   *
   * @license
   * Copyright (c) 2023 Greymass Inc. All Rights Reserved.
   * 
   * Redistribution and use in source and binary forms, with or without modification,
   * are permitted provided that the following conditions are met:
   * 
   * 1.  Redistribution of source code must retain the above copyright notice, this
   *     list of conditions and the following disclaimer.
   * 
   * 2.  Redistribution in binary form must reproduce the above copyright notice,
   *     this list of conditions and the following disclaimer in the documentation
   *     and/or other materials provided with the distribution.
   * 
   * 3.  Neither the name of the copyright holder nor the names of its contributors
   *     may be used to endorse or promote products derived from this software without
   *     specific prior written permission.
   * 
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
   * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
   * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
   * IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
   * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
   * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
   * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
   * OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
   * OF THE POSSIBILITY OF SUCH DAMAGE.
   * 
   * YOU ACKNOWLEDGE THAT THIS SOFTWARE IS NOT DESIGNED, LICENSED OR INTENDED FOR USE
   * IN THE DESIGN, CONSTRUCTION, OPERATION OR MAINTENANCE OF ANY MILITARY FACILITY.
   *)
*/
//# sourceMappingURL=@wharfkit_wallet-plugin-cleos.js.map
