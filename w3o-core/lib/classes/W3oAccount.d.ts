import { W3oAuthenticator } from '.';
export declare abstract class W3oAccount {
    authenticator: W3oAuthenticator;
    constructor(authenticator: W3oAuthenticator);
    abstract getAddress(): string;
    abstract snapshot(): any;
}
