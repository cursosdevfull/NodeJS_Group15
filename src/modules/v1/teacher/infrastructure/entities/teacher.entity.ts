import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("teacher")
export class TeacherEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255 })
  link: string;

  @Column({ type: "varchar", length: 1000 })
  summary: string;
}
