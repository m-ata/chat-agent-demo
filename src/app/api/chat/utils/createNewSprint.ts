import { getDataSource } from "@/lib/orm";
import { generateEmbedding } from "./embedding";
import { Issue } from "@/lib/entities/issue";
import { Sprint } from "@/lib/entities/sprint";
import { findRelevantIssues } from "../tools/findRelevantIssues";
import {
  getRelevantIssues,
  getRelevantIssuesByGoalEmbedding,
} from "./getRelevantIssues";

interface CreateNewSprintProps {
  name: string;
  goal: string;
  startDate: string;
  endDate: string;
  addRelevantIssues: boolean;
}
export const createNewSprint = async ({
  name,
  goal,
  startDate,
  endDate,
  addRelevantIssues,
}: CreateNewSprintProps) => {
  try {
    console.log({ name, goal, startDate, endDate });
    const db = await getDataSource();

    const embedding = await generateEmbedding(goal);
    const embeddingLiteral = `[${embedding.join(",")}]`;

    const issueRepo = db.getRepository(Issue);
    const sprintRepo = db.getRepository(Sprint);

    if (addRelevantIssues) {
      const issues = await getRelevantIssuesByGoalEmbedding(embeddingLiteral);
      return await sprintRepo.save({
        name,
        goal,
        startDate,
        endDate,
        embedding,
        ...(issues && {
          issues,
        }),
      });
    } else {
        return await sprintRepo.save({
          name,
          goal,
          startDate,
          endDate,
          embedding
        });
    }
  } catch (error) {
    console.log(error);
  }
};
