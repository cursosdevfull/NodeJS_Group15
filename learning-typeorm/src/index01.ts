import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/medic.entity";

AppDataSource.initialize()
  .then(async () => {
    const medic = new MedicEntity();
    medic.name = "Sergio";
    medic.lastname = "Hidalgo";
    //medic.age = 30;
    medic.cmp = "01234";
    medic.gender = "MALE";
    medic.email = "sergioc@email.com";

    try {
      await AppDataSource.getRepository(MedicEntity).save(medic);
    } catch (error) {
      console.log(error.message);
    }
    // AppDataSource.getRepository(MedicEntity)
    //   .save(medic)
    //   .then((medic) => console.log(medic));
    console.log("Database initialized");
  })
  .catch((error) => console.log(error));
