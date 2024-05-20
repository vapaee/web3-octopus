import { AntelopeDebugTraceType, createTraceFunction } from "../config";
import { addressString } from "../types";


export abstract class AntAuthenticator {
    readonly label: string;
    readonly trace: AntelopeDebugTraceType;

    constructor(label: string) {
        this.label = label;
        const name = `${this.getName()}(${label})`;
        this.trace = createTraceFunction(name);
    }

    // ----- getters -----
    abstract getName(): string;

    // ----- methods -----
    abstract logout(): Promise<void>;
    abstract login(network: string): Promise<string | null>;


    /**
     * This method should be used to create a new instance of the same authenticator type but with a different label/context.
     * @param label new label/context for the new instance which identifies the account and the connected network
     */
    abstract newInstance(label: string): AntAuthenticator;
}