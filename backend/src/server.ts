
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import emailRoutes from "./routes/emailRoutes";
import { ensureEmailIndex } from "./services/esService";
import { seedDemoEmails } from "./seeds";
// import { startIMAP } from "./services/imapService";
// import { initVectorStore, storeKnowledge } from "./services/ragService";



// -----------------------------
// Express Setup
// -----------------------------
const app = express();
app.use(express.json());
app.use(cors());

// -----------------------------
// Routes
// -----------------------------
app.use("/api/emails", emailRoutes);

// -----------------------------
// PORT MUST come BEFORE listen()
// -----------------------------
const PORT = process.env.PORT || 4000;

// -----------------------------
// Start Server
// -----------------------------
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);

  // Seed dummy emails into Elasticsearch
    await ensureEmailIndex();
  await seedDemoEmails();
  console.log("🌱 Demo emails seeded!");

  /*
  // -----------------------------
  // IMAP SYNC (disabled for now)
  // -----------------------------
  await startIMAP({
    host: process.env.IMAP_HOST1,
    port: Number(process.env.IMAP_PORT1),
    secure: process.env.IMAP_SECURE1 === "true",
    user: process.env.IMAP_USER1,
    pass: process.env.IMAP_PASS1,
  });

  await startIMAP({
    host: process.env.IMAP_HOST2,
    port: Number(process.env.IMAP_PORT2),
    secure: process.env.IMAP_SECURE2 === "true",
    user: process.env.IMAP_USER2,
    pass: process.env.IMAP_PASS2,
  });

  // -----------------------------
  // RAG Vector DB Init
  // -----------------------------
  await initVectorStore();
  await storeKnowledge("If user is interested, send meeting link: https://cal.com/example");
  */
});
