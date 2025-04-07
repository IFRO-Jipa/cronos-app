import { FC, useCallback, useMemo } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import { IPageAdvancedElementsListItem } from "./interfaces/IPageAdvancedElementsListItem";
import { useContextSelector } from "use-context-selector";
import { PageAdvancedContext } from "./PageAdvancedContext";

export type IAdvancedPageElementsListItemProps = {
  item: IPageAdvancedElementsListItem;
};

const PageAdvancedElementsListItem: FC<IAdvancedPageElementsListItemProps> = (
  props,
) => {
  const { item } = props;

  const { id } = item;

  const isItemSelected = useContextSelector(
    PageAdvancedContext,
    ({ isItemSelected }) => isItemSelected,
  );
  const setItemSelectedState = useContextSelector(
    PageAdvancedContext,
    ({ setItemSelectedState }) => setItemSelectedState,
  );

  const checked = useMemo(() => isItemSelected(id), [isItemSelected, id]);
  const setChecked = useCallback(
    (state: boolean) => setItemSelectedState(id, state),
    [setItemSelectedState, id],
  );

  if (item.type === "teacher") {
    return (
      <>
        <ListItem disablePadding>
          <ListItemButton
            dense
            disableRipple
            onClick={() => setChecked(!checked)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                tabIndex={-1}
                disableRipple
                checked={checked}
              />
            </ListItemIcon>

            <ListItemText>
              {item.data.fullName ?? item.data.slugs[0].slug}
            </ListItemText>
          </ListItemButton>
        </ListItem>

        <Divider />
      </>
    );
  }

  if (item.type === "class") {
    return (
      <>
        <ListItem disablePadding>
          <ListItemButton
            dense
            onClick={() => setChecked(!checked)}
            disableRipple
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                tabIndex={-1}
                disableRipple
                checked={checked}
              />
            </ListItemIcon>

            <ListItemText>{item.data.slugs[0].slug}</ListItemText>
          </ListItemButton>
        </ListItem>

        <Divider />
      </>
    );
  }

  return null;
};

export default PageAdvancedElementsListItem;
