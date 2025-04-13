import { download } from "../../core/download";

export enum GoogleDocsSpreadsheetExportFormat {
  XLSX = "xlsx",
}

// https://docs.google.com/presentation/d/<FileID>/export/<format>

export function getGoogleDocsSpreadsheetDownloadUrl(
  docId: string,
  format: GoogleDocsSpreadsheetExportFormat
) {
  const search = new URLSearchParams();

  search.set("key", docId);
  search.set("exportFormat", format);

  const route = "https://docs.google.com/feeds/download/spreadsheets/Export";

  const url = `${route}?${search.toString()}`;
  return url;
}

export function downloadGoogleDocsSpreadsheet(
  docId: string,
  format: GoogleDocsSpreadsheetExportFormat
) {
  const url = getGoogleDocsSpreadsheetDownloadUrl(docId, format);
  return download(url, docId);
}
