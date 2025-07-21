import { Issue } from "@/lib/entities/issue";

export interface Sprint {
    name: string;
    goal: string;
    startDate: string;
    endDate: string;
    issues: Issue[]
}