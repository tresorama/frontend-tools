<script lang="ts">
	import Monaco, { nativeThemes } from 'svelte-monaco';

	// Text value that is being edited
	let editorValue = ``;

	// Editor language
	const languages: { slug: string; label: string }[] = [
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
	let language_slug = languages[0].slug;

	// Editor theme
	const themes = nativeThemes;
	let theme: (typeof themes)[number] = themes[1];
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
	<!-- <div class="debug">
		<span>Language: {language_slug}</span>
	</div> -->
	<div class="editor-toolbar">
		<div class="editor-language-selector">
			<label for="editor-language">Language</label>
			<select id="editor-language" bind:value={language_slug}>
				{#each languages as language}
					<option value={language.slug}>{language.label}</option>
				{/each}
			</select>
		</div>
		<div class="editor-theme-selector">
			<label for="editor-theme">Theme</label>
			<select name="editor-theme" bind:value={theme}>
				{#each themes as theme_slug}
					<option value={theme_slug}>{theme_slug}</option>
				{/each}
			</select>
		</div>
	</div>
	<div class="editor-wrapper">
		<!-- event.detail is the monaco instance. All options are reactive! -->
		<Monaco
			options={{
				language: language_slug,
				automaticLayout: true
			}}
			{theme}
			on:ready={(event) => console.log(event.detail)}
			bind:value={editorValue}
		/>
	</div>
</div>

<style lang="scss">
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
		gap: 1rem;

		> * {
			display: flex;
			flex-direction: column;
		}
	}
</style>
