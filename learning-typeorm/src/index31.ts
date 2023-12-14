import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(async () => {
    const manager = AppDataSource.manager;

    const medics = await manager.query("call getMedicsByAge(?)", [30]);
    console.log(medics[0]);

    console.log("Database initialized");
  })
  .catch((error) => console.log(error));
