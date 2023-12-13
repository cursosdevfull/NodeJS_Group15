import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/medic.entity";
import { SpecialtyEntity } from "./entity/specialty.entity";

AppDataSource.initialize()
  .then(async () => {
    const specialty01 = new SpecialtyEntity();
    specialty01.name = "Cardiología";

    const specialtySaved01 = await AppDataSource.getRepository(
      SpecialtyEntity
    ).save(specialty01);

    const specialty02 = new SpecialtyEntity();
    specialty02.name = "Oftalmología";

    const specialtySaved02 = await AppDataSource.getRepository(
      SpecialtyEntity
    ).save(specialty02);

    const medic = new MedicEntity();
    medic.name = "Sergio";
    medic.lastname = "Hidalgo";
    medic.age = 30;
    medic.cmp = "12345";
    medic.gender = "MALE";
    medic.email = "sergio@email.com";
    medic.specialties = [specialtySaved01, specialtySaved02];

    await AppDataSource.getRepository(MedicEntity).save(medic);

    // AppDataSource.getRepository(MedicEntity)
    //   .save(medic)
    //   .then((medic) => console.log(medic));
    console.log("Database initialized");
  })
  .catch((error) => console.log(error));
