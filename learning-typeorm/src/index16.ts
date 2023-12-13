import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/medic.entity";

AppDataSource.initialize()
  .then(async () => {
    const repository = AppDataSource.getRepository(MedicEntity);

    const medic = await repository
      .createQueryBuilder()
      //.select(["medic.id", "medic.name", "medic.lastname"])
      .select(["MedicEntity.id", "MedicEntity.name", "MedicEntity.lastname"])
      //.select("medic.id, medic.name, medic.lastname")
      //.where("medic.id = 6")
      .where("MedicEntity.id = 6")
      .getOne();

    console.log(medic);

    console.log("Database initialized");
  })
  .catch((error) => console.log(error));
