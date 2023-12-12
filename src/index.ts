import "reflect-metadata";

import app from "./app";
import { DatabaseBootstrap } from "./bootstrap/database.bootstrap";
import { ServerBootstrap } from "./bootstrap/server.bootstrap";

const server = new ServerBootstrap(app);
const database = new DatabaseBootstrap();

(async () => {
  try {
    const listPromisesBootstrap = [];
    listPromisesBootstrap.push(server.initialize());
    listPromisesBootstrap.push(database.initialize());

    await Promise.all(listPromisesBootstrap);
    console.log("Connect to database successfully");
  } catch (error: any) {
    console.log(`Error occurred: ${error.message}`);
  }
})();
