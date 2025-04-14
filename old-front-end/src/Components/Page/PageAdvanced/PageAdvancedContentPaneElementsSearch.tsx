import { useContextSelector } from "use-context-selector";
import { PageAdvancedContext } from "./PageAdvancedContext";
import TextField from "@mui/material/TextField";

const PageAdvancedContentPaneElementsSearch = () => {
  const searchQuery = useContextSelector(
    PageAdvancedContext,
    ({ searchQuery }) => searchQuery,
  );
  const setSearchQuery = useContextSelector(
    PageAdvancedContext,
    ({ setSearchQuery }) => setSearchQuery,
  );

  return (
    <>
      <TextField
        size={"small"}
        variant="outlined"
        sx={{ width: "100%" }}
        placeholder={"Buscar por..."}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </>
  );
};

export default PageAdvancedContentPaneElementsSearch;
