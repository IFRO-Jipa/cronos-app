import type { GetWeeksDaoQuery } from "@cronos-app/db-v1-connect";

export class GetWeeksUseCase {
  constructor(private getWeeksDaoQuery: GetWeeksDaoQuery) {}

  async action() {
    return this.getWeeksDaoQuery.action();
  }
}
