import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/medic.entity";

AppDataSource.initialize()
  .then(async () => {
    const manager = AppDataSource.manager;

    const result = await manager
      .createQueryBuilder()
      .from(MedicEntity, "medic")
      .select(["medic.name", "medic.lastname"])
      .leftJoinAndSelect("medic.specialties", "specialty")
      .where("specialty.id <> :id", { id: 3 })
      .getRawMany();

    console.log(result);

    console.log("Database initialized");
  })
  .catch((error) => console.log(error));