import type {
  DatabaseContext,
  LessonScheduleEntity,
} from "../../../../db-v1-connect/src";

type IFindOrCreateLessonScheduleDto = {
  date: LessonScheduleEntity["date"];
  startsAt: LessonScheduleEntity["startsAt"];
  endsAt: LessonScheduleEntity["endsAt"];

  teacher: Pick<LessonScheduleEntity["teacher"], "id">;
  subject: Pick<LessonScheduleEntity["subject"], "id">;
  studentClass: Pick<LessonScheduleEntity["studentClass"], "id">;
};

export async function findOrCreateLessonSchedule(
  dbContext: DatabaseContext,
  dto: IFindOrCreateLessonScheduleDto
) {
  const lessonSchedule = dbContext.lessonScheduleRepository.create({
    date: dto.date,

    startsAt: dto.startsAt,
    endsAt: dto.endsAt,

    teacher: {
      id: dto.teacher.id,
    },
    subject: {
      id: dto.subject.id,
    },

    studentClass: {
      id: dto.studentClass.id,
    },
  });

  const existentLessonSchedule =
    await dbContext.lessonScheduleRepository.findOne({
      where: {
        ...lessonSchedule,
      },
    });

  if (existentLessonSchedule) {
    return existentLessonSchedule;
  }

  await dbContext.lessonScheduleRepository.save(lessonSchedule);

  return dbContext.lessonScheduleRepository.findOneOrFail({
    where: { id: lessonSchedule.id },
  });
}
