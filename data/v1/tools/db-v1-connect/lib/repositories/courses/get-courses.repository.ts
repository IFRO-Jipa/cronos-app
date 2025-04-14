import type { DatabaseContext } from "../core-repositories";

export class GetCoursesRepositoryUseCase {
  constructor(readonly databaseContext: DatabaseContext) {}

  async action() {
    const { courseRepository } = this.databaseContext;

    const qb = courseRepository.createQueryBuilder("course");
    qb.select("course");

    const courses = await qb.getMany();
    return courses;
  }
}
