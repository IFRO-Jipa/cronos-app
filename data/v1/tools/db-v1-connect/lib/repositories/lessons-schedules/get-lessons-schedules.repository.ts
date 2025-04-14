import type { DatabaseContext } from "@cronos-app/db-v1-connect";

export type IGetLessonsSchedulesRepositoryUseCaseOptions = {
  date?: string;
  "teacher.id"?: number | string;
};

export class GetLessonsSchedulesRepositoryUseCase {
  constructor(private databaseContext: DatabaseContext) {}

  async action(options: IGetLessonsSchedulesRepositoryUseCaseOptions) {
    const { lessonScheduleRepository } = this.databaseContext;

    const qb = lessonScheduleRepository.createQueryBuilder("lesson_schedule");

    qb.innerJoin("lesson_schedule.teacher", "teacher");
    qb.innerJoin("lesson_schedule.studentClass", "student_class");
    qb.innerJoin("lesson_schedule.subject", "subject");

    if (options) {
      const teacherId = options["teacher.id"];

      if (teacherId) {
        qb.andWhere("teacher.id = :teacherId", { teacherId: teacherId });
      }

      const date = options["date"];

      if (date) {
        qb.andWhere("lesson_schedule.date = :date", { date: date });
      }
    }

    qb.select(["lesson_schedule", "teacher", "student_class", "subject"]);

    return qb.getMany();
  }
}
