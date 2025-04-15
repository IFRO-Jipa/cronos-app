import type {
  GetLessonsSchedulesDaoQuery,
  IGetLessonsSchedulesDaoQueryOptions,
} from "@cronos-app/db-v1-connect";

export type GetLessonsSchedulesUseCaseOptions =
  IGetLessonsSchedulesDaoQueryOptions;

export class GetLessonsSchedulesUseCase {
  constructor(
    private getLessonsSchedulesDaoQuery: GetLessonsSchedulesDaoQuery
  ) {}

  async action(options: GetLessonsSchedulesUseCaseOptions) {
    return this.getLessonsSchedulesDaoQuery.action(options);
  }
}
