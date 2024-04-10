import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";

config();

export const getDataSourceOptions: () => TypeOrmModuleOptions = () => {
  return {
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: Boolean(process.env.DB_SYNCHRONIZE),
    entities: [`${__dirname}/entities/**/*{.ts,.js}`],
    migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
    autoLoadEntities: true,
  };
};

export const AppDataSource = new DataSource(
  getDataSourceOptions() as DataSourceOptions,
);
