import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/medic.entity";

AppDataSource.initialize()
  .then(async () => {
    const manager = AppDataSource.manager;

    // const specialty = await manager
    //   .createQueryBuilder()
    //   .from(SpecialtyEntity, "specialty")
    //   .insert()
    //   .values({ name: "Cardiología geriátrica" })
    //   .execute();

    // console.log(specialty);

    const medics = await manager
      .createQueryBuilder()
      .from(MedicEntity, "medic")
      .insert()
      .values([
        {
          name: "Karla",
          lastname: "Rojas",
          age: 28,
          email: "karla@correo.com",
          cmp: "24125",
          gender: "FEMALE",
          //specialties: [specialty.identifiers[0].id],
          specialties: [{ id: 7 }],
        },
      ])
      //.getSql();
      .execute();

    console.log(medics);

    console.log("Database initialized");
  })
  .catch((error) => console.log(error));
