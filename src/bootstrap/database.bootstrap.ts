import { DataSource } from "typeorm";

import { Parameters } from "../modules/core/parameters";
import { IBootstrap } from "./bootstrap.interface";

export class DatabaseBootstrap implements IBootstrap {
  private static appDataSource: DataSource;

  async initialize() {
    const dbConfig = Parameters.dbConfig;
    console.log(dbConfig);
    const appDataSource = new DataSource({
      type: "mysql",
      ...dbConfig,
    });

    DatabaseBootstrap.appDataSource = appDataSource;

    return appDataSource.initialize();
  }
}
