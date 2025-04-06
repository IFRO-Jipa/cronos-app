import { extractScheduleByGoogleDocsSpreadsheetId } from "./extractor/extract-schedule-by-google-docs-spreadsheet-id";

// https://docs.google.com/spreadsheets/d/1pZ5Ok7YUO9OEatllR7s1UfOaYJF03ULtRcDcd-YHnIA/
const DOC_ID = "1pZ5Ok7YUO9OEatllR7s1UfOaYJF03ULtRcDcd-YHnIA";

await extractScheduleByGoogleDocsSpreadsheetId(DOC_ID);
