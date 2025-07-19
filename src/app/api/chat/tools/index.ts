import { createSprint } from "./createSprint";
import { createTicket } from "./createTicket";
import { findRelevantIssues } from "./findRelevantIssues";

const toolHandlers: Record<string, (args: any) => Promise<any>> = {
  create_ticket: createTicket,
  create_sprint: createSprint,
  find_relevant_issues: findRelevantIssues,
};

export async function handleFunctionCall(functionCall: { name: string }, args: any) {
  const handler = toolHandlers[functionCall.name];
  if (!handler) {
    throw new Error(`Unknown function name: ${functionCall.name}`);
  }
  return await handler(args);
}
