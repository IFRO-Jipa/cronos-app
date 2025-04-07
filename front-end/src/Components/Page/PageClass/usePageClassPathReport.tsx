import { usePageClassClassId } from "./utils/usePageClassClassId";
import { useMemo } from "react";

export const usePageClassPathReport = () => {
  const classId = usePageClassClassId();
  return useMemo(() => `/classes/${classId}/report`, [classId]);
};
