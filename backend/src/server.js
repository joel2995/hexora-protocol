import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/db.js";
import { startEventListeners } from "./services/eventListener.service.js";

const PORT = process.env.PORT || 5000;

connectDB();
startEventListeners();

app.listen(PORT, () => {
  console.log(`HEXORA backend running on port ${PORT}`);
});
