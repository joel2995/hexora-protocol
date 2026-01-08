import { getTokenFactory } from "./blockchain.service.js";

export async function detectRole(address) {
  const factory = await getTokenFactory();
  const tokenAddress = await factory.creatorToToken(address);

  if (tokenAddress !== ethers.ZeroAddress) {
    return {
      role: "creator",
      creatorToken: tokenAddress
    };
  }

  return { role: "fan" };
}
