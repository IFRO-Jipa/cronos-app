import * as path from "node:path";

const HERE = __dirname;

export const PATH_REPO_ROOT = path.join(HERE, "../../../");

export const PATH_REPO_DATASET_V1_DATABASE_DB_SQLITE = path.join(
  PATH_REPO_ROOT,
  "db/v1/database.sqlite3"
);
