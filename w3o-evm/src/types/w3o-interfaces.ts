// w3o-evm/src/types/w3o-interfaces.ts

import {
    W3oNetworkSettings,
    W3oTransaction,
    W3oTransferStatus,
    W3oTransferSummary,
    W3oTransactionReceipt // Import W3oTransactionReceipt from core
} from "@vapaee/w3o-core";

import { Chain } from "@wagmi/core/chains"; // Para la definición de Chain de wagmi
import { Abi, Address, Hex, Hash } from "viem"; // De viem, que wagmi usa internamente para tipos de bajo nivel

/**
 * Configuración de red extendida específica para cadenas basadas en EVM
 */
export interface W3oEVMNetworkSettings extends W3oNetworkSettings {
    chain: Chain; // Definición de cadena wagmi (ej. mainnet, sepolia)
    w3oVersion: string; // Versión del módulo EVM
    w3oName: string; // Nombre del módulo EVM
    w3oRequire: string[]; // Módulos o dependencias requeridas
    blockExplorerUrl: string; // URL para el explorador de bloques
    nativeCurrency: { // Detalles de la moneda nativa
        name: string;
        symbol: string;
        decimals: number;
    };
}

/**
 * ABI de contrato específico de EVM.
 * Se usa el tipo Abi de viem, que es compatible con ethers.js para muchas operaciones.
 */
export type EVMContractABI = Abi;

/**
 * Tipo de transacción específico de EVM.
 * Extiende W3oTransaction para incluir parámetros de EVM.
 */
export interface EVMTransaction extends W3oTransaction {
    // Para transferencias de tokens nativos (como ETH) o transferencias de valor simple
    to?: Address;
    value?: bigint; // Cantidad en wei (usar bigint para números grandes)

    // Para interacciones con contratos
    contractAddress?: Address;
    abi?: EVMContractABI;
    functionName?: string;
    args?: any[];

    // Opciones generales de transacción
    data?: Hex;
    gasLimit?: bigint;
    gasPrice?: bigint; // O maxFeePerGas / maxPriorityFeePerGas
    nonce?: number;
    chainId?: number;
    accessList?: { address: Address; storageKeys: Hex[] }[];
    maxFeePerGas?: bigint;
    maxPriorityFeePerGas?: bigint;
}

/**
 * Recibo de transacción específico de EVM.
 * Extiende W3oTransactionReceipt.
 */
export interface EVMTransactionReceipt extends W3oTransactionReceipt {
    blockHash: Hex;
    blockNumber: bigint;
    contractAddress: Address | null;
    cumulativeGasUsed: bigint;
    effectiveGasPrice: bigint;
    gasUsed: bigint;
    logsBloom: Hex;
    status: "success" | "reverted";
    transactionHash: Hash;
    transactionIndex: number;
    // Puedes añadir más campos si los necesitas, de viem's TransactionReceipt o ethers' TransactionReceipt
}

/**
 * Estado de transferencia extendido que incluye un resumen opcional específico de EVM.
 */
export interface EVMTransferStatus extends W3oTransferStatus {
    summary?: EVMTransferSummary;
}

/**
 * Resumen de transferencia específico de EVM que incluye detalles de gas.
 */
export interface EVMTransferSummary extends W3oTransferSummary {
    gasUsed?: bigint; // Gas consumido por la transacción
    gasPrice?: bigint; // Precio por unidad de gas
}