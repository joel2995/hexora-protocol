import express from "express";
import { uploadToIPFS } from "../services/ipfs.service.js";
import { keccakHash } from "../utils/hash.js";

const router = express.Router();

router.post("/anchor", async (req, res) => {
  const reputationData = req.body;

  try {
    const cid = await uploadToIPFS(reputationData);
    const hash = keccakHash(cid);

    res.json({
      ipfsCID: cid,
      reputationHash: hash
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
