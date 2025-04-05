import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useRestoreLastRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isRouteAlreadyRestored, setIsRouteAlreadyRestored] = useState(false);

  useEffect(() => {
    if (isRouteAlreadyRestored) {
      localStorage.setItem("lastPathName", location.pathname);
    }
  }, [isRouteAlreadyRestored, location]);

  const restoreLastRoute = useCallback(() => {
    if (!isRouteAlreadyRestored && location.pathname === "/") {
      let targetRoute: null | string = null;

      const generatorFormStateJSON = localStorage.getItem("generatorFormState");

      if (generatorFormStateJSON) {
        const state = JSON.parse(generatorFormStateJSON);

        const classId = state.class;

        if (classId) {
          targetRoute = `/classes/${classId}`;
        }

        localStorage.removeItem("generatorFormState");
      } else {
        const lastPathName = localStorage.getItem("lastPathName");

        if (lastPathName) {
          targetRoute = lastPathName;
        }
      }

      if (targetRoute !== null) {
        navigate(targetRoute);
      }
    }

    setIsRouteAlreadyRestored(true);
  }, [isRouteAlreadyRestored, location, navigate]);

  useEffect(() => {
    restoreLastRoute();
  }, [restoreLastRoute]);

  return <></>;
};
