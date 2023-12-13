import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/medic.entity";
import { SpecialtyEntity } from "./entity/specialty.entity";

AppDataSource.initialize()
  .then(async () => {
    const specialty = new SpecialtyEntity();
    specialty.name = "Cardiología";

    const specialtySaved = await AppDataSource.getRepository(
      SpecialtyEntity
    ).save(specialty);

    const medic = new MedicEntity();
    medic.name = "Sergio";
    medic.lastname = "Hidalgo";
    medic.age = 30;
    medic.cmp = "12345";
    medic.gender = "MALE";
    medic.email = "sergio@email.com";
    medic.specialty = specialtySaved;

    await AppDataSource.getRepository(MedicEntity).save(medic);

    // AppDataSource.getRepository(MedicEntity)
    //   .save(medic)
    //   .then((medic) => console.log(medic));
    console.log("Database initialized");
  })
  .catch((error) => console.log(error));
