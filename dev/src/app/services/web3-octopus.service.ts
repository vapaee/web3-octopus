// src/app/services/web3-octopus.service.ts

import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

// Web3Octopus

// import the main class from the core
import {
    Web3Octopus,                          // the main class
    W3oService,                           // interface that includes the snapshot function
    W3oNetworkSupportSettings,            // interface that includes the network support settings
    W3oContextFactory,                    // logger class
} from '@vapaee/w3o-core';

// import the classes to support Antelope (EOSIO) networks
import {
    AntelopeTokensService,                // extends W3oService
    AntelopeResourcesService,
    AntelopeChainSupport,
    TelosZeroNetwork,
    TelosZeroTestnetNetwork,
} from '@vapaee/w3o-antelope';
// import the classes to support Ethereum networks
import {
    EthereumChainSupport,
    EthereumTokensService,
    TelosEVMNetwork,
} from '@vapaee/w3o-ethereum';

import { VortDEXw3oServices } from '@app/types';

// declare the window.v3o object which is used to store the instance of Web3Octopus so any javascript code can access it through window.v3o
declare global {
    interface Window {
        w3o: Web3Octopus<VortDEXw3oServices>;
    }
}

const logger = new W3oContextFactory('Web3OctopusService');

@Injectable({
    providedIn: 'root',
})
export class Web3OctopusService implements OnDestroy {
    private destroy$ = new Subject<void>();
    public octopus!: Web3Octopus<VortDEXw3oServices>;
    constructor() {
        const context = logger.method('constructor');
        try {
            const octopus = new Web3Octopus<VortDEXw3oServices>(context);
            this.octopus = octopus;
            window.w3o = octopus; // assign the instance to the window object so it can be accessed from anywhere
            // ---- Register Telos/EOS support ----
            const telosSupportSettings: W3oNetworkSupportSettings = {
                // Network type
                type: 'antelope',
                // chain support implementation
                chain: new AntelopeChainSupport(context),
                // list of supported Antelope networks
                networks: [
                    new TelosZeroNetwork({}, context),
                    new TelosZeroTestnetNetwork({}, context),
                ]
            }
            this.octopus.addNetworkSupport(telosSupportSettings, context);

            // ---- Register Telos EVM support ----
            const telosEvmSupportSettings: W3oNetworkSupportSettings = {
                type: 'ethereum',
                chain: new EthereumChainSupport(context),
                networks: [
                    new TelosEVMNetwork({}, context),
                ]
            }
            this.octopus.addNetworkSupport(telosEvmSupportSettings, context);

            // ---- Register the services ----
            // paths must match the keys in the IMyServices interface
            const services: W3oService[] = [
                new AntelopeTokensService('antelope.tokens', context),
                new AntelopeResourcesService('antelope.resources', context),
                new EthereumTokensService('ethereum.tokens', context),
            ];
            octopus.registerServices(services);
            octopus.init(
                {
                    appName: 'VortDEX',
                    multiSession: false,
                    autoLogin: true,
                },
                context
            );

        } catch (error) {
            context.error('constructor', error);
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
