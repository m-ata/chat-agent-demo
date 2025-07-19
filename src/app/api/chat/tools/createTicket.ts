export async function createTicket(args: any): Promise<any> {
  return {
    message: `Created ticket "${args.title}" with ID ${"TICKET-123"}.`,
    content: {
      ticket: {
        id: "TICKET-123",
        title: args.title,
        description: args.description,
        priority: args.priority,
        status: args.status,
        sprintId: args.sprintId,
        createdAt: new Date().toISOString(),
      },
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
          description: "Sprint ID if ticket is part of a sprint",
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
