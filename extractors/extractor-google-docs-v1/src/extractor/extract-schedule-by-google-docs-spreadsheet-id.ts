import * as XLSX from "xlsx";
import {
  downloadGoogleDocsSpreadsheet,
  GoogleDocsSpreadsheetExportFormat,
} from "../utils/google/docs/service";

export async function extractScheduleByGoogleDocsSpreadsheetId(docId: string) {
  const xlsxDownloadController = await downloadGoogleDocsSpreadsheet(
    docId,
    GoogleDocsSpreadsheetExportFormat.XLSX
  );

  const arrayBuffer = xlsxDownloadController.getArrayBuffer();

  const workBook = XLSX.read(arrayBuffer);

  const workSheet = workBook.Sheets.Atual;
  if (workSheet) {
    const json = XLSX.utils.sheet_to_json(workSheet, {
      // header: 2,
      raw: false,
      rawNumbers: false,
    });

    console.log(JSON.stringify(json, null, 2));
  }
}
