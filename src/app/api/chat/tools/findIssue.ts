import { getDataSource } from "@/lib/orm";
import { generateEmbedding } from "../utils/embedding";

export async function findIssue(args: any): Promise<any> {
  const db = await getDataSource();

  const embedding = await generateEmbedding(`${args?.title} ${args?.description}`)
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
}

export const findIssueFn = () => {
  return {
    name: "find_issue_by_title_description",
    description:
      "This function takes the title or description or both and apply a similarity search to find the most relevant issue.",
    parameters: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "Title of the ticket",
        },
        description: {
          type: "string",
          description: "Detailed description of the ticket",
        },
      },
      required: ["title", "description"],
    },
  };
};
