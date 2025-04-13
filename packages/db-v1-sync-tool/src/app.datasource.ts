import { DataSource } from "typeorm";
import { entities } from "../../db-v1-connect/src";
import { PATH_REPO_DATASET_V1_DATABASE_DB_SQLITE } from "./paths";

export const getAppDataSource = async () => {
  const dataSource = new DataSource({
    type: "sqlite",
    database: PATH_REPO_DATASET_V1_DATABASE_DB_SQLITE,
    synchronize: false,
    logging: false,
    entities: [...entities],
  });

  await dataSource.initialize();

  return dataSource;
};
