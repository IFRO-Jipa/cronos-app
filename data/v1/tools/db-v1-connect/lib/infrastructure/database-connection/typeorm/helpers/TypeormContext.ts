import type { DataSource, EntityManager } from "typeorm";
import type { DatabaseConnectionTypeormRepositories } from "../repositories/core-repositories";

export type TypeormContext = {
  source: DataSource | EntityManager;
  databaseContext: DatabaseConnectionTypeormRepositories;
};
