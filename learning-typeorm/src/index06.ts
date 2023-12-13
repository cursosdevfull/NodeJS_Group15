import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/medic.entity";
import { SpecialtyEntity } from "./entity/specialty.entity";

AppDataSource.initialize()
  .then(async () => {
    const specialty01 = new SpecialtyEntity();
    specialty01.name = "Cardiología";

    const specialty02 = new SpecialtyEntity();
    specialty02.name = "Oftalmología";

    const medic01 = new MedicEntity();
    medic01.name = "Sergio";
    medic01.lastname = "Hidalgo";
    medic01.age = 30;
    medic01.cmp = "12345";
    medic01.gender = "MALE";
    medic01.email = "sergio@email.com";
    medic01.specialties = [specialty01, specialty02];

    await AppDataSource.getRepository(MedicEntity).save(medic01);

    const medic02 = new MedicEntity();
    medic02.name = "Sergio";
    medic02.lastname = "Hidalgo";
    medic02.age = 30;
    medic02.cmp = "23456";
    medic02.gender = "MALE";
    medic02.email = "sergioh@email.com";
    medic02.specialties = [specialty01];

    await AppDataSource.getRepository(MedicEntity).save(medic02);

    console.log("Database initialized");
  })
  .catch((error) => console.log(error));
