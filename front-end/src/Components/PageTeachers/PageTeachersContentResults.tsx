import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Alert from "@mui/material/Alert";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { Virtuoso } from "react-virtuoso";
import { useContextSelector } from "use-context-selector";
import { PageTeachersContext } from "./PageTeachersContext";

export const PageTeachersContentResults = () => {
  const navigate = useNavigate();

  const resultTeachers = useContextSelector(
    PageTeachersContext,
    ({ resultTeachers }) => resultTeachers
  );

  const isLoading = useContextSelector(
    PageTeachersContext,
    ({ isLoading }) => isLoading
  );

  return (
    <>
      <List sx={{ width: "100%", height: "100%", py: 0 }}>
        <Divider />

        {isLoading && (
          <>
            <Alert severity="info">Carregando...</Alert>

            <Divider />
          </>
        )}

        {!isLoading && (
          <>
            <Virtuoso
              data={resultTeachers}
              style={{ height: "100%" }}
              itemContent={(index, item) => (
                <>
                  <ListItem
                    disablePadding
                    onClick={() => navigate(`${item.id}`)}
                  >
                    <ListItemButton disableRipple>
                      <ListItemText>
                        {item.fullName ?? item.slugs[0].slug}
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              )}
            />
          </>
        )}
      </List>
    </>
  );
};
