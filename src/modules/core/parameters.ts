import { RoleEntity } from '../v1/role/infrastructure/entities/role.entity';
import { UserEntity } from '../v1/user/infrastructure/entities/user.entity';

export class Parameters {
  static get port() {
    return process.env.PORT ? Number(process.env.PORT) : 3000;
  }

  static get environment() {
    return process.env.NODE_ENV || "development";
  }

  static get dbConfig() {
    return {
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 4500,
      username: process.env.DB_USERNAME || "sergio",
      password: process.env.DB_PASSWORD || "12345",
      database: process.env.DB_DATABASE || "cursodb",
      entities: [UserEntity, RoleEntity],
      synchronize: process.env.DB_SYNCHRONIZE
        ? process.env.DB_SYNCHRONIZE === "true"
          ? true
          : false
        : true,
      logging: process.env.DB_LOGGING
        ? process.env.DB_LOGGING === "true"
          ? true
          : false
        : true,
      poolSize: Number(process.env.DB_POOL_SIZE) || 10,
      maxQueryExecutionTime:
        Number(process.env.DB_MAX_QUERY_EXECUTION_TIME) || 1000,
    };
  }

  static get bucket_name_images() {
    return process.env.BUCKET_NAME_IMAGES || "nodejs15-images";
  }

  static get url_presigned_expires(): number {
    return Number(process.env.URL_PRESIGNED_EXPIRES) || 120;
  }

  static get path_images() {
    return process.env.PATH_IMAGES;
  }

  static get token_keyword_secret() {
    return (
      process.env.TOKEN_KEYWORD_SECRET || "YrBG4zFksVxRJy4V2E3TsQbeu3Z65uvV"
    );
  }

  static get token_expires_in() {
    return Number(process.env.TOKEN_EXPIRES_IN) || 15;
  }
}
