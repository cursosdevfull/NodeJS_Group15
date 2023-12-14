import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/medic.entity";

AppDataSource.initialize()
  .then(async () => {
    const manager = AppDataSource.manager;

    const medics = await manager
      .createQueryBuilder()
      .from(MedicEntity, "medic")
      .select(["medic.id", "medic.name", "medic.lastname", "medic.age"])
      .where("medic.age between :min and :max")
      .setParameters({ min: 20, max: 40 })
      .getMany();

    console.log(medics);

    console.log("Database initialized");
  })
  .catch((error) => console.log(error));
