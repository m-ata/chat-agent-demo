import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Issue } from "./issue";

@Entity({ name: "sprint" })
export class Sprint {
  @PrimaryGeneratedColumn({ name: "id" })
  id!: number;

  @Column({ name: "name" })
  name!: string;

  @Column("text", { name: "goal" })
  goal!: string;

  @Column({ name: "start_date" })
  startDate!: Date;

  @Column({ name: "end_date" })
  endDate!: Date;

  @Column({
    name: "embedding",
    type: "vector" as any,
    transformer: {
      to: (value: number[]) => `[${value.join(",")}]`,
      from: (value: string) =>
        value
          .replace(/^\[|\]$/g, "")
          .split(",")
          .map(parseFloat),
    },
  } as any)
  embedding!: number[];

  @OneToMany(() => Issue, (issue) => issue.sprint)
  issues!: Issue[];
}
