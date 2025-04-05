import { Navigate, useParams } from "react-router-dom";
import { useMemo } from "react";

export const LegacyCoursesPage = () => {
  const { course, year, label } = useParams<{
    course: string;
    year: string;
    label: string;
  }>();

  const targetClassId = useMemo(() => {
    if (course && year && label) {
      return `${course}-${year}-${label}`;
    }

    return null;
  }, [course, year, label]);

  const targetRoute = targetClassId ? `/classes/${targetClassId}` : `/classes`;

  return (
    <>
      <Navigate to={targetRoute} />
    </>
  );
};
