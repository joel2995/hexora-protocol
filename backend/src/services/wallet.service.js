import { ethers } from "ethers";

export function verifySignature(address, signature) {
  const message = "Login to HEXORA";
  const recovered = ethers.verifyMessage(message, signature);
  return recovered.toLowerCase() === address.toLowerCase();
}
