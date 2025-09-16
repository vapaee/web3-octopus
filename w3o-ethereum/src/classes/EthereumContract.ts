import { ethers } from 'ethers';
import {
    W3oContext,
    W3oContract,
} from '@vapaee/w3o-core';
import { EthereumContractAbi } from "../types";

export class EthereumContract extends W3oContract {
    constructor(
        address: string,
        name: string,
        abi: EthereumContractAbi,
        parent: W3oContext
    ) {
        super(address, name, abi, parent);
    }

    /** Returns an ethers.js Contract bound to a signer when possible */
    getEthersContract(provider: ethers.providers.Web3Provider): ethers.Contract {
        const signer = provider.getSigner ? provider.getSigner() : undefined;
        return new ethers.Contract(
            this.address,
            this.abi as EthereumContractAbi,
            signer ?? provider
        );
    }

    /** Returns a read-only ethers.js Contract (no signer required) */
    getReadOnlyContract(provider: ethers.providers.Provider): ethers.Contract {
        return new ethers.Contract(this.address, this.abi as EthereumContractAbi, provider);
    }
}