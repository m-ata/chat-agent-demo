import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";

interface CreateSprintProps {
    name: string;
    goal: string;
    startDate: string;
    endDate: string;
}
const createSprint = async ({name, goal, startDate, endDate}: CreateSprintProps) => {
    return `Sprint "${name}" created from ${startDate} to ${endDate} with goal: ${goal}`;
}

export const createSprintTool = new DynamicStructuredTool({
    name: "create_sprint",
    description: "Create a new sprint",
    schema: z.object({
      name: z.string(),
      goal: z.string(),
      startDate: z.string(),
      endDate: z.string(),
    }),
    func: createSprint,
  });