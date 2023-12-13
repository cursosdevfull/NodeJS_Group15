import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { MedicEntity } from "./medic.entity";

@Entity({ name: "specialty" })
export class SpecialtyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @ManyToOne(() => MedicEntity, (medic) => medic.specialties)
  medic: MedicEntity;
}
