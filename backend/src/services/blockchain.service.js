import { ethers } from "ethers";
import { SHARDEUM_RPC_URL } from "../config/chains.js";
import { TOKEN_FACTORY_ADDRESS } from "../config/contracts.js";

export function getTokenFactory() {
  const provider = new ethers.JsonRpcProvider(SHARDEUM_RPC_URL);
  return {
    creatorToToken: async () => ethers.ZeroAddress // dummy until deploy
  };
}
