import type { IDatabaseConnectionContext } from "../infrastructure/database-connection/IDatabaseConnectionContext";

export type IGetLessonsSchedulesDaoQueryOptions = {
  date?: string;
  "teacher.id"?: number | string;
};

export class GetLessonsSchedulesDaoQuery {
  constructor(readonly databaseConnection: IDatabaseConnectionContext) {}

  async action(options: IGetLessonsSchedulesDaoQueryOptions) {
    const {
      typeorm: {
        repositories: { lessonScheduleRepository },
      },
    } = this.databaseConnection;

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
