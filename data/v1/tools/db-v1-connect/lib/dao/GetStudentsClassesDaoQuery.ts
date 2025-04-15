import type { IDatabaseConnectionContext } from "../infrastructure/database-connection/IDatabaseConnectionContext";

export type IGetStudentsClassesDaoQueryOptions = {
  ["course.id"]?: string;
};

export class GetStudentsClassesDaoQuery {
  constructor(readonly databaseConnection: IDatabaseConnectionContext) {}

  async action(filters: IGetStudentsClassesDaoQueryOptions) {
    const {
      typeorm: {
        repositories: { studentClassRepository },
      },
    } = this.databaseConnection;

    const qb = studentClassRepository.createQueryBuilder("student_class");

    qb.innerJoin("student_class.course", "course");
    qb.select(["student_class", "course"]);

    if (filters) {
      const courseId = filters["course.id"];

      if (courseId) {
        qb.andWhere("course.id = :courseId", { courseId });
      }
    }

    const studentClasses = await qb.getMany();

    return studentClasses;
  }
}
