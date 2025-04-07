import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { saveAs } from "file-saver";
import { useCallback } from "react";
import PageAdvancedContentReportTable from "./PageAdvancedContentReportTable";
import { useSelectedItemsReportTableData } from "./utils/useSelectedItemsReportTableData";
import DownloadIcon from "@mui/icons-material/Download";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useWeekItemViewOverviewState } from "../../Week/WeekItemViewOverview/useWeekItemViewOverviewState";

const PageAdvancedContentPaneReport = () => {
  const { reportTableData } = useSelectedItemsReportTableData();

  const { outputElRef, generateImageBlob } =
    useWeekItemViewOverviewState(reportTableData);

  const handleExportReport = useCallback(async () => {
    const imgBlob = await generateImageBlob();
    if (imgBlob) {
      saveAs(imgBlob, "relatorio.png");
    }
  }, [generateImageBlob]);

  const handleViewImage = useCallback(async () => {
    const imgBlob = await generateImageBlob();

    if (imgBlob) {
      const imgURL = URL.createObjectURL(imgBlob);
      window.open(imgURL, "_blank");
    }
  }, [generateImageBlob]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          overflow: "hidden",
          flexDirection: "column",
        }}
      >
        <Box p={1} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box px={1} py={1} sx={{ flex: 1 }}></Box>

          <Button
            size={"small"}
            color={"primary"}
            variant={"outlined"}
            startIcon={<DownloadIcon />}
            onClick={() => handleExportReport()}
          >
            Exportar
          </Button>

          <Button
            size={"small"}
            color={"primary"}
            variant={"contained"}
            startIcon={<OpenInNewIcon />}
            onClick={() => handleViewImage()}
          >
            Ver como Imagem
          </Button>

          <div style={{ visibility: "hidden", position: "absolute" }}>
            <div ref={outputElRef}></div>
          </div>
        </Box>

        <Box mt={0.125}>
          <Divider />
        </Box>

        <Box p={2} sx={{ overflow: "hidden", width: "100%", height: "100%" }}>
          <Box sx={{ overflow: "auto", height: "100%" }}>
            <PageAdvancedContentReportTable />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PageAdvancedContentPaneReport;
