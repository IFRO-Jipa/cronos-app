import type { IWeek } from "../domain/models";
import type { IDatabaseConnectionContext } from "../infrastructure/database-connection/IDatabaseConnectionContext";

export class GetWeeksDaoQuery {
  constructor(readonly databaseConnection: IDatabaseConnectionContext) {}

  async action() {
    type IQueryRow = {
      startsAt: string;
      endsAt: string;
    };

    const sql = `
      SELECT 
        DISTINCT date(lessons_schedules.date, "-6 day", "weekday 1") as startsAt,
        date(lessons_schedules.date, "weekday 6") as endsAt
      FROM lessons_schedules
      ORDER BY starts_at DESC
    ;`;

    const rows = await this.databaseConnection.query<IQueryRow[]>(sql);

    const weeks: IWeek[] = rows.map(
      (row): IWeek => ({
        startsAt: row.startsAt,
        endsAt: row.endsAt,
      })
    );

    return weeks;
  }
}
