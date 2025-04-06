import * as XLSX from "xlsx";
import { detectLessonsSchedules } from "../../../parser/detect-lessons-schedules";
import { detectRowsFromWorksheet } from "../../../parser/detect-rows/detect-rows-from-worksheet";

export const extractWeekScheduleFromWorkSheet = async (
  workSheet: XLSX.WorkSheet
) => {
  const detectedRows = detectRowsFromWorksheet(workSheet);

  for (const lessonSchedule of detectLessonsSchedules(detectedRows)) {
    console.log({ lessonSchedule });
  }
};
