import { PageItemReportContextProvider } from "../PageItemReport/PageItemReportContext";
import { PageItemReportDialog } from "../PageItemReport/PageItemReportDialog";
import { usePageTeacherPathReport } from "./usePageTeacherPathReport";

const PageTeacherReport = () => {
  const pathReport = usePageTeacherPathReport();

  return (
    <PageItemReportContextProvider reportPath={pathReport}>
      <PageItemReportDialog />
    </PageItemReportContextProvider>
  );
};

export default PageTeacherReport;
