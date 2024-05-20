import { BigNumber, ethers } from "ethers";
import { AntelopeDebugTraceType, createTraceFunction } from "../../config";
import { AntelopeError, EvmABI, EvmFunctionParam, EvmTransactionResponse, addressString } from "../../types";
import { AntAuthenticator } from "../AntAuthenticator";

// EVMAuthenticator class
export abstract class EVMAuthenticator extends AntAuthenticator {

    constructor(label: string) {
        super(label);
    }

    /**
     * This method should be redefined on the derived class to perform any logout action if needed.
     */
    async logout(): Promise<void> {
        this.trace('logout');
    }

    /**
     * This method MUST be implemented on the derived class to perform any login action if needed.
     * However, the subclass may call this super class implementation to ensure the chain to connect to
     * is the same as the one the used wallet is connected to.
     * @param network network to connect to
     * @returns the account address of the user
     */
    async login(network: string): Promise<addressString | null> {
        /*this.trace('login', network);
        const chain = useChainStore();
        try {
            chain.setChain(CURRENT_CONTEXT, network);

            const checkProvider = await this.ensureCorrectChain() as ethers.providers.Web3Provider;

            const accounts = await checkProvider.listAccounts();
            if (accounts.length > 0) {
                return accounts[0] as addressString;
            } else {
                if (!checkProvider.provider.request) {
                    throw new AntelopeError('antelope.evm.error_support_provider_request');
                }
                const accessGranted = await checkProvider.provider.request({ method: 'eth_requestAccounts' });
                if (accessGranted.length < 1) {
                    return null;
                }
                return accessGranted[0] as addressString;
            }
        } catch (error) {
            if ((error as unknown as ExceptionError).code === 4001) {
                throw new AntelopeError('antelope.evm.error_connect_rejected');
            } else {
                console.error('Error:', error);
                throw new AntelopeError('antelope.evm.error_login');
            }
        }*/
        console.error('login not implemented');
        return null;
    }

    async ensureCorrectChain(): Promise<ethers.providers.Web3Provider> {
        /*this.trace('ensureCorrectChain');
        if (usePlatformStore().isMobile) {
            // we don't have tools to check the chain on mobile
            return useEVMStore().ensureCorrectChain(this);
        } else {
            const showSwitchNotification = !(await this.isConnectedToCorrectChain());
            return useEVMStore().ensureCorrectChain(this).then((result) => {
                if (showSwitchNotification) {
                    const ant = getAntelope();
                    const networkName = useChainStore().getChain(this.label).settings.getDisplay();
                    ant.config.notifyNeutralMessageHandler(
                        ant.config.localizationHandler('antelope.wallets.network_switch_success', { networkName }),
                    );
                }
                return result;
            });
        }*/
        console.error('ensureCorrectChain not implemented');
        return new Promise<ethers.providers.Web3Provider>(() => {});
    }

    async isConnectedToCorrectChain(): Promise<boolean> {
        /*const correctChainId = useChainStore().getChain(this.label).settings.getChainId();
        return this.isConnectedTo(correctChainId);*/
        console.error('isConnectedToCorrectChain not implemented');
        return false;
    }

    /**
     * This method returns the balance of the system token for the given address using the authenticator's provider.
     * The authenticator may reimplement this method to use a different provider if needed.
     * @param address address of the account to get the balance of
     * @returns the balance of the system token for the given address
     */
    async getSystemTokenBalance(address: addressString | string): Promise<ethers.BigNumber> {
        /*this.trace('getSystemTokenBalance', address);
        try {
            const provider = await this.web3Provider();
            if (provider) {
                return provider.getBalance(address);
            } else {
                throw new AntelopeError('antelope.evm.error_no_provider');
            }
        } catch (e) {
            console.error('getSystemTokenBalance', e, address);
            throw e;
        }*/
        console.error('getSystemTokenBalance not implemented');
        return ethers.constants.Zero;
    }

    /**
     * This method returns the balance of the given ERC20 token for the given address using the authenticator's provider.
     * The authenticator may reimplement this method to use a different provider if needed.
     * @param address address of the account to get the balance of
     * @param token address of the ERC20 token to get the balance of
     * @returns the balance of the given ERC20 token for the given address
     */
    async getERC20TokenBalance(address: addressString | string, token: addressString): Promise<ethers.BigNumber> {
        /*this.trace('getERC20TokenBalance', [address, token]);
        try {
            const provider = await this.web3Provider();
            if (provider) {
                const erc20Contract = new ethers.Contract(token, erc20Abi, provider);
                const balance = await erc20Contract.balanceOf(address);
                return balance;
            } else {
                throw new AntelopeError('antelope.evm.error_no_provider');
            }
        } catch (e) {
            console.error('getERC20TokenBalance', e, address, token);
            throw e;
        }*/
        console.error('getERC20TokenBalance not implemented');
        return ethers.constants.Zero;
    }

    abstract isConnectedTo(chainId: string): Promise<boolean>;
    abstract externalProvider(): Promise<ethers.providers.ExternalProvider>;
    abstract web3Provider(): Promise<ethers.providers.Web3Provider>;

    async getSigner(): Promise<ethers.Signer> {
        /*const web3Provider = await this.web3Provider();
        return web3Provider.getSigner();*/
        console.error('getSigner not implemented');
        return new ethers.VoidSigner('0x');
    }

    // Common auxiliary functions -----

    /**
     * This is a simple getter for the associated account address according to the label
     * @returns the account address
     */
    getAccountAddress(): addressString {
        /*return useAccountStore().getAccount(this.label).account as addressString;*/
        console.error('getAccountAddress not implemented');
        return '0x';
    }

    /**
     * This is a simple getter for the associated chain settings according to the label
     */
    // getChainSettings(): EVMChainSettings {
    //     /*return (useChainStore().getChain(this.label).settings as EVMChainSettings);*/
    //     console.error('getChainSettings not implemented');
    //     return {} as EVMChainSettings;
    // }

    /**
     * This method indicates the authenticator is ready to transfer tokens.
     * TODO: This is only needed for WalletConnect. We need to refactor this implementation to remove this particularity.
     */
    readyForTransfer(): boolean {
        return true;
    }

    // ----- Signing transactions -----
    /**
     * This is the main method to sign any transaction and MUST be implemented on the derived class.
     * @param contract address of the contract to be called
     * @param abi ABI of the specific function on the contract to be called
     * @param parameters list of parameters to be passed to the function
     * @param value amount of system tokens to send with the transaction if any
     */
    abstract signCustomTransaction(contract: string, abi: EvmABI, parameters: EvmFunctionParam[], value?: BigNumber): Promise<EvmTransactionResponse>;

    /**
     * This method is used to send system tokens and MUST be implemented on the derived class since it depends on the authenticator.
     * @param to address of the recipient
     * @param value amount of system tokens to send
     */
    abstract sendSystemToken(to: string, value: ethers.BigNumber): Promise<EvmTransactionResponse>;

    /**
     * This method creates and throws an AntelopeError with the corresponding message.
     * It is useful to handle specific error codes that may indicate a particular known error situation.
     * Also is useful to detect when the user cancelled the transaction, which should be handled as a rejection instead of an error.
     * @param error catch error to be handled
     */
    abstract handleCatchError(error: never): AntelopeError;


}
