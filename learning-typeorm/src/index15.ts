import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/medic.entity";

AppDataSource.initialize()
  .then(async () => {
    const repository = AppDataSource.getRepository(MedicEntity);

    const medic = await repository
      .createQueryBuilder("medic")
      .where("medic.id = 6")
      .getOne();

    console.log(medic);

    console.log("Database initialized");
  })
  .catch((error) => console.log(error));
