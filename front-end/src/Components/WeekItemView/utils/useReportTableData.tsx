import { useContextSelector } from "use-context-selector";
import { useMemo } from "react";
import { IReportTableData } from "../../ReportTable/interfaces/IReportTableData";
import { getReportTableDataForClass } from "../../../Features/getReportTableData/getReportTableDataForClass";
import { IGetWeekClassResourceResponseDto } from "../../../Features/horarios-ifro-data-v2-client/api/resources/weeks/interfaces/IGetWeekClassResourceResponseDto";
import { getReportTableDataForTeacher } from "../../../Features/getReportTableData/getReportTableDataForTeacher";
import { IGetWeekTeacherResourceResponseDto } from "../../../Features/horarios-ifro-data-v2-client/api/resources/weeks/interfaces/IGetWeekTeacherResourceResponseDto";
import { WeekItemViewContext } from "../WeekItemViewContext";
import { IGetReportTableDataForItemOptions } from "../../../Features/getReportTableData/interfaces/IGetReportTableDataForItemOptions";

export const useReportTableData = (
  options?: IGetReportTableDataForItemOptions
) => {
  const mode = useContextSelector(WeekItemViewContext, ({ mode }) => mode);

  const data = useContextSelector(
    WeekItemViewContext,
    ({ dataQuery }) => dataQuery.data
  );

  return useMemo((): IReportTableData => {
    if (data) {
      switch (mode) {
        case "class": {
          return getReportTableDataForClass(
            data as IGetWeekClassResourceResponseDto,
            options
          );
        }

        case "teacher": {
          return getReportTableDataForTeacher(
            data as IGetWeekTeacherResourceResponseDto,
            options
          );
        }
      }
    }

    return {
      days: [],
      columns: [],
    };
  }, [mode, data, options]);
};
