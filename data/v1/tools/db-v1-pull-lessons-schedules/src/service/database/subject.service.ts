import type { SubjectEntity } from "../../../../db-connect/src";
import { DatabaseContext } from "../../../../db-connect/src";

async function getSubjectById(
  dbContext: DatabaseContext,
  id: SubjectEntity["id"]
) {
  return dbContext.subjectRepository.findOneOrFail({
    where: { id },
  });
}

async function createSubjectFromSlug(
  dbContext: DatabaseContext,
  subjectSlug: string
) {
  const subjectRow = dbContext.subjectRepository.create({
    fullName: subjectSlug,
  });

  await dbContext.subjectRepository.save(subjectRow);

  await dbContext.subjectSlugRepository.save({
    slug: subjectSlug,
    subject: { id: subjectRow.id },
  });

  return getSubjectById(dbContext, subjectRow.id);
}

async function findSubjectBySlug(
  dbContext: DatabaseContext,
  subjectSlug: string
) {
  const subjectSlugRow = await dbContext.subjectSlugRepository.findOne({
    where: { slug: subjectSlug },
    relations: { subject: true },
  });

  if (subjectSlugRow) {
    return getSubjectById(dbContext, subjectSlugRow.subject.id);
  }

  return null;
}

export async function findOrCreateSubjectBySlug(
  dbContext: DatabaseContext,
  subjectSlug: string
) {
  const subject = await findSubjectBySlug(dbContext, subjectSlug);

  if (subject) {
    return subject;
  }

  return createSubjectFromSlug(dbContext, subjectSlug);
}
