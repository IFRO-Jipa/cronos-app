import { useContextSelector } from "use-context-selector";
import { PageAdvancedContext } from "../PageAdvancedContext";
import { useReportDataForItems } from "./useReportDataForItems";

export const useSelectedItemsReportTableData = () => {
  const selectedItems = useContextSelector(
    PageAdvancedContext,
    ({ selectedItems }) => selectedItems,
  );

  const { reportTableData } = useReportDataForItems(selectedItems);

  return { reportTableData };
};
