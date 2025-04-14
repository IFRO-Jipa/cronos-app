import type { DataSource, EntityManager } from "typeorm";
import type { DatabaseContext } from "../repositories/core-repositories";

export type TypeormContext = {
  source: DataSource | EntityManager;
  databaseContext: DatabaseContext;
};
