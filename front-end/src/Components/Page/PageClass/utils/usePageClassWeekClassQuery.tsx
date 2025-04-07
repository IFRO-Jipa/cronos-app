import { usePageClassClassId } from "./usePageClassClassId";
import { useWeekClassQuery } from "../../../Week/WeeksContext/useWeekClassQuery";

export const usePageClassWeekClassQuery = () => {
  const classId = usePageClassClassId();

  return useWeekClassQuery(classId);
};
