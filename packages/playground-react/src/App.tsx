import {
  AppDatabaseConnectionService,
  AppDatabaseStorageService,
  GetCoursesUseCase,
} from "@cronos-app/data-v1-client";
import { GetCoursesDaoQuery } from "@cronos-app/db-v1-connect";
import { useQuery } from "@tanstack/react-query";

function App() {
  const { data } = useQuery({
    queryKey: ["courses"],
    retry: false,
    queryFn: async () => {
      const appDb = new AppDatabaseStorageService();

      const dataSourceService = new AppDatabaseConnectionService(appDb);
      const conn =
        await dataSourceService.createOfflineFirstDatabaseConnection();

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
                <p>{curso.fullName}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

export default App;
