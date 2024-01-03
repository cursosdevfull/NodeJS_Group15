import { NextFunction, Request, Response } from "express";

import { RedisBootstrap } from "../../../bootstrap/redis.bootstrap";

export class CacheMiddleware {
  private static getParameters(prefix: string, params: Record<string, any>) {
    let newKey = prefix; // params = {id: 1, name: 'test'} -> ['id', 'name']
    if (params) {
      Object.keys(params).forEach((param) => {
        newKey = `${newKey}_${param}_${params[param]}`;
      });
      // newKey = "users_id_1_name_test"
    }

    return newKey;
  }

  static build(prefix: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      let cacheKey = prefix;
      cacheKey = this.getParameters(cacheKey, req.params);
      cacheKey = this.getParameters(cacheKey, req.query);
      cacheKey = this.getParameters(cacheKey, req.body);

      const client = RedisBootstrap.redisClient;
      const value = await client.get(cacheKey);

      if (value) {
        console.log("Cache from Redis");
        return res.json(JSON.parse(value));
      }

      console.log("Query from DB");
      res.locals.cacheKey = cacheKey;
      next();
    };
  }
}
