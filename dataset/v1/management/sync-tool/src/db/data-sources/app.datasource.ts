import { DataSource } from "typeorm";
import { PATH_REPO_DATASET_V1_DATABASE_DB_SQLITE } from "../../paths";
import { entities } from "../entities";

export const getAppDataSource = async () => {
  const ds = new DataSource({
    type: "sqlite",

    database: PATH_REPO_DATASET_V1_DATABASE_DB_SQLITE,

    synchronize: false,
    logging: true,

    entities: [...entities],
    subscribers: [],
    migrations: [],
  });

  await ds.initialize();

  return ds;
};
