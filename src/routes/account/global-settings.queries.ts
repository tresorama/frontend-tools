import type { GlobalSettings } from "../global-settings.store";
import { createGithubClient } from "./github.queries";

type GithubAccessToken = string;

export const createGlobalSettingsQueries = ({ accessToken }: { accessToken: GithubAccessToken; }) => {

  const githubClient = createGithubClient(accessToken);

  // Everything is saved in a single Github Gist.
  // That gist is the "database"
  // So we split the logic in :
  //   - "DB" => read and write the full gist
  //   - "queries" => here is the domain logic

  const db = {
    // The description is "id"
    GIST_DESCRIPTION: 'frontend-tools--global-settings',
    async createStorageGist() {
      const { GIST_DESCRIPTION } = this;

      const createdGist = await githubClient.gist.createGist({
        public: false,
        description: GIST_DESCRIPTION,
        files: {
          'settings.json': {
            content: JSON.stringify({})
          }
        }
      });

      if (createdGist) return createdGist.id;
      return null;
    },
    async getStorageGistId() {
      const { GIST_DESCRIPTION } = this;

      const allGists = await githubClient.gist.getAllMyGists();
      const foundGist = allGists.find((g) => g.description === GIST_DESCRIPTION);

      if (foundGist) return foundGist.id;
      return null;
    },
  };

  const queries = {
    saveGlobalSettings: async (globalSettings: GlobalSettings): Promise<boolean> => {
      // get storage gist id or create gist if not exists
      let storageGistId = await db.getStorageGistId();
      if (!storageGistId) {
        storageGistId = await db.createStorageGist();
      }

      // ensure that we have a storage gist id
      if (!storageGistId) throw new Error("Unexpected error. No storageGistId");

      // update the storage gist by "overwriting" file
      const updatedGist = await githubClient.gist.updateGist(storageGistId, {
        files: {
          "settings.json": {
            content: JSON.stringify(globalSettings)
          }
        }
      });

      if (updatedGist) return true;
      return false;
    },
    getGlobalSettings: async (): Promise<GlobalSettings | null> => {
      // get storage gist id
      const storageGistId = await db.getStorageGistId();
      if (!storageGistId) return null;

      // get storage gist
      const storageGist = await githubClient.gist.getGistById(storageGistId);
      if (!storageGist) return null;

      const globalSettings = JSON.parse(storageGist.files['settings.json'].content) as GlobalSettings;
      return globalSettings;
    },
  };

  return queries;
};