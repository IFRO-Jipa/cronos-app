import type { DatabaseContext } from "@cronos-app/db-v1-connect";
import { type IExtractedLessonSchedule } from "@cronos-app/extractor-google-docs-v1";
import { findOrCreateLessonSchedule } from "../../database/lesson-schedule.service";
import { findOrCreateStudentClassBySlug } from "../../database/student-class.service";
import { findOrCreateSubjectBySlug } from "../../database/subject.service";
import { findOrCreateTeacherBySlug } from "../../database/teacher.service";

async function syncLessonSchedule(
  dbContext: DatabaseContext,

  referenceYear: number | string,
  extractedLessonSchedule: IExtractedLessonSchedule
) {
  const date = `${referenceYear}-${extractedLessonSchedule.day}`;
  const startsAt = extractedLessonSchedule.interval[0];
  const endsAt = extractedLessonSchedule.interval[1];

  const subject = await findOrCreateSubjectBySlug(
    dbContext,
    extractedLessonSchedule.subjectSlug
  );

  const teacher = await findOrCreateTeacherBySlug(
    dbContext,
    extractedLessonSchedule.teacherSlug
  );

  const studentClass = await findOrCreateStudentClassBySlug(dbContext, {
    studentClassSlug: extractedLessonSchedule.studentClassSlug,
    studentClassCourseSlug: extractedLessonSchedule.studentClassCourseSlug,
  });

  const lessonSchedule = await findOrCreateLessonSchedule(dbContext, {
    date: date,
    startsAt: startsAt,
    endsAt: endsAt,
    studentClass: { id: studentClass.id },
    teacher: { id: teacher.id },
    subject: { id: subject.id },
  });

  return lessonSchedule;
}

export async function syncLessonsSchedules(
  dbContext: DatabaseContext,
  referenceYear: number | string,
  lessonsSchedules: Iterable<IExtractedLessonSchedule>
) {
  for (const lessonSchedule of lessonsSchedules) {
    await syncLessonSchedule(dbContext, referenceYear, lessonSchedule);
  }
}
