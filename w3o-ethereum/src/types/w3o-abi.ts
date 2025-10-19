// w3o-ethereum/src/types/w3o-abi.ts

export type EthereumAbiItemType =
    | 'function'
    | 'event'
    | 'constructor'
    | 'fallback'
    | 'receive';

export type EthereumStateMutability =
    | 'pure'
    | 'view'
    | 'nonpayable'
    | 'payable';

export interface EthereumAbiParameter {
    name: string;
    type: string;
    internalType?: string;
    components?: EthereumAbiParameter[]; // for tuple / tuple[]
}

export interface EthereumEventParameter extends EthereumAbiParameter {
    indexed?: boolean;
}

export interface EthereumAbiItemBase {
    type: EthereumAbiItemType;
    name?: string;
    constant?: boolean;         // legacy compat
    payable?: boolean;          // legacy compat
    stateMutability?: EthereumStateMutability;
}

export interface EthereumFunctionAbiItem extends EthereumAbiItemBase {
    type: 'function';
    inputs: EthereumAbiParameter[];
    outputs?: EthereumAbiParameter[];
}

export interface EthereumEventAbiItem extends EthereumAbiItemBase {
    type: 'event';
    inputs: EthereumEventParameter[];
    anonymous?: boolean;
}

export interface EthereumConstructorAbiItem extends EthereumAbiItemBase {
    type: 'constructor';
    inputs: EthereumAbiParameter[];
}

export interface EthereumFallbackAbiItem extends EthereumAbiItemBase {
    type: 'fallback';
}

export interface EthereumReceiveAbiItem extends EthereumAbiItemBase {
    type: 'receive';
    stateMutability?: 'payable';
}

export type EthereumAbiItem =
    | EthereumFunctionAbiItem
    | EthereumEventAbiItem
    | EthereumConstructorAbiItem
    | EthereumFallbackAbiItem
    | EthereumReceiveAbiItem;

export type EthereumContractAbi = readonly (EthereumAbiItem | string)[];
