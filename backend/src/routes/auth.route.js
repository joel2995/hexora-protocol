import express from "express";
import { verifySignature } from "../services/wallet.service.js";

const router = express.Router();

router.post("/verify", async (req, res) => {
  const { address, signature } = req.body;

  try {
    const isValid = verifySignature(address, signature);

    if (!isValid) {
      return res.status(401).json({ error: "Invalid signature" });
    }

    res.json({ success: true, address });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
