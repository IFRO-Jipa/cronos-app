import { PageItemReportContextProvider } from "../PageItemReport/PageItemReportContext";
import { PageItemReportDialog } from "../PageItemReport/PageItemReportDialog";
import { usePageClassPathReport } from "./usePageClassPathReport";

const PageClassReport = () => {
  const pathReport = usePageClassPathReport();

  return (
    <PageItemReportContextProvider reportPath={pathReport}>
      <PageItemReportDialog />
    </PageItemReportContextProvider>
  );
};

export default PageClassReport;
