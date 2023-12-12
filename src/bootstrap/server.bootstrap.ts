import { Application } from "express";
import * as http from "http";

import { IBootstrap } from "./bootstrap.interface";

export class ServerBootstrap implements IBootstrap {
  constructor(private readonly app: Application) {}

  async initialize() {
    const promise = new Promise<boolean>((resolve, reject) => {
      const server = http.createServer(this.app);

      server
        .listen(3000)
        .on("listening", () => {
          resolve(true);
          console.log("Server is running in port 3000");
        })
        .on("error", (error: NodeJS.ErrnoException) => {
          reject(error);
          console.log(`Error occurred: ${error.message}`);
        });
    });

    return await promise;
  }
}
