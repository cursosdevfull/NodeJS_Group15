import { DataSource } from "typeorm";

import { IBootstrap } from "./bootstrap.interface";

export class DatabaseBootstrap implements IBootstrap {
  constructor() {}

  async initialize() {
    const dbConfig = {
      host: "localhost",
      port: 4500,
      username: "sergio",
      password: "12345",
      database: "cursodb",
      logging: true,
    };

    const appDataSource = new DataSource({
      type: "mysql",
      ...dbConfig,
    });

    return appDataSource.initialize();
  }
}
