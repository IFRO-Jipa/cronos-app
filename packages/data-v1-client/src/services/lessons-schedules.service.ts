import type {
  GetLessonsSchedulesRepositoryUseCase,
  IGetLessonsSchedulesRepositoryUseCaseOptions,
} from "@cronos-app/db-v1-connect";

export type GetLessonsSchedulesUseCaseOptions =
  IGetLessonsSchedulesRepositoryUseCaseOptions;

export class GetLessonsSchedulesUseCase {
  constructor(
    private repositoryUseCase: GetLessonsSchedulesRepositoryUseCase
  ) {}

  async action(options: GetLessonsSchedulesUseCaseOptions) {
    return this.repositoryUseCase.action(options);
  }
}
