import { W3oAuthenticator, W3oModule, W3oNetwork, W3oNetworkManager, W3oNetworkSupportFactory, W3oSessionManager } from '.';
export declare class Web3Octopus<CustomServicesType> {
    private _services;
    addNetworkSupport(factory: W3oNetworkSupportFactory<W3oNetwork, W3oAuthenticator>): void;
    get sessions(): W3oSessionManager;
    get networks(): W3oNetworkManager;
    init(): void;
    get services(): CustomServicesType;
    registerServices(service: W3oModule<CustomServicesType>[]): void;
    private createService;
    snapshot(): any;
}
