import { Application } from "express";
import * as http from "http";

import { Parameters } from "../modules/core/parameters";
import { IBootstrap } from "./bootstrap.interface";

export class ServerBootstrap implements IBootstrap {
  constructor(private readonly app: Application) {}

  async initialize() {
    const promise = new Promise<boolean>((resolve, reject) => {
      const server = http.createServer(this.app);

      const port = Parameters.port;

      server
        .listen(port)
        .on("listening", () => {
          resolve(true);
          console.log(`Server is running in port ${port}`);
        })
        .on("error", (error: NodeJS.ErrnoException) => {
          reject(error);
          console.log(`Error occurred: ${error.message}`);
        });
    });

    return await promise;
  }
}
