import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/medic.entity";

AppDataSource.initialize()
  .then(async () => {
    const manager = AppDataSource.manager;

    await manager
      .createQueryBuilder()
      .from(MedicEntity, "medic")
      .update()
      .set({ name: "Dr. House" })
      .where("id = 3")
      .execute();

    await manager
      .createQueryBuilder()
      .from(MedicEntity, "medic")
      .update()
      .set({ name: "Dr. House 2" })
      .where("id = :id", { id: 3 })
      .execute();

    await manager
      .createQueryBuilder()
      .from(MedicEntity, "medic")
      .update()
      .set({ name: "Dr. House 3" })
      .where("id = :id")
      .setParameters({ id: 3 })
      .execute();

    console.log("Database initialized");
  })
  .catch((error) => console.log(error));
