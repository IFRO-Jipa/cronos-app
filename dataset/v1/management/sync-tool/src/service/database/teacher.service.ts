import { DatabaseContext } from "../../db/db-context";
import type { TeacherEntity } from "../../db/entities";

async function findTeacherByIdOrFail(
  dbContext: DatabaseContext,
  id: TeacherEntity["id"]
) {
  return dbContext.teacherRepository.findOneOrFail({
    where: { id },
  });
}

async function createTeacherFromSlug(
  dbContext: DatabaseContext,
  teacherSlug: string
) {
  const teacherRow = dbContext.teacherRepository.create({
    fullName: teacherSlug,
  });

  await dbContext.teacherRepository.save(teacherRow);

  await dbContext.teacherSlugRepository.save({
    slug: teacherSlug,
    teacher: { id: teacherRow.id },
  });

  return findTeacherByIdOrFail(dbContext, teacherRow.id);
}

async function findTeacherBySlug(
  dbContext: DatabaseContext,
  teacherSlug: string
) {
  const teacherSlugRow = await dbContext.teacherSlugRepository.findOne({
    where: { slug: teacherSlug },
    relations: { teacher: true },
  });

  if (teacherSlugRow) {
    return findTeacherByIdOrFail(dbContext, teacherSlugRow.teacher.id);
  }

  return null;
}

export async function findOrCreateTeacherBySlug(
  dbContext: DatabaseContext,
  teacherSlug: string
) {
  const teacher = await findTeacherBySlug(dbContext, teacherSlug);

  if (teacher) {
    return teacher;
  }

  return createTeacherFromSlug(dbContext, teacherSlug);
}
