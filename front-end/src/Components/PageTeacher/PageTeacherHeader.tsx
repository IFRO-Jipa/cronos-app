import { Header } from "../Header/Header";
import IconButton from "@mui/material/IconButton";
import SummarizeIcon from "@mui/icons-material/Summarize";
import { useNavigate } from "react-router-dom";
import { useContextSelector } from "use-context-selector";
import { PageTeacherContext } from "./PageTeacherContext";
import { usePageTeacherPathReport } from "./usePageTeacherPathReport";

const PageTeacherHeader = () => {
  const navigate = useNavigate();

  const hasData = useContextSelector(PageTeacherContext, ({ dataQuery }) =>
    Boolean(dataQuery.data)
  );

  const pathReport = usePageTeacherPathReport();

  return (
    <>
      <Header
        title="Professor"
        goBackTo={"/teachers"}
        containerProps={{ maxWidth: "sm" }}
        afterTitle={
          <>
            <IconButton
              color="inherit"
              disabled={!hasData}
              onClick={() => navigate(pathReport)}
            >
              <SummarizeIcon />
            </IconButton>
          </>
        }
      />
    </>
  );
};

export default PageTeacherHeader;
