import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/medic.entity";
import { SpecialtyEntity } from "./entity/specialty.entity";

AppDataSource.initialize()
  .then(async () => {
    const medic = new MedicEntity();
    medic.name = "Sergio";
    medic.lastname = "Hidalgo";
    medic.age = 30;
    medic.cmp = "12345";
    medic.gender = "MALE";
    medic.email = "sergio@email.com";

    const specialty = new SpecialtyEntity();
    specialty.name = "Cardiología";

    try {
      await AppDataSource.getRepository(MedicEntity).save(medic);
      await AppDataSource.getRepository(SpecialtyEntity).save(specialty);
    } catch (error) {
      console.log(error.message);
    }
    // AppDataSource.getRepository(MedicEntity)
    //   .save(medic)
    //   .then((medic) => console.log(medic));
    console.log("Database initialized");
  })
  .catch((error) => console.log(error));
