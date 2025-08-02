import { getDataSource } from "@/lib/orm";
import { generateEmbedding } from "../utils/embedding";
import { DynamicStructuredTool } from "@langchain/core/tools";
import z from "zod";

export const findSprintByNameGoalTool = new DynamicStructuredTool({
  name: "find_sprint_by_name_goal",
  description:
    "This function takes the name or goal or both and apply a similarity search to find the most relevant sprint.",
  schema: z.object({
    name: z.string().describe("name of the sprint"),
    goal: z.string().describe("goal of the sprint"),
  }),
  func: async ({
    name,
    goal,
  }: {
    name: string;
    goal: string;
  }) => {
    const db = await getDataSource();

    const embedding = await generateEmbedding(
      `${name} ${goal}`
    );
    const embeddingLiteral = `[${embedding.join(",")}]`;
  
    const result = await db.query(
      `
                SELECT *,
                  embedding <#> $1 AS distance
                FROM sprint
                ORDER BY distance ASC
                LIMIT $2;
              `,
      [embeddingLiteral, 1]
    );
  
    return {
      message: `Found sprint "${result?.name}" with ID ${result?.id}.`,
      content: {
        sprint: result,
      },
    };
  },
});
