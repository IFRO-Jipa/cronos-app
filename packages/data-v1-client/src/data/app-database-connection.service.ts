import { createDatabaseConnectionBrowser } from "@cronos-app/db-v1-connect";
import type { AppDatabaseStorageService } from "./app-database-storage.service";

export class AppDatabaseConnectionService {
  constructor(readonly appDatabaseService: AppDatabaseStorageService) {}

  async createOfflineFirstDatabaseConnection() {
    const dataResponse = await this.appDatabaseService.getOfflineFirstData();

    const databaseConnection = await createDatabaseConnectionBrowser(
      dataResponse.data.uint8array
    );

    return databaseConnection;
  }
}
