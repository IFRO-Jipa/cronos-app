import type { IDatabaseConnectionContext } from "../infrastructure/database-connection/IDatabaseConnectionContext";

export class GetCoursesDaoQuery {
  constructor(readonly databaseConnection: IDatabaseConnectionContext) {}

  async action() {
    const {
      typeorm: {
        repositories: { courseRepository },
      },
    } = this.databaseConnection;

    const qb = courseRepository.createQueryBuilder("course");
    qb.select("course");

    const courses = await qb.getMany();
    return courses;
  }
}
