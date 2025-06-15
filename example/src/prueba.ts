// src/prueba.ts
import { ethers } from 'ethers'

export type EthereumAddress = `0x${string}`

// Instanciación básica para navegador
const provider = new ethers.providers.Web3Provider(window.ethereum!)

// 1. Solicitar conexión con MetaMask y obtener cuentas
export async function connectWallet(): Promise<EthereumAddress[]> {
    console.log('connectWallet()');
    if (!window.ethereum) {
        throw new Error('MetaMask no está instalado')
    }
    await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()
    const address = await signer.getAddress()
    return [address as EthereumAddress]
}

// 2. Firmar un mensaje para login
export async function signMessage(address: EthereumAddress, msg: string): Promise<string> {
    const signer = provider.getSigner(address)
    const signature = await signer.signMessage(msg)
    return signature
}

// 3. Firmar y enviar ETH
export async function sendEth(
    to: EthereumAddress,
    amountWei: ethers.BigNumberish
): Promise<string> {
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
