export * from './types';
export { Ant } from './Ant';

/*

## w3o-core

Vamos a construir juntos una biblioteca de programación que se llama "Web3 Octopus" y que sirve como framework para desarrolladores para conectarse usando typescript de forma fácil con una o varias blockchains dependiendo de la configuración.

En su núcleo esta biblioteca presenta 5 espacios bien diferenciados con clases abstractas con responsabilidades muy específicas.

1 - Authentication 
El primer espacio es la de autenticación que nos permite saber si el usuario está loqueado, Cuál es su address o ID y cuáles son sus datos ampliados (que dependerá del tipo de blockchain).
Además, nos permite firmar transacciones y obtener información sobre las transacciones que hemos firmado (su hash).

```
type W3oNetworkType = 'ethereum' | 'antelope' | 'solana';
type W3oNetworkName = string;
type W3oAddress = string;
abstract W3oAuthenticator {
    constructor(name: string, type: W3oNetworkType) {}
    getName(); string; // name id of the authenticator (must be unique)
    isLogged(): boolean;
    getNetworkType(): W3oNetworkType;
    getAddress(): W3oAddress;
    getAccount(): W3oAccount // user account data
    isReadOnly(): boolean // if the account is not logged. Useful for exploring any account's data
    signTransaction(trx: W3oTransaction): Promise<W3oTransactionResponse>
    login(network:W3oNetworkName): Promise<W3oAddress>
    autoLogin(network:W3oNetworkName, address: W3oAddress): Promise<W3oAddress>
    setReadOnly(network: W3oNetworkName, address: W3oAddress): Promise<W3oAddress>
    snapshot(): any
}
W3oTransactionResponse {
    hash: string
    wait(): Promise<W3oTransactionReceipt>
}
W3oTransactionReceipt {} // por ahora vacío. Será especificado más tarde
W3oAccount {
    // This is the minimal data that we need to know about an account
    // Each subclass will have its own data
    constructor(public authenticator: W3oAuthenticator) {}
    getAddress(): string
    snapshot(): any
}
```

2 - Network 
El segundo de los espacio habla concretamente de la blockchain, sus datos, como la identificamos y sobretodo como obtenemos información sobre los contratos y los tokens que viven en ella. Cada subclase que extienda de W3oNetwork podrá guardar su estado interno (como APYs, precios, ratios, last block, etc) y deberá implementar una serie de métodos que permitan obtener información sobre los contratos y tokens que viven en ella.

```
class W3oNetwork {
    constructor(public settings: W3oNetworkSettings) {}
    getNetworkType(): NetworkType,
    getName(): W3oNetworkName // name id of the network (must be unique)
    getChainId(): string // long hash format as id
    getDisplayName(): string // for the user to read
    getLinks(): W3oNetworkLinks // useful links for this network
    abstract getContractManager(): W3oContractManager
    abstract getSystemToken(): W3oToken
    abstract getTokensList(): Promise<W3oToken[]>
    abstract updateState(): Promise<void> 
    snapshot(): any
}
W3oNetworkSettings {
    name: string
    chainId: string
    displayName: string
    links: W3oNetworkLinks
}
W3oNetworkLinks {
    explorer: string
    bridge: string;
    ecosystem: string;
    website: string;
    wallet: string
}
W3oContractManager {
    // has an internal cache and an API for the extended classes to use
    addContract(address: W3oAddress, contract: W3oContract | null): void // if contract is null, it means the address is not a contract
    getContract(address: W3oAddress): Promise<W3oContract | null>
    getContracts(): W3oContract[] // returns all the contracts that are not null
    getTokenContract(symbol: string): Promise<W3oContract | null>
    snapshot(): any
}
W3oContract {
    getABI(): Promise<W3oContractABI>
    snapshot(): any
}
W3oToken {
    isSystemToken(): boolean;
    getIconUrl(): string
    getDisplayName(): string
    getSymbol(): string
    getDecimals(): number
    getUSDPrice(): number
    getContract(): W3oContract
    snapshot(): any
}
W3oNetworkManager {
    registerNetwork(network: W3oNetwork): void
    getNetwork(name: W3oNetworkName): W3oNetwork
    getNetworks(): W3oNetwork[]
    getCurrentNetwork(): W3oNetwork
    setCurrentNetwork(name: W3oNetworkName): void
    updateState(): Promise<void> // this will update the state of all the networks
    snapshot(): any; // export internal state
}
```

3 - Modules
El tercer espacio es un manejador de módulos que permite la instalación clases que mplementan y abtraen la interacción completa contra un grupo de contratos encapulando la complejidad. Cada módulo actuará como un singletón (instancia útica en el sistema) y deberá implementar una única función obligatoria init() que usará para inicializar su estado. A partir de allí se servirá de los otros espacios (authenticación y network) para realizar las interacciones que necesite contra los contratos que necesite.
W3oModule {
    constructor(public path: string) // this path should match the path in the modules object
    init(w3o: Web3Octopus);
    snapshot(): any; // export internal state
}

4 - Punto de entrada
Se trata de una clase singleton principal que oficiará de punto de entrada en todos los casos a la cual tenemos que inicializar pasándole una serie de clases de fábrica (factory classes) las que sirven para instalar el soporte a cierta familia de networks. En su archivo de configuración, el desarrollador lo primero que hará será instanciar la case principal Web3Octopus a la cual le instalará una lista de al menos un W3oNetwork Support Factory que proveerá la implementación concreta para alguna network.
Web3Octopus<CustomModuleType> {
    addNetworkSupport(factory: W3oNetworkSupportFactory): void;
    sessions: W3oSessionManager;
    networks: W3oNetworkManager;
    init() {
        this.networks.getNetworks().forEach(network => network.updateState());
        this.createModules();
    }
    _modules: CustomModuleType | null = null;
    get modules(): CustomModuleType {
        if (!this._modules) this._modules = this.createModules();
        return this._modules;
    }
    registerModules(modules: CustomModuleType): void {}
    createModules() // creates custom structure based on the modules paths. It register all modules on 
    snapshot(): any; // export internal state
}
W3oNetworkSupportFactory<TNetwork, TAuthenticator> {
    constructor(settings: W3oSupportSettings) {}
    getNetworkType(): NetworkType,
    getNetworks(): TNetwork[],
    getAuthenticators(): TAuthenticator[],
    getNetwork(name: W3oNetworkName): TNetwork,                // this will return the network instance based on the name
    getAuthenticator(name: string): TAuthenticator     // this will return the authenticator instance based on the name
    snapshot(): any; // export internal state
}
W3oSupportSettings {
    auth: W3oAuthenticatorSettings[];
    networks: W3oNetworkSettings[];
}


Este es un ejemplo de un archivo de configuración que inicializa al framework con soporte para dos familias de networks: Telos EVM y Telos/EOS.
En este caso el desarrollador ha creado una estructura de módulos personalizada que incluye dos módulos para la familia de networks Telos EVM, dos módulos para la familia de networks Telos/EOS y dos módulos que parecen independientes. Como sea, es una desición arbitraria del desarrollador y puede crear la estructura de módulos que desee. La única salvedad es que debe respetar esa estructura con los paths que le ha dado a cada módulo.

```
// import the main class from the core
import {
    Web3Octopus,                     // the main class
} from '@vapaee/w3o-core';

// import the classes to support Ethereum/EVM networks
import {
    EthereumNetwork,                      // extends W3oNetwork
    EthereumTokensModule,                 // extends W3oModule
    EthereumBalancesModule,               // extends W3oModule
    EthereumMetamaskAuth,                 // extends W3oAuthenticator
    EthereumBraveAuth,                    // extends W3oAuthenticator
    EthereumWalletConnectAuth,            // extends W3oAuthenticator
    EthereumSupportFactory,               // extends W3oNetworkSupportFactory
} from '@vapaee/w3o-ethereum';

// import the classes to support Antelope (EOSIO) networks
import {
    AntelopeNetwork,                      // extends W3oNetwork
    AntelopeTokensModule,                 // extends W3oModule
    AntelopeBalancesModule,               // extends W3oModule
    AntelopeAnchorAuth,                   // extends W3oAuthenticator
    AntelopeSupportFactory,               // extends W3oNetworkSupportFactory
} from '@vapaee/w3o-antelope';

// import the conficuration for each of the four Telos networks
import {
    TelosEvmConfigJSON,                   // contains the mainnet evm network configuration JSON
    TelosEvmTestnetConfigJSON,            // contains the testnet evm network configuration JSON
    TelosZeroConfigJSON,                  // contains the mainnet native network configuration JSON
    TelosZeroTestnetConfigJSON,           // contains the testnet native network configuration JSON
} from '@vapaee/w3o-telos';

// import the conficuration just for EOS networks
import {
    EOSConfigJSON,                        // contains the mainnet native network configuration JSON
} from '@vapaee/w3o-eos';

// ---- Create the main class instance ----
// the developer user may be creative and create his own modules schema
interface IMyModules {
    evm: {
        tokens: EthereumTokensModule;     // extends W3oModule
        balances: EthereumBalancesModule; // extends W3oModule
    },
    zero: {
        tokens: AntelopeTokensModule;     // extends W3oModule
        balances: AntelopeBalancesModule; // extends W3oModule
    },
    example: ExampleModule;               // extends W3oModule, user module
    foo: FooModule;                       // extends W3oModule, user module
}
const octopus = new Web3Octopus<IMyModules>();

// ---- Register Telos EVM support ----
const telosEvmSupportSettings = {
    // list of supported wallets for Ethereum-like networks
    auth: [
        new EthereumMetamaskAuth(),
        new EthereumBraveAuth(),
        new EthereumWalletConnectAuth()
    ],
    // list of supported Ethereum-like networks
    networks: [
        new EthereumNetwork(TelosEvmConfigJSON),
        new EvmNetwork(TelosEvmTestnetConfigJSON)
    ]
}
const telosEvmSupport = new EvmSupportFactory(telosEvmSupportSettings);
octopus.addNetworkSupport(telosEvmSupport);

// ---- Register Telos/EOS support ----
const telosEosSupportSettings = {
    // list of supported wallets for Antelope networks
    auth: [
        new AntelopeAnchorAuth()
    ],
    // list of supported Antelope networks
    networks: [
        new AntelopeNetwork(TelosZeroConfigJSON), 
        new AntelopeNetwork(TelosZeroTestnetConfigJSON), 
        new AntelopeNetwork(EOSConfigJSON), 
        new AntelopeNetwork(EOSTestnetConfigJSON)
    ]
}
const telosEosSupport = new AntelopeSupportFactory(telosEosSupportSettings);
octopus.addNetworkSupport(telosEosSupport);

// ---- Register the modules ----
// paths must match the keys in the IMyModules interface
const modules: IMyModules {
    evm: {
        tokens: new EthereumTokensModule('evm.tokens'),
        balances: new EthereumBalancesModule('evm.balances')
    },
    zero: {
        tokens: new AntelopeTokensModule('zero.tokens'),
        balances: new AntelopeBalancesModule('zero.balances')
    },
    example: new ExampleModule('example'),
    foo: new FooModule('foo')
}
octopus.registerModules(modules);

octopus.init();
```


5 - Sessions
El quinto y último espacio es el de sesiones que nos permite implementar una de las características más destacadas de la biblioteca que es la de poder tener múltiples sesiones abiertas en paralelo en diferentes networks y autenticadores. Cada sesión tendrá un id único (<account-address>:<network-name>) y tendrá la tarea de mantener los datos que sean relevanets para esa sesión en particular. Las Sesiones además proveerán de una forma de almacenar datos extras relevantes a la sesión. Los módulos podrán almacenar datos en la sesión y recuperarlos en cualquier momento. Luego tendremos un manejador de sesiones que nos permitirá crear, eliminar y recuperar sesiones en cualquier momento, pero más importante aún, nos permitirá cambiar de sesión activa (current) en cualquier momento.

Este feature no siempre será utilizado y no queremos forzar a que el desarrollador tenga en cuenta que existen múltiples sesiones, por tanto el manejador de sesiones debe contemplar un API para múltimples seciones pero también un API para usar la sessión activa como la única posible.

W3oSession {
    constructor(public account: W3oAccount, public network: W3oNetwork) {}
    getId(): string
    getAccount(): W3oAccount
    getNetwork(): W3oNetwork
    set<T>(key: string, value: T): void
    get<T>(key: string): T
    remove(key: string): void
    snapshot(): any; // export internal state
}

W3oSessionManager {
    createSession(account: W3oAccount, network: W3oNetwork): W3oSession // overide if the id already exists
    openSession(account: W3oAccount): W3oSession // open a session with the current network
    getSession(id: string): W3oSession
    getSessions(): W3oSession[] // returns all the sessions
    deleteSession(id: string): void
    setCurrentSession(id: string): void
    getCurrentSession(): W3oSession
    snapshot(): any; // export internal state
}




W3oTransaction
W3oTransactionResponse
W3oTransactionReceipt
W3oAccount
W3oNetworkLinks
W3oContractManager
W3oContractABI
W3oToken
W3oContract
W3oNetworkSupportFactory
W3oSupportSettings
W3oAuthenticatorSettings
W3oNetworkSettings
W3oModule
W3oSessionManager
W3oSession
Web3Octopus

*/