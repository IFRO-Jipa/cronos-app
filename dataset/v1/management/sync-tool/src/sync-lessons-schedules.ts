import { type IExtractedLessonSchedule } from "@cronos-app/extractor-google-docs-v1";
import { db } from "./infrastructure/db/db";
import {
  courseTable,
  lessonScheduleTable,
  studentClassSlugTable,
  studentClassTable,
  subjectSlugTable,
  subjectTable,
  teacherSlugTable,
  teacherTable,
} from "./infrastructure/db/schema";

async function getSubjectForSlug(subjectSlug: string) {
  const subjectSlugRow = await db.query.subjectSlugTable.findFirst({
    where: (subjectSlugTable, { eq }) => {
      return eq(subjectSlugTable.slug, subjectSlug);
    },
    with: {
      subject: true,
    },
  });

  if (subjectSlugRow) {
    return subjectSlugRow.subject;
  }

  const [subject] = await db
    .insert(subjectTable)
    .values({
      fullName: subjectSlug,
    })
    .returning();

  if (!subject) {
    throw new Error("cannot insert subject");
  }

  await db.insert(subjectSlugTable).values({
    idSubjectFk: subject.id,
    slug: subjectSlug,
  });

  return subject;
}

async function getTeacherForSlug(teacherSlug: string) {
  const teacherSlugRow = await db.query.teacherSlugTable.findFirst({
    where: (teacherSlugTable, { eq }) => {
      return eq(teacherSlugTable.slug, teacherSlug);
    },
    with: {
      teacher: true,
    },
  });

  if (teacherSlugRow) {
    return teacherSlugRow.teacher;
  }

  const [teacher] = await db
    .insert(teacherTable)
    .values({
      fullName: null,
      commonName: teacherSlug,
    })
    .returning();

  if (!teacher) {
    throw new Error("cannot insert teacher");
  }

  await db.insert(teacherSlugTable).values({
    idTeacherFk: teacher.id,
    slug: teacherSlug,
  });

  return teacher;
}

async function getCourseForName(fullName: string) {
  const courseRow = await db.query.courseTable.findFirst({
    where: (courseTable, { eq }) => {
      return eq(courseTable.fullName, fullName);
    },
  });

  if (courseRow) {
    return courseRow;
  }

  const [createdCourseRow] = await db
    .insert(courseTable)
    .values({
      fullName: fullName,
    })
    .returning();

  if (!createdCourseRow) {
    throw new Error("cannot insert course");
  }

  return createdCourseRow;
}

async function getStudentClassForSlug({
  studentClassSlug,
  studentClassCourseSlug,
}: {
  studentClassSlug: string;
  studentClassCourseSlug: string;
}) {
  const studentClassSlugRow = await db.query.studentClassSlugTable.findFirst({
    where: (studentClassSlugTable, { eq }) => {
      return eq(studentClassSlugTable.slug, studentClassSlug);
    },
    with: {
      studentClass: true,
    },
  });

  if (studentClassSlugRow) {
    return studentClassSlugRow.studentClass;
  }

  const course = await getCourseForName(studentClassCourseSlug);

  const [createdStudentClassRow] = await db
    .insert(studentClassTable)
    .values({
      idCourseFk: course.id,
      period: studentClassSlug,
    })
    .returning();

  if (!createdStudentClassRow) {
    throw new Error("cannot insert studentClass");
  }

  await db.insert(studentClassSlugTable).values({
    idStudentClassFk: createdStudentClassRow.id,
    slug: studentClassSlug,
  });

  return createdStudentClassRow;
}

async function syncLessonSchedule(
  referenceYear: number | string,
  lessonSchedule: IExtractedLessonSchedule
) {
  const date = `${referenceYear}-${lessonSchedule.day}`;
  const startsAt = lessonSchedule.interval[0];
  const endsAt = lessonSchedule.interval[1];

  const subject = await getSubjectForSlug(lessonSchedule.subjectSlug);

  const teacher = await getTeacherForSlug(lessonSchedule.teacherSlug);

  const studentClass = await getStudentClassForSlug({
    studentClassSlug: lessonSchedule.studentClassSlug,
    studentClassCourseSlug: lessonSchedule.studentClassCourseSlug,
  });

  const lessonScheduleRow = await db.query.lessonScheduleTable.findFirst({
    where: (lessonScheduleTable, { and, eq }) => {
      return and(
        eq(lessonScheduleTable.date, date),

        eq(lessonScheduleTable.startsAt, startsAt),
        eq(lessonScheduleTable.endsAt, endsAt),

        eq(lessonScheduleTable.idTeacherFk, teacher.id),
        eq(lessonScheduleTable.idStudentClassFk, studentClass.id),
        eq(lessonScheduleTable.idSubjectFk, -1)
      );
    },
  });

  if (lessonScheduleRow) return lessonScheduleRow;

  const [createdLessonScheduleRow] = await db
    .insert(lessonScheduleTable)
    .values({
      date: date,

      startsAt: startsAt,
      endsAt: endsAt,

      idStudentClassFk: studentClass.id,
      idTeacherFk: teacher.id,
      idSubjectFk: subject.id,
    })
    .returning();

  if (!createdLessonScheduleRow) {
    throw new Error("could not create lesson_schedule");
  }

  return createdLessonScheduleRow;
}

export async function syncLessonsSchedules(
  referenceYear: number | string,
  lessonsSchedules: Iterable<IExtractedLessonSchedule>
) {
  for (const lessonSchedule of lessonsSchedules) {
    await syncLessonSchedule(referenceYear, lessonSchedule);
  }
}
