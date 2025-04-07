import Box from "@mui/material/Box";
import { FC, PropsWithChildren } from "react";

export const AppContent: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <>
      <Box sx={{ flex: 1, height: "100%", overflow: "auto" }}>{children}</Box>
    </>
  );
};
