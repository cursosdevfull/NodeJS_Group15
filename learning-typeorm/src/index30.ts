import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(async () => {
    const manager = AppDataSource.manager;

    const medics = await manager.query("select * from medic where age> 27");
    console.log(medics);

    console.log("Database initialized");
  })
  .catch((error) => console.log(error));
