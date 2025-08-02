import { getDataSource } from "@/lib/orm";
import { generateEmbedding } from "../utils/embedding";
import { DynamicStructuredTool } from "@langchain/core/tools";
import z from "zod";

export const findIssueByTitleDescriptionTool = new DynamicStructuredTool({
  name: "find_issue_by_title_description",
  description:
    "This function takes the title or description or both and apply a similarity search to find the most relevant issue.",
  schema: z.object({
    title: z.string().describe("Title of the issue / ticket"),
    description: z.string().describe("Detailed description of the ticket"),
  }),
  func: async ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    const db = await getDataSource();

    const embedding = await generateEmbedding(`${title} ${description}`);
    const embeddingLiteral = `[${embedding.join(",")}]`;

    const result = await db.query(
      `
            SELECT *,
              embedding <#> $1 AS distance
            FROM issue
            ORDER BY distance ASC
            LIMIT $2;
          `,
      [embeddingLiteral, 1]
    );

    return {
      message: `Found ticket "${result?.title}" with ID ${result?.id}.`,
      content: {
        ticket: result,
      },
    };
  },
});
