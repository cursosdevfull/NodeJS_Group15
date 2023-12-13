import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/medic.entity";
import { SpecialtyEntity } from "./entity/specialty.entity";

AppDataSource.initialize()
  .then(async () => {
    const repository = AppDataSource.getRepository(SpecialtyEntity);
    const specialty = await repository.findOne({ where: { id: 3 } });

    const medic01 = new MedicEntity();
    medic01.name = "Juan";
    medic01.lastname = "Cardoza";
    medic01.age = 30;
    medic01.cmp = "54321";
    medic01.gender = "MALE";
    medic01.email = "juan@email.com";
    medic01.specialties = [specialty];

    await AppDataSource.getRepository(MedicEntity).save(medic01);

    console.log("Database initialized");
  })
  .catch((error) => console.log(error));
