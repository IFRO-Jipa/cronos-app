import * as path from "node:path";

const HERE = __dirname;

export const PATH_REPO_ROOT = path.join(HERE, "../../../../../");

export const PATH_REPO_DATASET_V1 = path.join(PATH_REPO_ROOT, "dataset/v1");

export const PATH_REPO_DATASET_V1_DATABASE = path.join(
  PATH_REPO_DATASET_V1,
  "database"
);

export const PATH_REPO_DATASET_V1_DATABASE_DB_SQLITE = path.join(
  PATH_REPO_DATASET_V1_DATABASE,
  "database.sqlite3"
);


export const PATH_REPO_PROJECT = path.join(
  PATH_REPO_DATASET_V1,
  "utils/sync-tool"
);
