import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { createContext } from "use-context-selector";
import * as api from "../../../Features/horarios-ifro-data-v2-client/api";
import { IListWeekClassesResourceResponseDto } from "../../../Features/horarios-ifro-data-v2-client/api/resources/weeks/interfaces/IListWeekClassesResourceResponseDto";
import { IListWeeksItem } from "../../../Features/horarios-ifro-data-v2-client/api/resources/weeks/interfaces/IListWeeksItem";
import { IListWeeksResourceResponseDto } from "../../../Features/horarios-ifro-data-v2-client/api/resources/weeks/interfaces/IListWeeksResourceResponseDto";
import { IListWeekTeachersResourceResponseDto } from "../../../Features/horarios-ifro-data-v2-client/api/resources/weeks/interfaces/IListWeekTeachersResourceResponseDto";
import { getNow } from "../../Utils/getNow";

export type IWeeksContext = {
  weeksQuery: UseQueryResult<IListWeeksResourceResponseDto, unknown>;

  selectedWeek: string | null;

  setSelectedWeek: (newSelectedWeek: string | null) => void;

  week: IListWeeksItem | undefined;

  weeks: IListWeeksItem[];

  weekTeachersQuery: UseQueryResult<
    IListWeekTeachersResourceResponseDto,
    unknown
  >;

  weekClassesQuery: UseQueryResult<
    IListWeekClassesResourceResponseDto,
    unknown
  >;
};

export const WeeksContext = createContext({} as IWeeksContext);

export const WeeksContextProvider = ({ children }: { children: any }) => {
  const weeksQuery = useQuery({
    queryKey: ["weeks"],
    queryFn: () =>
      api.invokeResource(api.resources.weeks.listWeeksResource, undefined),
  });

  const [selectedWeek, setSelectedWeek] = useState<string | null>(null);

  const allWeeks = useMemo(() => weeksQuery.data ?? [], [weeksQuery.data]);

  const weeks = useMemo(() => allWeeks.slice(-2), [allWeeks]);

  useEffect(() => {
    const now = getNow();

    if (weeks.length > 0 && selectedWeek === null) {
      const targetWeek = weeks.find((i, idx, arr) => {
        const startDate = new Date(i.startsAt);
        const endDate = new Date(i.endsAt);

        return (now >= startDate && now < endDate) || idx === arr.length - 1;
      })!;

      setSelectedWeek(targetWeek.id);
    }
  }, [weeks, selectedWeek]);

  const week = useMemo(
    () => allWeeks.find((i) => i.id === selectedWeek),
    [allWeeks, selectedWeek],
  );

  const weekTeachersQuery = useQuery({
    queryKey: ["week", selectedWeek, "teachers"],
    queryFn: async () => {
      if (selectedWeek) {
        return api.invokeResource(
          api.resources.weeks.listWeekTeachersResource,
          {
            weekId: selectedWeek,
          },
        );
      }

      return [];
    },
  });

  const weekClassesQuery = useQuery({
    queryKey: ["week", selectedWeek, "classes"],
    queryFn: async () => {
      if (selectedWeek) {
        return api.invokeResource(api.resources.weeks.listWeekClassesResource, {
          weekId: selectedWeek,
        });
      }

      return [];
    },
  });

  return (
    <WeeksContext.Provider
      value={{
        weeksQuery,
        selectedWeek,
        setSelectedWeek,
        weeks,
        week,
        weekTeachersQuery,
        weekClassesQuery,
      }}
    >
      {children}
    </WeeksContext.Provider>
  );
};
