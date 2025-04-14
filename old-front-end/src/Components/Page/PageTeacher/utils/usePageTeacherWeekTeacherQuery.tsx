import { usePageTeacherTeacherId } from "./usePageTeacherTeacherId";
import { useWeekTeacherQuery } from "../../../Week/WeeksContext/useWeekTeacherQuery";

export const usePageTeacherWeekTeacherQuery = () => {
  const teacherId = usePageTeacherTeacherId();

  return useWeekTeacherQuery(teacherId);
};
