import { type IDetectedRow, DetectedRowKind } from "./detect-rows/detect-row";
import { parseRegionHeaderTitle } from "./patterns/region-header";
import {
  isValidSubjectTeacher,
  parseSubjectTeacher,
} from "./patterns/subject-teacher";

type DetectedRegion = {
  header: {
    daysRangeHeader: string;
    title: {
      course: string;
      fullHeader: string;
    };
  };

  lessonsSchedules: DetectedRegionLessonSchedule[];
  studentClasses: null | DetectedRegionStudentClass[];
};

type DetectedRegionStudentClass = {
  slug: string;
  colIndex: number;
};

type DetectedRegionLessonSchedule = {
  day: string;
  interval: [string, string];

  courseSlug: string;
  studentClassSlug: string;
  subjectSlug: string;
  teacherSlug: string;
};

export const detectScheduleRegions = function* (
  detectedRows: Iterable<IDetectedRow>
) {
  let contextRegion: DetectedRegion | null = null;
  let scheduleDay: null | string = null;

  for (const detectedRow of detectedRows) {
    switch (detectedRow.kind) {
      case DetectedRowKind.REGION_HEADER: {
        if (contextRegion) {
          yield contextRegion;
          contextRegion = null;
        }

        const parsedRegionHeaderTitle = parseRegionHeaderTitle(
          detectedRow.meta.title
        );

        contextRegion = {
          header: {
            title: {
              course: parsedRegionHeaderTitle.course,
              fullHeader: parsedRegionHeaderTitle.fullHeader,
            },
            daysRangeHeader: detectedRow.meta.daysRangeHeader,
          },

          studentClasses: null,

          lessonsSchedules: [],
        };

        break;
      }

      case DetectedRowKind.REGION_CLASSSES_HEADER: {
        scheduleDay = null;

        if (!contextRegion) {
          throw new Error("region header not started");
        }

        if (contextRegion.studentClasses !== null) {
          throw new Error("student class already defined");
        }

        contextRegion.studentClasses = detectedRow.meta.studentClassesSlugs.map(
          (studentClassSlug) => {
            return {
              slug: studentClassSlug,
              colIndex: detectedRow.values.indexOf(studentClassSlug),
            };
          }
        );

        break;
      }

      case DetectedRowKind.SCHEDULE: {
        if (!contextRegion) {
          throw new Error("region header not started");
        }

        if (contextRegion.studentClasses === null) {
          throw new Error("student class not defined");
        }

        if (detectedRow.meta.day) {
          scheduleDay = detectedRow.meta.day;
        }

        if (!scheduleDay) {
          throw new Error("could not determine schedule day");
        }

        const interval = detectedRow.meta.interval;

        for (const studentClass of contextRegion.studentClasses) {
          const lessonDescription = detectedRow.values[studentClass.colIndex];

          if (!lessonDescription) continue;

          if (!isValidSubjectTeacher(lessonDescription)) continue;

          const { subjectSlug, teacherSlug } =
            parseSubjectTeacher(lessonDescription);

          const lessonSchedule = {
            day: scheduleDay,
            interval: [interval.startsAt, interval.endsAt],

            studentClassSlug: studentClass.slug,

            subjectSlug,
            teacherSlug,

            courseSlug: contextRegion.header.title.course,
          } satisfies DetectedRegionLessonSchedule;

          contextRegion.lessonsSchedules.push(lessonSchedule);
        }

        break;
      }

      default: {
        console.debug(detectedRow);
        throw new Error(`unhandled row kind`);
      }
    }
  }

  if (contextRegion) {
    yield contextRegion;
  }
};
