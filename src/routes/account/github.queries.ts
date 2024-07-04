type Gist = {
  id: string,
  public: boolean,
  description: string,
  files: {
    [fileName: string]: {
      content: string;
    };
  };
};

/**
   * API for talking with Github.
   * Under the hood it uses the REST API with `fetch`.
   * Can be used from Browser (and potentially from Server but required thinking about it).
   * The API can act in bahalf of the user who use the app.
   * Authentication required is the Oauth access token.
   * 
   * In browser you can use like this
   * - Add OAuth auth to your app with Github as Provider
   * - Ensuere that when logged in the frontend has access to the `accessToken`
   * - Instatiate this `qithubQueries` object with that `accessToken`
   */
export const createGithubClient = (accessToken: string) => {
  return {
    gist: {
      getAllMyGists: async (): Promise<Gist[]> => {
        return fetch('https://api.github.com/gists', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-GitHub-Api-Version': '2022-11-28'
          }
        }).then((r) => r.json());
      },
      getGistById: async (gistId: Gist['id']): Promise<Gist> => {
        return fetch(`https://api.github.com/gists/${gistId}`).then(r => r.json());
      },
      createGist: async (data: Omit<Gist, "id">): Promise<Gist> => {
        return fetch('https://api.github.com/gists', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-GitHub-Api-Version': '2022-11-28'
          },
          body: JSON.stringify(data)
        }).then((r) => r.json());
      },
      updateGist: async (gistId: Gist['id'], data: Partial<Pick<Gist, "description" | "files">>): Promise<Gist> => {
        return fetch(`https://api.github.com/gists/${gistId}`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-GitHub-Api-Version': '2022-11-28'
          },
          body: JSON.stringify(data)
        }).then((r) => r.json());

      },
    },
  };
};