import * as XLSX from "xlsx";
import type { ITableRow } from "../core/interfaces/ITableRow";

export function* getWorkSheetRows(
  workSheet: XLSX.WorkSheet
): Iterable<ITableRow> {
  const data = workSheet["!data"];

  if (!data) return;

  const generateRows = function* () {
    for (const rowCellsObjects of data) {
      const values = rowCellsObjects.map((row) => {
        if (row.w) {
          return row.w.trim();
        }

        return null;
      });

      const tableRow = {
        values,
      } satisfies ITableRow;

      yield tableRow;
    }
  };

  yield* generateRows();
}

type IGetWorkBookWorkSheetsOptions = {
  filterOnlyVisible?: true;
};

export function* getWorkBookWorkSheets(
  workBook: XLSX.WorkBook,
  options: IGetWorkBookWorkSheetsOptions = {}
) {
  const workBookSheets = workBook.Workbook?.Sheets ?? [];

  const { filterOnlyVisible = true } = options;

  for (const worksheetName of workBook.SheetNames) {
    const workSheet = workBook.Sheets[worksheetName];

    const workSheetProps = workBookSheets.find(
      (sheetProps) => sheetProps.name === worksheetName
    );

    if (!workSheet || !workSheetProps) continue;

    if (filterOnlyVisible && workSheetProps.Hidden !== 0) continue;

    yield {
      workSheet,
      worksheetName,
      workSheetProps,
    };
  }
}

export function* getWorkSheetsTableRows(workSheets: Iterable<XLSX.WorkSheet>) {
  for (const workSheet of workSheets) {
    yield* getWorkSheetRows(workSheet);
  }
}

export function* getXlsxTableRows(
  arrayBuffer: ArrayBuffer,
  optionsGetWorkSheets?: IGetWorkBookWorkSheetsOptions
): Iterable<ITableRow> {
  const workBook = XLSX.read(arrayBuffer, {
    dense: true,
    cellHTML: false,
    cellStyles: true,
    cellFormula: false,
  });

  for (const { workSheet } of getWorkBookWorkSheets(
    workBook,
    optionsGetWorkSheets
  )) {
    yield* getWorkSheetRows(workSheet);
  }
}
