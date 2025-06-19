// avoid window.ethereum compiling errors
interface Window {
    ethereum?: any; // Define the type of ethereum if known, e.g., EthereumProvider
}
