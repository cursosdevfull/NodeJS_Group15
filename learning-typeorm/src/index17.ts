import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/medic.entity";
import { SpecialtyEntity } from "./entity/specialty.entity";

AppDataSource.initialize()
  .then(async () => {
    const repository = AppDataSource.getRepository(MedicEntity);

    const specialty = await repository
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
