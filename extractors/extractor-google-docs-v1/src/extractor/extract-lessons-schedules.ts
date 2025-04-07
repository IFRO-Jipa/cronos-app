import { detectRows } from "../parser";
import { detectLessonsSchedules } from "../parser/detect-lessons-schedules";
import {
  downloadGoogleDocsSpreadsheet,
  GoogleDocsSpreadsheetExportFormat,
} from "../utils/google/docs/service";
import { getXlsxTableRows } from "../utils/sheet-js/utils";

type IExtractedLessonSchedule = {
  day: string;
  interval: [string, string];

  courseSlug: string;
  studentClassSlug: string;
  subjectSlug: string;
  teacherSlug: string;
};

export function* extractLessonsSchedules(
  arrayBuffer: ArrayBuffer
): Iterable<IExtractedLessonSchedule> {
  const tableRows = getXlsxTableRows(arrayBuffer);

  function* extractLessonsSchedules(): Iterable<IExtractedLessonSchedule> {
    const detectedRows = detectRows(tableRows);

    for (const lessonSchedule of detectLessonsSchedules(detectedRows)) {
      yield lessonSchedule;
    }
  }

  yield* extractLessonsSchedules();
}

export async function extractLessonsSchedulesByGoogleDocsId(
  spreadsheetDocId: string
): Promise<Iterable<IExtractedLessonSchedule>> {
  const arrayBuffer = await downloadGoogleDocsSpreadsheet(
    spreadsheetDocId,
    GoogleDocsSpreadsheetExportFormat.XLSX
  );

  return extractLessonsSchedules(arrayBuffer);
}
