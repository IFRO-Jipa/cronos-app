export type IReportTableDataColumnItems =
  | "loading"
  | { order: number; weekDay: number; text: any }[];

export type IReportTableDataColumn = {
  header: string;
  items: IReportTableDataColumnItems;
};

export type IReportTableDataTimeRange = {
  startHour: number;
  startMinute: number;

  endHour: number;
  endMinute: number;

  text: string;

  order: number;
};

export type IReportTableDataDay = {
  weekDayOrder: number;
  weekDayText: string;
  dateText: string;
};

export type IReportTableData = {
  days: IReportTableDataDay[];

  columns: IReportTableDataColumn[];

  dayTimeRanges?: IReportTableDataTimeRange[];
};
