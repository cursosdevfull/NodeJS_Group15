import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/medic.entity";

AppDataSource.initialize()
  .then(async () => {
    const repositoryMedic = AppDataSource.getRepository(MedicEntity);
    const medics = await repositoryMedic.find({
      select: { id: true, name: true, lastname: true, gender: true },
    });

    console.log(JSON.stringify(medics, null, "\t"));

    console.log("Database initialized");
  })
  .catch((error) => console.log(error));
