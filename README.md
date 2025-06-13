
# Web3 Octopus

**This framework is still in development.**

Web3 Octopus es un framework en TypeScript diseñado para facilitar el manejo de múltiples conexiones activas con diferentes blockchains simultáneamente. Cuenta con una arquitectura pensada para la incorporación de nuevas funcionalidades en forma de plugins, de manera tal que el desarrollador final pueda tomar sólo los módulos que le interesa usar y armar su propia versión de Octopus.

# Arquitectura
Web3 Octopus es un framework que, en su capa más abstracta, se basa en tres conceptos bien diferenciados y comunes a todas las blockchains: Autenticación, Network y Módulos.

- **Autenticación**: Se encarga de la identificación del usuario, el login y la firma de transacciones. Proporciona métodos para saber si el usuario está autenticado, obtener su dirección o ID y sus datos ampliados dependiendo de la blockchain.
- **Network**: Representa los datos específicos de la blockchain, incluyendo su identificación (id, nombre, título, system coin), lista de tokens y endpoints. Gestiona la información sobre los contratos y tokens que existen en la red, permitiendo obtener datos actualizados y relevantes. Es responsable de proveer la abstracción de los contratos a partir de su ABI. Es decir, un objeto interactivo que abstrae la forma de interactuar con el contrato real y extraer datos públicos de él.
- **Servicios**: Son abstracciones de funcionalidades cuya implementación se basa fuertemente en la interacción con los contratos sobre la blockchain. Se encargan de obtener los datos de donde sea necesario tomarlos y dejarlos disponibles para el desarrollador, usando observers tanto para disparar acciones internas como para proveer hacia afuera datos siempre actualizados. También suelen abstraer la complejidad que suele haber en sistemas que tienen varios contratos desplegados sobre una o más blockchains.

Esta arquitectura pretende establecer las bases para una solución uniforme en el ecosistema crypto y así permitirle a los desarrolladores crear y publicar módulos bien específicos de su negocio y beneficiarse de todos los módulos ya creados por la comunidad.


Veamos un ejemplo de uso final configurando Web3 Octopus para interactuar cuatro blockchains distintas:

```typescript
// import the main class from the core
import {
    Web3Octopus,                          // the main class
    W3oIServices,                         // interface that includes the snapshot function
} from '@vapaee/w3o-core';

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
    multiSession: true, // if false, W3oSessionManager will maintain only one open session and logout the user if the network changes
});

export function getOctopus(): Web3Octopus<IMyServices> {
    return octopus;
}
```

Luego desde cualquier otro lado del proyecto podemos hacer lo siguiente

```typescript
// ejemplo de uso desde otro archivo
import { getOctopus } from '...';

getOctopus().services.evm.tokens.updateTokenList()
getOctopus().services.foo.bar();

```

# Dependencias
- **rxjs**: Todos los datos internos se manejarán como observables, lo que facilita la gestión de estados reactivos y asincrónicos dentro del framework.
- **typescript**: Proporciona un entorno de desarrollo robusto y agnóstico al framework, asegurando que Web3 Octopus pueda integrarse fácilmente con otras tecnologías y herramientas de desarrollo.

# Clases Principales

| #  | Entidad                   | Tipo             | Rol                                                                                           |
|----|---------------------------|------------------|-----------------------------------------------------------------------------------------------|
| 1  | W3oNetworkType            | Tipo             | Define los tipos de redes blockchain soportadas. Ejemplos: "ethereum" | "antelope" | "solana" |
| 2  | W3oNetworkName            | Tipo             | Representa el nombre identificador de una red blockchain.                                     |
| 3  | W3oAddress                | Tipo             | Representa la dirección o ID del usuario en una blockchain.                                   |
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
| 18 | W3oNetworkSupportSettings | Interfaz         | Define la configuración de soporte, incluyendo autenticadores y configuraciones de red.       |
| 19 | W3oAuthenticatorSettings  | Interfaz         | Define la configuración específica para autenticadores, será utilizada en la configuración del soporte de redes.|
| 20 | W3oNetworkSettings        | Interfaz         | Define la configuración específica para redes, incluyendo nombre, ID de cadena, nombre para mostrar y enlaces útiles.|
| 21 | W3oService                | Clase            | Representa un servicio en el framework, encapsula la interacción con un grupo de contratos, puede tener un estado interno y debe implementar un método `init` para inicializar su estado.|
| 22 | W3oSessionManager         | Clase            | Gestiona las sesiones en el framework, permitiendo crear, eliminar, recuperar y cambiar la sesión activa.|
| 23 | W3oSession                | Clase            | Representa una sesión específica, manteniendo los datos relevantes para la cuenta y red asociadas, con métodos para almacenar y recuperar datos adicionales.|
| 24 | Web3Octopus               | Clase            | Clase principal del framework, actúa como punto de entrada, inicializa redes y módulos, y maneja las sesiones.|

