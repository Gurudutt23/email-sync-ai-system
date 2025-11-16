import { QdrantClient } from "@qdrant/js-client-rest";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "../config/env";

const genAI = new GoogleGenerativeAI(config.geminiKey);
const embedModel = genAI.getGenerativeModel({ model: "embedding-001" });

const qdrant = new QdrantClient({
  url: config.qdrantUrl,
  checkCompatibility: false,
});

const COLLECTION = "knowledge-base";

export const initVectorStore = async () => {
  try {
    const collections = await qdrant.getCollections();
    const exists = collections.collections.some(
      (c: any) => c.name === COLLECTION
    );

    if (!exists) {
      await qdrant.createCollection(COLLECTION, {
        vectors: {
          size: 768,
          distance: "Cosine",
        },
      });
      console.log("🧠 Created Qdrant Knowledge Base");
    }
  } catch (err) {
    console.error("RAG Init Error:", err);
  }
};

export const storeKnowledge = async (text: string) => {
  const embedding = await embedModel.embedContent(text);
  await qdrant.upsert(COLLECTION, {
    points: [
      {
        id: Date.now(),
        vector: embedding.embedding.values,
        payload: { text },
      },
    ],
  });
};

export const generateReply = async (emailText: string) => {
  const emailEmbed = await embedModel.embedContent(emailText);

  const search = await qdrant.search(COLLECTION, {
    vector: emailEmbed.embedding.values,
    limit: 3,
  });

  const context = search.map((p: any) => p.payload.text).join("\n");

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
Use the following context to generate a reply:

Context:
${context}

Email:
${emailText}

Reply professionally:
`;

  const reply = await model.generateContent(prompt);
  return reply.response.text();
};
