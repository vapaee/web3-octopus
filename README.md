# Web3 Octopus

**This framework is still in development.**

Web3 Octopus es un framework en TypeScript que simplifica la gestión de múltiples blockchains a la vez. Su arquitectura modular permite incorporar solo los componentes que cada proyecto requiera.

## Arquitectura
El marco se apoya en tres conceptos básicos:
- **Autenticación**: gestiona la identificación del usuario y la firma de transacciones.
- **Network**: representa los datos y contratos de una blockchain concreta.
- **Servicios**: módulos que simplifican la interacción con uno o varios contratos.

De esta forma se pueden crear implementaciones específicas para cada familia de redes.

## Paquetes incluidos
- **`@vapaee/w3o-core`**: núcleo con todas las clases base.
- **`@vapaee/w3o-antelope`**: implementación para cadenas basadas en Antelope (EOSIO).

En el directorio `examples/` hay un ejemplo sencillo construido con Vue que utiliza estos paquetes.

## Ejemplo de uso
```typescript
import {
    Web3Octopus,
    W3oIServices,
    W3oNetworkSupportSettings
} from '@vapaee/w3o-core';

import {
    AntelopeNetwork,
    AntelopeTokensService,
    AntelopeBalancesService,
    AntelopeAnchorAuth,
    TelosZeroNetwork,
    TelosZeroTestnetNetwork
} from '@vapaee/w3o-antelope';

interface IMyServices extends W3oIServices {
    telos: {
        tokens: AntelopeTokensService;
        balances: AntelopeBalancesService;
    };
}

const octopus = new Web3Octopus<IMyServices>();

const telosSupport: W3oNetworkSupportSettings<IMyServices> = {
    type: 'antelope',
    auth: [new AntelopeAnchorAuth(octopus)],
    networks: [
        new TelosZeroNetwork({}, octopus),
        new TelosZeroTestnetNetwork({}, octopus)
    ]
};

octopus.addNetworkSupport(telosSupport);

const services = [
    new AntelopeTokensService('telos.tokens', octopus),
    new AntelopeBalancesService('telos.balances', octopus)
];

octopus.registerServices(services);
octopus.init();

export function getOctopus(): Web3Octopus<IMyServices> {
    return octopus;
}
```

Luego desde cualquier otra parte del proyecto podemos hacer lo siguiente

```typescript
import { getOctopus } from '...';

getOctopus().services.telos.balances$.subscribe(console.log);
```

## Instalación
```bash
npm install
npm run build
```
El script `build` compila los paquetes locales y deja todo listo para usarlos desde la carpeta `lib` de cada uno.

## Dependencias
- **rxjs**: Todos los datos internos se manejarán como observables, facilitando la gestión de estados reactivos y asincrónicos.
- **typescript**: Proporciona un entorno robusto y agnóstico, permitiendo integrar Web3 Octopus con otras herramientas de desarrollo.

## Clases principales
| #  | Entidad                   | Tipo             | Rol                                                               |
|----|---------------------------|------------------|------------------------------------------------------------------|
| 1  | W3oNetworkType            | Tipo             | Define los tipos de redes blockchain soportadas.                 |
| 2  | W3oNetworkName            | Tipo             | Identificador único de una red blockchain.                       |
| 3  | W3oAddress                | Tipo             | Representa una dirección o cuenta de usuario.                    |
| 4  | W3oError                  | Clase            | Manejo de errores con código y payload opcional.                 |
| 5  | W3oAuthenticator          | Clase abstracta  | Base para la implementación de autenticadores.                   |
| 6  | W3oTransaction            | Interfaz         | Modelo común para transacciones en distintas redes.              |
| 7  | W3oTransactionResponse    | Clase            | Resultado de firmar una transacción.                             |
| 8  | W3oTransactionReceipt     | Interfaz         | Recibo que confirma la ejecución de la transacción.              |
| 9  | W3oAccount                | Clase            | Información y estado de una cuenta de usuario.                   |
| 10 | W3oNetwork                | Clase abstracta  | Representa una red blockchain concreta.                          |
| 11 | W3oNetworkLinks           | Interfaz         | Enlaces útiles como explorer o puente.                           |
| 12 | W3oContractManager        | Clase            | Gestiona y cachea contratos desplegados en una red.              |
| 13 | W3oContractABI            | Interfaz         | Describe la ABI de un contrato.                                  |
| 14 | W3oToken                  | Clase            | Representación de un token estándar.                              |
| 15 | W3oContract               | Clase            | Representación de un contrato desplegado.                        |
| 16 | W3oNetworkManager         | Clase            | Administración de las redes registradas.                         |
| 17 | W3oNetworkSupportSettings | Interfaz         | Configuración de redes y autenticadores.                         |
| 18 | W3oNetworkSettings        | Interfaz         | Datos de configuración específicos de una red.                   |
| 19 | W3oService                | Clase            | Lógica de alto nivel sobre contratos y tokens.                   |
| 20 | W3oSessionManager         | Clase            | Manejo de múltiples sesiones de usuario.                         |
| 21 | W3oSession                | Clase            | Datos de una sesión y su red asociada.                           |
| 22 | Web3Octopus               | Clase            | Punto de entrada principal del framework.                        |
