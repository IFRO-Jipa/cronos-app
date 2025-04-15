import {
  AppDatabaseConnectionService,
  AppDatabaseStorageService,
  GetCoursesUseCase,
} from "@cronos-app/data-v1-client";
import { GetCoursesDaoQuery } from "@cronos-app/db-v1-connect";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

const useAppDatabaseConnection = () => {
  const storageService = useMemo(() => new AppDatabaseStorageService(), []);

  const connectionService = useMemo(
    () => new AppDatabaseConnectionService(storageService),
    [storageService]
  );

  const getDatabaseConnection = useCallback(async () => {
    const conn = await connectionService.createOfflineFirstDatabaseConnection();
    return conn;
  }, [connectionService]);

  return { storageService, connectionService, getDatabaseConnection };
};

function App() {
  const { getDatabaseConnection } = useAppDatabaseConnection();

  const { data } = useQuery({
    queryKey: ["courses"],
    retry: false,
    queryFn: async () => {
      const conn = await getDatabaseConnection();

      const getCoursesUseCase = new GetCoursesUseCase(
        new GetCoursesDaoQuery(conn)
      );

      return getCoursesUseCase.action();
    },
  });

  return (
    <>
      {data && (
        <section>
          <h1>Cursos</h1>
          <ul>
            {data.map((curso) => (
              <li key={curso.id}>
                <p>
                  {curso.emoji} {curso.fullName}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

export default App;
