import express from "express";
import { verifySignature } from "../services/wallet.service.js";
import User from "../models/User.model.js";

const router = express.Router();

router.post("/verify", async (req, res) => {
  const { address, signature } = req.body;

  if (!verifySignature(address, signature)) {
    return res.status(401).json({ error: "Invalid signature" });
  }

  await User.findOneAndUpdate(
    { wallet: address },
    { lastSeenAt: new Date() },
    { upsert: true }
  );

  res.json({ success: true });
});

export default router;
