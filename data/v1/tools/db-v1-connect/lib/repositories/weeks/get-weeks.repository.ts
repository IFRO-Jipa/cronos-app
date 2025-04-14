import type { DataSource } from "typeorm";

type IWeek = {
  /**
   * @format "YYYY-MM-DD"
   */
  startsAt: string;
  /**
   * @format "YYYY-MM-DD"
   */
  endsAt: string;
};

export class GetWeeksRepositoryUseCase {
  constructor(readonly dataSource: DataSource) {}

  async action() {
    type IQueryRow = {
      startsAt: string;
      endsAt: string;
    };

    const rows = await this.dataSource.query<IQueryRow[]>(
      `SELECT 
          DISTINCT date(lessons_schedules.date, "-6 day", "weekday 1") as startsAt,
          date(lessons_schedules.date, "weekday 6") as endsAt
        FROM lessons_schedules
        ORDER BY starts_at DESC;`
    );

    const weeks: IWeek[] = rows.map(
      (row): IWeek => ({
        startsAt: row.startsAt,
        endsAt: row.endsAt,
      })
    );

    return weeks;
  }
}
