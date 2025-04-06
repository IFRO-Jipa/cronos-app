import * as XLSX from "xlsx";

export const getWorkSheetByName = (workBook: XLSX.WorkBook, name: unknown) => {
  if (typeof name === "string") {
    const workSheet = workBook.Sheets[name];
    if (workSheet) return workSheet;
  }

  return null;
};

export const getWorkSheetBySheetProps = (
  workBook: XLSX.WorkBook,
  sheetProps: XLSX.SheetProps
) => {
  return getWorkSheetByName(workBook, sheetProps.name);
};

export const getVisibleWorkSheets = (workBook: XLSX.WorkBook) => {
  const sheets = workBook.Workbook?.Sheets ?? [];

  const sheetsPropsVisible = sheets.filter(
    (sheetProps) => sheetProps.Hidden === 0
  );

  return sheetsPropsVisible
    .map((sheetProps) => getWorkSheetByName(workBook, sheetProps.name))
    .filter((workSheet) => workSheet !== null);
};
