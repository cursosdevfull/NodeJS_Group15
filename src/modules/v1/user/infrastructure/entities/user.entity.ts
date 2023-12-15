import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "user" })
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 50 })
  lastname: string;

  @Column({ type: "varchar", length: 50 })
  email: string;

  @Column({ type: "varchar", length: 20 })
  password: string;

  /*@Column({type: "varchar", length: 50})
  roles: string[];*/

  @Column({ type: "varchar", length: 10, nullable: true })
  gender: string;

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
}