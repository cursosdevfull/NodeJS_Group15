import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { SpecialtyEntity } from "./specialty.entity";

@Entity({ name: "medic" })
//@Unique(["cmp", "email"])
export class MedicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "varchar", length: 100 })
  lastname: string;

  @Column()
  age: number;

  @Column({ type: "varchar", length: 5, unique: true })
  cmp: string;

  @Column({ type: "varchar", length: 10 })
  gender: string;

  @Column({ type: "varchar", length: 100, unique: true })
  email: string;

  @OneToMany(() => SpecialtyEntity, (specialty) => specialty.medic, {
    cascade: true,
  })
  specialties: SpecialtyEntity[];
}
