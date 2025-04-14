import { Navigate } from "react-router-dom";

export const LegacyTeachersPage = () => {
  return (
    <>
      <Navigate to={"/teachers"} />
    </>
  );
};
