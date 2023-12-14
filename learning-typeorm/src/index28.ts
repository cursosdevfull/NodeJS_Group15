import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/medic.entity";

AppDataSource.initialize()
  .then(async () => {
    const manager = AppDataSource.manager;

    const medics = await manager
      .createQueryBuilder()
      .from(MedicEntity, "medic")
      .select(["medic.id", "medic.name", "medic.lastname", "medic.age"])
      .orderBy("medic.age", "DESC")
      .addOrderBy("medic.name", "ASC")
      .getRawMany();

    console.log(medics);

    console.log("Database initialized");
  })
  .catch((error) => console.log(error));
