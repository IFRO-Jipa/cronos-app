import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import { useContextSelector } from "use-context-selector";
import { WeekItemViewOverviewContextProvider } from "../../Week/WeekItemViewOverview/WeekItemViewOverviewContext";
import { PageItemReportContext } from "./PageItemReportContext";
import { PageItemReportDialogContentOpenedViewPreview } from "./PageItemReportDialogContentOpenedViewPreview";

const PageItemReportDialogContentOpenedView = () => {
  const handleClose = useContextSelector(
    PageItemReportContext,
    ({ handleClose }) => handleClose
  );

  return (
    <>
      <WeekItemViewOverviewContextProvider>
        <DialogContent sx={{ overflow: "hidden" }}>
          <PageItemReportDialogContentOpenedViewPreview />
        </DialogContent>

        <Divider />

        <DialogActions>
          <Button onClick={handleClose}>Concluído</Button>
        </DialogActions>
      </WeekItemViewOverviewContextProvider>
    </>
  );
};

export default PageItemReportDialogContentOpenedView;
