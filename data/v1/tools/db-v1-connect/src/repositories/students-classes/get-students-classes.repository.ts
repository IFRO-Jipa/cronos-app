import { DatabaseContext } from "@cronos-app/db-v1-connect";

export type GetStudentsClassesRepositoryUseCaseOptions = {
  ["course.id"]?: string;
};

export class GetStudentsClassesRepositoryUseCase {
  constructor(readonly databaseContext: DatabaseContext) {}

  async action(filters: GetStudentsClassesRepositoryUseCaseOptions) {
    const { studentClassRepository } = this.databaseContext;

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
