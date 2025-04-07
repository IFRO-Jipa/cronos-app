import { extractScheduleByGoogleDocsSpreadsheetId } from "@cronos-app/extractor-google-docs-v1";
import * as fs from "node:fs/promises";
import * as path from "node:path";

/*
https://docs.google.com/presentation/d/e/2PACX-1vQP-b0NoFv9j2d-T2UamzdqlF7uoxOfDaH5CNU68aJCB7E8tePY4F8ABeYkZVotWPr1Z4UOG7spk9tL/pub?start=false&loop=true&delayms=3000#slide=id.g1dcb910429c_0_0

https://docs.google.com/spreadsheets/d/1pZ5Ok7YUO9OEatllR7s1UfOaYJF03ULtRcDcd-YHnIA/
*/

const DOC_ID = "1pZ5Ok7YUO9OEatllR7s1UfOaYJF03ULtRcDcd-YHnIA";

const REPO_ROOT = path.join(__dirname, "../../../../");
const REPO_DATASET_V1 = path.join(REPO_ROOT, "dataset/v1");
const REPO_DATASET_V1_DATA = path.join(REPO_DATASET_V1, "data");

async function main() {
  const result = await extractScheduleByGoogleDocsSpreadsheetId(DOC_ID);
  const json = JSON.stringify(result, null, 2);
  await fs.writeFile(path.join(REPO_DATASET_V1_DATA, "example.json"), json);
}

main();
