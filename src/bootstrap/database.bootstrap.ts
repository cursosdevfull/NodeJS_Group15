import { DataSource } from "typeorm";

import { Parameters } from "../modules/core/parameters";
import { IBootstrap } from "./bootstrap.interface";

export class DatabaseBootstrap implements IBootstrap {
  private static appDataSource: DataSource;

  async initialize() {
    const dbConfig = Parameters.dbConfig;
    const appDataSource = new DataSource({
      type: "mysql",
      ...dbConfig,
    });

    DatabaseBootstrap.appDataSource = appDataSource;

    return appDataSource.initialize();
  }

  static getDataSource(): DataSource {
    return DatabaseBootstrap.appDataSource;
  }

  close() {
    return DatabaseBootstrap.appDataSource?.destroy();
  }
}
