// w3o-code/src/types/w3o-types.ts

/**
 * Represents the type of blockchain supported by Web3 Octopus
 */
export type W3oNetworkType = 'ethereum' | 'antelope' | 'solana';

/**
 * Represents the identifier for a specific authenticator (e.g., 'metamask', 'walletconnect')
 */

/**
 * Represents the name of a specific network instance (e.g., 'telos', 'ethereum', 'bsc-testnet')
 */
export type W3oNetworkName = string;

/**
 * Represents a blockchain address (e.g., account or contract address)
 */
export type W3oAddress = string;
