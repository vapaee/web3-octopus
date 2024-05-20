import { NativeAuthenticator } from './NativeAuthenticator';
import { TelosCloud, TelosCloudOptions } from '@vapaee/telos-cloud';

const name = 'TelosCloudNative';
/*
const authenticator = new TelosCloudNativeAuth('teloscloud', {
    appName: 'Telos Zero',
    chain: {
        chainId: '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11', // telos mainnet
        rpcEndpoint: 'https://mainnet.telos.net',
    },
    fuel: {
        rpcEndpoint: 'https://telos.greymass.com',
        hyperionEndpoint: 'https://mainnet.telos.net',
    },
    metakeep: {
        appId: 'ad5e05fb-280a-41ae-b186-5a2654567b92',
    },
    googleOneTap: {
        appId: '639241197544-kcubenhmti6u7ef3uj360n2lcl5cmn8c.apps.googleusercontent.com',
        buttonId: 'google_btn',
    },
    accountCreation: {
        allowRedirect: true,
    }
}
*/
export class TelosCloudNativeAuth extends NativeAuthenticator {

    telos: TelosCloud;
    email: string | null = null;
    jwt: string | null = null;

    constructor(public config: TelosCloudOptions, label = name) {
        super(label);

        // -- telos cloud instance --
        this.telos = new TelosCloud(config);
    }

    getName(): string {
        return name;
    }

    async logout(): Promise<void> {
        this.trace('logout');
        const result = this.telos.onLogout.toPromise();
        this.telos.logout();
        return result;
    }

    async login(network: string): Promise<string | null> {
        this.trace('login', network);
        if (!this.email || !this.jwt) {
            console.error('ERROR: TelosCloudNativeAuth.login() -> email or jwt not set');
            return null;
        }
        const result = this.telos.onLogin.toPromise();
        this.telos.performTelosCloudLogin({
            email: this.email,
            jwt: this.jwt,
        });
        return result;
    }


    // this is the important instance creation where we define a label to assign to this instance of the authenticator
    newInstance(label: string): TelosCloudNativeAuth {
        this.trace('newInstance', label);
        return new TelosCloudNativeAuth(this.config, label);
    }
    
    // own methods
    setEmail(email: string): void {
        this.trace('setEmail', email);
        this.email = email;
    }

    setJWT(jwt: string): void {
        this.trace('setJWT', jwt);
        this.jwt = jwt;
    }

}