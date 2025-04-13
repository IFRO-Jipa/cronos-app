import { entities } from "@cronos-app/db-v1-connect";
import { join } from "node:path";
import { DataSource } from "typeorm";

export const getAppDataSource = async () => {
  const dataSource = new DataSource({
    type: "sqlite",
    database: join(__dirname, "../../../db/v1/database.sqlite3"),
    entities: [...entities],

    synchronize: false,
    logging: false,
  });

  await dataSource.initialize();

  return dataSource;
};
