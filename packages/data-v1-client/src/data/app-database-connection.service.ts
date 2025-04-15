import { createDatabaseConnectionBrowser } from "@cronos-app/db-v1-connect";
import type { AppDatabaseStorageService } from "./app-database-storage.service";

export class AppDatabaseConnectionService {
  constructor(readonly appDatabaseService: AppDatabaseStorageService) {}

  async createOfflineFirstDatabaseConnection() {
    const database = await this.appDatabaseService.getOfflineFirstData();
    const data = new Uint8Array(database.data);

    const databaseConnection = await createDatabaseConnectionBrowser(data);

    return databaseConnection;
  }
}
