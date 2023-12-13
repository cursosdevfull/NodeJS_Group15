import "reflect-metadata";

import { DataSource } from "typeorm";

import { MedicEntity } from "./entity/medic.entity";
import { SpecialtyEntity } from "./entity/specialty.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 4500,
  username: "sergio",
  password: "12345",
  database: "cursodb",
  synchronize: true,
  logging: false,
  entities: [MedicEntity, SpecialtyEntity],
  migrations: [],
  subscribers: [],
});
