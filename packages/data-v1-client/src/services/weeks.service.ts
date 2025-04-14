import type { GetWeeksRepositoryUseCase } from "@cronos-app/db-v1-connect";

export class GetWeeksUseCase {
  constructor(private repositoryUseCase: GetWeeksRepositoryUseCase) {}

  async action() {
    return this.repositoryUseCase.action();
  }
}
