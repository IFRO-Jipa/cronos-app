import { detectRow } from "./detect-row";

export const detectRows = function* (rows: Iterable<(string | null)[]>) {
  for (const values of rows) {
    const detectedRow = detectRow(values);

    if (!detectedRow) continue;
    yield detectedRow;
  }
};
