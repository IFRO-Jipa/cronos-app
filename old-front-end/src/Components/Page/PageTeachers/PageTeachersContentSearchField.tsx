import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useContextSelector } from "use-context-selector";
import { PageTeachersContext } from "./PageTeachersContext";

export const PageTeachersContentSearchField = () => {
  const searchQuery = useContextSelector(
    PageTeachersContext,
    ({ searchQuery }) => searchQuery,
  );

  const setSearchQuery = useContextSelector(
    PageTeachersContext,
    ({ setSearchQuery }) => setSearchQuery,
  );

  return (
    <>
      <Box>
        <TextField
          autoFocus
          size={"small"}
          variant="outlined"
          value={searchQuery}
          autoComplete={"off"}
          sx={{ width: "100%" }}
          onFocus={(e) => e.target.select()}
          placeholder={"Buscar por professor..."}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={() => setSearchQuery("")}
                  disabled={searchQuery.length === 0}
                >
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </>
  );
};
