import { Client } from "@elastic/elasticsearch";

const INDEX = "emails";

export const esClient = new Client({
  node: process.env.ES_URL || "http://localhost:9200",
  tls: { rejectUnauthorized: false },
});

// Auto-create index if not exists
export const ensureEmailIndex = async () => {
  const exists = await esClient.indices.exists({ index: INDEX });
  if (!exists) {
    await esClient.indices.create({
      index: INDEX,
      mappings: {
        properties: {
          from: { type: "text" },
          to: { type: "text" },
          subject: { type: "text" },
          text: { type: "text" },
          date: { type: "date" }
        }
      }
    });

    console.log("📁 Created Elasticsearch index: emails");
  }
};

export const indexEmail = async (email: any) => {
  await esClient.index({
    index: INDEX,
    document: email,
  });
};

export const fetchAllEmails = async () => {
  const result = await esClient.search({
    index: INDEX,
    query: { match_all: {} },
    size: 100,
  });
  return result.hits.hits.map((hit: any) => hit._source);
};

export const searchInElasticsearch = async (query: string) => {
  const result = await esClient.search({
    index: INDEX,
    query: {
      multi_match: {
        query,
        fields: ["subject", "text", "from", "to"],
      },
    },
  });
  return result.hits.hits.map((hit: any) => hit._source);
};
