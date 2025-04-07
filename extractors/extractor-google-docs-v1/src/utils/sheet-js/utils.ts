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

  const woorkSheetsReferences = sheetsPropsVisible
    .map((sheetProps) => ({
      name: sheetProps.name,
      worksheet: getWorkSheetByName(workBook, sheetProps.name),
    }))
    .filter((workSheetReference) => workSheetReference.worksheet !== null);
  return woorkSheetsReferences as {
    name: string | undefined;
    worksheet: XLSX.WorkSheet;
  }[];
};
