// w3o-ethereum/src/classes/EthereumWallet.ts

import {
    W3oContextFactory,
    W3oContext,
    W3oAuthenticator,
    W3oWallet,
    W3oWalletName,
    W3oNetworkName,
} from '@vapaee/w3o-core';
import { ethers, FunctionFragment } from 'ethers';
import { EthereumError } from './EthereumError';
import { EthereumAbiItem, EthereumContractAbi, EthereumTransaction } from '../types';
import { EthereumTransactionResponse } from './EthereumChainSupport';
import { EthereumContract } from './EthereumContract';
import { Observable } from 'rxjs';

const logger = new W3oContextFactory('EthereumWallet');

/**
 * Represents a user account for Ethereum networks.
 */
export abstract class EthereumWallet extends W3oWallet {
    constructor(
        name: W3oWalletName,
        parent: W3oContext
    ) {
        const context = logger.method('constructor', parent);
        super(name, context);
    }

    protected getProvider(): ethers.BrowserProvider {
        if (typeof window !== 'undefined' && (window as any).ethereum) {
            return new ethers.BrowserProvider((window as any).ethereum);
        }
        throw new EthereumError(EthereumError.PROVIDER_NOT_FOUND);
    }

    protected async ensureNetwork(provider: ethers.BrowserProvider, networkName: W3oNetworkName, parent: W3oContext): Promise<void> {
        const context = logger.method('ensureNetwork', { networkName }, parent);
        const settings = this.octopus.networks.getNetwork(networkName, context) as any;
        const chainIdHex = '0x' + parseInt(settings.settings.chainId, 10).toString(16);
        const currentChainId = await provider.send('eth_chainId', []);
        if (currentChainId === chainIdHex) return;
        try {
            await provider.send('wallet_switchEthereumChain', [{ chainId: chainIdHex }]);
        } catch (switchError: any) {
            if (switchError.code === 4902 || switchError?.data?.originalError?.code === 4902) {
                await provider.send('wallet_addEthereumChain', [{
                    chainId: chainIdHex,
                    chainName: settings.settings.displayName,
                    nativeCurrency: {
                        name: settings.settings.nativeCurrency ?? 'ETH',
                        symbol: settings.settings.symbol ?? 'ETH',
                        decimals: settings.settings.decimals ?? 18,
                    },
                    rpcUrls: [settings.settings.rpcUrl],
                    blockExplorerUrls: [settings.settings.links?.explorer || ''],
                }]);
                await provider.send('wallet_switchEthereumChain', [{ chainId: chainIdHex }]);
            } else {
                throw switchError;
            }
        }
    }
    
    override isReadOnly(): boolean { return false; }

    override signTransaction(
        auth: W3oAuthenticator,
        trx: EthereumTransaction,
        parent: W3oContext
    ): Observable<EthereumTransactionResponse> {
        const context = logger.method('signTransaction', { trx }, parent);
        const contract: EthereumContract = trx.contract as EthereumContract;

        return new Observable<EthereumTransactionResponse>(observer => {
            (async () => {
                try {
                    const provider = this.getProvider();
                    await this.ensureNetwork(provider, auth.network.name, context);

                    const signer: ethers.JsonRpcSigner = await provider.getSigner();

                    // Native currency transfer branch
                    if (contract.address === '___NATIVE_CURRENCY___') {
                        try {
                            const to = (trx.params && trx.params.to) as string;
                            if (!to) {
                                throw new Error('Missing "to" parameter for native currency transfer');
                            }

                            const value = this.normalizeBigNumberish(trx.value ?? (trx.params && (trx.params.amount as any)), context);
                            if (value === undefined) {
                                throw new Error('Missing "value" for native currency transfer');
                            }

                            const tx = await signer.sendTransaction({ to, value });
                            context.info('native transfer sent', { to, value, hash: tx.hash });

                            // Adjust this line to your constructor/factory
                            observer.next(new EthereumTransactionResponse(tx.hash));
                            observer.complete();
                            return;
                        } catch (err) {
                            context.error('native transfer failed', err);
                            observer.error(err);
                            return;
                        }
                    }

                    // Contract function call branch
                    try {
                        const ethersContract: ethers.Contract = await contract.getEthersContract(provider);
                        const abi = contract.abi as EthereumContractAbi;

                        if (!trx.function || typeof trx.function !== 'string') {
                            throw new Error('Invalid "function" name');
                        }

                        const abiItem = this.findFunctionAbi(abi, trx.function, context);
                        if (!abiItem) {
                            throw new Error(`Function "${trx.function}" not found in ABI`);
                        }

                        const args = this.buildArgsFromParams(abiItem, (trx.params as Record<string, unknown>) || {}, context);
                        const overrides: Record<string, unknown> = {};

                        // If payable, attach value
                        if ((abiItem as any).stateMutability === 'payable') {
                            const value = this.normalizeBigNumberish(trx.value, context);
                            if (value !== undefined) {
                                (overrides as any).value = value;
                            }
                        }

                        // Dynamic method invocation
                        // Note: for non-payable fn with no overrides, ethers tolerates call without overrides
                        const method = (ethersContract as any)[trx.function];
                        if (typeof method !== 'function') {
                            throw new Error(`Contract method "${trx.function}" is not callable`);
                        }

                        const tx = overrides && Object.keys(overrides).length > 0
                            ? await method(...args, overrides)
                            : await method(...args);

                        context.info('contract tx sent', { function: trx.function, args, hash: tx.hash });

                        // Adjust this line to your constructor/factory
                        observer.next(new EthereumTransactionResponse(tx.hash));
                        observer.complete();
                        return;
                    } catch (err) {
                        context.error('contract transaction failed', err);
                        observer.error(err);
                        return;
                    }
                } catch (error) {
                    context.error('signTransaction failed', error);
                    observer.error(error);
                    return;
                }
            })();
        });
    }

    // Helpers ----------

    // Helper: normalize value to BigNumberish or undefined
    protected normalizeBigNumberish(value: unknown, parent: W3oContext): bigint {
        logger.method('normalizeBigNumberish', { value }, parent);
        if (value === null || value === undefined) {
            throw new EthereumError(
                EthereumError.NOT_VALID_NUMBERISH,
                { value, message: 'could not normalize null or undefined' }
            )
        }
        try {
            return ethers.toBigInt(value as any);
        } catch {
           throw new EthereumError(
                EthereumError.NOT_VALID_NUMBERISH,
                { value, message: 'could not normalize to BigNumberish' }
            )
        }
    }

    // Helper: find ABI function by name
    protected findFunctionAbi(abi: EthereumContractAbi, fnName: string, parent: W3oContext): EthereumAbiItem | undefined {
        logger.method('findFunctionAbi', { abi, fnName }, parent);

        for (const item of abi) {
            if (typeof item === 'string') {
                const trimmed = item.trim();
                if (!trimmed.startsWith('function ')) {
                    continue;
                }

                try {
                    const fragment = FunctionFragment.from(trimmed);
                    if (fragment.type === 'function' && fragment.name === fnName) {
                        const parsed = JSON.parse(fragment.format('json')) as EthereumAbiItem;
                        return parsed;
                    }
                } catch (error) {
                    parent.warn('Failed to parse ABI function string', { item, error });
                }
                continue;
            }

            if (item.type === 'function' && item.name === fnName) {
                return item;
            }
        }

        return undefined;
    }

    // Helper: build ordered args from named params using the ABI inputs
    protected buildArgsFromParams(
        abiItem: EthereumAbiItem,
        params: Record<string, unknown>,
        parent: W3oContext,
    ): unknown[] {
        logger.method('buildArgsFromParams', { abiItem, params }, parent);
        const inputs = (abiItem as any).inputs as { name: string }[] | undefined;
        if (!inputs || inputs.length === 0) {
            return [];
        }
        return inputs.map(i => {
            const v = params[i.name];
            return v;
        });
    }


    snapshot(): any {
        return {
            ...super.snapshot(),
            _class: 'EthereumWallet',
        };
    }
}
