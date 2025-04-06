import { extractScheduleByGoogleDocsSpreadsheetId } from "./extractor/extract-schedule-by-google-docs-spreadsheet-id";

// https://docs.google.com/presentation/d/e/2PACX-1vQP-b0NoFv9j2d-T2UamzdqlF7uoxOfDaH5CNU68aJCB7E8tePY4F8ABeYkZVotWPr1Z4UOG7spk9tL/pub?start=false&loop=true&delayms=3000#slide=id.g1dcb910429c_0_0
// https://docs.google.com/spreadsheets/d/1pZ5Ok7YUO9OEatllR7s1UfOaYJF03ULtRcDcd-YHnIA/
const DOC_ID = "1pZ5Ok7YUO9OEatllR7s1UfOaYJF03ULtRcDcd-YHnIA";

await extractScheduleByGoogleDocsSpreadsheetId(DOC_ID);
