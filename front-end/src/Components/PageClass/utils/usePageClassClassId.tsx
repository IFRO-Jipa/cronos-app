import { useParams } from "react-router-dom";

export const usePageClassClassId = () => {
  const { classId } = useParams<{ classId: string }>();
  return classId!;
};
