import { Brackets } from "typeorm";

import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/medic.entity";

AppDataSource.initialize()
  .then(async () => {
    const manager = AppDataSource.manager;

    const medics = await manager
      .createQueryBuilder()
      .from(MedicEntity, "medic")
      .select(["medic.id", "medic.name", "medic.lastname", "medic.age"])
      .where("medic.age >= :age")
      .andWhere(
        new Brackets((query) => {
          query
            .where("medic.name = :name")
            .orWhere("medic.lastname = :lastname");
        })
      )
      .setParameters({ age: 30, name: "Juan", lastname: "Cardoza" })
      .getSql();

    console.log(medics);

    console.log("Database initialized");
  })
  .catch((error) => console.log(error));
