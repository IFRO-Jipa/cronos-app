import Box from "@mui/material/Box";
import PageAdvancedElementsList from "./PageAdvancedElementsList";
import { useContextSelector } from "use-context-selector";
import { PageAdvancedContext } from "./PageAdvancedContext";
import { useMemo } from "react";

const PageAdvancedContentPaneElementsTabAll = () => {
  const resultItemsQuery = useContextSelector(
    PageAdvancedContext,
    ({ resultItemsQuery }) => resultItemsQuery,
  );

  const resultItems = useMemo(
    () => resultItemsQuery.data ?? [],
    [resultItemsQuery.data],
  );

  const allItems = useMemo(() => resultItems ?? [], [resultItems]);

  return (
    <>
      <Box sx={{ width: "100%", height: "100%" }}>
        <PageAdvancedElementsList items={allItems} />
      </Box>
    </>
  );
};

export default PageAdvancedContentPaneElementsTabAll;
