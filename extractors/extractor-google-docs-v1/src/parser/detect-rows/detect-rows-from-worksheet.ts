import * as XLSX from "xlsx";
import type { IDetectedRow } from "./detect-row";
import { detectRows } from "./detect-rows";

export const detectRowsFromWorksheet = function* (
  workSheet: XLSX.WorkSheet
): Iterable<IDetectedRow> {
  const data = workSheet["!data"];

  if (!data) {
    throw new Error();
  }

  const generateRows = function* () {
    for (const rowCellObjects of data) {
      const cellsValues = rowCellObjects.map((row) => {
        if (row.w) {
          return row.w.trim();
        }

        return null;
      });

      yield cellsValues;
    }
  };

  yield* detectRows(generateRows());
};
