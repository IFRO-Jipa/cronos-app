import type { DatabaseContext } from "../../db-context";

export class GetCoursesRepositoryUseCase {
  constructor(readonly databaseContext: DatabaseContext) {}

  async action() {
    const courseRepository = this.databaseContext.courseRepository;

    const qb = courseRepository.createQueryBuilder("course");
    qb.select("course");

    const courses = await qb.getMany();
    return courses;
  }
}
