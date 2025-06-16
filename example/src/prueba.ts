// src/prueba.ts
import { ethers } from 'ethers'

const TELOS_CHAIN_ID_HEX = '0x28' // 40 in decimal
// Telos EVM Mainnet network parameters
const TELOS_NETWORK_PARAMS = {
    chainId: TELOS_CHAIN_ID_HEX,
    chainName: 'Telos EVM',
    nativeCurrency: {
        name: 'Telos',
        symbol: 'TLOS',
        decimals: 18,
    },
    rpcUrls: ['https://mainnet.telos.net/evm'],
    blockExplorerUrls: ['https://teloscan.io'],
}

export type EthereumAddress = `0x${string}`

// Instanciación básica para navegador
let provider = new ethers.providers.Web3Provider(window.ethereum!)

async function ensureTelosNetwork() {
    console.log('ensureTelosNetwork()');
    if (!window.ethereum) {
        throw new Error('MetaMask no está instalado')
    }

    const currentChainId = await provider.send('eth_chainId', [])
    if (currentChainId === TELOS_CHAIN_ID_HEX) {
        console.log('Ya estás conectado a la red Telos EVM');
        provider = new ethers.providers.Web3Provider(window.ethereum!);
        return
    }

    try {
        await provider.send('wallet_switchEthereumChain', [{ chainId: TELOS_CHAIN_ID_HEX }])
    } catch (switchError: any) {
        if (switchError.code === 4902 || switchError?.data?.originalError?.code === 4902) {
            await provider.send('wallet_addEthereumChain', [TELOS_NETWORK_PARAMS])
            await provider.send('wallet_switchEthereumChain', [{ chainId: TELOS_CHAIN_ID_HEX }])
        } else {
            throw switchError
        }
    }

    provider = new ethers.providers.Web3Provider(window.ethereum!);
}

// 1. Solicitar conexión con MetaMask y obtener cuentas
export async function connectWallet(): Promise<EthereumAddress[]> {
    console.log('connectWallet()');
    await ensureTelosNetwork()
    await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()
    const address = await signer.getAddress()
    return [address as EthereumAddress]
}

// 2. Firmar un mensaje para login
export async function signMessage(address: EthereumAddress, msg: string): Promise<string> {
    await ensureTelosNetwork()
    const signer = provider.getSigner(address)
    const signature = await signer.signMessage(msg)
    return signature
}

// 3. Firmar y enviar ETH
export async function sendEth(
    to: EthereumAddress,
    amountWei: ethers.BigNumberish
): Promise<string> {
    await ensureTelosNetwork()
    const signer = provider.getSigner();
    const from: EthereumAddress = await signer.getAddress() as EthereumAddress;
    console.log(`Enviando ${amountWei} wei desde ${from} a ${to}`);
    const tx = await signer.sendTransaction({
        to,
        value: ethers.BigNumber.from(amountWei),
    })
    await tx.wait()
    return tx.hash
}

// 4. Leer balance de cualquier dirección
export async function readBalance(address: EthereumAddress): Promise<ethers.BigNumber> {
    return provider.getBalance(address)
}
