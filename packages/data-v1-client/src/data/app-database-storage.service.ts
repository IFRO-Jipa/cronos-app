function getGitHubStaticFile(repository: string, branch: string, path: string) {
  const GH_STATIC = `https://raw.githubusercontent.com`;
  return `${GH_STATIC}/${repository}/refs/heads/${branch}/${path}`;
}

const GH_REPO = "IFRO-Jipa/cronos-app";
const GH_BRANCH = "main";
const REPO_SQLITE_PATH = "data/v1/db/database.sqlite3";

// https://raw.githubusercontent.com/IFRO-Jipa/cronos-app/refs/heads/main/data/v1/db/database.sqlite3
const URL_MAIN_DB = getGitHubStaticFile(GH_REPO, GH_BRANCH, REPO_SQLITE_PATH);

export async function fetchMainDatabase() {
  const res = await fetch(URL_MAIN_DB);
  const arrayBuffer = await res.arrayBuffer();
  return new Uint8Array(arrayBuffer);
}

export class AppDatabaseStorageService {
  #storageToken = "cronos-app-database";

  private async getCurrentOfflineData() {
    const { default: localforage } = await import("localforage");

    const currentDatabaseData = await localforage.getItem<ArrayBuffer>(
      this.#storageToken
    );

    if (currentDatabaseData) {
      try {
        return new Uint8Array(currentDatabaseData);
      } catch (e) {}
    }

    return null;
  }

  async getOfflineFirstData() {
    const currentData = await this.getCurrentOfflineData();

    if (currentData) {
      return {
        source: "local",
        data: {
          uint8array: currentData,
        },
      };
    }

    const remoteData = await fetchMainDatabase();

    const { default: localforage } = await import("localforage");
    await localforage.setItem(this.#storageToken, remoteData);

    return {
      source: "remote",
      data: {
        uint8array: remoteData,
      },
    };
  }
}
