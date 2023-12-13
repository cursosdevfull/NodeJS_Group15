import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

import { MedicEntity } from "./medic.entity";

@Entity({ name: "specialty" })
export class SpecialtyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @ManyToMany(() => MedicEntity, (medic) => medic.specialties, { eager: true })
  medics: MedicEntity[];
}
