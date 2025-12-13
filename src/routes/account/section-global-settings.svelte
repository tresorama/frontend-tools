<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { toast } from 'svelte-sonner';

  import { globalSettingsLocal } from '$lib/state/global-settings/local/store';
  import { globalSettingsRemote } from '$lib/state/global-settings/remote/store';

  // ===============================================
  //     USer Logged In
  // ===============================================

  $: userIsLogged = !!$page.data.session;

  // ===============================================
  //     Local Settings
  // ===============================================

  $: printableGlobalSettingsLocal = JSON.stringify($globalSettingsLocal, null, 2);

  // event listeners
  function handleDestroyLocal() {
    globalSettingsLocal.api.globalActions.destroyAndRecreate();
    toast.info('Local global settings destroyed');
  }

  // ===============================================
  //     REmote Settings
  // ===============================================

  $: printableGlobalSettingsRemote = JSON.stringify($globalSettingsRemote, null, 2);

  // event listeners
  async function fetchRemote() {
    console.log('fetchRemoteGlobalSettings');
    const loadingToast = toast.info('Fetching remote global settings...');

    if (!userIsLogged) {
      toast.error('Please login first');
      return;
    }

    const result = await globalSettingsRemote.api.queries.getGlobalSettings();
    if (result.status === 'success') {
      toast.dismiss(loadingToast);
      toast.success('Succesfully fetched remote global settings');
      return;
    }

    if (result.status === 'error') {
      toast.dismiss(loadingToast);
      toast.error('Error while fetching remote global settings');
      console.error(result);
      return;
    }
  }
  async function handleDestroyRemote() {
    const loadingToast = toast.info('Destroying state from remote...');

    if (!userIsLogged) {
      toast.error('Please login first');
      return;
    }

    if (!$globalSettingsRemote) {
      toast.error('Remote state is null, not need to destroy');
      return;
    }

    const result = await globalSettingsRemote.api.queries.destroyGlobalSettings();
    if (result.status === 'success') {
      toast.dismiss(loadingToast);
      toast.success('Remote state destroyed! Success');
      return;
    }

    if (result.status === 'error') {
      toast.dismiss(loadingToast);
      toast.error('Error while destroying remote state');
      console.error(result);
      return;
    }
  }
  async function handlePullRemoteToLocal() {
    const loadingToast = toast.info('Pulling local state from remote...');

    if (!userIsLogged) {
      toast.error('Please login first');
      return;
    }

    if ($globalSettingsRemote.status !== 'success') {
      toast.error('Remote state is null');
      return;
    }

    try {
      globalSettingsLocal.set($globalSettingsRemote.data);
      console.log('pulled', $globalSettingsRemote.data);
      toast.success('Remote state pulled to local! Success');
    } catch (error) {
      toast.error(
        'Remote state pulled to local! Error\n' + (error instanceof Error ? error.message : '')
      );
    } finally {
      toast.dismiss(loadingToast);
    }
  }
  async function handlePushLocalToRemote() {
    const loadingToast = toast.info('Pushing local state to remote...');

    if (!userIsLogged) {
      toast.error('Please login first');
      return;
    }

    const result = await globalSettingsRemote.api.queries.saveGlobalSettings($globalSettingsLocal);

    if (result.status === 'success') {
      toast.dismiss(loadingToast);
      toast.success('Local state pushed to remote! Success');
      return;
    }

    if (result.status === 'error') {
      toast.dismiss(loadingToast);
      toast.error('Error while pushing local state to remote');
      console.error(result);
      return;
    }
  }

  // on page load
  onMount(() => {
    // if user is not logged abort...
    if (!$page.data.session) return;

    // extract github access token from session

    // TODO: add type to Session
    // @ts-expect-error Property 'accessToken' does not exist on type 'Session'.
    const githubAccessToken = $page.data.session.accessToken as string | null | undefined;
    if (!githubAccessToken) return;

    // set github access token + fetch remote
    globalSettingsRemote.api.setGithubAccessToken(githubAccessToken);
    fetchRemote();
  });
</script>

<div class="global-settings">
  <div class="global-settings__preview local">
    <div class="toolbar">
      <h3>Local</h3>
      <div class="actions">
        <button on:click={handleDestroyLocal}>Destroy</button>
      </div>
    </div>
    <pre>{printableGlobalSettingsLocal}</pre>
  </div>

  <div class="global-settings__actions local">
    <button on:click={handlePullRemoteToLocal}>{'<<<'}</button>
    <button on:click={handlePushLocalToRemote}>{'>>>'}</button>
  </div>

  <div class="global-settings__preview remote">
    <div class="toolbar">
      <h3>Remote</h3>
      <div class="fetch-status" data-status={$globalSettingsRemote.status}>
        {$globalSettingsRemote.status}
      </div>
      <div class="actions">
        <button on:click={fetchRemote}>Re-Fetch</button>
        <button on:click={handleDestroyRemote}>Destroy</button>
        <div class="control">
          <label for="storage-provider">Storage Provider</label>
          <select id="storage-provider">
            <option value="github-gist">Github Gist</option>
          </select>
        </div>
      </div>
    </div>
    <pre>{printableGlobalSettingsRemote}</pre>
  </div>
</div>

<style lang="scss">
  .global-settings {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    gap: 0.5rem;
    align-items: stretch;

    &__preview {
      display: grid;
      grid-template-columns: auto auto;
      justify-content: space-between;
      grid-template-rows: auto minmax(0, 1fr);

      & .toolbar {
        grid-column: 1/-1;
        display: flex;
        justify-content: space-between;
        align-items: center;

        h3 {
          margin: 0;
        }

        & .actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
      }

      pre {
        grid-column: 1/-1;
        border: solid;
        font-size: 0.8rem;
      }
    }

    &__actions {
      align-self: stretch;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-top: 1rem;
    }
  }
</style>
