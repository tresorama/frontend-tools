import type { GlobalSettings } from "../types";
import { createGithubClient } from "./github.client";
import { dev as IS_DEVELOPMENT } from '$app/environment';
import { INITIAL_STATE } from "../initial-state";
import type { Writable } from "svelte/store";
import type { GlobalSettingsRemote } from "./types";

// constants
type GithubAccessToken = string;

/** This is used as ID for doing CRUD operations in the Github Gist */
const DB_GITHUB_GIST_DESCRIPTION = (
  IS_DEVELOPMENT
    ? 'frontend-tools--global-settings--dev'
    : 'frontend-tools--global-settings'
);

export const createApi = ({
  writableStore,
}: {
  writableStore: Writable<GlobalSettingsRemote>;
}) => {

  let accessToken: GithubAccessToken | null = null;
  let githubClient: ReturnType<typeof createGithubClient> | null = null;

  const getGithubClient = () => {
    if (githubClient) return githubClient;
    if (!accessToken) throw new Error("Github access token is not set");
    githubClient = createGithubClient(accessToken);
    return githubClient;
  };

  // Everything is saved in a single Github Gist.
  // That gist is the "database"
  // So we split the logic in :
  //   - "DB" => read and write the full gist
  //   - "queries" => here is the domain logic

  const db = {
    async getStorageGistId() {
      const githubClient = getGithubClient();

      // check if exists
      const allGists = await githubClient.gist.getAllMyGists();
      const foundGist = allGists.find((g) => g.description === DB_GITHUB_GIST_DESCRIPTION);

      // if exists -> return it
      if (foundGist) return foundGist.id;

      // if not exists -> create it
      const createdGist = await githubClient.gist.createGist({
        public: false,
        description: DB_GITHUB_GIST_DESCRIPTION,
        files: {
          'settings.json': {
            content: JSON.stringify(INITIAL_STATE),
          }
        }
      });

      if (createdGist) return createdGist.id;
      return null;
    },
  };

  const queries = {
    getGlobalSettings: async () => {

      try {

        // set svelte state
        writableStore.set({
          status: 'loading',
          data: undefined
        });

        // get github client
        const githubClient = getGithubClient();

        // get storage gist id
        const storageGistId = await db.getStorageGistId();
        if (!storageGistId) {
          writableStore.set({
            status: 'error',
            errorCode: 'NO_STORAGE_GIST_ID',
          });
          return {
            status: 'error',
            errorCode: 'NO_STORAGE_GIST_ID',
          } as const;
        }

        // get storage gist
        const storageGist = await githubClient.gist.getGistById(storageGistId);
        if (!storageGist) {
          writableStore.set({
            status: 'error',
            errorCode: 'NO_STORAGE_GIST',
          });
          return {
            status: 'error',
            errorCode: 'NO_STORAGE_GIST',
          } as const;
        }

        // extract global settings
        let globalSettings: GlobalSettings | undefined;
        try {
          globalSettings = JSON.parse(storageGist.files['settings.json'].content);
        } catch (error) {
          // nothing
        }
        if (!globalSettings) {
          writableStore.set({
            status: 'error',
            errorCode: 'NO_STORAGE_GIST_SETTINGS',
          });
          return {
            status: 'error',
            errorCode: 'NO_STORAGE_GIST_SETTINGS',
          } as const;
        }

        // save to svelte store
        // return to consumer
        writableStore.set({
          status: 'success',
          data: globalSettings,
        });
        return {
          status: 'success',
          data: globalSettings
        } as const;

      } catch (error) {

        writableStore.set({
          status: 'error',
          errorCode: 'GET_FAILED',
        });
        return {
          status: 'error',
          errorCode: 'GET_FAILED',
        } as const;

      }

    },
    saveGlobalSettings: async (globalSettings: GlobalSettings) => {
      try {

        // set svelte state
        writableStore.set({
          status: 'loading',
          data: undefined
        });

        // get github client
        const githubClient = getGithubClient();

        // get storage gist id or create gist if not exists
        const storageGistId = await db.getStorageGistId();

        // ensure that we have a storage gist id
        if (!storageGistId) {
          writableStore.set({
            status: 'error',
            errorCode: 'NO_STORAGE_GIST_ID',
          });
          return {
            status: 'error',
            errorCode: 'NO_STORAGE_GIST_ID',
          } as const;
        }

        // update the storage gist by "overwriting" file
        const updatedGist = await githubClient.gist.updateGist(storageGistId, {
          files: {
            "settings.json": {
              content: JSON.stringify(globalSettings)
            }
          }
        });

        // if succes -> update svelte state
        if (updatedGist) {
          writableStore.set({
            status: 'success',
            data: globalSettings,
          });
          return {
            status: 'success',
            data: updatedGist
          } as const;
        }

        // if insuccess -> abort
        writableStore.set({
          status: 'error',
          errorCode: 'UPDATE_FAILED',
        });
        return {
          status: 'error',
          errorCode: 'UPDATE_FAILED',
        } as const;

      } catch (error) {
        writableStore.set({
          status: 'error',
          errorCode: 'UNEXPECTED_ERROR',
          originalError: error
        });
        return {
          status: 'error',
          errorCode: 'UNEXPECTED_ERROR',
          originalError: error,
        } as const;
      }
    },
    destroyGlobalSettings: async () => {

      try {

        // set svelte state
        writableStore.set({
          status: 'loading',
          data: undefined
        });

        // get github client
        const githubClient = getGithubClient();

        // get storage gist id
        const storageGistId = await db.getStorageGistId();
        if (!storageGistId) {
          writableStore.set({
            status: 'error',
            errorCode: 'NO_STORAGE_GIST_ID',
          });
          return {
            status: 'error',
            errorCode: 'NO_STORAGE_GIST_ID',
          } as const;
        }

        // update the storage gist by "overwriting" file
        const gistData = await githubClient.gist.updateGist(storageGistId, {
          files: {
            "settings.json": {
              content: JSON.stringify(INITIAL_STATE)
            }
          }
        });

        // if succes -> update svelte state
        if (gistData) {
          writableStore.set({
            status: 'success',
            data: INITIAL_STATE
          });
          return {
            status: 'success',
            data: gistData
          } as const;
        }

        // if insuccess -> abort
        writableStore.set({
          status: 'error',
          errorCode: 'UPDATE_FAILED',
        });
        return {
          status: 'error',
          errorCode: 'UPDATE_FAILED',
        } as const;

      } catch (error) {
        writableStore.set({
          status: 'error',
          errorCode: 'UNEXPECTED_ERROR',
          originalError: error,
        });
        return {
          status: 'error',
          errorCode: 'UNEXPECTED_ERROR',
          originalError: error,
        } as const;

      }

    },
  };

  const setGithubAccessToken = (newAccessToken: GithubAccessToken) => {
    accessToken = newAccessToken;
  };

  return {
    setGithubAccessToken,
    queries,
  };
};