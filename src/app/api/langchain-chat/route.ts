import { ChatOpenAI } from "@langchain/openai";
import { NextRequest, NextResponse } from "next/server";
import { createSprintTool } from "./tools/createSprint";

const model = new ChatOpenAI({ temperature: 0, openAIApiKey: process.env.OPENAI_API_KEY }).bindTools([createSprintTool]);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { messages } = body;

  console.log(messages);
  const response = await model.invoke(messages)

  console.log(response)

  return NextResponse.json({ reply: 'hi' });
}
