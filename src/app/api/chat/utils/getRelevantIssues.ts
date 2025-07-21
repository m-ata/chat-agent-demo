import { getDataSource } from "@/lib/orm";
import { generateEmbedding } from "./embedding";
import { Issue } from "@/lib/entities/issue";

export async function getRelevantIssues(
  goal: string,
  topK = 5
): Promise<Issue[] | void> {
  try {
    const embedding = await generateEmbedding(goal);

    const db = await getDataSource();

    const embeddingLiteral = `[${embedding.join(",")}]`;

    const result = await db.query(
      `
            SELECT *,
              embedding <#> $1 AS distance
            FROM issue
            ORDER BY distance ASC
            LIMIT $2;
          `,
      [embeddingLiteral, topK]
    );

    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getRelevantIssuesByGoalEmbedding(
  embeddingLiteral: string,
  topK = 5
): Promise<Issue[] | void> {
  try {
    const db = await getDataSource();

    const result = await db.query(
      `
            SELECT *,
              embedding <#> $1 AS distance
            FROM issue
            ORDER BY distance ASC
            LIMIT $2;
          `,
      [embeddingLiteral, topK]
    );

    return result;
  } catch (error) {
    console.log(error);
  }
}
