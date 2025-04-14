import { useParams } from "react-router-dom";

export const usePageTeacherTeacherId = () => {
  const { teacherId } = useParams<{ teacherId: string }>();
  return teacherId!;
};
