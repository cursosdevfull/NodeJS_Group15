import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/medic.entity";

AppDataSource.initialize()
  .then(async () => {
    const manager = AppDataSource.manager;

    await manager
      .createQueryBuilder()
      .from(MedicEntity, "medic")
      .insert()
      .values([
        {
          name: "Javier",
          lastname: "Gonzalez",
          age: 35,
          email: "javier@correo.com",
          cmp: "24689",
          gender: "MALE",
        },
      ])
      .execute();

    console.log("Database initialized");
  })
  .catch((error) => console.log(error));
