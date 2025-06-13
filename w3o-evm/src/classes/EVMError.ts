// w3o-evm/src/classes/EVMError.ts

import { W3oError } from "@vapaee/w3o-core";

/**
 * Clase de error personalizada para errores específicos de EVM dentro de Web3 Octopus.
 */
export class EVMError extends W3oError {

    /**
     * Construye una nueva instancia de EVMError con un mensaje predefinido y un payload opcional.
     */
    constructor(error: { message: string, code: number }, payload?: any) {
        super(error, payload);
    }

    /**
     * Error que indica que wagmi no ha sido configurado en el entorno de la aplicación.
     */
    public static readonly WAGMI_NOT_CONFIGURED = { message: 'Wagmi configuration not found in the application environment. Please ensure WagmiConfig is set up.', code: 3000 };

    /**
     * Error que indica que no se encontró una cuenta autenticada a través de wagmi.
     */
    public static readonly WAGMI_ACCOUNT_NOT_FOUND = { message: 'No Wagmi account found or connected.', code: 3001 };

    /**
     * Error que indica que la transacción EVM no tiene los parámetros necesarios (ej. `to` o `contractAddress`).
     */
    public static readonly EVM_TRANSACTION_INVALID_PARAMS = { message: 'EVM transaction is missing required parameters (e.g., "to" or "contractAddress").', code: 3002 };

    /**
     * Error que indica que la transacción fue revertida en la blockchain.
     */
    public static readonly TRANSACTION_REVERTED = { message: 'EVM transaction was reverted by the blockchain.', code: 3003 };

    /**
     * Error que indica que no se encontró un proveedor de ethers.js para la red.
     */
    public static readonly ETHERS_PROVIDER_NOT_FOUND = { message: 'Ethers.js provider not found for the current network.', code: 3004 };

    /**
     * Error que indica que la interacción con el contrato falló.
     */
    public static readonly CONTRACT_INTERACTION_FAILED = { message: 'Failed to interact with smart contract.', code: 3005 };
}