import Box from "@mui/material/Box";
import PageAdvancedElementsList from "./PageAdvancedElementsList";
import { useContextSelector } from "use-context-selector";
import { PageAdvancedContext } from "./PageAdvancedContext";
import { useMemo } from "react";

const PageAdvancedContentPaneElementsTabCourses = () => {
  const resultItemsQuery = useContextSelector(
    PageAdvancedContext,
    ({ resultItemsQuery }) => resultItemsQuery
  );

  const resultItems = useMemo(
    () => resultItemsQuery.data ?? [],
    [resultItemsQuery.data]
  );

  const classesItems = useMemo(
    () => (resultItems ?? []).filter((i) => i.type === "class"),
    [resultItems]
  );

  return (
    <>
      <Box sx={{ width: "100%", height: "100%" }}>
        <PageAdvancedElementsList items={classesItems} />
      </Box>
    </>
  );
};

export default PageAdvancedContentPaneElementsTabCourses;
