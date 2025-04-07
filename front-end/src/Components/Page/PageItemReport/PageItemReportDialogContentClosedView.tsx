import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import Loading from "../../Page/Loading/Loading";
import { PageItemReportContext } from "./PageItemReportContext";
import { useContextSelector } from "use-context-selector";

export const PageItemReportDialogContentClosedView = () => {
  const handleClose = useContextSelector(
    PageItemReportContext,
    ({ handleClose }) => handleClose,
  );

  return (
    <>
      <DialogContent sx={{ overflow: "hidden" }}>
        <Loading />
      </DialogContent>

      <Divider />

      <DialogActions>
        <Button onClick={handleClose}>Concluído</Button>
      </DialogActions>
    </>
  );
};
