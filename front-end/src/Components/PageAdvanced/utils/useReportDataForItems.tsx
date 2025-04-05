import {
  IReportTableData,
  IReportTableDataColumn,
} from "../../ReportTable/interfaces/IReportTableData";
import { useMemo } from "react";
import { useContextSelector } from "use-context-selector";
import { useQueries } from "@tanstack/react-query";
import { WeeksContext } from "../../WeeksContext/WeeksContext";
import * as api from "../../../Features/horarios-ifro-data-v2-client/api";
import { IGetWeekTeacherResourceResponseDto } from "../../../Features/horarios-ifro-data-v2-client/api/resources/weeks/interfaces/IGetWeekTeacherResourceResponseDto";
import { IGetWeekClassResourceResponseDto } from "../../../Features/horarios-ifro-data-v2-client/api/resources/weeks/interfaces/IGetWeekClassResourceResponseDto";
import { IPageAdvancedElementsListItem } from "../interfaces/IPageAdvancedElementsListItem";
import { getReportTableDataColumnFromWeekTeacher } from "../../../Features/getReportTableData/getReportTableDataColumnFromWeekTeacher";
import { getReportTableDataDaysFromWeek } from "../../../Features/getReportTableData/getReportTableDataDaysFromWeek";
import { getReportTableDataColumnFromWeekClass } from "../../../Features/getReportTableData/getReportTableDataColumnFromWeekClass";

export const useReportDataForItems = (
  selectedItems: IPageAdvancedElementsListItem[]
) => {
  const week = useContextSelector(WeeksContext, ({ week }) => week);

  const weekId = useContextSelector(
    WeeksContext,
    ({ selectedWeek }) => selectedWeek
  );

  const itemsWeekQueries = useQueries({
    queries: selectedItems.map((selectedItem) => {
      if (weekId) {
        if (selectedItem.type === "teacher") {
          return {
            queryKey: ["week", weekId, "teacher", selectedItem.id],
            queryFn: () =>
              api.invokeResource(api.resources.weeks.getWeekTeacherResource, {
                weekId,
                teacherId: selectedItem.data.id,
              }),
          };
        }
        if (selectedItem.type === "class") {
          return {
            queryKey: ["week", weekId, "class", selectedItem.id],
            queryFn: () =>
              api.invokeResource(api.resources.weeks.getWeekClassResource, {
                weekId,
                classId: selectedItem.data.id,
              }),
          };
        }
      }
      return {
        queryKey: ["week", weekId],
        queryFn: () => Promise.resolve(null),
      };
    }),
  });

  const reportTableData: IReportTableData = useMemo(() => {
    const selectedItemsColumns: IReportTableDataColumn[] =
      selectedItems.map<IReportTableDataColumn>((item, idx) => {
        const itemWeekQuery = itemsWeekQueries[idx];

        if (itemWeekQuery.isLoading) {
          return { header: item.data.slugs[0].slug, items: "loading" };
        }

        if (item.type === "teacher") {
          return getReportTableDataColumnFromWeekTeacher(
            itemWeekQuery.data as IGetWeekTeacherResourceResponseDto
          );
        }

        if (item.type === "class") {
          return getReportTableDataColumnFromWeekClass(
            itemWeekQuery.data as IGetWeekClassResourceResponseDto
          );
        }

        return { header: "-", items: [] };
      });

    return {
      days: getReportTableDataDaysFromWeek(week),
      columns:
        selectedItemsColumns.length === 0
          ? [{ header: "-", items: [] }]
          : selectedItemsColumns,
    };
  }, [selectedItems, itemsWeekQueries]);

  return { reportTableData };
};
