import DownloadIcon from "@mui/icons-material/Download";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { useContextSelector } from "use-context-selector";
import Loading from "../../Page/Loading/Loading";
import { WeekItemViewOverviewContext } from "../../Week/WeekItemViewOverview/WeekItemViewOverviewContext";

export const PageItemReportDialogContentOpenedViewPreview = () => {
  const imgURL = useContextSelector(
    WeekItemViewOverviewContext,
    ({ imgURL }) => imgURL,
  );

  const handleGenerateImgURL = useContextSelector(
    WeekItemViewOverviewContext,
    ({ handleGenerateImgURL }) => handleGenerateImgURL,
  );

  useEffect(() => {
    void handleGenerateImgURL();
  }, [handleGenerateImgURL]);

  if (!imgURL) {
    return <Loading />;
  }

  return (
    <Box
      sx={{
        gap: 1,
        width: "100%",
        height: "100%",
        display: "flex",
        overflow: "hidden",
        flexDirection: "column",
      }}
    >
      <Box sx={{ flex: 1, overflow: "hidden" }}>
        <a href={imgURL}>
          <img
            alt={""}
            src={imgURL}
            style={{
              width: "100%",
              height: "100%",
              cursor: "pointer",
              objectFit: "contain",
            }}
          />
        </a>
      </Box>

      <Box
        sx={{
          gap: 1,
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Button
          href={imgURL}
          variant="outlined"
          download="relatorio.png"
          startIcon={<DownloadIcon />}
        >
          Baixar Imagem
        </Button>

        <Button
          href={imgURL}
          target="_blank"
          variant="outlined"
          startIcon={<OpenInNewIcon />}
        >
          Abrir em Nova Guia
        </Button>
      </Box>
    </Box>
  );
};
