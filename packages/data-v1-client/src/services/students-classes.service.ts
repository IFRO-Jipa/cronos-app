import {
  GetStudentsClassesDaoQuery,
  type IGetStudentsClassesDaoQueryOptions,
} from "@cronos-app/db-v1-connect";

type GetStudentsClassesUseCaseOptions = IGetStudentsClassesDaoQueryOptions;

export class GetStudentsClassesUseCase {
  constructor(private getStudentsClassesDaoQuery: GetStudentsClassesDaoQuery) {}

  async action(options: GetStudentsClassesUseCaseOptions) {
    return this.getStudentsClassesDaoQuery.action(options);
  }
}
