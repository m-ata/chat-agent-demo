import { getDataSource } from "@/lib/orm";
import { createNewIssue } from "../utils/createNewIssue";
import { generateEmbedding } from "../utils/embedding";

export async function findSprint(args: any): Promise<any> {
  const db = await getDataSource();

  const embedding = await generateEmbedding(
    `${args?.name} ${args?.goal}`
  );
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
    message: `Found sprint "${result?.name}" with ID ${result?.id}.`,
    content: {
      ticket: result,
    },
  };
}

export const findSprintFn = () => {
  return {
    name: "find_sprint_by_name_goal",
    description:
      "This function takes the name or goal or both and apply a similarity search to find the most relevant sprint.",
    parameters: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Title of the ticket",
        },
        goal: {
          type: "string",
          description: "Detailed description of the ticket",
        },
      },
      required: ["name", "goal"],
    },
  };
};
