export const CHAINS = {
  ethereum: {
    name: "Ethereum",
    rpc: process.env.ETH_RPC_URL,
    chainId: 1 // change to testnet if needed
  },
  shardeum: {
    name: "Shardeum",
    rpc: process.env.SHARDEUM_RPC_URL,
    chainId: 8082 // example testnet
  },
  inco: {
    name: "Inco",
    rpc: process.env.INCO_RPC_URL,
    chainId: 9090 // example
  }
};
