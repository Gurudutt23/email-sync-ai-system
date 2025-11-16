import { GoogleGenerativeAI } from "@google/generative-ai";
import { retry } from "../utils/retry";
import { config } from "../config/env";

const genAI = new GoogleGenerativeAI(config.geminiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"   // ⭐ Correct model (no v1beta fallback)
});

const labels = [
  "Interested",
  "Meeting Booked",
  "Not Interested",
  "Spam",
  "Out of Office",
];

export const classifyEmail = async (email: any) => {
  try {
    const prompt = `
Classify this email into one of the following labels:
${labels.join(", ")}

Subject: ${email.subject}
Body: ${email.text}

Return ONLY the label.
    `;

    const result = await retry(() =>
      model.generateContent({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      })
    );

    const text = result.response.text().trim();
    return labels.includes(text) ? text : "Not Interested";

  } catch (err) {
    console.error("AI Classification Error:", err);
    return "Not Interested";
  }
};
