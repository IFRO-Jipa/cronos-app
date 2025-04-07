import { useMemo } from "react";
import { useContextSelector } from "use-context-selector";
import { WeeksContext } from "../../Week/WeeksContext/WeeksContext";
import { PLACEHOLDER_WEEK_CLASSES } from "./utils/PLACEHOLDER_WEEK_CLASSES";

export const useAvailableClasses = () => {
  const weekClassesQuery = useContextSelector(
    WeeksContext,
    ({ weekClassesQuery }) => weekClassesQuery
  );

  const weekClasses = useMemo(
    () => weekClassesQuery.data ?? PLACEHOLDER_WEEK_CLASSES,
    [weekClassesQuery.data]
  );

  const availableClasses = useMemo(() => {
    return weekClasses.reduce((acc, i) => {
      acc[i.course] ||= {};

      const course = acc[i.course];

      course[i.year] ||= [];

      const courseYear = course[i.year];

      courseYear.push(i.label);

      return acc;
    }, {} as Record<string, Record<string, string[]>>);
  }, [weekClasses]);

  const { isLoading } = weekClassesQuery;

  return { availableClasses, isLoading };
};
