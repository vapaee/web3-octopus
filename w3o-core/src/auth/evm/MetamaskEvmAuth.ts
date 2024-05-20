import { EthereumProvider } from '../../types';
import { EVMAuthenticator } from './EVMAuthenticator';
import { InjectedProviderEvmAuth } from './InjectedProviderEvmAuth';

const name = 'Metamask';
export const MetamaskEvmAuthName = name;
export class MetamaskEvmAuth extends InjectedProviderEvmAuth {

    // this is just a dummy label to identify the authenticator base class
    constructor(label = name) {
        super(label);
    }

    // InjectedProviderEvmAuth API ------------------------------------------------------

    getProvider(): EthereumProvider | null {
        return window.ethereum as unknown as EthereumProvider ?? null;
    }

    // EVMAuthenticator API ----------------------------------------------------------

    getName(): string {
        return name;
    }

    // this is the important instance creation where we define a label to assign to this instance of the authenticator
    newInstance(label: string): MetamaskEvmAuth {
        this.trace('newInstance', label);
        return new MetamaskEvmAuth(label);
    }

}
