import {
  GetStudentsClassesRepositoryUseCase,
  type GetStudentsClassesRepositoryUseCaseOptions,
} from "@cronos-app/db-v1-connect";

type GetStudentsClassesUseCaseOptions =
  GetStudentsClassesRepositoryUseCaseOptions;

export class GetStudentsClassesUseCase {
  constructor(private repositoryUseCase: GetStudentsClassesRepositoryUseCase) {}

  async action(options: GetStudentsClassesUseCaseOptions) {
    return this.repositoryUseCase.action(options);
  }
}
