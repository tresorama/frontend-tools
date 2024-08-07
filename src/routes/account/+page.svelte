<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { createGlobalSettingsQueries } from './global-settings.queries';
	import {
		globalSettings as localGlobalSettings,
		type GlobalSettings
	} from '../global-settings.store';
	import { toast } from 'svelte-sonner';

	// ==============================================================
	// global settings
	// ==============================================================

	// api  client
	let globalSettingsQueries: ReturnType<typeof createGlobalSettingsQueries> | null = null;
	onMount(() => {
		// if user is not logged abort...
		if (!$page.data.session) return;

		// TODO: add type to Session
		// @ts-expect-error Property 'accessToken' does not exist on type 'Session'.
		const githubAccessToken = $page.data.session.accessToken as string | null | undefined;

		// toast.info(`Github access token: ${githubAccessToken}`);
		if (!githubAccessToken) return;

		globalSettingsQueries = createGlobalSettingsQueries({ accessToken: githubAccessToken });
	});

	// local state
	let remoteGlobalSettings: GlobalSettings | null = null;
	async function fetchRemoteGlobalSettings() {
		if (!globalSettingsQueries) {
			toast.info('Plaese login');
			return;
		}

		toast.info('Fetching remote global settings...');

		try {
			remoteGlobalSettings = await globalSettingsQueries.getGlobalSettings();
			toast.error('Succesfully fetched remote global settings');
		} catch (error) {
			toast.error('Erorr while fetching remote global settings');
		}
	}
	async function handlePullGlobalSettings() {
		toast.info('Pulling local state from remote...');
		if (!globalSettingsQueries) return;

		try {
			const _remoteGlobalSettings = await globalSettingsQueries.getGlobalSettings();
			if (!_remoteGlobalSettings) throw new Error('Remote state is null');

			$localGlobalSettings = _remoteGlobalSettings;

			// notify success
			toast.success('Remote state pulled to local! Success');
		} catch (error) {
			// notify error
			toast.error(
				'Remote state pulled to local! Error\n' + (error instanceof Error ? error.message : '')
			);
		}
	}
	async function handlePushGlobalSettings() {
		toast.info('Pushing local state to remote...');
		if (!globalSettingsQueries) return;

		try {
			await globalSettingsQueries.saveGlobalSettings($localGlobalSettings);
			await fetchRemoteGlobalSettings();
			// notify success
			toast.success('Local state pushed to remote! Success');
		} catch (error) {
			// notify error
			toast.error(
				'Local state pushed to remote! Error\n' + (error instanceof Error ? error.message : '')
			);
		}
	}
	onMount(fetchRemoteGlobalSettings);
</script>

<main>
	<h1>Account</h1>
	{#if !$page.data.session}
		<p>Please login</p>
	{:else}
		<h2>Profile</h2>
		<div class="user-details">
			<span>Name</span>
			<span>{$page.data.session.user?.name}</span>
			<span>Email</span>
			<span>{$page.data.session.user?.email}</span>
		</div>
		<h2>Settings</h2>
		<div class="global-settings">
			<div class="global-settings__preview">
				<h3>Local</h3>
				<pre>{JSON.stringify($localGlobalSettings, null, 2)}</pre>
			</div>
			<div class="global-settings__actions local">
				<button on:click={handlePullGlobalSettings}>{'<<<'}</button>
				<button on:click={handlePushGlobalSettings}>{'>>>'}</button>
			</div>
			<div class="global-settings__preview remote">
				<h3>Remote</h3>
				<div class="control">
					<label for="storage-provider">Storage Provider</label>
					<select id="storage-provider">
						<option value="github-gist">Github Gist</option>
					</select>
				</div>
				<pre>{JSON.stringify(remoteGlobalSettings, null, 2)}</pre>
			</div>
		</div>
	{/if}
</main>

<style lang="scss">
	h2 {
		margin: 4rem 0 1rem;
		&:first-of-type {
			margin-top: 0;
		}
	}

	.user-details {
		display: grid;
		grid-template-columns: minmax(5rem, auto) auto;
		justify-content: start;
	}

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
			h3 {
				margin: 0;
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
