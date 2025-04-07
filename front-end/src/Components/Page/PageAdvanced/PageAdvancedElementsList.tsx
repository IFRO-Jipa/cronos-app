import { FC } from "react";
import PageAdvancedElementsListItem from "./PageAdvancedElementsListItem";
import { IPageAdvancedElementsListItem } from "./interfaces/IPageAdvancedElementsListItem";
import { Virtuoso } from "react-virtuoso";
import Box from "@mui/material/Box";

export type IAdvancedPageElementsListProps = {
  items: IPageAdvancedElementsListItem[];
};

const PageAdvancedElementsList: FC<IAdvancedPageElementsListProps> = (
  props
) => {
  const { items } = props;

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Virtuoso
        data={items}
        style={{ height: "100%" }}
        itemContent={(index, item) => (
          <div>
            <PageAdvancedElementsListItem item={item} />
          </div>
        )}
      />
    </Box>
  );
};

export default PageAdvancedElementsList;
