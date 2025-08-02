import { DynamicStructuredTool } from "@langchain/core/tools";
import { createNewIssue } from "../utils/createNewIssue";
import z from "zod";

export const createNewIssueTool = new DynamicStructuredTool({
  name: "create_issue_tool",
  description: "Creates a new issue in a project management system.",
  schema: z.object({
    title: z.string().describe("Title of the issue / ticket"),
    description: z.string().describe("Detailed description of the ticket"),
    priority: z.enum(["low", "medium", "high"]).describe("Priority level"),
    status: z.enum(["to do", "In Progress"]).describe("Priority level"),
    sprintId: z.string().describe("Sprint ID if ticket is part of a sprint, sprintId is just an integer like 2, 3, 10"),
  }),
  func: async ({
    title,
    description,
    priority,
    status,
    sprintId,
  }: {
    title: string;
    description: string;
    priority: string;
    status: string;
    sprintId: number;
  }) => {
    const result = await createNewIssue({
      title: title,
      description: description,
      priority: priority,
      status: status,
      sprintId: sprintId,
    });
    return {
      message: `Created ticket "${result?.title}" with ID ${result?.id}.`,
      content: {
        ticket: result,
      },
    };
  },
});
