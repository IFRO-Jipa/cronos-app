import type { ITableRow } from "../../utils/core/interfaces/ITableRow";
import { detectRow } from "./detect-row";

export const detectRows = function* (rows: Iterable<ITableRow>) {
  for (const values of rows) {
    const detectedRow = detectRow(values);

    if (!detectedRow) continue;
    yield detectedRow;
  }
};
