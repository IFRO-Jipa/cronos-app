import { useMemo } from "react";
import { usePageTeacherTeacherId } from "./utils/usePageTeacherTeacherId";

export const usePageTeacherPathReport = () => {
  const teacherId = usePageTeacherTeacherId();
  return useMemo(() => `/teachers/${teacherId}/report`, [teacherId]);
};
