import { IGetWeekTeacherResourceResponseDto } from "../horarios-ifro-data-v2-client/api/resources/weeks/interfaces/IGetWeekTeacherResourceResponseDto";
import { IReportTableData } from "../../Components/ReportTable/interfaces/IReportTableData";
import { getReportTableDataDaysFromWeek } from "./getReportTableDataDaysFromWeek";
import { getReportTableDataColumnFromWeekTeacher } from "./getReportTableDataColumnFromWeekTeacher";
import { IGetReportTableDataForItemOptions } from "./interfaces/IGetReportTableDataForItemOptions";

export const getReportTableDataForTeacher = (
  data: IGetWeekTeacherResourceResponseDto | null,
  options: IGetReportTableDataForItemOptions = {}
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
      weekDayOrders ? weekDayOrders.includes(i.weekDayOrder) : true
    ),
    columns: [getReportTableDataColumnFromWeekTeacher(data)].map((column) => ({
      ...column,
      items: column.items.filter((item) =>
        weekDayOrders ? weekDayOrders.includes(item.weekDay) : true
      ),
    })),
  };
};
