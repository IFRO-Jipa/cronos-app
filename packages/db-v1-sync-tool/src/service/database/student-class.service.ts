import type { StudentClassEntity } from "../../../../db-v1-connect/src";
import { DatabaseContext } from "../../../../db-v1-connect/src";
import { findOrCreateCourseByName } from "./course.service";

type StudentClassSlugIdentifierSet = {
  studentClassSlug: string;
  studentClassCourseSlug: string;
};

async function findStudentClassByIdOrFail(
  dbContext: DatabaseContext,
  id: StudentClassEntity["id"]
) {
  return dbContext.studentClassRepository.findOneOrFail({
    where: { id },
  });
}

async function createStudentClassFromSlug(
  dbContext: DatabaseContext,
  { studentClassSlug, studentClassCourseSlug }: StudentClassSlugIdentifierSet
) {
  const course = await findOrCreateCourseByName(
    dbContext,
    studentClassCourseSlug
  );

  const studentClassRow = dbContext.studentClassRepository.create({
    period: studentClassSlug,
    course: { id: course.id },
  });

  await dbContext.studentClassRepository.save(studentClassRow);

  await dbContext.studentClassSlugRepository.save({
    period: studentClassSlug,
    studentClass: { id: studentClassRow.id },
  });

  return findStudentClassByIdOrFail(dbContext, studentClassRow.id);
}

async function findStudentClassBySlug(
  dbContext: DatabaseContext,
  studentClassSlug: string
) {
  const studentClassSlugRow =
    await dbContext.studentClassSlugRepository.findOne({
      where: { period: studentClassSlug },
      relations: { studentClass: true },
    });

  if (studentClassSlugRow) {
    return findStudentClassByIdOrFail(
      dbContext,
      studentClassSlugRow.studentClass.id
    );
  }

  return null;
}

export async function findOrCreateStudentClassBySlug(
  dbContext: DatabaseContext,
  { studentClassSlug, studentClassCourseSlug }: StudentClassSlugIdentifierSet
) {
  const studentClass = await findStudentClassBySlug(
    dbContext,
    studentClassSlug
  );

  if (studentClass) {
    return studentClass;
  }

  return createStudentClassFromSlug(dbContext, {
    studentClassSlug,
    studentClassCourseSlug,
  });
}
