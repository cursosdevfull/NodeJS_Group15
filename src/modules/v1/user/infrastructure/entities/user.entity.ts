import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";

import { RoleEntity } from "../../../role/infrastructure/entities/role.entity";

@Entity({ name: "user" })
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 50 })
  lastname: string;

  @Column({ type: "varchar", length: 50, unique: true })
  email: string;

  @Column({ type: "varchar", length: 100 })
  password: string;

  /*@Column({type: "varchar", length: 50})
  roles: string[];*/

  @Column({ type: "varchar", length: 10, nullable: true })
  gender: string;

  @Column({ type: "json", nullable: true })
  address: { street: string; number: number; city: string; country: string };

  @Column({ type: "int", nullable: true })
  age: number;

  @Column({ type: "varchar", length: 100, nullable: true })
  image: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  refreshToken: string;

  @Column({ type: "timestamp" })
  createdAt: Date;

  @Column({ type: "timestamp", nullable: true })
  updatedAt: Date | null;

  @Column({ type: "timestamp", nullable: true })
  deletedAt: Date | null;

  @ManyToMany(() => RoleEntity, (role) => role.users)
  @JoinTable()
  roles: RoleEntity[];
}
