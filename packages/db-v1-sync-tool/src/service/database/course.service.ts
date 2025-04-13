import type { CourseEntity } from "../../../../db-v1-connect/src";
import { DatabaseContext } from "../../../../db-v1-connect/src";

export async function findCourseByIdOrFail(
  dbContext: DatabaseContext,
  id: CourseEntity["id"]
) {
  return dbContext.couseRepository.findOneOrFail({
    where: {
      id,
    },
  });
}

export async function findCourseByFullName(
  dbContext: DatabaseContext,
  fullName: string
) {
  return dbContext.couseRepository.findOne({
    where: {
      fullName: fullName,
    },
  });
}

export async function createCourse(
  dbContext: DatabaseContext,
  data: Pick<CourseEntity, "fullName">
) {
  const course = await dbContext.couseRepository.save({
    fullName: data.fullName,
  });

  return findCourseByIdOrFail(dbContext, course.id);
}

export async function findOrCreateCourseByName(
  dbContext: DatabaseContext,
  fullName: string
) {
  const course = await findCourseByFullName(dbContext, fullName);

  if (course) {
    return course;
  }

  return createCourse(dbContext, { fullName });
}
