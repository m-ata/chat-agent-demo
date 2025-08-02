import { NextRequest, NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import {
  Annotation,
  END,
  START,
  StateGraph,
} from "@langchain/langgraph";
import {
  AIMessage,
  BaseMessage,
  HumanMessage,
  isAIMessage,
  SystemMessage,
} from "@langchain/core/messages";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { createNewSprintTool } from "./tools/createSprint";
import { createNewIssueTool } from "./tools/createTicket";
import { findIssueByTitleDescriptionTool } from "./tools/findIssue";
import { findSprintByNameGoalTool } from "./tools/findSprint";

export const model = new ChatOpenAI({
  modelName: "gpt-4",
  temperature: 0.4,
  openAIApiKey: process.env.OPENAI_API_KEY!,
});


const tools = [createNewSprintTool, createNewIssueTool, findIssueByTitleDescriptionTool, findSprintByNameGoalTool];
const modelWithTools = model.bindTools(tools);
const toolNode = new ToolNode(tools);

// Define a state with a single key named "messages" that will
// combine a returned BaseMessage or arrays of BaseMessages
const StateAnnotation = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    reducer: (left: BaseMessage[], right: BaseMessage | BaseMessage[]) => {
      if (Array.isArray(right)) {
        return left.concat(right);
      }
      return left.concat([right]);
    },
    default: () => [],
  }),
});

const intentClassifier = async (state: typeof StateAnnotation.State) => {
  const systemMessage = new SystemMessage(
    `
        You are a helpful Assitant that helps the user in using project management
        available tools: ${tools.map(item => item.name)}, current time: ${new Date().toISOString()}
    `
  );
  const response = await modelWithTools.invoke([
    systemMessage,
    ...state.messages,
  ]);
  return {
    messages: [new AIMessage(response)],
  };
};

const shouldContinue = async (state: typeof StateAnnotation.State) => {
  const lastMessage = state.messages[state.messages.length - 1];
  if (isAIMessage(lastMessage)) {
    console.log("lastMessage.tool_calls", lastMessage.tool_calls)
    if (lastMessage.tool_calls && lastMessage.tool_calls.length > 0) {
      return "continue";
    }
  }
  return "end";
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { messages } = body;

  const deserialized = messages.map((msg: any) => {
    switch (msg.type) {
      case "human":
        return new HumanMessage(msg.data.content);
      case "ai":
        return new AIMessage(msg.data.content);
      case "system":
        return new SystemMessage(msg.data.content);
      default:
        throw new Error("Unknown message type: " + msg.type);
    }
  });

  const graphBuilder = new StateGraph(StateAnnotation);

  const graph = graphBuilder
    .addNode("intentClassifier", intentClassifier)
    .addNode("toolNode", toolNode)
    .addEdge(START, "intentClassifier")
    .addConditionalEdges("intentClassifier", shouldContinue, {
      end: END,
      continue: "toolNode",
    })
    .addEdge("toolNode", "intentClassifier")
    .compile();

  const response = await graph.invoke(
    {
      messages: deserialized,
    },
  );

  const lastMessage = response.messages.at(-1);
  return NextResponse.json({ reply: lastMessage?.content });
}