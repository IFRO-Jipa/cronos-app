import { useContextSelector } from "use-context-selector";
import { WeeksContext } from "./WeeksContext";
import { useQuery } from "@tanstack/react-query";
import * as api from "../../../Features/horarios-ifro-data-v2-client/api";

export const useWeekClassQuery = (classId: string) => {
  const weekId = useContextSelector(
    WeeksContext,
    ({ selectedWeek }) => selectedWeek,
  );

  return useQuery({
    queryKey: ["week", weekId, "classes", classId],
    queryFn: async () => {
      if (weekId) {
        return api.invokeResource(api.resources.weeks.getWeekClassResource, {
          weekId,
          classId,
        });
      }
      return null;
    },
  });
};
