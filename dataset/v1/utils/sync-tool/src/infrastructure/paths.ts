import * as path from "node:path";

export const PATH_REPO_ROOT = path.join(__dirname, "../../../../../../");

export const PATH_REPO_DATASET_V1 = path.join(PATH_REPO_ROOT, "dataset/v1");
export const PATH_REPO_DATASET_V1_DATA = path.join(
  PATH_REPO_DATASET_V1,
  "data"
);

export const PATH_REPO_PROJECT = path.join(
  PATH_REPO_DATASET_V1,
  "utils/sync-tool"
);
