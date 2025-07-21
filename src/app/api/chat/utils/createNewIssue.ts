import { getDataSource } from "@/lib/orm";
import { generateEmbedding } from "./embedding";
import { Issue } from "@/lib/entities/issue";
import { Sprint } from "@/lib/entities/sprint";

interface CreateNewIssueProps {
    title: string;
    description: string;
    priority: string;
    status: string;
    sprintId: number;
    createInLocalOnly: boolean;
}
export const createNewIssue = async ({title, description, priority, status, sprintId, createInLocalOnly = true}: CreateNewIssueProps) => {
    try {
        console.log({ title, description, priority, status, sprintId })
        const db = await getDataSource();

        const combinedText = `${title} ${description}`;
        const embedding = await generateEmbedding(combinedText);

        const issueRepo = db.getRepository(Issue);
        const sprintRepo = db.getRepository(Sprint);

        const sprint = await sprintRepo.findOne({ where: { id: sprintId } })

        if(sprint){
            return await issueRepo.save({
                title, description, priority, status, sprint, embedding
            })
        } else {
            return await issueRepo.save({
                title, description, priority, status, embedding
            })
        }
    } catch (error) {
        console.log(error)
    }
}