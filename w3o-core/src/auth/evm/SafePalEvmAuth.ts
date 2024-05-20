import { EthereumProvider } from '../../types';
import { EVMAuthenticator } from './EVMAuthenticator';
import { InjectedProviderEvmAuth } from './InjectedProviderEvmAuth';

const name = 'SafePal';
export const SafePalEvmAuthName = name;
export class SafePalEvmAuth extends InjectedProviderEvmAuth {

    // this is just a dummy label to identify the authenticator base class
    constructor(label = name) {
        super(label);
    }

    // InjectedProviderEvmAuth API ------------------------------------------------------

    getProvider(): EthereumProvider | null {
        return (window as unknown as {safepalProvider:unknown}).safepalProvider as EthereumProvider ?? null;
    }

    // EVMAuthenticator API ----------------------------------------------------------

    getName(): string {
        return name;
    }

    // this is the important instance creation where we define a label to assign to this instance of the authenticator
    newInstance(label: string): SafePalEvmAuth {
        this.trace('newInstance', label);
        return new SafePalEvmAuth(label);
    }
}
