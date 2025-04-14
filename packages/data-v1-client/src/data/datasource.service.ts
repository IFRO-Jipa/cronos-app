import { entities } from "@cronos-app/db-v1-connect";
import { DataSource } from "typeorm";
import type { AppDatabaseService } from "./app-database.service";

export class DataSourceService {
  constructor(readonly appDatabaseService: AppDatabaseService) {}

  async createOfflineFirstDataSource(): Promise<DataSource> {
    const database = await this.appDatabaseService.getOfflineFirstDatabase();

    const dataSource = new DataSource({
      type: "sqljs",
      database: new Uint8Array(database.data),
      entities: [...entities],
      synchronize: false,
      logging: false,
    });

    await dataSource.initialize();

    return dataSource;
  }
}
