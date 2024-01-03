import IORedis from "ioredis";

import { Parameters } from "../modules/core/parameters";
import { IBootstrap } from "./bootstrap.interface";

export class RedisBootstrap implements IBootstrap {
  private static client: IORedis;

  async initialize(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const client = new IORedis({
        host: Parameters.redis_host,
        port: Parameters.redis_port,
        password: Parameters.redis_password,
        maxRetriesPerRequest: Parameters.redis_max_retries_per_request,
      });

      client
        .on("connect", () => {
          console.log("Redis connected");
          resolve(true);
        })
        .on("error", (error) => {
          console.log("Redis error", error);
          reject(error);
        });

      RedisBootstrap.client = client;
    });
  }

  close() {
    RedisBootstrap.client?.disconnect();
  }

  static get redisClient() {
    return RedisBootstrap.client;
  }

  static async get(key: string): Promise<string | null> {
    return RedisBootstrap.client.get(key);
  }

  static async set(key: string, value: string): Promise<void> {
    await RedisBootstrap.client.set(key, value, "PX", 24 * 60 * 60 * 1000);
  }

  static async clear(prefix: string = "") {
    const keys = await RedisBootstrap.client.keys(`${prefix}*`);
    if (keys.length > 0) {
      await RedisBootstrap.client.del(keys);
    }
  }
}
