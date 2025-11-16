// backend/src/seeds.ts

import { indexEmail } from "./services/esService";
import { classifyEmail } from "./services/aiService";

export const seedDemoEmails = async () => {
  const now = Date.now();

  const emails = [
    {
      id: now + 1, // 🔥 UNIQUE
      from: "john@example.com",
      subject: "Welcome!",
      text: "Nice to meet you. I am interested in your product.",
      date: new Date().toISOString()
    },
    {
      id: now + 2, // 🔥 UNIQUE
      from: "admin@company.com",
      subject: "Status",
      text: "Your account is active.",
      date: new Date().toISOString()
    }
  ];

  for (const email of emails) {
    const category = await classifyEmail(email);
    await indexEmail({ ...email, category });
  }

  console.log("🌱 Demo seeded with AI categories!");
};
