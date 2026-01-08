import { ethers } from "ethers";
import { SHARDEUM_RPC_URL } from "../config/chains.js";
import { recalcInfluenceOnly } from "./reputationUpdate.service.js";

// Dummy ABI for now
const STAKING_POOL_ABI = [];

export function startEventListeners() {
  const provider = new ethers.JsonRpcProvider(SHARDEUM_RPC_URL);

  console.log("[L2] Event listeners started");

  // MOCK event listener (real ABI later)
  provider.on("block", async (blockNumber) => {
    // simulate periodic influence recalculation
    if (blockNumber % 10 === 0) {
      console.log("[L2] Triggering influence recalculation");
      // later: loop creators & recalc
    }
  });
}