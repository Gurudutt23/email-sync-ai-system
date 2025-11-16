// backend/src/controllers/emailController.ts

import { Request, Response } from "express";
import { indexEmail, fetchAllEmails } from "../services/esService";
import { classifyEmail } from "../services/aiService";

export const getAllEmails = async (req: Request, res: Response) => {
  const emails = await fetchAllEmails();
  res.json(emails);
};

export const createEmail = async (req: Request, res: Response) => {
  try {
    const email = {
      id: Date.now(), // 🔥 UNIQUE ID
      ...req.body,
      date: new Date().toISOString() // 🔥 ENSURE DATE EXISTS
    };

    // Classify using Gemini
    const category = await classifyEmail(email);

    // Store in Elasticsearch
    const stored = await indexEmail({ ...email, category });

    res.status(201).json(stored);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to create email" });
  }
};
