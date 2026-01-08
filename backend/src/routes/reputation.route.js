import express from "express";
import { calculateReputation } from "../services/reputation.service.js";
import { uploadToIPFS } from "../services/ipfs.service.js";
import { keccakHash } from "../utils/hash.js";
import { mintOrUpdateCredentialNFT } from "../services/blockchain.service.js";
import Reputation from "../models/Reputation.model.js";

const router = express.Router();

router.post("/update", async (req, res) => {
  const { wallet, metrics } = req.body;

  // 1️⃣ Calculate scores
  const { influenceScore, trustScore } = calculateReputation(metrics);

  // 2️⃣ Store snapshot on IPFS
  const ipfsCID = await uploadToIPFS({
    wallet,
    influenceScore,
    trustScore,
    timestamp: Date.now()
  });

  // 3️⃣ Hash snapshot
  const hash = keccakHash(ipfsCID);

  // 4️⃣ Mint / update Credential NFT
  await mintOrUpdateCredentialNFT(
    wallet,
    influenceScore,
    trustScore
  );

  // 5️⃣ Cache in MongoDB
  await Reputation.create({
    wallet,
    influenceScore,
    trustScore,
    ipfsCID,
    hash
  });

  res.json({
    wallet,
    influenceScore,
    trustScore,
    ipfsCID,
    hash
  });
});

export default router;
