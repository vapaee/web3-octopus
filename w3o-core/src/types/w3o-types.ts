// Representa el tipo de red en la que opera Web3 Octopus
export type W3oNetworkType = 'ethereum' | 'antelope' | 'solana';

// Representa el nombre de un autenticador específico dentro de Web3 Octopus (ejemplo: 'metamask' | 'walletconnect' | 'ledger' | 'trezor')
export type W3oAuthSupportName = string;

// Representa el nombre de una red específica dentro de Web3 Octopus
// ejemplos: 'telos' | 'telos-testnet' | 'eos' | 'jungle' | 'ethereum' | 'ropsten' | 'bsc' | 'bsc-testnet' | 'matic' | 'matic-testnet'
export type W3oNetworkName = string;

// Representa la dirección de una cuenta dentro de una red
export type W3oAddress = string;
