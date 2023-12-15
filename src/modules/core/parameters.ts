import { UserEntity } from "../v1/user/infrastructure/entities/user.entity";

export class Parameters {
  static get dbConfig() {
    return {
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 4500,
      username: process.env.DB_USERNAME || "sergio",
      password: process.env.DB_PASSWORD || "12345",
      database: process.env.DB_DATABASE || "cursodb",
      entities: [UserEntity],
      synchronize: Boolean(process.env.DB_SYNCHRONIZE) || true,
      logging: Boolean(process.env.DB_LOGGING) || true,
      poolSize: Number(process.env.DB_POOL_SIZE) || 10,
      maxQueryExecutionTime:
        Number(process.env.DB_MAX_QUERY_EXECUTION_TIME) || 1000,
    };
  }
}
