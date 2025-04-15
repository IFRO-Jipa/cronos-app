import type { SqlJsConfig } from "sql.js";
import type {
  IDatabaseConnectionContext,
  IDatabaseConnectionContextTypeormSource,
} from "./IDatabaseConnectionContext";
import { DatabaseConnectionTypeormRepositories, entities } from "./typeorm";

export const createDatabaseConnectionBrowser = async (
  database: Uint8Array
): Promise<IDatabaseConnectionContext> => {
  const { DataSource } = await import(
    "typeorm/browser/data-source/DataSource.js"
  );

  const { default: initSqlJs } = await import("sql.js");

  const sqlJsConfig: SqlJsConfig = {
    locateFile: (file: string) => `https://sql.js.org/dist/${file}`,
  };

  const dataSource = new DataSource({
    database,
    type: "sqljs",

    driver: initSqlJs,
    sqlJsConfig: sqlJsConfig,

    entities: [...entities],
    synchronize: false,
    logging: false,
  });

  await dataSource.initialize();

  const source =
    dataSource as unknown as IDatabaseConnectionContextTypeormSource;

  const query = (sql: string) => source.query(sql);

  const finalize = async () => {
    await dataSource.destroy();
  };

  return {
    finalize,
    query: query,
    typeorm: {
      source: source,
      repositories: new DatabaseConnectionTypeormRepositories(source),
    },
  };
};
