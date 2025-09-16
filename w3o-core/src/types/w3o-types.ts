// w3o-code/src/types/w3o-types.ts

/**
 * Represents the type of blockchain supported by Web3 Octopus
 */
export type W3oNetworkType = 'ethereum' | 'antelope' | 'solana' | 'cosmos' | 'polkadot' | 'other';

/**
 * Represents the name of a specific network instance (e.g.: 'telos', 'ethereum', 'bsc-testnet')
 */
export type W3oNetworkName = string;

/**
 * Represents a blockchain address (e.g.: address or contact name)
 */
export type W3oAddress = string;

/**
 * Represents a wallet support by name (e.g.: 'metamask', 'metakeep', 'anchor')
 */
export type W3oWalletName = string;


/**
 * Generic ABI supertype for any chain-specific ABI
 */
export type W3oContractABI = readonly unknown[];