import { AppContent } from "../../App/AppContent/AppContent";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import PageAdvancedContentPaneElements from "./PageAdvancedContentPaneElements";
import AppContainer from "../../App/AppContainer/AppContainer";
import * as classes from "./PageAdvanced.module.css";
import PageAdvancedContentPaneReport from "./PageAdvancedContentPaneReport";

const PageAdvancedContent = () => {
  return (
    <>
      <AppContent>
        <AppContainer>
          <Box py={3} sx={{ height: "100%" }}>
            <Box
              className={classes.container}
              sx={{
                border: 1,
                borderColor: "divider",
              }}
            >
              <PageAdvancedContentPaneElements />

              <Divider orientation={"vertical"} />

              <PageAdvancedContentPaneReport />
            </Box>
          </Box>
        </AppContainer>
      </AppContent>
    </>
  );
};

export default PageAdvancedContent;
