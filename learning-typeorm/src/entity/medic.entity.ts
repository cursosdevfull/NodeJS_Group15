import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

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

  @Column({ nullable: true })
  age: number;

  @Column({ type: "varchar", length: 5, unique: true })
  cmp: string;

  @Column({ type: "varchar", length: 10 })
  gender: string;

  @Column({ type: "varchar", length: 100, unique: true })
  email: string;

  @ManyToMany(() => SpecialtyEntity, (specialty) => specialty.medics, {
    cascade: true,
  })
  @JoinTable()
  specialties: SpecialtyEntity[];
}