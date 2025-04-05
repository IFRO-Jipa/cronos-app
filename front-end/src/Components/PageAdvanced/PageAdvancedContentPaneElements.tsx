import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import WeekSelect from "../WeekSelect/WeekSelect";
import PageAdvancedContentPaneElementsSearch from "./PageAdvancedContentPaneElementsSearch";
import PageAdvancedContentPaneElementsTabCourses from "./PageAdvancedContentPaneElementsTabCourses";
import PageAdvancedContentPaneElementsTabTeacher from "./PageAdvancedContentPaneElementsTabTeacher";

enum PaneTab {
  CLASSES,
  TEACHERS,
}

const PageAdvancedContentPaneElements = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        mx={0}
        sx={{ display: "flex", flexDirection: "column", overflow: "hidden" }}
      >
        <Box p={2} sx={{ minWidth: "16.5625rem" }}>
          <WeekSelect />
        </Box>

        <Divider />

        <Box>
          <Tabs
            value={value}
            variant="scrollable"
            scrollButtons="auto"
            onChange={handleChange}
          >
            <Tab value={PaneTab.CLASSES} label="Turmas" />
            <Tab value={PaneTab.TEACHERS} label="Professores" />
          </Tabs>
        </Box>

        <Divider />

        <Box mx={1} my={1}>
          <PageAdvancedContentPaneElementsSearch />
        </Box>

        <Divider />

        <Box sx={{ flex: 1, overflow: "auto" }}>
          {value === PaneTab.CLASSES && (
            <PageAdvancedContentPaneElementsTabCourses />
          )}

          {value === PaneTab.TEACHERS && (
            <PageAdvancedContentPaneElementsTabTeacher />
          )}
        </Box>
      </Box>
    </>
  );
};

export default PageAdvancedContentPaneElements;
