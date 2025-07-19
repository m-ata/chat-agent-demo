import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Issue {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column("text")
  description!: string;

  @Column()
  priority!: string;

  @Column()
  status!: string;

  //   @Column({
  //     type: "vector" as any,
  //     nullable: false,
  //   } as any)
  //   embedding!: number[];

  @Column({
    type: "vector" as any,
    transformer: {
      to: (value: number[]) => `[${value.join(",")}]`, // ← pgvector format
      from: (value: string) =>
        value
          .replace(/^\[|\]$/g, "") // remove brackets
          .split(",")
          .map(parseFloat),
    },
  } as any)
  embedding!: number[];
}
