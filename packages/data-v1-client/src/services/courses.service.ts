import type { GetCoursesRepositoryUseCase } from "@cronos-app/db-v1-connect";

export class GetCoursesUseCase {
  constructor(private repositoryUseCase: GetCoursesRepositoryUseCase) {}

  async action() {
    return this.repositoryUseCase.action();
  }
}
