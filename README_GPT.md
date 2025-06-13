Aquí tienes una versión completamente reescrita del **README.md** en inglés, con un enfoque en facilitar el onboarding a nuevos usuarios y describir de forma clara qué es Web3 Octopus, cómo usarlo y cómo está estructurado internamente.

---

````markdown
# Web3 Octopus

> **Warning**: This framework is under active development. Some APIs and behaviors may change.

---

## Overview

**Web3 Octopus** is a modular TypeScript framework designed to simplify the process of connecting to multiple blockchains (as if by the tentacles of an octopus). It provides a unified, extensible architecture for:

1. **Authentication**: Letting users sign in with their preferred wallet and sign transactions.
2. **Network Management**: Abstracting how to read data from and write data to smart contracts on different chains.
3. **Services & Modules**: Encapsulating business-specific features that interact with smart contracts across any supported blockchain.

With Web3 Octopus, you can quickly spin up a single instance that simultaneously handles authentication and contract interactions on multiple blockchains (e.g., Ethereum, Antelope-based chains like Telos/EOS). You can then add your own custom modules on top of this core, or reuse community modules, to build your dApp with minimal boilerplate.

---

## Key Features

- **Multi-Chain Support**: Connect to Ethereum/EVM networks, Antelope (EOSIO) networks, and more.
- **Pluggable Architecture**: Add new blockchain support by writing a “tentacle” package—no need to rewrite existing code.
- **Reactive Data Flow**: Built on RxJS observables for real-time updates (e.g., token balances, contract state changes).
- **Session Management**: Handle multiple simultaneous sessions across different chains.
- **Lightweight & TypeScript-First**: Fully written in TypeScript, with strong typing and no front-end framework dependencies.

---

## Getting Started

### 1. Install the Core Package

```bash
npm install @vapaee/w3o-core
````

> **Note**: You will also need to install one or more “tentacle” packages to support specific blockchains:
>
> * `@vapaee/w3o-ethereum` for Ethereum/EVM support
> * `@vapaee/w3o-antelope` for Antelope (Telos, EOS, WAX, etc.) support
> * `@vapaee/w3o-telos` for Telos-specific configurations
> * `@vapaee/w3o-eos` for generic EOS mainnet/testnet

### 2. Create & Initialize a Web3 Octopus Instance

Below is a minimal example of initializing Web3 Octopus with support for Ethereum and Antelope (Telos/EOS) networks. You can copy-paste and customize it in your TypeScript project:

```typescript
// Import the core and its types
import {
    Web3Octopus,
    W3oIServices,
    W3oNetworkSupportSettings
} from '@vapaee/w3o-core';

// Import Ethereum/EVM “tentacle” support modules
import {
    EthereumNetwork,
    EthereumTokensService,
    EthereumBalancesService,
    EthereumMetamaskAuth,
    EthereumBraveAuth,
    EthereumWalletConnectAuth
} from '@vapaee/w3o-ethereum';

// Import Antelope (EOSIO) “tentacle” support modules
import {
    AntelopeNetwork,
    AntelopeTokensService,
    AntelopeBalancesService,
    AntelopeAnchorAuth
} from '@vapaee/w3o-antelope';

// Import network configuration JSON files for Telos/EOS
import {
    TelosEvmConfigJSON,
    TelosEvmTestnetConfigJSON,
    TelosZeroConfigJSON,
    TelosZeroTestnetConfigJSON
} from '@vapaee/w3o-telos';

import { EOSConfigJSON, EOSTestnetConfigJSON } from '@vapaee/w3o-eos';

// Define a custom interface that includes all your services.
// Extend W3oIServices so Octopus enforces consistency.
interface IMyServices extends W3oIServices {
    evm: {
        tokens: EthereumTokensService;
        balances: EthereumBalancesService;
    };
    zero: {
        tokens: AntelopeTokensService;
        balances: AntelopeBalancesService;
    };
    // You can add application-specific modules here:
    example: ExampleService;
    foo: FooService;
}

// 1. Create the main Octopus instance
const octopus = new Web3Octopus<IMyServices>();

// 2. Register Ethereum/EVM support (Metamask, Brave, WalletConnect)
const ethereumSupport: W3oNetworkSupportSettings<IMyServices> = {
    type: 'ethereum',
    auth: [
        new EthereumMetamaskAuth(octopus),
        new EthereumBraveAuth(octopus),
        new EthereumWalletConnectAuth(octopus)
    ],
    networks: [
        new EthereumNetwork(TelosEvmConfigJSON, octopus),
        new EthereumNetwork(TelosEvmTestnetConfigJSON, octopus)
    ]
};
octopus.addNetworkSupport(ethereumSupport);

// 3. Register Antelope (EOSIO) support (Anchor)
const antelopeSupport: W3oNetworkSupportSettings<IMyServices> = {
    type: 'antelope',
    auth: [ new AntelopeAnchorAuth(octopus) ],
    networks: [
        new AntelopeNetwork(TelosZeroConfigJSON, octopus),
        new AntelopeNetwork(TelosZeroTestnetConfigJSON, octopus),
        new AntelopeNetwork(EOSConfigJSON, octopus),
        new AntelopeNetwork(EOSTestnetConfigJSON, octopus)
    ]
};
octopus.addNetworkSupport(antelopeSupport);

// 4. Register your services
const services = [
    new EthereumTokensService('evm.tokens', octopus),
    new EthereumBalancesService('evm.balances', octopus),
    new AntelopeTokensService('zero.tokens', octopus),
    new AntelopeBalancesService('zero.balances', octopus),
    new ExampleService('example', octopus),
    new FooService('foo', octopus)
];
octopus.registerServices(services);

// 5. Initialize Octopus (e.g., enable multi-session support)
octopus.init({
    multisession: true
});

// 6. Export a helper to retrieve the instance anywhere
export function getOctopus(): Web3Octopus<IMyServices> {
    return octopus;
}
```

> **Tip**: The `services` object keys (e.g., `"evm.tokens"`) must match the structure defined in `IMyServices`.

### 3. Use Octopus in Your App

Once you have called `.init()`, you can access authentication and services from any part of your code. For example:

```typescript
import { getOctopus } from './path/to/octopus-setup';

async function showBalances() {
    // Ensure the user is connected and a session is active
    const userSession = getOctopus().sessionManager.getCurrentSession();
    if (!userSession || !userSession.isAuthenticated()) {
        console.log('Please connect your wallet first.');
        return;
    }

    // Subscribe to token list updates on Ethereum
    getOctopus().services.evm.tokens.updateTokenList();

    // Get the current token list snapshot
    const tokenList = await getOctopus().services.evm.tokens.getSnapshot();
    console.log('Ethereum Token List:', tokenList);

    // Fetch balance of the user on Antelope Telos
    const telosBalance = await getOctopus().services.zero.balances.getBalance(
        userSession.account.address
    );
    console.log('Telos Balance:', telosBalance.toString());
}
```

---

## Installation & Build

1. **Clone the Repository** (for core development or contributions):

   ```bash
   git clone https://github.com/vapaee/web3-octopus.git
   cd web3-octopus
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Build the Core Package**:

   ```bash
   npm run build
   ```

   This command compiles TypeScript to JavaScript and generates type definitions under `dist/`.

4. **Publish to npm** (only for package owners):

   ```bash
   npm publish dist
   ```

---

## Architecture Overview

Web3 Octopus is split into several layers and directories. Below is a high-level view of the **w3o-core** directory structure:

```
w3o-core/
├── src/
│   ├── classes/
│   │   ├── W3oAccount.ts
│   │   ├── W3oAuthManager.ts
│   │   ├── W3oAuthenticator.ts
│   │   ├── W3oContext.ts
│   │   ├── W3oContract.ts
│   │   ├── W3oContractManager.ts
│   │   ├── W3oDefaultHttpClient.ts
│   │   ├── W3oError.ts
│   │   ├── W3oManager.ts
│   │   ├── W3oModule.ts
│   │   ├── W3oModuleManager.ts
│   │   ├── W3oNetwork.ts
│   │   ├── W3oNetworkManager.ts
│   │   ├── W3oService.ts
│   │   ├── W3oSession.ts
│   │   ├── W3oSessionManager.ts
│   │   ├── W3oStorage.ts
│   │   ├── W3oToken.ts
│   │   ├── W3oTokenList.ts
│   │   ├── W3oTransactionResponse.ts
│   │   ├── Web3Octopus.ts
│   │   └── index.ts
│   ├── types/
│   │   ├── w3o-interfaces.ts
│   │   └── w3o-types.ts
│   └── version.ts
└── index.ts
```

### Core Concepts

1. **Web3Octopus (Entry Point)**

   * Located in `classes/Web3Octopus.ts`.
   * Manages all registered networks, authenticators, services, and sessions.
   * Provides methods to add network support, register services, initiate sessions, and switch between sessions.

2. **Authentication Layer (`classes/W3oAuthenticator.ts` & `classes/W3oAuthManager.ts`)**

   * Defines the abstract base for authentication mechanisms (`W3oAuthenticator`).
   * Each “tentacle” (e.g., `EthereumMetamaskAuth`) extends `W3oAuthenticator` to implement wallet-specific logic.
   * `W3oAuthManager` orchestrates multiple authenticators and manages active login sessions.

3. **Network Layer (`classes/W3oNetwork.ts` & `classes/W3oNetworkManager.ts`)**

   * `W3oNetwork` is an abstract class representing a blockchain network (chain ID, name, RPC endpoints, token list, contract ABIs).
   * Each tentacle (e.g., `EthereumNetwork`, `AntelopeNetwork`) extends `W3oNetwork` to implement chain-specific behavior (e.g., how to read ABI, how to send transactions).
   * `W3oNetworkManager` holds all supported networks and provides utilities for listing and switching networks.

4. **Service/Module Layer (`classes/W3oService.ts`, `classes/W3oModule.ts`, `classes/W3oModuleManager.ts`)**

   * `W3oService` is a base class for any feature that interacts with contracts (e.g., token lists, balances, staking, governance).
   * Services use `W3oNetwork` and `W3oContractManager` to read/write contract data.
   * `W3oModule` / `W3oModuleManager` enable grouping services into higher-level modules or plugins.

5. **Session Management (`classes/W3oSession.ts`, `classes/W3oSessionManager.ts`)**

   * `W3oSession` holds information about one active user connection on a specific network (account address, signer, chain ID).
   * `W3oSessionManager` creates, switches, and destroys sessions. When `multisession` is `false`, only one session remains active at a time.

6. **Contract Management (`classes/W3oContract.ts`, `classes/W3oContractManager.ts`)**

   * `W3oContractManager` caches contract objects (ABIs + address) per network.
   * `W3oContract` is an abstraction for calling view/mutate methods and listening to events on a smart contract.

7. **Storage & Context**

   * `W3oStorage` provides a thin layer over local storage or in-memory storage for caching (e.g., token lists, user preferences).
   * `W3oContext` bundles all managers (network, auth, session, storage) to inject into services or modules.

---

## Antelope Tentacle (Example: `@vapaee/w3o-antelope`)

To support Antelope-based chains (Telos, EOS, WAX, etc.), the `w3o-antelope` package implements:

```
w3o-antelope/
├── src/
│   ├── classes/
│   │   ├── AntelopeAccount.ts
│   │   ├── AntelopeAuthAnchor.ts
│   │   ├── AntelopeAuthSupport.ts
│   │   ├── AntelopeChains.ts
│   │   ├── AntelopeContractManager.ts
│   │   ├── AntelopeError.ts
│   │   ├── AntelopeNetwork.ts
│   │   ├── AntelopeTokensService.ts
│   │   ├── AntelopeWharfkit.ts
│   │   └── index.ts
│   ├── types/
│   │   ├── w3o-interfaces.ts
│   │   └── index.ts
│   └── version.ts
└── index.ts
```

* **AntelopeAuthAnchor**: Implements Anchor wallet integration for login and transaction signing.
* **AntelopeNetwork**: Implements `W3oNetwork` for the Antelope RPC logic (table reads, push transactions).
* **AntelopeTokensService / AntelopeBalancesService**: Extend `W3oService` to fetch token lists and balances on Telos/EOS.
* **AntelopeContractManager**: Builds and caches contract handles (using WharfKit).
* **AntelopeWharfkit**: Provides helper functions for interacting via Stephens (@wharfkit) or eosjs libraries.

Example usage:

```typescript
import { AntelopeNetwork, AntelopeTokensService, AntelopeAnchorAuth } from '@vapaee/w3o-antelope';

// Within your setup (after creating Web3Octopus instance “octopus”):
const antelopeSupport = {
    type: 'antelope',
    auth: [ new AntelopeAnchorAuth(octopus) ],
    networks: [
        new AntelopeNetwork(TelosZeroConfigJSON, octopus),
        new AntelopeNetwork(TelosZeroTestnetConfigJSON, octopus)
    ]
};
octopus.addNetworkSupport(antelopeSupport);

octopus.registerServices([
    new AntelopeTokensService('zero.tokens', octopus),
    new AntelopeBalancesService('zero.balances', octopus),
    // ...any custom modules
]);
```

---

## Detailed API References

Below is a concise list of the most relevant core classes and interfaces you will interact with. For full documentation, consult the code comments or explore the `src` folder.

| Class / Interface                    | Location                                      | Description                                                                                                                                        |
| ------------------------------------ | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Web3Octopus\<TServices>**          | `classes/Web3Octopus.ts`                      | The main orchestrator. Manages networks, authenticators, sessions, services/modules.                                                               |
| **W3oIServices**                     | `types/w3o-interfaces.ts`                     | Interface describing the shape of your custom services object. Ensures type-safe access to services in `octopus.services`.                         |
| **W3oAuthenticator**                 | `classes/W3oAuthenticator.ts`                 | Abstract base class for any wallet authenticator (Metamask, Anchor, etc.). Must implement login, logout, getAccount methods.                       |
| **W3oAuthManager**                   | `classes/W3oAuthManager.ts`                   | Holds and orchestrates multiple `W3oAuthenticator` instances. Provides methods to “loginWith” a specific authenticator and manage active sessions. |
| **W3oNetwork**                       | `classes/W3oNetwork.ts`                       | Abstract base for blockchain networks. Handles RPC endpoints, chain ID, network metadata, contract ABIs, etc.                                      |
| **W3oNetworkManager**                | `classes/W3oNetworkManager.ts`                | Keeps a registry of all registered networks. Provides methods to list networks and switch active network.                                          |
| **W3oService\<T>**                   | `classes/W3oService.ts`                       | Base class for feature modules. Manages initialization and provides lifecycle hooks. Example: token list, balances, staking, governance.           |
| **W3oModule** / **W3oModuleManager** | `classes/W3oModule.ts`, `W3oModuleManager.ts` | Allow grouping multiple services into a cohesive plugin that can be dynamically loaded into Octopus.                                               |
| **W3oSession**                       | `classes/W3oSession.ts`                       | Represents a user’s active session on a given chain (address, signer, etc.).                                                                       |
| **W3oSessionManager**                | `classes/W3oSessionManager.ts`                | Creates and manages `W3oSession` instances. Handles session switching, state persistence, and cleanup.                                             |
| **W3oContract**                      | `classes/W3oContract.ts`                      | Abstraction for a smart contract instance (address + ABI). Handles read/write calls and event subscriptions.                                       |
| **W3oContractManager**               | `classes/W3oContractManager.ts`               | Caches and retrieves `W3oContract` instances per network.                                                                                          |
| **W3oError**                         | `classes/W3oError.ts`                         | Custom error type for handling Octopus-specific exceptions, including codes and payloads.                                                          |
| **W3oAccount**                       | `classes/W3oAccount.ts`                       | Represents a user account (address/ID) on any chain.                                                                                               |
| **W3oStorage**                       | `classes/W3oStorage.ts`                       | Simple key-value storage wrapper for caching data across sessions.                                                                                 |

---

## Core Concepts in Detail

### 1. Authentication

* **Abstract Class**: `W3oAuthenticator` defines the methods you must implement:

  * `login(): Promise<W3oAccount>`
  * `logout(): Promise<void>`
  * `isAuthenticated(): boolean`
  * `getSigner(): Promise<any>`
  * `getAccount(): Promise<W3oAccount>`

* **Auth Manager** (`W3oAuthManager`):

  * Registers multiple `W3oAuthenticator` instances.
  * Provides `loginWith(authType: string)` to select and invoke a specific authenticator.
  * Maintains a mapping of “auth type” → `W3oAuthenticator` implementation.

### 2. Network

* **Abstract Class**: `W3oNetwork` outlines:

  * `chainId`, `name`, `title`, `symbol` (native coin).
  * RPC endpoints, explorer URLs, token lists, contract ABIs.
  * Methods like `getContractABI(address: string): Promise<any>` and `getContract(address: string): Promise<W3oContract>`.

* **Network Manager** (`W3oNetworkManager`):

  * Maintains an internal registry of all `W3oNetwork` instances.
  * Provides APIs to list all supported networks or retrieve a specific `W3oNetwork` by chain ID or name.

### 3. Services & Modules

* **Service** (`W3oService`):

  * Constructor parameters: `path: string` (key within `octopus.services`) and a reference to the main `Web3Octopus` instance.
  * Must implement an `init(): Promise<void>` method to bootstrap any internal state (e.g., subscribe to observables, load initial data).
  * Exposes public methods for dApp logic (e.g., `updateTokenList()`, `getBalance(address)`).

* **Module** (`W3oModule`):

  * Groups one or more `W3oService` instances under a common namespace.
  * Can define lifecycle hooks (e.g., `onRegister()`, `onDestroy()`).

### 4. Sessions

* **Session** (`W3oSession`):

  * Holds: `account: W3oAccount`, `network: W3oNetwork`, `signer` (wallet signer object).
  * Provides methods to read/write wallet state and track chain connection.

* **Session Manager** (`W3oSessionManager`):

  * `createSession(account, network, signer)`: Instantiates a new session.
  * `switchSession(sessionId)`: Switch active session.
  * `getCurrentSession()`: Returns the currently active session.

### 5. Contract Handling

* **Contract Manager** (`W3oContractManager`):

  * Caches `W3oContract` objects keyed by `(network.chainId, contractAddress)`.
  * Ensures each contract instance is created only once per network.

* **Contract** (`W3oContract`):

  * Abstracts raw contract calls (read-only calls, transactions) into type-safe methods based on ABI.
  * Example:

    ```ts
    const erc20 = octopus
      .networkManager
      .getNetwork('ethereum-mainnet')
      .contractManager
      .getContract('0xTokenAddress', ERC20_ABI);

    const balance: BigNumber = await erc20.methods.balanceOf(userAddress).call();
    ```

---

## Dependency List

* [TypeScript](https://www.typescriptlang.org/) (>= 4.5)
* [RxJS](https://rxjs.dev/) (>= 7.x)
* [ethers.js](https://docs.ethers.io/) / [web3.js](https://web3js.readthedocs.io/) (for Ethereum tentacles)
* [@wharfkit/antelope](https://github.com/WharfKit/antelope) or [eosjs](https://github.com/EOSIO/eosjs) (for Antelope tentacles)

> When installing tentacle packages, each will list its own additional dependencies (e.g., `@vapaee/w3o-ethereum` depends on `ethers`, `@vapaee/w3o-antelope` depends on `@wharfkit/antelope`).

---

## Project Structure (Example for `w3o-core`)

```
w3o-core/
├── src/
│   ├── classes/
│   │   ├── W3oAccount.ts
│   │   ├── W3oAuthManager.ts
│   │   ├── W3oAuthenticator.ts
│   │   ├── W3oContext.ts
│   │   ├── W3oContract.ts
│   │   ├── W3oContractManager.ts
│   │   ├── W3oDefaultHttpClient.ts
│   │   ├── W3oError.ts
│   │   ├── W3oManager.ts
│   │   ├── W3oModule.ts
│   │   ├── W3oModuleManager.ts
│   │   ├── W3oNetwork.ts
│   │   ├── W3oNetworkManager.ts
│   │   ├── W3oService.ts
│   │   ├── W3oSession.ts
│   │   ├── W3oSessionManager.ts
│   │   ├── W3oStorage.ts
│   │   ├── W3oToken.ts
│   │   ├── W3oTokenList.ts
│   │   ├── W3oTransactionResponse.ts
│   │   ├── Web3Octopus.ts
│   │   └── index.ts
│   ├── types/
│   │   ├── w3o-interfaces.ts
│   │   └── w3o-types.ts
│   └── version.ts
├── package.json
├── tsconfig.json
└── README.md
```

For a typical “tentacle” package (e.g., `w3o-antelope`), you will see a similar structure under `src/`, but specialized classes for that blockchain.

---

## Example: Registering a Custom Module

Suppose you want to add a custom service that fetches a list of NFT collectibles from a smart contract on Ethereum. You would:

1. **Create a new class** `MyNFTService` extending `W3oService`:

   ```typescript
   import { W3oService } from '@vapaee/w3o-core';
   import { Contract, ethers } from 'ethers';
   import NFT_ABI from './abis/NFT.json';

   export class MyNFTService extends W3oService {
       private nftContract: Contract | null = null;

       constructor(path: string, octopus: Web3Octopus<any>) {
           // The `path` should match the key in your IMyServices interface
           super(path, octopus);
       }

       public override async init(): Promise<void> {
           // Get the current network and signer from Octopus
           const session = this.octopus.sessionManager.getCurrentSession();
           if (!session) {
               throw new Error('No active session for NFT service.');
           }
           const signer = session.getSigner();
           const network = session.network;

           // Instantiate the contract
           this.nftContract = new ethers.Contract(
               '0xYourNFTContractAddress',
               NFT_ABI,
               signer
           );

           // Optionally: fetch initial NFT data
           await this.loadInitialData();
       }

       private async loadInitialData(): Promise<void> {
           if (!this.nftContract) return;
           const totalSupply: ethers.BigNumber = await this.nftContract.totalSupply();
           console.log(`Total NFTs: ${totalSupply.toString()}`);
       }

       // Public method to get NFTs owned by a user
       public async getNFTsOf(address: string): Promise<string[]> {
           if (!this.nftContract) {
               throw new Error('NFT contract not initialized.');
           }
           return await this.nftContract.tokensOfOwner(address);
       }
   }
   ```

2. **Extend `IMyServices`** interface in your application:

   ```typescript
   interface IMyServices extends W3oIServices {
       // ...other services
       nft: MyNFTService;
   }
   ```

3. **Register your service** when setting up Octopus:

   ```typescript
   import { MyNFTService } from './services/MyNFTService';

   // ... after adding network support ...
   const services = [
       // ...existing services
       new MyNFTService('nft', octopus)
   ];
   octopus.registerServices(services);
   ```

Now you can call in your code:

```typescript
import { getOctopus } from './octopus-setup';

async function showUserNFTs(userAddress: string) {
    const nfts = await getOctopus().services.nft.getNFTsOf(userAddress);
    console.log('User NFTs:', nfts);
}
```

---

## Contribution Guidelines

If you want to contribute to **Web3 Octopus** or write your own tentacle:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/my-new-tentacle`).
3. Write code under `src/`, following existing naming conventions and directory structure.
4. Add appropriate TypeScript typings and JSDoc comments for all public methods.
5. Ensure all existing tests pass and add new tests for your feature.
6. Submit a pull request describing your changes, design decisions, and any backward-incompatible adjustments.

---

## License

This project is released under the [MIT License](LICENSE).

---

## Acknowledgments

* Inspired by Octopus as a metaphor for simultaneous multi-chain connectivity.
* Built on top of **RxJS** for reactive state management.
* Uses **ethers.js** for Ethereum interactions and **@wharfkit/antelope** for EOSIO/Antelope chains.

---

*End of README.md*

```

---

**Explicación breve (en español)**:  
-He reescrito el README.md completamente en inglés.  
-He mantenido un flujo de lectura que primero describe rápidamente qué es Web3 Octopus y qué puede hacer el usuario con él.  
-Luego se muestran pasos de instalación y un ejemplo de código para que alguien nuevo pueda arrancar en pocos minutos.  
-Después se detallan las capas internas de la arquitectura (autenticación, redes, servicios, sesiones, contratos), para que quien quiera profundizar entienda los componentes.  
-También se incluyó un ejemplo breve de cómo registrar un módulo personalizado (por si alguien quiere extender la funcionalidad central).  

Esto debería cubrir tanto a un lector que quiera “ver rápido” de qué se trata, como a quien desee profundizar en cómo está implementado internamente.
```
