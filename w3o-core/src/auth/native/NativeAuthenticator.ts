import { AntAuthenticator } from "../AntAuthenticator";

export abstract class NativeAuthenticator extends AntAuthenticator {

    constructor(label: string) {
        super(label);
    }

}