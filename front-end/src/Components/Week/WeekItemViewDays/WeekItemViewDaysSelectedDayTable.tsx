import { useContextSelector } from "use-context-selector";
import { Fragment, useMemo } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { useReportTableData } from "../WeekItemView/utils/useReportTableData";
import Box from "@mui/material/Box";
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setHours";
import { useNow } from "../../Utils/useNow";
import { WeekItemViewDaysContext } from "./WeekItemViewDaysContext";

const WeekItemViewDaysSelectedDayTable = () => {
  const selectedTab = useContextSelector(
    WeekItemViewDaysContext,
    ({ selectedTab }) => selectedTab
  );

  const dayTimeRanges = useContextSelector(
    WeekItemViewDaysContext,
    ({ dayTimeRanges }) => dayTimeRanges
  );

  const weekDayOrder = useMemo(() => selectedTab, [selectedTab]);

  const reportTableData = useReportTableData({ weekDayOrders: [weekDayOrder] });

  const columns = useMemo(() => reportTableData.columns, [reportTableData]);

  return (
    <>
      <TableContainer variant="outlined" square component={Paper}>
        <Table size={"small"}>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "9rem" }}>Horário</TableCell>
              {columns.map((column) => (
                <TableCell key={column.header}>{column.header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dayTimeRanges.map((dayTimeRange) => {
              const now = useNow();

              const isActive = useMemo(() => {
                if (weekDayOrder !== now.getDay() - 1) {
                  return false;
                }

                const startDate = setMinutes(
                  setHours(now, dayTimeRange.startHour),
                  dayTimeRange.startMinute
                );
                const endDate = setMinutes(
                  setHours(now, dayTimeRange.endHour),
                  dayTimeRange.endMinute
                );

                return now >= startDate && now < endDate;
              }, [dayTimeRange, now, dayTimeRanges, weekDayOrder]);

              return (
                <Fragment key={`${dayTimeRange.text}`}>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      backgroundColor: isActive ? "lightgreen" : undefined,
                    }}
                  >
                    <TableCell>{dayTimeRange.text}</TableCell>

                    {columns.map((column) => {
                      const items = column.items;

                      if (items === "loading") {
                        return <TableCell>Carregando...</TableCell>;
                      }

                      const targetItem = items.find(
                        (item) =>
                          item.order === dayTimeRange.order &&
                          item.weekDay === weekDayOrder
                      );

                      return (
                        <TableCell key={column.header}>
                          {targetItem?.text ?? "-"}
                        </TableCell>
                      );
                    })}
                  </TableRow>

                  {(dayTimeRange.order === 2 || dayTimeRange.order === 7) && (
                    <>
                      {/* <TableRow>
                        <TableCell padding={"none"}></TableCell>
                        <TableCell padding={"none"}>
                          <Box my={1} mx={2}></Box>
                        </TableCell>
                      </TableRow> */}
                    </>
                  )}

                  {dayTimeRange.order === 4 && (
                    <>
                      <TableRow>
                        <TableCell padding={"none"}></TableCell>
                        <TableCell padding={"none"}>
                          <Box my={2} mx={2}></Box>
                        </TableCell>
                      </TableRow>
                    </>
                  )}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default WeekItemViewDaysSelectedDayTable;
