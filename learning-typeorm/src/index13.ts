import { In } from "typeorm";

import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/medic.entity";

AppDataSource.initialize()
  .then(async () => {
    const PAGE_SIZE = 2;
    const PAGE_NUMBER = 1;

    const repositoryMedic = AppDataSource.getRepository(MedicEntity);
    const [records, count] = await repositoryMedic.findAndCount({
      skip: PAGE_SIZE * (PAGE_NUMBER - 1),
      take: PAGE_SIZE,
      //where: { age: LessThan(40) },
      where: { age: In([22, 50]) },
    });

    console.log("Records:", records);
    console.log("Count:", count);

    console.log("Database initialized");
  })
  .catch((error) => console.log(error));
