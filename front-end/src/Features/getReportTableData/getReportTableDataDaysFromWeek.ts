import { IListWeeksItem } from "../horarios-ifro-data-v2-client/api/resources/weeks/interfaces/IListWeeksItem";
import { getEachWeekDay } from "../getEachWeekDay";
import format from "date-fns/format";
import localePTBR from "date-fns/locale/pt-BR";

export const getReportTableDataDaysFromWeek = (
  week: IListWeeksItem | undefined,
) =>
  getEachWeekDay(week).map((dayDate) => {
    const weekDayOrder = dayDate.getDay() - 1;

    const weekDayText = format(dayDate, "EEEE", {
      locale: localePTBR,
    });

    const weekDayTextShort =
      weekDayText.split("-")[0][0].toUpperCase() +
      weekDayText.split("-")[0].slice(1);

    return {
      weekDayOrder,
      dateText: format(dayDate, "dd/MM"),
      weekDayText: weekDayTextShort,
    };
  });
