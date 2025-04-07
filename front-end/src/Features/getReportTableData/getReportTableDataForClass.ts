import { IGetWeekClassResourceResponseDto } from "../horarios-ifro-data-v2-client/api/resources/weeks/interfaces/IGetWeekClassResourceResponseDto";
import { IReportTableData } from "../../Components/ReportTable/interfaces/IReportTableData";
import { getReportTableDataDaysFromWeek } from "./getReportTableDataDaysFromWeek";
import { getReportTableDataColumnFromWeekClass } from "./getReportTableDataColumnFromWeekClass";
import { IGetReportTableDataForItemOptions } from "./interfaces/IGetReportTableDataForItemOptions";

export const getReportTableDataForClass = (
  data: IGetWeekClassResourceResponseDto | null,
  options: IGetReportTableDataForItemOptions = {},
): IReportTableData => {
  if (!data) {
    return {
      days: [],
      columns: [],
    };
  }

  const { weekDayOrders } = options;

  return {
    days: [...getReportTableDataDaysFromWeek(data.week)].filter((i) =>
      weekDayOrders ? weekDayOrders.includes(i.weekDayOrder) : true,
    ),
    columns: [getReportTableDataColumnFromWeekClass(data)].map((column) => ({
      ...column,
      items: column.items.filter((item) =>
        weekDayOrders ? weekDayOrders.includes(item.weekDay) : true,
      ),
    })),
  };
};
