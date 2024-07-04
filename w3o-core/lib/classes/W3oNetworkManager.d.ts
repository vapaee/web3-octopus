import { W3oNetwork } from '.';
import { W3oNetworkName } from '../types';
export declare class W3oNetworkManager {
    registerNetwork(network: W3oNetwork): void;
    getNetwork(name: W3oNetworkName): W3oNetwork;
    getNetworks(): W3oNetwork[];
    getCurrentNetwork(): W3oNetwork;
    setCurrentNetwork(name: W3oNetworkName): void;
    updateState(): Promise<void>;
    snapshot(): any;
}
