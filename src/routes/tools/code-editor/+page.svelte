<script context="module" lang="ts">
	// types
	type Language = { slug: string; label: string };
	type Theme = string;
	export type Preset = { id: string; name: string; code: string; language: Language['slug'] };
</script>

<script lang="ts">
	import { writable } from 'svelte/store';
	import Monaco, { nativeThemes } from 'svelte-monaco';
	import { globalSettings } from '../../global-settings.store';

	// constants
	const languages: Language[] = [
		{ slug: 'plaintext', label: 'Plain Text' },
		{ slug: 'javascript', label: 'JavaScript' },
		{ slug: 'typescript', label: 'TypeScript' },
		{ slug: 'scss', label: 'SCSS' },
		{ slug: 'css', label: 'CSS' },
		{ slug: 'html', label: 'HTML' },
		{ slug: 'markdown', label: 'Markdown' },
		{ slug: 'json', label: 'JSON' },
		{ slug: 'python', label: 'Python' },
		{ slug: 'php', label: 'PHP' },
		{ slug: 'xml', label: 'XML' },
		{ slug: 'csharp', label: 'C#' },
		{ slug: 'java', label: 'Java' },
		{ slug: 'ruby', label: 'Ruby' },
		{ slug: 'c', label: 'C' },
		{ slug: 'go', label: 'Go' },
		{ slug: 'rust', label: 'Rust' },
		{ slug: 'kotlin', label: 'Kotlin' },
		{ slug: 'swift', label: 'Swift' },
		{ slug: 'dart', label: 'Dart' },
		{ slug: 'bash', label: 'Bash' },
		{ slug: 'powershell', label: 'PowerShell' },
		{ slug: 'c++', label: 'C++' },
		{ slug: 'sql', label: 'SQL' },
		{ slug: 'yaml', label: 'YAML' }
	];
	const themes: Theme[] = nativeThemes;
	const deafultPresets: Preset[] = [
		{
			id: 'default',
			name: 'Default (cannot be deleted)',
			code: '// preset default',
			language: 'javascript'
		}
	];

	// local state
	let languageSlug = 'javascript';
	let theme = 'vs-dark';
	let text = 'hey';
	$: userPresets = $globalSettings.settings['code-editor'].userPresets;
	let presets = [...deafultPresets];
	$: presets = [...deafultPresets, ...userPresets];
	const presetId = writable(presets[0].id);

	// actions
	function handlePresetChange(newPresetId: string) {
		const newPreset = presets.find((preset) => preset.id === newPresetId);
		if (!newPreset) return;

		text = newPreset.code;
		languageSlug = newPreset.language;
		presetId.set(newPresetId);
	}

	function handleDeleteAllUserPresets() {
		// ask for confirmation
		const userIsSure = confirm('Are you sure you want to delete all presets?');
		if (!userIsSure) return;
		// delete all user presets
		globalSettings.codeEditor.deleteAllUserPresets();
		// set default as active
		handlePresetChange(deafultPresets[0].id);
	}
	function handleCreateUserPreset() {
		// create new user preset
		const name = prompt(`Preset name:`);
		if (!name) return;
		// save new user preset
		const newPreset = globalSettings.codeEditor.createUserPreset({
			name,
			code: text,
			language: languageSlug
		});
		// set as active
		handlePresetChange(newPreset.id);
	}
</script>

<svelte:head>
	<title>Code Editor - Monaco Editor - VS Code Like</title>
	<meta
		name="description"
		content="Online version of the famouse Monaco Editor used in VS Code. Try it out!"
	/>
</svelte:head>

<h1>Code Editor - Monaco Editor - VS Code Like</h1>

<div class="layout">
	<div class="debug">
		<pre>{JSON.stringify({ languageSlug, theme, text, presetId }, null, 2)}</pre>
	</div>

	<div class="editor-toolbar">
		<div class="control editor-preset-selector">
			<label for="editor-preset">Preset</label>
			<select
				id="editor-preset"
				value={$presetId}
				on:change={(e) => handlePresetChange(e.currentTarget.value)}
			>
				{#each presets as preset}
					<option value={preset.id}>{preset.name}</option>
				{/each}
			</select>
		</div>
		<div class="editor-preset-actions">
			<button on:click={handleCreateUserPreset}>Save current settings as preset</button>
			<button on:click={handleDeleteAllUserPresets}>Delete all presets</button>
		</div>
	</div>

	<div class="editor-toolbar">
		<div class="control editor-language-selector">
			<label for="editor-language">Language</label>
			<select id="editor-language" bind:value={languageSlug}>
				{#each languages as language}
					<option value={language.slug}>{language.label}</option>
				{/each}
			</select>
		</div>
		<div class="control editor-theme-selector">
			<label for="editor-theme">Theme</label>
			<select name="editor-theme" bind:value={theme}>
				{#each themes as theme_slug}
					<option value={theme_slug}>{theme_slug}</option>
				{/each}
			</select>
		</div>
	</div>

	<div class="editor-wrapper">
		<Monaco
			options={{
				language: languageSlug,
				automaticLayout: true
			}}
			{theme}
			bind:value={text}
			on:ready={(event) => {
				// event.detail is the monaco instance. All options are reactive!
				console.log('ready', event.detail);
			}}
		/>
	</div>
</div>

<style lang="scss">
	.debug {
		display: none;
	}
	.layout {
		width: 100%;
		max-width: 1300px;
		margin-left: auto;
		margin-right: auto;
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 2rem;
	}
	.editor-wrapper {
		height: 33vh;
		@media (min-width: 55rem) {
			height: 75vh;
		}
	}
	.editor-toolbar {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		gap: 1rem;

		.control {
			display: flex;
			flex-direction: column;
			gap: 0.2rem;

			select {
				padding: 0.25rem;
			}
		}
		.editor-preset-actions {
			display: flex;
			flex-direction: row;
			gap: 1rem;

			button {
				padding: 0.25rem 0.5rem;
				font-size: 0.8rem;
			}
		}
	}
</style>
