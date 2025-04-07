import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import { useContextSelector } from "use-context-selector";
import { PageItemReportContext } from "./PageItemReportContext";
import { PageItemReportDialogContent } from "./PageItemReportDialogContent";

export const PageItemReportDialog = () => {
  const open = useContextSelector(PageItemReportContext, ({ open }) => open);

  const handleClose = useContextSelector(
    PageItemReportContext,
    ({ handleClose }) => handleClose
  );

  return (
    <>
      <Dialog
        fullWidth
        open={open}
        maxWidth="sm"
        onClose={handleClose}
        PaperProps={{ sx: { height: "100%" } }}
      >
        <DialogTitle>Resumo da Semana</DialogTitle>

        <Divider />

        <PageItemReportDialogContent />
      </Dialog>
    </>
  );
};
