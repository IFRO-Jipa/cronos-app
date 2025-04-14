import localforage from "localforage";
import Mutex from "p-mutex";

const URL_REPO_GH = "https://github.com/IFRO-Jipa/cronos-app";
const URL_REPO_STATIC = `${URL_REPO_GH}/raw/refs/heads/main`;
const REPO_SQLITE_PATH = "data/v1/db/database.sqlite3";
const URL_MAIN_DB = `${URL_REPO_STATIC}/${REPO_SQLITE_PATH}`;

export async function fetchMainDatabase() {
  const res = await fetch(URL_MAIN_DB);
  const arrayBuffer = await res.arrayBuffer();
  return arrayBuffer;
}

export class AppDatabaseService {
  #storageToken = "cronos-app-database";

  #syncMutex = new Mutex();

  private async getCurrentAppDatabaseData() {
    const currentDatabaseData = await localforage.getItem<ArrayBuffer>(
      this.#storageToken
    );

    return currentDatabaseData;
  }

  async getOfflineFirstDatabase() {
    const currentData = await this.getCurrentAppDatabaseData();

    if (currentData) {
      return {
        source: "local",
        data: currentData,
      };
    }

    const remoteData = await fetchMainDatabase();

    return {
      source: "remote",
      data: remoteData,
    };
  }

  /**
   * TODO: implement
   */
  async syncAppDatabase() {
    return this.#syncMutex.withLock(async () => {
      const currentData = await this.getCurrentAppDatabaseData();

      if (currentData) {
        try {
          // TODO: apply delta updates
          const updatedDatabase = {};

          const success = false;

          if (success) {
            await localforage.setItem(this.#storageToken, updatedDatabase);
            return;
          }
        } catch (error) {}
      }

      const remoteData = await fetchMainDatabase();
      await localforage.setItem(this.#storageToken, remoteData);

      return;
    });
  }

  /**
   * TODO: implement
   */
  async checkUpdates() {
    return {
      hasUpdates: false,

      checkedAt: new Date(),

      localDatabaseDate: new Date(),
      localDatabasePulledDate: new Date(),

      lastRemoteDatabaseDate: new Date(),
      lastRemoteDatabasePulledDate: new Date(),
    };
  }
}
