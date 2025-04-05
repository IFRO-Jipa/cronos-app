import { useMatch, useNavigate } from "react-router-dom";
import { useCallback } from "react";

export const usePageItemReportDialogState = (reportPath: string) => {
  const navigate = useNavigate();

  const match = useMatch(reportPath);

  const open = Boolean(match);

  const handleClose = useCallback(() => {
    navigate("..");
  }, [navigate]);

  return { handleClose, open };
};
