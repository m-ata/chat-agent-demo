import { createNewIssue } from "../utils/createNewIssue";

export async function createTicket(args: any): Promise<any> {
  const result = await createNewIssue({
    title: args.title,
    description: args.description,
    priority: args.priority,
    status: args.status,
    sprintId: args.sprintId,
    createInLocalOnly: true,
  });
  return {
    message: `Created ticket "${result?.title}" with ID ${result?.id}.`,
    content: {
      ticket: result,
    },
  };
}

export const createTicketFn = () => {
  return {
    name: "create_ticket",
    description: "Creates a new ticket in a project management system.",
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
        priority: {
          type: "string",
          enum: ["low", "medium", "high"],
          description: "Priority level",
        },
        status: {
          type: "string",
          description: 'Status like "todo", "in progress", etc.',
        },
        sprintId: {
          type: "string",
          description:
            "Sprint ID if ticket is part of a sprint, sprintId is just an integer like 2, 3, 10",
        },
        createInLocalOnly: {
          type: "boolean",
          description:
            "If true, creates locally instead of syncing to Jira/Linear",
        },
      },
      required: [
        "title",
        "description",
        "priority",
        "status",
        "createInLocalOnly",
      ],
    },
  };
};
