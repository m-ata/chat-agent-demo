import OpenAI from "openai";
import * as fs from "fs";
import * as path from "path";
import dummyTickets from "../data/tickets";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!, // make sure this is set in your env
});

/**
 * Generate an embedding vector for a single text string.
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const input = (text ?? "").trim();
  if (!input) {
    return [];
  }

  try {
    const res = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input,
    });

    return res.data[0].embedding;
  } catch (err) {
    console.error("Failed to generate embedding:", err);
    throw err;
  }
}

export async function createEmbeddings() {
  const enriched = [];

  for (const ticket of dummyTickets) {
    const combinedText = `${ticket.title} ${ticket.description}`;
    const embedding = await generateEmbedding(combinedText);
    // const embedding = [0, 1];

    enriched.push({
      ...ticket,
      embedding,
    });

    console.log(`✅ Embedded ticket ID ${ticket.id}`);
  }

  // Step 1: ensure output directory exists
  const outputDir = path.join(__dirname); // or path.join(__dirname, "output") if you want a subfolder
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Step 2: create or overwrite the output file
  const outputPath = path.join(outputDir, "ticketsWithEmbeddings.json");
  fs.writeFileSync(outputPath, JSON.stringify(enriched, null, 2), { flag: "w" });

  console.log(`\n✅ All embeddings saved to ${outputPath}`);
}

