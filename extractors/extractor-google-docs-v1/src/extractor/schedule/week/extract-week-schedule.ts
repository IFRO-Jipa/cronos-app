import * as XLSX from "xlsx";
import { detectRowsFromWorksheet } from "../../../parser/detect-rows/detect-rows-from-worksheet";
import { detectScheduleRegions } from "../../../parser/detect-schedule-regions";

export const extractWeekScheduleFromWorkSheet = async (
  workSheet: XLSX.WorkSheet
) => {
  const detectedRows = detectRowsFromWorksheet(workSheet);

  for (const region of detectScheduleRegions(detectedRows)) {
    console.log(region);
  }
};
