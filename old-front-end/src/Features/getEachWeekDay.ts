import { IListWeeksItem } from "./horarios-ifro-data-v2-client/api/resources/weeks/interfaces/IListWeeksItem";
import { eachDayOfInterval } from "date-fns/eachDayOfInterval";

export const getEachWeekDay = (week?: IListWeeksItem) => {
  if (!week) {
    return [];
  }

  const startDay = new Date(week.startsAt);
  const endDay = new Date(week.endsAt);

  return eachDayOfInterval({ start: startDay, end: endDay }).sort(
    (a, b) => a.getTime() - b.getTime(),
  );
};
