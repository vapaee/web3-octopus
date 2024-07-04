import { W3oContractManager, W3oToken } from '.';
import { W3oNetworkLinks, W3oNetworkName, W3oNetworkSettings, W3oNetworkType } from '../types';
export declare abstract class W3oNetwork {
    settings: W3oNetworkSettings;
    constructor(settings: W3oNetworkSettings);
    abstract getNetworkType(): W3oNetworkType;
    abstract getName(): W3oNetworkName;
    abstract getChainId(): string;
    abstract getDisplayName(): string;
    abstract getLinks(): W3oNetworkLinks;
    abstract getContractManager(): W3oContractManager;
    abstract getSystemToken(): W3oToken;
    abstract getTokensList(): Promise<W3oToken[]>;
    abstract updateState(): Promise<void>;
    abstract snapshot(): any;
}
