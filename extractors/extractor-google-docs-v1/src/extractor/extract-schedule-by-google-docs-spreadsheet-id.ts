import * as XLSX from "xlsx";
import {
  downloadGoogleDocsSpreadsheet,
  GoogleDocsSpreadsheetExportFormat,
} from "../utils/google/docs/service";
import { getVisibleWorkSheets } from "../utils/sheet-js/utils";
import { extractWeekScheduleFromWorkSheet } from "./schedule/week/extract-week-schedule";

const getWeeksWorkSheets = (workBook: XLSX.WorkBook) => {
  return getVisibleWorkSheets(workBook);
};

export async function extractScheduleByGoogleDocsSpreadsheetId(docId: string) {
  const xlsxDownloadController = await downloadGoogleDocsSpreadsheet(
    docId,
    GoogleDocsSpreadsheetExportFormat.XLSX
  );

  const arrayBuffer = xlsxDownloadController.getArrayBuffer();

  const workBook = XLSX.read(arrayBuffer, {
    dense: true,
    cellFormula: false,
    cellHTML: false,
    cellStyles: true,
  });

  const weeksWorkSheets = getWeeksWorkSheets(workBook);

  for (const workSheet of weeksWorkSheets) {
    await extractWeekScheduleFromWorkSheet(workSheet);
  }
}
