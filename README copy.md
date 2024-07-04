# web3-octopus (w3o)
Web3-Octopus is a framework to interact with any blockchain easily


## w3o-core


## w3o-core

Vamos a construir juntos una biblioteca de programación que se llama "Web3 Octopus" y que sirve como framework para desarrolladores para conectarse usando typescript de forma fácil con una o varias blockchains dependiendo de la configuración.

En su núcleo esta biblioteca presenta 5 espacios bien diferenciados con clases abstractas con responsabilidades muy específicas.

En la mayoría de las clases existirá la función snapshot() que nos permitirá hacer una captura del estado interno de la clase en cualquier momento. Debe se un objeto JSON nuevo que no contenga ciclos en sus referencias.

1 - Authentication 
El primer espacio es la de autenticación que nos permite saber si el usuario está loqueado, Cuál es su address o ID y cuáles son sus datos ampliados (que dependerá del tipo de blockchain).
Además, nos permite firmar transacciones y obtener información sobre las transacciones que hemos firmado (su hash).

```
type W3oNetworkType = 'ethereum' | 'antelope' | 'solana';
type W3oNetworkName = string;
type W3oAddress = string;
class W3oError = { constructor(message: string, code: number, payload: any) }
interface W3oTransaction {} // deberá ser especificado por cada implementación
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
class W3oTransactionResponse {
    hash: string
    wait(): Promise<W3oTransactionReceipt>
}
interface W3oTransactionReceipt {} // por ahora vacío. Será especificado más tarde
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
interface W3oNetworkSettings {
    name: string
    chainId: string
    displayName: string
    links: W3oNetworkLinks
}
interface W3oNetworkLinks {
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
interface W3oContractABI = {}; // Esto debería ser especificado por cada implementación
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

3 - Service
El tercer espacio es un manejador de módulos que permite la instalación clases que mplementan y abtraen la interacción completa contra un grupo de contratos encapulando la complejidad. Cada módulo actuará como un singletón (instancia útica en el sistema) y deberá implementar una única función obligatoria init() que usará para inicializar su estado. A partir de allí se servirá de los otros espacios (authenticación y network) para realizar las interacciones que necesite contra los contratos que necesite.
W3oService {
    constructor(public path: string) // this path should match the path in the service object
    init(w3o: Web3Octopus);
    snapshot(): any; // export internal state
}

4 - Punto de entrada
Se trata de una clase singleton principal que oficiará de punto de entrada en todos los casos a la cual tenemos que inicializar pasándole una serie de clases de fábrica (factory classes) las que sirven para instalar el soporte a cierta familia de networks. En su archivo de configuración, el desarrollador lo primero que hará será instanciar la case principal Web3Octopus a la cual le instalará una lista de al menos un W3oNetwork Support Factory que proveerá la implementación concreta para alguna network.
```
Web3Octopus<CustomModuleType> {
    addNetworkSupport(factory: W3oNetworkSupportFactory): void;
    sessions: W3oSessionManager;
    networks: W3oNetworkManager;
    init() {
        this.networks.getNetworks().forEach(network => network.updateState());
        this.createservice();
    }
    _service: CustomModuleType | null = null;
    get service(): CustomModuleType {
        if (!this._service) this._service = this.createservice();
        return this._service;
    }
    registerServices(services: CustomModuleType): void {}
    createservice() // creates custom structure based on the service paths. It register all service on 
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
    auth: W3oAuthenticator[];
    networks: W3oNetworkSettings[];
}
```

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
    EthereumTokensService,                // extends W3oService
    EthereumBalancesService,              // extends W3oService
    EthereumMetamaskAuth,                 // extends W3oAuthenticator
    EthereumBraveAuth,                    // extends W3oAuthenticator
    EthereumWalletConnectAuth,            // extends W3oAuthenticator
    EthereumSupportFactory,               // extends W3oNetworkSupportFactory
} from '@vapaee/w3o-ethereum';

// import the classes to support Antelope (EOSIO) networks
import {
    AntelopeNetwork,                      // extends W3oNetwork
    AntelopeTokensService,                // extends W3oService
    AntelopeBalancesService,              // extends W3oService
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
// the developer user may be creative and create his own service schema
interface IMyServices {
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
octopus.init();

export function getOctopus(): Web3Octopus<IMyServices> {
    return octopus;
}

// ejemplo de uso desde otro archivo
import { getOctopus } from '...';

getOctopus().services.evm.tokens.updateTokenList()
getOctopus().services.foo.bar();

```


5 - Sessions
El quinto y último espacio es el de sesiones que nos permite implementar una de las características más destacadas de la biblioteca que es la de poder tener múltiples sesiones abiertas en paralelo en diferentes networks y autenticadores. Cada sesión tendrá un id único (<account-address>:<network-name>) y tendrá la tarea de mantener los datos que sean relevanets para esa sesión en particular. Las Sesiones además proveerán de una forma de almacenar datos extras relevantes a la sesión. Los módulos podrán almacenar datos en la sesión y recuperarlos en cualquier momento. Luego tendremos un manejador de sesiones que nos permitirá crear, eliminar y recuperar sesiones en cualquier momento, pero más importante aún, nos permitirá cambiar de sesión activa (current) en cualquier momento.

Este feature no siempre será utilizado y no queremos forzar a que el desarrollador tenga en cuenta que existen múltiples sesiones, por tanto el manejador de sesiones debe contemplar un API para múltimples seciones pero también un API para usar la sessión activa como la única posible.
```
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
```

Necesito que me des una descripción brebe de cada una de las siguinetes entidades, diciendo si es una clase, interface o tipo y que rol cumple:
W3oNetworkType
W3oNetworkName
W3oAddress
W3oError
W3oAuthenticator
W3oTransaction
W3oTransactionResponse
W3oTransactionReceipt
W3oAccount
W3oNetwork
W3oNetworkLinks
W3oContractManager
W3oContractABI
W3oToken
W3oContract
W3oNetworkManager
W3oNetworkSupportFactory
W3oSupportSettings
W3oAuthenticatorSettings
W3oNetworkSettings
W3oService
W3oSessionManager
W3oSession
Web3Octopus


¡Por supuesto! Aquí tienes la información en formato de tabla:

| #  | Entidad                   | Tipo             | Rol                                                                                          |
|----|---------------------------|------------------|----------------------------------------------------------------------------------------------|
| 1  | W3oNetworkType            | Tipo             | Define los tipos de redes blockchain soportadas.                                             |
| 2  | W3oNetworkName            | Tipo             | Representa el nombre identificador de una red blockchain.                                    |
| 3  | W3oAddress                | Tipo             | Representa la dirección o ID del usuario en una blockchain.                                  |
| 4  | W3oError                  | Clase            | Clase para manejar errores específicos dentro del framework, con un mensaje, código y payload.|
| 5  | W3oAuthenticator          | Clase abstracta  | Proporciona métodos para autenticación de usuarios, gestión de cuentas y firma de transacciones.|
| 6  | W3oTransaction            | Interfaz         | Representa una transacción en la blockchain, su implementación específica depende de la subclase.|
| 7  | W3oTransactionResponse    | Clase            | Maneja la respuesta de una transacción firmada, incluyendo el hash y la espera de la recepción de la transacción.|
| 8  | W3oTransactionReceipt     | Interfaz         | Representa el recibo de una transacción, se especificará más adelante.                        |
| 9  | W3oAccount                | Clase            | Maneja los datos de una cuenta de usuario en la blockchain, proporcionando métodos para acceder a su dirección y tomar una captura de su estado.|
| 10 | W3oNetwork                | Clase abstracta  | Representa una red blockchain, proporciona métodos para obtener información sobre la red, contratos y tokens.|
| 11 | W3oNetworkLinks           | Interfaz         | Define enlaces útiles para una red específica, como el explorador, puente, ecosistema, sitio web y monedero.|
| 12 | W3oContractManager        | Clase            | Gestiona los contratos dentro de una red, con caché interno y API para agregar, obtener y listar contratos.|
| 13 | W3oContractABI            | Interfaz         | Define la interfaz del ABI (Application Binary Interface) de un contrato, se especificará en cada implementación.|
| 14 | W3oToken                  | Clase            | Representa un token en la blockchain, proporcionando métodos para obtener su información como símbolo, decimales, precio en USD, etc.|
| 15 | W3oContract               | Clase            | Representa un contrato en la blockchain, proporciona métodos para obtener su ABI y tomar una captura de su estado.|
| 16 | W3oNetworkManager         | Clase            | Gestiona las redes registradas en el framework, permitiendo actualizar su estado y acceder a la red actual.|
| 17 | W3oNetworkSupportFactory  | Clase            | Proporciona soporte para una familia de redes, manejando la autenticación y configuración específica de cada red.|
| 18 | W3oSupportSettings        | Interfaz         | Define la configuración de soporte, incluyendo autenticadores y configuraciones de red.       |
| 19 | W3oAuthenticatorSettings  | Interfaz         | Define la configuración específica para autenticadores, será utilizada en la configuración del soporte de redes.|
| 20 | W3oNetworkSettings        | Interfaz         | Define la configuración específica para redes, incluyendo nombre, ID de cadena, nombre para mostrar y enlaces útiles.|
| 21 | W3oService                | Clase            | Representa un servicio en el framework, encapsula la interacción con un grupo de contratos, puede tener un estado interno y debe implementar un método `init` para inicializar su estado.|
| 22 | W3oSessionManager         | Clase            | Gestiona las sesiones en el framework, permitiendo crear, eliminar, recuperar y cambiar la sesión activa.|
| 23 | W3oSession                | Clase            | Representa una sesión específica, manteniendo los datos relevantes para la cuenta y red asociadas, con métodos para almacenar y recuperar datos adicionales.|
| 24 | Web3Octopus               | Clase            | Clase principal del framework, actúa como punto de entrada, inicializa redes y módulos, y maneja las sesiones.|