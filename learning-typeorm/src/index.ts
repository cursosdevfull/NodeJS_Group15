import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/medic.entity";
import { SpecialtyEntity } from "./entity/specialty.entity";

AppDataSource.initialize()
  .then(async () => {
    const repository = AppDataSource.getRepository(MedicEntity);
    const medics = await repository.find({ relations: ["specialties"] });

    //console.log(JSON.stringify(medics, null, "\t"));

    const repositorySpecialty = AppDataSource.getRepository(SpecialtyEntity);
    const specialties = await repositorySpecialty.find({
      relations: ["medics"],
    });

    console.log(JSON.stringify(specialties, null, "\t"));

    console.log("Database initialized");
  })
  .catch((error) => console.log(error));
