import "reflect-metadata";

import dotenv from "dotenv";
import { DataSource } from "typeorm";

import app from "./app";
import { DatabaseBootstrap } from "./bootstrap/database.bootstrap";
import { ServerBootstrap } from "./bootstrap/server.bootstrap";

dotenv.config();

const server = new ServerBootstrap(app);
const database = new DatabaseBootstrap();

(async () => {
  try {
    const listPromisesBootstrap: Array<Promise<boolean | DataSource>> = [];
    listPromisesBootstrap.push(server.initialize());
    listPromisesBootstrap.push(database.initialize());

    await Promise.all(listPromisesBootstrap);
    console.log("Connect to database successfully");
  } catch (error: any) {
    database.close();
    console.log(`Error occurred: ${error.message}`);
  }
})();
