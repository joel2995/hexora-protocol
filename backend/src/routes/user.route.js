import express from "express";
import { detectRole } from "../services/role.service.js";

const router = express.Router();

router.get("/role/:address", async (req, res) => {
  const { address } = req.params;

  try {
    const roleData = await detectRole(address);
    res.json(roleData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
