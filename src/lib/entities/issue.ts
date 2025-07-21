import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Sprint } from "./sprint";

@Entity({ name: "issue" })
export class Issue {
  @PrimaryGeneratedColumn({ name: "id" })
  id!: number;

  @Column({ name: "title" })
  title!: string;

  @Column("text", { name: "description" })
  description!: string;

  @Column({ name: "priority" })
  priority!: string;

  @Column({ name: "status" })
  status!: string;

  @Column({
    name: "embedding",
    type: "vector" as any,
    transformer: {
      to: (value: number[]) => `[${value.join(",")}]`,
      from: (value: string | null) => {
        if (!value) return [];
        return value
          .replace(/^\[|\]$/g, "")
          .split(",")
          .map(parseFloat);
      }
    },
  } as any)
  embedding!: number[];

  @ManyToOne(() => Sprint, (sprint) => sprint.issues, { nullable: true })
  sprint!: Sprint | null;
}
