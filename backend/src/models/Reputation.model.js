import mongoose from "mongoose";

const ReputationSchema = new mongoose.Schema({
  wallet: String,
  influenceScore: Number,
  trustScore: Number,
  ipfsCID: String,
  hash: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Reputation", ReputationSchema);
