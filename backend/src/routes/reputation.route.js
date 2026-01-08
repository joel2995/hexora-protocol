import express from "express";
import { calculateReputation } from "../services/reputation.service.js";
import { uploadToIPFS } from "../services/ipfs.service.js";
import { keccakHash } from "../utils/hash.js";
import Reputation from "../models/Reputation.model.js";

const router = express.Router();

router.post("/update", async (req, res) => {
  const { wallet, metrics } = req.body;

  const scores = calculateReputation(metrics);
  const ipfsCID = await uploadToIPFS({ wallet, ...scores });
  const hash = keccakHash(ipfsCID);

  await Reputation.create({ wallet, ...scores, ipfsCID, hash });

  res.json({ ...scores, ipfsCID, hash });
});

export default router;
