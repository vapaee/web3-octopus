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
    async getEthersContract(provider: ethers.BrowserProvider): Promise<ethers.Contract> {
        const signer = provider.getSigner ? await provider.getSigner() : undefined;
        return new ethers.Contract(
            this.address,
            this.abi as EthereumContractAbi,
            signer ?? provider
        );
    }

    /** Returns a read-only ethers.js Contract (no signer required) */
    getReadOnlyContract(provider: ethers.Provider): ethers.Contract {
        return new ethers.Contract(this.address, this.abi as EthereumContractAbi, provider);
    }
}