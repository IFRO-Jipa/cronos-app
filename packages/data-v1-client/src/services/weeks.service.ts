import { DataSource } from "typeorm";

export class GetWeeksServiceUseCase {
  constructor(readonly dataSource: DataSource) {}

  async getWeeks() {
    type IRawWeek = {
      /**
       * @format "YYYY-MM-DD"
       */
      starts_at: string;
      /**
       * @format "YYYY-MM-DD"
       */
      ends_at: string;
    };

    const weeks = await this.dataSource.query<IRawWeek[]>(
      `SELECT 
          DISTINCT date(lessons_schedules.date, "-6 day", "weekday 1") as starts_at,
          date(lessons_schedules.date, "weekday 6") as ends_at
        FROM lessons_schedules
        ORDER BY starts_at DESC;`
    );

    return weeks;
  }
}
