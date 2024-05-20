import { BigNumber, ethers } from 'ethers';
import { BehaviorSubject, filter, map } from 'rxjs';
import {
    AntelopeError,
    EthereumProvider,
    EvmABI,
    EvmFunctionParam,
    EvmTransactionResponse,
    addressString,
} from '../../types';
import { EVMAuthenticator } from './EVMAuthenticator';

export abstract class InjectedProviderEvmAuth extends EVMAuthenticator {
    onReady = new BehaviorSubject<boolean>(false);

    // this is just a dummy label to identify the authenticator base class
    constructor(label: string) {
        super(label);
        this.initInjectedProvider(this);
    }

    async initInjectedProvider(authenticator: InjectedProviderEvmAuth): Promise<void> {
        this.trace('initInjectedProvider', authenticator.getName(), [authenticator.getProvider()]);
        const provider: EthereumProvider | null = authenticator.getProvider();
        console.error('initInjectedProvider() not implemented');
        authenticator.onReady.next(true);
    }


    async login(network: string): Promise<addressString | null> {
        // const chainSettings = this.getChainSettings();
        // const authName = this.getName();
        this.trace('login', network);
        console.error('login() not implemented');
        return null;
    }

    abstract getProvider(): EthereumProvider | null;

    async ensureInitializedProvider(): Promise<ethers.providers.ExternalProvider> {
        return new Promise((resolve, reject) => {
            this.onReady.asObservable().pipe(
                filter(ready => ready),
                map(() => this.getProvider()),
            ).subscribe((provider) => {
                if (provider) {
                    resolve(provider);
                } else {
                    reject(new AntelopeError('antelope.evm.error_no_provider'));
                }
            });
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleCatchError(error: any): AntelopeError {
        this.trace('handleCatchError', error);
        if ('ACTION_REJECTED' === ((error as {code:string}).code)) {
            return new AntelopeError('antelope.evm.error_transaction_canceled');
        } else {
            // unknown error we print on console
            console.error(error);
            return new AntelopeError('antelope.evm.error_send_transaction', { error });
        }
    }

    // this action is used by MetamaskAuth.transferTokens()
    async sendSystemToken(to: string, amount: ethers.BigNumber): Promise<EvmTransactionResponse> {
        this.trace('sendSystemToken', to, amount);
        const value = amount.toHexString();

        // Send the transaction
        return (await this.getSigner()).sendTransaction({
            to,
            value,
        }).then(
            (transaction: ethers.providers.TransactionResponse) => transaction,
        ).catch((error) => {
            throw this.handleCatchError(error);
        });
    }

    // EVMAuthenticator API ----------------------------------------------------------

    async signCustomTransaction(contract: string, abi: EvmABI, parameters: EvmFunctionParam[], value?: BigNumber): Promise<EvmTransactionResponse> {
        this.trace('signCustomTransaction', contract, [abi], parameters, value?.toString());

        const method = abi[0].name;
        if (abi.length > 1) {
            console.warn(
                `signCustomTransaction: abi contains more than one function,
                we asume the first one (${method}) is the one to be called`,
            );
        }

        const signer = await this.getSigner();
        const contractInstance = new ethers.Contract(contract, abi, signer);
        const transaction = await contractInstance[method](...parameters, { value });
        return transaction;
    }

    async isConnectedTo(chainId: string): Promise<boolean> {
        this.trace('isConnectedTo', chainId);
        console.error('isConnectedTo() not implemented');
        return false;
    }

    async externalProvider(): Promise<ethers.providers.ExternalProvider> {
        return this.ensureInitializedProvider();
    }

    async web3Provider(): Promise<ethers.providers.Web3Provider> {
        this.trace('web3Provider');
        const web3Provider = new ethers.providers.Web3Provider(await this.externalProvider());
        await web3Provider.ready;
        return web3Provider;
    }

}
