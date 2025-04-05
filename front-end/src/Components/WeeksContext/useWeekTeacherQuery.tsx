import { useContextSelector } from "use-context-selector";
import { WeeksContext } from "./WeeksContext";
import { useQuery } from "@tanstack/react-query";
import * as api from "../../Features/horarios-ifro-data-v2-client/api";

export const useWeekTeacherQuery = (teacherId: string) => {
  const weekId = useContextSelector(
    WeeksContext,
    ({ selectedWeek }) => selectedWeek
  );

  return useQuery(["week", weekId, "teachers", teacherId], async () => {
    if (weekId) {
      return api.invokeResource(api.resources.weeks.getWeekTeacherResource, {
        weekId,
        teacherId,
      });
    }
    return null;
  });
};
