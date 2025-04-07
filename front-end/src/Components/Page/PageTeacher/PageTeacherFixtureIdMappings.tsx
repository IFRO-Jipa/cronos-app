import { FC, PropsWithChildren, useEffect } from "react";
import { usePageTeacherTeacherId } from "./utils/usePageTeacherTeacherId";
import { useQuery } from "@tanstack/react-query";
import { getMappedTeacherId } from "../../../Features/getMappedTeacherId";
import PageLoading from "../PageLoading/PageLoading";
import { useNavigate } from "react-router-dom";

export const PageTeacherFixtureIdMappings: FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const navigate = useNavigate();

  const teacherId = usePageTeacherTeacherId();

  const targetTeacherIdQuery = useQuery(["targetTeacherId", teacherId], () =>
    getMappedTeacherId(teacherId)
  );

  useEffect(() => {
    const targetTeacherId = targetTeacherIdQuery.data;

    if (targetTeacherId) {
      if (targetTeacherId !== teacherId) {
        navigate(`/teachers/${targetTeacherId}`);
      }
    }
  }, [teacherId, targetTeacherIdQuery, navigate]);

  if (targetTeacherIdQuery.isLoading) {
    return <PageLoading />;
  }

  return <>{children}</>;
};
