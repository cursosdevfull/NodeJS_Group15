import { AppDataSource } from "./data-source";
import { SpecialtyEntity } from "./entity/specialty.entity";

AppDataSource.initialize()
  .then(async () => {
    const manager = AppDataSource.manager;

    const specialty = await manager
      .createQueryBuilder()
      .from(SpecialtyEntity, "specialty")
      //.select(["medic.id", "medic.name", "medic.lastname"])
      .select(["specialty.name"])
      //.select("medic.id, medic.name, medic.lastname")
      //.where("medic.id = 6")
      .where("specialty.id = 3")
      .getOne();

    console.log(specialty);

    console.log("Database initialized");
  })
  .catch((error) => console.log(error));
