import {
  AppDatabaseService,
  DataSourceService,
  GetCoursesUseCase,
} from "@cronos-app/data-v1-client";
import {
  DatabaseContext,
  GetCoursesRepositoryUseCase,
} from "@cronos-app/db-v1-connect";
import { useQuery } from "@tanstack/react-query";

function App() {
  const { data } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const appDb = new AppDatabaseService();

      const dataSourceService = new DataSourceService(appDb);
      const source = await dataSourceService.createOfflineFirstDataSource();

      const databaseContext = new DatabaseContext(source);
      new GetCoursesUseCase(new GetCoursesRepositoryUseCase(databaseContext));
    },
  });

  return <>{JSON.stringify({ data }, null, 2)}</>;
}

export default App;
