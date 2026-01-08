import { ethers } from "ethers";
import factoryABI from "../config/TokenFactoryABI.json" assert { type: "json" };
import { SHARDEUM_RPC } from "../config/chains.js";
import { TOKEN_FACTORY_ADDRESS } from "../config/contracts.js";

export async function getTokenFactory() {
  const provider = new ethers.JsonRpcProvider(SHARDEUM_RPC);
  return new ethers.Contract(
    TOKEN_FACTORY_ADDRESS,
    factoryABI,
    provider
  );
}
