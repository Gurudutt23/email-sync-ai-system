import dotenv from "dotenv";

// Load .env file
dotenv.config();

export const config = {
  port: process.env.PORT || 4000,

  // IMAP Accounts
  imap1: {
    user: process.env.IMAP_USER1 || "",
    pass: process.env.IMAP_PASS1 || "",
    host: process.env.IMAP_HOST1 || "",
    port: Number(process.env.IMAP_PORT1) || 993,
    secure: process.env.IMAP_SECURE1 === "true",
  },

  imap2: {
    user: process.env.IMAP_USER2 || "",
    pass: process.env.IMAP_PASS2 || "",
    host: process.env.IMAP_HOST2 || "",
    port: Number(process.env.IMAP_PORT2) || 993,
    secure: process.env.IMAP_SECURE2 === "true",
  },

  // Elasticsearch
  elasticsearchUrl: process.env.ES_URL || "http://localhost:9200",

  // Vector DB (Qdrant)
  qdrantUrl: process.env.QDRANT_URL || "http://localhost:6333",

  // Slack + Webhook
  slackWebhook: process.env.SLACK_WEBHOOK_URL || "",
  webhookUrl: process.env.WEBHOOK_URL || "",

  // OpenAI API
  geminiKey: process.env.GEMINI_API_KEY || "",
};
