import { NextRequest, NextResponse } from "next/server";
import { getDataSource } from "@/lib/orm";
import dummyIssues from "@/app/api/chat/data/embeddedTickets";
import { Issue } from "@/lib/entities/issue";

export async function POST(req: NextRequest) {
  const db = await getDataSource();
  const issueRepo = db.getRepository(Issue);

  await issueRepo.save(dummyIssues);

  return NextResponse.json({ reply: "Successfully Added issues" });
}

export async function GET(req: NextRequest) {
  const db = await getDataSource();
  const issueRepo = db.getRepository(Issue);

  const issues = await issueRepo.find()

  return NextResponse.json({ issues });
}
