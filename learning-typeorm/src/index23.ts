import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/medic.entity";

AppDataSource.initialize()
  .then(async () => {
    const manager = AppDataSource.manager;

    const sentence = await manager
      .createQueryBuilder()
      .from(MedicEntity, "medic")
      .select(["medic.id", "medic.name", "medic.lastname", "medic.age"])
      .where("medic.age >= :min")
      .andWhere("medic.age <= :max");

    const randomNumber = Math.random();

    if (randomNumber > 0.5) {
      sentence.setParameter("min", 20).setParameter("max", 30);
    } else {
      sentence.setParameter("min", 30).setParameter("max", 60);
    }

    const medics = await sentence.getMany();

    console.log(medics);

    console.log("Database initialized");
  })
  .catch((error) => console.log(error));
