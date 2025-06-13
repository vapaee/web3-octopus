
# Web3 Octopus

**This framework is still in development.**

Web3 Octopus is a TypeScript framework designed to facilitate handling multiple active connections with different blockchains simultaneously. It has an architecture designed for the incorporation of new functionalities in the form of plugins so that the final developer can take only the modules they are interested in using and build their own version of Octopus.

# Architecture
Web3 Octopus is a framework that, in its most abstract layer, is based on three well-differentiated concepts common to all blockchains: Authentication, Network, and Modules.

- **Authentication**: Handles user identification, login, and transaction signing. It provides methods to check if the user is authenticated, obtain their address or ID, and their extended data depending on the blockchain.
- **Network**: Represents specific blockchain data, including its identification (id, name, title, system coin), list of tokens, and endpoints. It manages information about the contracts and tokens that exist on the network, allowing for updated and relevant data retrieval. It is responsible for providing contract abstractions from their ABI. That is an interactive object that abstracts the way of interacting with the real contract and extracting public data from it.
- **Services**: These are abstractions of functionalities whose implementation is heavily based on interaction with contracts on the blockchain. They handle obtaining data from where it needs to be taken and making it available to the developer, using observers to trigger internal actions as well as to provide always updated data externally. They also tend to abstract the complexity that often exists in systems with multiple contracts deployed on one or more blockchains.

This architecture aims to establish the foundations for a uniform solution in the crypto ecosystem, allowing developers to create and publish very specific business modules and benefit from all the modules already created by the community.

Let's see an example of the final use of configuring Web3 Octopus to interact with four different blockchains:

```typescript
// import the main class from the core
import {
    Web3Octopus,                          // the main class
    W3oIServices,                         // interface that includes the snapshot function
} from '@vapaee/w3o-core';
git branch -D 

// import the classes to support Ethereum/EVM networks
import {
    EthereumNetwork,                      // extends W3oNetwork
    EthereumTokensService,                // extends W3oService
    EthereumBalancesService,              // extends W3oService
    EthereumMetamaskAuth,                 // extends W3oAuthenticator
    EthereumBraveAuth,                    // extends W3oAuthenticator
    EthereumWalletConnectAuth,            // extends W3oAuthenticator
} from '@vapaee/w3o-ethereum';

// import the classes to support Antelope (EOSIO) networks
import {
    AntelopeNetwork,                      // extends W3oNetwork
    AntelopeTokensService,                // extends W3oService
    AntelopeBalancesService,              // extends W3oService
    AntelopeAnchorAuth,                   // extends W3oAuthenticator
} from '@vapaee/w3o-antelope';

// import the configuration for each of the four Telos networks
import {
    TelosEvmConfigJSON,                   // contains the mainnet evm network configuration JSON
    TelosEvmTestnetConfigJSON,            // contains the testnet evm network configuration JSON
    TelosZeroConfigJSON,                  // contains the mainnet native network configuration JSON
    TelosZeroTestnetConfigJSON,           // contains the testnet native network configuration JSON
} from '@vapaee/w3o-telos';

// import the configuration just for EOS networks
import {
    EOSConfigJSON,                        // contains the mainnet native network configuration JSON
} from '@vapaee/w3o-eos';

// ---- Create the main class instance ----
// the developer user may be creative and create his own service schema
interface IMyServices extends W3oIServices {
    evm: {
        tokens: EthereumTokensService;     // extends W3oService
        balances: EthereumBalancesService; // extends W3oService
    },
    zero: {
        tokens: AntelopeTokensService;     // extends W3oService
        balances: AntelopeBalancesService; // extends W3oService
    },
    example: ExampleService;               // extends W3oService, user module
    foo: FooService;                       // extends W3oService, user module
}
const octopus = new Web3Octopus<IMyServices>();

// ---- Register Telos EVM support ----
const telosEvmSupportSettings: W3oNetworkSupportSettings<IMyServices> = {
    // Network type
    type: 'ethereum',
    // list of supported wallets for Ethereum-like networks
    auth: [
        new EthereumMetamaskAuth(octopus),
        new EthereumBraveAuth(octopus),
        new EthereumWalletConnectAuth(octopus)
    ],
    // list of supported Ethereum-like networks
    networks: [
        new EthereumNetwork(TelosEvmConfigJSON, octopus),
        new EthereumNetwork(TelosEvmTestnetConfigJSON, octopus)
    ]
}
octopus.addNetworkSupport(telosEvmSupportSettings);

// ---- Register Telos/EOS support ----
const telosEosSupportSettings: W3oNetworkSupportSettings<IMyServices> = {
    // Network type
    type: 'antelope',
    // list of supported wallets for Antelope networks
    auth: [
        new AntelopeAnchorAuth(octopus)
    ],
    // list of supported Antelope networks
    networks: [
        new AntelopeNetwork(TelosZeroConfigJSON, octopus), 
        new AntelopeNetwork(TelosZeroTestnetConfigJSON, octopus), 
        new AntelopeNetwork(EOSConfigJSON, octopus), 
        new AntelopeNetwork(EOSTestnetConfigJSON, octopus)
    ]
}
octopus.addNetworkSupport(telosEosSupportSettings);

// ---- Register the services ----
// paths must match the keys in the IMyServices interface
const services = [
    new EthereumTokensService('evm.tokens', octopus),
    new EthereumBalancesService('evm.balances', octopus),
    new AntelopeTokensService('zero.tokens', octopus),
    new AntelopeBalancesService('zero.balances', octopus),
    new ExampleService('example', octopus),
    new FooService('foo', octopus)
];
octopus.registerServices(services);
octopus.init({
    multisession: true, // if false, W3oSessionManager we maitain always one open session and logout the user if the network changes
});

export function getOctopus(): Web3Octopus<IMyServices> {
    return octopus;
}
```

Then, from anywhere else in the project, we can do the following:

```typescript
// ejemplo de uso desde otro archivo
import { getOctopus } from '...';

getOctopus().services.evm.tokens.updateTokenList()
getOctopus().services.foo.bar();

```

# Dependencies
- **rxjs**: All internal data will be managed as observables, making it easier to handle reactive and asynchronous states within the framework.
- **typescript**: Provides a robust and framework-agnostic development environment, ensuring that Web3 Octopus can easily integrate with other technologies and development tools.

# Main Classes

| #  | Entity                    | Type             | Role                                                                                           |
|----|---------------------------|------------------|-----------------------------------------------------------------------------------------------|
| 1  | W3oNetworkType            | Type             | Defines the supported blockchain network types. Examples: "ethereum" | "antelope" | "eolana" |
| 2  | W3oNetworkName            | Type             | Represents the identifier name of a blockchain network.                                       |
| 3  | W3oAddress                | Type             | Represents the address or ID of a user on a blockchain.                                       |
| 4  | W3oError                  | Class            | Class for handling specific errors within the framework, with a message, code, and payload.   |
| 5  | W3oAuthenticator          | Abstract class   | Provides methods for user authentication, account management, and transaction signing.        |
| 6  | W3oTransaction            | Interface        | Represents a transaction on the blockchain; its specific implementation depends on the subclass.|
| 7  | W3oTransactionResponse    | Class            | Handles the response of a signed transaction, including the hash and awaiting transaction receipt.|
| 8  | W3oTransactionReceipt     | Interface        | Represents a transaction receipt, to be specified further.                                    |
| 9  | W3oAccount                | Class            | Manages user account data on the blockchain, providing methods to access their address and take a snapshot of their state.|
| 10 | W3oNetwork                | Abstract class   | Represents a blockchain network, and provides methods to obtain information about the network, contracts, and tokens.|
| 11 | W3oNetworkLinks           | Interface        | Defines useful links for a specific network, such as the explorer, bridge, ecosystem, website, and wallet.|
| 12 | W3oContractManager        | Class            | Manages contracts within a network, with internal cache and API to add, obtain, and list contracts.|
| 13 | W3oContractABI            | Interface        | Defines the interface for a contract's ABI (Application Binary Interface), to be specified in each implementation.|
| 14 | W3oToken                  | Class            | Represents a token on the blockchain, providing methods to obtain its information such as symbols, decimals, USD price, etc.|
| 15 | W3oContract               | Class            | Represents a contract on the blockchain, provides methods to obtain its ABI, and takes a snapshot of its state.|
| 16 | W3oNetworkManager         | Class            | Manages the networks registered in the framework, allowing their state to be updated and accessing the current network.|
| 17 | W3oNetworkSupportFactory  | Class            | Provides support for a family of networks, handling the authentication and specific configuration of each network.|
| 18 | W3oNetworkSupportSettings | Interface        | Defines support configuration, including authenticators and network settings.                 |
| 19 | W3oAuthenticatorSettings  | Interface        | Defines specific settings for authenticators, to be used in the network support configuration.|
| 20 | W3oNetworkSettings        | Interface        | Defines specific settings for networks, including name, chain ID, display name, and useful links.|
| 21 | W3oService                | Class            | Represents a service in the framework, encapsulates interaction with a group of contracts, can have an internal state, and must implement an `init` method to initialize its state.|
| 22 | W3oSessionManager         | Class            | Manages sessions in the framework, allowing creation, deletion, retrieval, and switching of the active session.|
| 23 | W3oSession                | Class            | Represents a specific session, maintaining relevant data for the associated account and network, with methods to store and retrieve additional data.|
| 24 | Web3Octopus               | Class            | Main class of the framework, acts as an entry point, initializes networks and modules, and manages sessions. |


