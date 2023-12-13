import { AppDataSource } from "./data-source";
import { SpecialtyEntity } from "./entity/specialty.entity";

AppDataSource.initialize()
  .then(async () => {
    const repositorySpecialty = AppDataSource.getRepository(SpecialtyEntity);
    const specialties = await repositorySpecialty.find({});

    console.log(JSON.stringify(specialties, null, "\t"));

    console.log("Database initialized");
  })
  .catch((error) => console.log(error));
