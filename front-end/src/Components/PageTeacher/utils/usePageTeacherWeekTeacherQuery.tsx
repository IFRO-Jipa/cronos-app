import { usePageTeacherTeacherId } from "./usePageTeacherTeacherId";
import { useWeekTeacherQuery } from "../../WeeksContext/useWeekTeacherQuery";

export const usePageTeacherWeekTeacherQuery = () => {
  const teacherId = usePageTeacherTeacherId();

  return useWeekTeacherQuery(teacherId);
};
