import Container from "@mui/material/Container";
import { WeekItemViewDays } from "../WeekItemViewDays/WeekItemViewDays";
import { WeekItemViewDaysContextProvider } from "../WeekItemViewDays/WeekItemViewDaysContext";
import Box from "@mui/material/Box";

const WeekItemView = () => {
  return (
    <>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          overflow: "hidden",
          flexDirection: "column",
        }}
      >
        <WeekItemViewDaysContextProvider>
          <WeekItemViewDays />
        </WeekItemViewDaysContextProvider>
      </Box>
    </>
  );
};

export default WeekItemView;
