
import { EthereumProvider } from '../../types/Providers';
import { EVMAuthenticator } from './EVMAuthenticator';
import { InjectedProviderEvmAuth } from './InjectedProviderEvmAuth';
import { MetaKeep } from 'metakeep';
import { AntelopeError, addressString } from '../../types';

import { ethers } from 'ethers';

import { metakeepCache } from '../utils/metakeep-cache';

const CURRENT_CONTEXT = 'current';

export interface MetakeepOptions {
    appId: string;
    appName: string;
    reasonCallback?: (transaction: never) => string;
}

let metakeep: MetaKeep | null = null;
let web3Provider: ethers.providers.Web3Provider | null = null;

const name = 'MetaKeepEvm';
export const MetaKeepEvmAuthName = name;
export class MetaKeepEvmAuth extends InjectedProviderEvmAuth {

    accountAddress = '';
    accountEmail = '';
    appId = '';
    appName = '';
    reasonCallback?: (transaction: never) => string;

    // this is just a dummy label to identify the authenticator base class
    constructor(options: MetakeepOptions, label = name) {
        super(label);
        if (!options?.appId) {
            throw new AntelopeError('antelope.evm.error_metakeep_app_id');
        }
        this.appId = options.appId;
        this.appName = options.appName;
        this.reasonCallback = options.reasonCallback;
        this.accountEmail = metakeepCache.getLogged() ?? '';
    }

    // InjectedProviderEvmAuth API ------------------------------------------------------

    getProvider(): EthereumProvider | null {
        return window.ethereum as unknown as EthereumProvider ?? null;
    }

    // EVMAuthenticator API ----------------------------------------------------------

    getName(): string {
        return name;
    }

    setEmail(email: string): void {
        this.accountEmail = email;
        metakeepCache.setLogged(email);
    }

    // this is the important instance creation where we define a label to assign to this instance of the authenticator
    newInstance(label: string): MetaKeepEvmAuth {
        this.trace('newInstance', label);
        const auth = new MetaKeepEvmAuth({
            appId: this.appId,
            appName: this.appName,
            reasonCallback: this.reasonCallback,
        }, label);
        auth.setEmail(this.accountEmail);
        return auth;
    }

    async assertMetakeepSDKReady(): Promise<void> {
        console.error('assertMetakeepSDKReady() not implemented');
        /*
        this.trace('assertMetakeepSDKReady', metakeep);
        if (!metakeep) {
            const chainSettings = (useChainStore().getChain(CURRENT_CONTEXT).settings as EVMChainSettings);
            const endpoint = chainSettings.getRPCEndpoint();
            const url = `${endpoint.protocol}://${endpoint.host}:${endpoint.port}${endpoint.path ?? ''}`;

            const chainId: number = parseInt(chainSettings.getChainId());


            const rpcNodeUrls = {
                [chainId]: url,
            } as unknown as Map<number, string>;

            metakeep = new MetaKeep({
                // App id to configure UI
                appId: this.appId,
                // Default chain to use
                chainId,
                // RPC node urls map
                rpcNodeUrls,
                // Signed in user's email address
                user: {
                    email: this.accountEmail,
                },
            });

            const provider = await metakeep.ethereum;
            await provider.enable();
            web3Provider = new ethers.providers.Web3Provider(provider);
        }
        */
    }

    async login(network: string): Promise<addressString | null> {
        this.trace('login', network);
        // useFeedbackStore().setLoading(`${this.getName()}.login`);

        await this.assertMetakeepSDKReady();

        // metakeepCache
        const accountAddress = metakeepCache.getEthAddress(this.accountEmail);
        if (accountAddress) {
            this.accountAddress = accountAddress;
            // useFeedbackStore().unsetLoading(`${this.getName()}.login`);
            return this.accountAddress as addressString;
        }


        const provider = await this.web3Provider();
        this.accountAddress = await provider.getSigner().getAddress();

        // useFeedbackStore().unsetLoading(`${this.getName()}.login`);


        const credentials = await metakeep?.getWallet();
        metakeepCache.addCredentials(this.accountEmail, credentials.wallet);

        return this.accountAddress as addressString;
    }

    async logout(): Promise<void> {
        this.trace('logout');
        metakeepCache.setLogged('');
        return Promise.resolve();
    }

    async isConnectedTo(chainId: string): Promise<boolean> {
        this.trace('isConnectedTo', chainId);
        return true;
    }

    async web3Provider(): Promise<ethers.providers.Web3Provider> {
        this.trace('web3Provider');
        await this.assertMetakeepSDKReady();
        if (web3Provider) {
            return web3Provider;
        } else {
            console.error('web3Provider not ready');
            throw new AntelopeError('antelope.evm.error_metakeep_web3_provider');
        }
    }

    // returns the associated account address according to the label
    getAccountAddress(): addressString {
        return this.accountAddress as addressString;
    }

    handleCatchError(error: Error): AntelopeError {
        this.trace('handleCatchError', error.message);
        if (
            (error as unknown as {status:string}).status === 'USER_REQUEST_DENIED'
        ) {
            return new AntelopeError('antelope.evm.error_transaction_canceled');
        } else {
            return new AntelopeError('antelope.evm.error_send_transaction', { error });
        }
    }
}
