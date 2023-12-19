import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";

import { UserEntity } from "../../../user/infrastructure/entities/user.entity";

@Entity({ name: "role" })
export class RoleEntity {
  @PrimaryColumn({ type: "varchar" })
  id: string;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @ManyToMany(() => UserEntity, (user) => user.roles)
  users: UserEntity[];
}
