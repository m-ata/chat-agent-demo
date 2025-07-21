import { Sprint } from "@/lib/entities/sprint";
import { getDataSource } from "@/lib/orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const db = await getDataSource();
    const sprintRepo = db.getRepository(Sprint);
  
    console.log('here')
  
    const sprints = await sprintRepo.find({
      relations: ["issues"],
      order: {
        startDate: "DESC",
      },
      select: {
        id: true,
        name: true,
        goal: true,
        startDate: true,
        endDate: true,
        issues: true
      },
    });
    // const sprints = await sprintRepo.find();
    
    console.log('SSSSSSSSSSSSSSSSSSS', sprints);
  
    return NextResponse.json({ sprints });
  } catch (error) {
    console.log(error)
  }
}
