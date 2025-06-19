# Web3 Octopus

[Demo](https://vapaee.github.io/web3-octopus)

**This framework is still in development.**

Web3 Octopus is a TypeScript framework that simplifies the management of multiple blockchains at the same time. Its modular architecture lets you include only the components required by each project.

## Architecture
The framework relies on three basic concepts:
- **Authentication** – handles user identification and transaction signing.
- **Network** – represents the data and contracts of a specific blockchain.
- **Services** – modules that simplify the interaction with one or more contracts.

This approach allows you to create implementations for any family of networks.

## Included packages
- **`@vapaee/w3o-core`** – base classes for the framework.
- **`@vapaee/w3o-antelope`** – support for Antelope (EOSIO) chains.
- **`@vapaee/w3o-ethereum`** – support for Ethereum compatible chains.

A simple Angular example using these packages can be found in the `dev/` directory.

## Usage example
```typescript
import {
    Web3Octopus,
    W3oService,
    W3oNetworkSupportSettings,
    W3oContextFactory
} from '@vapaee/w3o-core';
import {
    AntelopeTokensService,
    AntelopeResourcesService,
    AntelopeChainSupport,
    TelosZeroNetwork,
    TelosZeroTestnetNetwork
} from '@vapaee/w3o-antelope';
import {
    EthereumChainSupport,
    EthereumTokensService,
    TelosEVMNetwork
} from '@vapaee/w3o-ethereum';

const logger = new W3oContextFactory('Web3OctopusService');
const octopus = new Web3Octopus();

const telosSupportSettings: W3oNetworkSupportSettings = {
    type: 'antelope',
    chain: new AntelopeChainSupport(logger),
    networks: [
        new TelosZeroNetwork({}, logger),
        new TelosZeroTestnetNetwork({}, logger)
    ]
};
octopus.addNetworkSupport(telosSupportSettings, logger);

const telosEvmSupportSettings: W3oNetworkSupportSettings = {
    type: 'ethereum',
    chain: new EthereumChainSupport(logger),
    networks: [ new TelosEVMNetwork({}, logger) ]
};
octopus.addNetworkSupport(telosEvmSupportSettings, logger);

const services: W3oService[] = [
    new AntelopeTokensService('antelope.tokens', logger),
    new AntelopeResourcesService('antelope.resources', logger),
    new EthereumTokensService('ethereum.tokens', logger),
];
octopus.registerServices(services);
octopus.init({ appName: 'VortDEX', multiSession: false, autoLogin: true }, logger);

export function getOctopus(): Web3Octopus {
    return octopus;
}
```

From anywhere else in the project you can do the following:

```typescript
import { getOctopus } from '...';

getOctopus().services['ethereum.tokens'];
```

## Installation
```bash
npm install
npm run build
```
The `build` script compiles the local packages and leaves everything ready under each `lib` folder.

## Dependencies
- **rxjs** – All internal data is handled as observables making reactive state management easier.
- **typescript** – Provides a robust and agnostic environment allowing Web3 Octopus to integrate with other tools.

## Main classes
| #  | Entity                   | Type            | Role                                                 |
|----|-------------------------|-----------------|------------------------------------------------------|
| 1  | W3oNetworkType          | Type            | Defines the supported blockchain network types.      |
| 2  | W3oNetworkName          | Type            | Unique identifier for a blockchain network.          |
| 3  | W3oAddress              | Type            | Represents a user address or account.                |
| 4  | W3oError                | Class           | Error handling with code and payload.                |
| 5  | W3oAuthenticator        | Abstract class  | Base for authenticator implementations.              |
| 6  | W3oTransaction          | Interface       | Common transaction model.                            |
| 7  | W3oTransactionResponse  | Class           | Result of signing a transaction.                     |
| 8  | W3oTransactionReceipt   | Interface       | Receipt confirming transaction execution.            |
| 9  | W3oAccount              | Class           | User account information and state.                  |
| 10 | W3oNetwork              | Abstract class  | Represents a specific blockchain.                    |
| 11 | W3oNetworkLinks         | Interface       | Useful links like explorer or bridge.                |
| 12 | W3oContractManager      | Class           | Manages and caches deployed contracts.               |
| 13 | W3oContractABI          | Interface       | Describes a contract's ABI.                          |
| 14 | W3oToken                | Class           | Token representation.                                |
| 15 | W3oContract             | Class           | Deployed contract representation.                    |
| 16 | W3oNetworkManager       | Class           | Registered networks management.                      |
| 17 | W3oNetworkSupportSettings | Interface     | Configuration for networks and authenticators.       |
| 18 | W3oNetworkSettings      | Interface       | Specific network configuration data.                 |
| 19 | W3oService              | Class           | High level logic over contracts and tokens.          |
| 20 | W3oSessionManager       | Class           | Handles multiple user sessions.                      |
| 21 | W3oSession              | Class           | Session data and its network.                        |
| 22 | Web3Octopus             | Class           | Main entry point of the framework.                   |
