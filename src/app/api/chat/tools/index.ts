import { createSprint } from "./createSprint";
import { createTicket } from "./createTicket";
import { findIssue } from "./findIssue";
import { findRelevantIssues } from "./findRelevantIssues";
import { findSprint } from "./findSprint";

const toolHandlers: Record<string, (args: any) => Promise<any>> = {
  create_ticket: createTicket,
  create_sprint: createSprint,
  find_sprint_by_name_goal: findSprint,
  find_issue_by_title_description: findIssue,
//   find_relevant_issues: findRelevantIssues,
};

export async function handleFunctionCall(functionCall: { name: string }, args: any) {
  const handler = toolHandlers[functionCall.name];
  if (!handler) {
    throw new Error(`Unknown function name: ${functionCall.name}`);
  }
  return await handler(args);
}
