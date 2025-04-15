import type { GetCoursesDaoQuery } from "@cronos-app/db-v1-connect";

export class GetCoursesUseCase {
  constructor(private getCourseDaoQuery: GetCoursesDaoQuery) {}

  async action() {
    return this.getCourseDaoQuery.action();
  }
}
