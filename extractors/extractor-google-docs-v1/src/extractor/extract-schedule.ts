import * as XLSX from "xlsx";
import {
  detectRowsFromWorksheet,
  detectScheduleRegions,
  type IDetectedRow,
} from "../parser";
import {
  downloadGoogleDocsSpreadsheet,
  GoogleDocsSpreadsheetExportFormat,
} from "../utils/google/docs/service";
import { getVisibleWorkSheets } from "../utils/sheet-js/utils";

const getWeeksWorkSheets = (workBook: XLSX.WorkBook) => {
  return getVisibleWorkSheets(workBook);
};

type IExtractedWorkSheet = {
  name: string;
  schedule: IExtractedSchedule;
};

type IExtractedSchedule = {
  regions: IExtractedScheduleRegion[];
};

type IExtractedScheduleRegion = {
  header: {
    daysRangeHeader: string;
    title: {
      course: string;
      fullHeader: string;
    };
  };

  lessonsSchedules: IExtractedScheduleRegionLesson[];
};

type IExtractedScheduleRegionLesson = {
  day: string;
  interval: [string, string];

  courseSlug: string;
  studentClassSlug: string;
  subjectSlug: string;
  teacherSlug: string;
};

function* extractScheduleRegions(
  detectedRows: Iterable<IDetectedRow>
): Iterable<IExtractedScheduleRegion> {
  for (const region of detectScheduleRegions(detectedRows)) {
    const lessonsSchedules = Array.from(region.lessonsSchedules);

    const extractedScheduleRegion = {
      header: {
        title: {
          course: region.header.title.course,
          fullHeader: region.header.title.fullHeader,
        },
        daysRangeHeader: region.header.daysRangeHeader,
      },
      lessonsSchedules,
    } satisfies IExtractedScheduleRegion;

    yield extractedScheduleRegion;
  }
}

export async function extractScheduleByGoogleDocsSpreadsheetId(
  docId: string
): Promise<IExtractedWorkSheet[]> {
  const arrayBuffer = await downloadGoogleDocsSpreadsheet(
    docId,
    GoogleDocsSpreadsheetExportFormat.XLSX
  );

  const workBook = XLSX.read(arrayBuffer, {
    dense: true,
    cellHTML: false,
    cellStyles: true,
    cellFormula: false,
  });

  function* generateExtractedWorksSheets(): Iterable<IExtractedWorkSheet> {
    const weeksWorkSheetsReferences = getWeeksWorkSheets(workBook);

    for (const workSheetReference of weeksWorkSheetsReferences) {
      const detectedRows = detectRowsFromWorksheet(
        workSheetReference.worksheet
      );

      const extractedSchedule = {
        regions: Array.from(extractScheduleRegions(detectedRows)),
      } satisfies IExtractedSchedule;

      const extractedWorkSheet = {
        name: workSheetReference.name,
        schedule: extractedSchedule,
      } satisfies IExtractedWorkSheet;

      yield extractedWorkSheet;
    }
  }

  return Array.from(generateExtractedWorksSheets());
}
