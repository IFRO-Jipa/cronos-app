import loadable from "@loadable/component";
import { useSelectedItemsReportTableData } from "./utils/useSelectedItemsReportTableData";

const ReportTable = loadable(() => import("../../ReportTable/ReportTable"));

const PageAdvancedContentReportTable = () => {
  const { reportTableData } = useSelectedItemsReportTableData();
  return (
    <>
      <ReportTable data={reportTableData} />
    </>
  );
};

export default PageAdvancedContentReportTable;
