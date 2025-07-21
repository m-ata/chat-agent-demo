import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { createTicket, createTicketFn } from "./tools/createTicket";
import { createSprint, createSprintFn } from "./tools/createSprint";
import { createEmbeddings } from "./utils/embedding";
import { getDataSource } from "@/lib/orm";
import { findRelevantIssues, findRelevantIssuesFn } from "./tools/findRelevantIssues";
import { handleFunctionCall } from "./tools";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { messages } = body;

  // console.log(messages);
  // createEmbeddings()
  const db = await getDataSource();

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant that manages Jira / linear, You ask the user for the required fields.",
      },
      ...messages,
    ],
    functions: [createTicketFn(), createSprintFn()],
    function_call: "auto",
  });

  const functionCall = response.choices[0].message.function_call;

  console.log({functionCall})
  if (functionCall) {

    const args = JSON.parse(functionCall.arguments || "{}");

    const result = await handleFunctionCall(functionCall, args)

    const followUp = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        ...messages,
        {
          role: "assistant",
          function_call: functionCall,
        },
        {
          role: "function",
          name: functionCall.name,
          content: JSON.stringify(result.content),
        },
      ],
    });

    return NextResponse.json({ reply: followUp.choices[0].message.content });
  }

  return NextResponse.json({ reply: response.choices[0].message.content });
}
