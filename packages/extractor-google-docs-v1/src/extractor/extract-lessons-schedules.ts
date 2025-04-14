import { detectRows } from "../parser";
import { detectLessonsSchedules } from "../parser/detect-lessons-schedules";
import {
  downloadGoogleDocsSpreadsheet,
  GoogleDocsSpreadsheetExportFormat,
} from "../utils/google/docs/service";
import { getXlsxTableRows } from "../utils/sheet-js/utils";

export type IExtractedLessonSchedule = {
  day: string;
  interval: [string, string];

  studentClassCourseSlug: string;
  studentClassSlug: string;

  subjectSlug: string;
  teacherSlug: string;
};

export const sortLessonSchedule = (
  a: IExtractedLessonSchedule,
  b: IExtractedLessonSchedule
): number => {
  const aDay = a.day;
  const aPeriodStart = a.interval[0];

  const bDay = b.day;
  const bPeriodStart = b.interval[0];

  const compareDay = aDay.localeCompare(bDay);

  if (compareDay !== 0) return compareDay;

  const comparePeriod = aPeriodStart.localeCompare(bPeriodStart);
  if (comparePeriod !== 0) return comparePeriod;

  const compareStudentClassCourseSlug = a.studentClassCourseSlug.localeCompare(
    b.studentClassCourseSlug
  );
  if (compareStudentClassCourseSlug !== 0) return comparePeriod;

  const compareStudentClassSlug = a.studentClassSlug.localeCompare(
    b.studentClassSlug
  );

  if (compareStudentClassSlug !== 0) return comparePeriod;

  return 0;
};

export function* sortLessonsSchedules(
  lessonsSchedules: Iterable<IExtractedLessonSchedule>
) {
  yield* Array.from(lessonsSchedules).sort(sortLessonSchedule);
}

export function* extractLessonsSchedules(
  arrayBuffer: ArrayBuffer
): Iterable<IExtractedLessonSchedule> {
  const tableRows = getXlsxTableRows(arrayBuffer);

  function* extractLessonsSchedules(): Iterable<IExtractedLessonSchedule> {
    const detectedRows = detectRows(tableRows);

    for (const lessonSchedule of detectLessonsSchedules(detectedRows)) {
      yield {
        day: lessonSchedule.day,
        interval: lessonSchedule.interval,

        studentClassCourseSlug: lessonSchedule.courseSlug,
        studentClassSlug: lessonSchedule.studentClassSlug,

        subjectSlug: lessonSchedule.subjectSlug,
        teacherSlug: lessonSchedule.teacherSlug,
      };
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
