import { IReportTableDataTimeRange } from "../interfaces/IReportTableData";

export const renderDayTimeRangeText = (
  dayTimeRange: Omit<IReportTableDataTimeRange, "text">,
): IReportTableDataTimeRange => ({
  ...dayTimeRange,
  text: [
    [dayTimeRange.startHour, dayTimeRange.startMinute],
    [dayTimeRange.endHour, dayTimeRange.endMinute],
  ]
    .map((i) => i.map((i) => String(i).padStart(2, "0")).join(":"))
    .join(" - "),
});
