import "reflect-metadata";

import {
  downloadGoogleDocsSpreadsheet,
  GoogleDocsSpreadsheetExportFormat,
} from "@cronos-app/extractor-google-docs-v1";
import {
  extractLessonsSchedules,
  sortLessonsSchedules,
} from "@cronos-app/extractor-google-docs-v1/src/extractor/extract-lessons-schedules";
import { getAppDataSource } from "./db/data-sources/app.datasource";
import { DatabaseContext } from "./db/db-context";
import { syncLessonsSchedules } from "./service/sync/database/sync-lessons-schedules";

const OPTIONS = {
  REFERENCE_YEAR: 2025,
  SPREADSHEET_ID: "1pZ5Ok7YUO9OEatllR7s1UfOaYJF03ULtRcDcd-YHnIA",
};

async function main() {
  const dataSource = await getAppDataSource();
  const dbContext = new DatabaseContext(dataSource);

  const arrayBuffer = await downloadGoogleDocsSpreadsheet(
    OPTIONS.SPREADSHEET_ID,
    GoogleDocsSpreadsheetExportFormat.XLSX
  );

  const lessonsSchedules = Array.from(
    sortLessonsSchedules(extractLessonsSchedules(arrayBuffer))
  );

  await syncLessonsSchedules(
    dbContext,
    OPTIONS.REFERENCE_YEAR,
    lessonsSchedules
  );
}

main();
