import type {
  DataSource as DataSourceNode,
  EntityManager as EntityManagerNode,
} from "typeorm";
import type {
  DataSource as DataSourceBrowser,
  EntityManager as EntityManagerBrowser,
} from "typeorm/browser";
import type { DatabaseConnectionTypeormRepositories } from "./typeorm";

export type IDatabaseConnectionContextTypeormSource =
  | DataSourceNode
  | DataSourceBrowser
  | EntityManagerNode
  | EntityManagerBrowser;

export type IDatabaseConnectionContext = {
  finalize: () => Promise<void>;

  query: <ResultSet = unknown>(sql: string) => Promise<ResultSet>;

  typeorm: {
    source: IDatabaseConnectionContextTypeormSource;
    repositories: DatabaseConnectionTypeormRepositories;
  };
};
