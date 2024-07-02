<script lang="ts">
	import Monaco from 'svelte-monaco';

	// Presets
	type PresetSlug = (typeof presetsSlugs)[number];
	const presetsSlugs = ['1', '2'] as const;
	const presetsStartingText: Record<PresetSlug, string> = {
		'1': `:root {
  --sl--color-surface-hue: 183;
  --sl--color-surface-sat: 100%;
  
  --sl--color-surface-50: var(--sl--color-surface-50--D,var(--sl--color-surface-50--L));
  --sl--color-surface-100: var(--sl--color-surface-100--D,var(--sl--color-surface-100--L));
  --sl--color-surface-200: var(--sl--color-surface-200--D,var(--sl--color-surface-200--L));
  --sl--color-surface-300: var(--sl--color-surface-300--D,var(--sl--color-surface-300--L));
  --sl--color-surface-400: var(--sl--color-surface-400--D,var(--sl--color-surface-400--L));
  --sl--color-surface-500: var(--sl--color-surface-500--D,var(--sl--color-surface-500--L));
  --sl--color-surface-600: var(--sl--color-surface-600--D,var(--sl--color-surface-600--L));
  --sl--color-surface-700: var(--sl--color-surface-700--D,var(--sl--color-surface-700--L));
  --sl--color-surface-800: var(--sl--color-surface-800--D,var(--sl--color-surface-800--L));
  --sl--color-surface-900: var(--sl--color-surface-900--D,var(--sl--color-surface-900--L));
  --sl--color-surface-950: var(--sl--color-surface-950--D,var(--sl--color-surface-950--L));

  --sl--color-surface-50--D: hsl(var(--sl--color-surface-hue), var(--sl--color-surface-sat), 4.7%);
  --sl--color-surface-100--D: hsl(var(--sl--color-surface-hue), var(--sl--color-surface-sat), 8.6%);
  --sl--color-surface-200--D: hsl(var(--sl--color-surface-hue), var(--sl--color-surface-sat), 16.7%);
  --sl--color-surface-300--D: hsl(var(--sl--color-surface-hue), var(--sl--color-surface-sat), 30.2%);
  --sl--color-surface-400--D: hsl(var(--sl--color-surface-hue), var(--sl--color-surface-sat), 39.2%);
  --sl--color-surface-500--D: hsl(var(--sl--color-surface-hue), var(--sl--color-surface-sat), 46.1%);
  --sl--color-surface-600--D: hsl(var(--sl--color-surface-hue), var(--sl--color-surface-sat), 63.1%);
  --sl--color-surface-700--D: hsl(var(--sl--color-surface-hue), var(--sl--color-surface-sat), 82.4%);
  --sl--color-surface-800--D: hsl(var(--sl--color-surface-hue), var(--sl--color-surface-sat), 87.8%);
  --sl--color-surface-900--D: hsl(var(--sl--color-surface-hue), var(--sl--color-surface-sat), 93.3%);
  --sl--color-surface-950--D: hsl(var(--sl--color-surface-hue), var(--sl--color-surface-sat), 97.6%);

  --sl--color-surface-50--L: hsl(var(--sl--color-surface-hue), var(--sl--color-surface-sat), 97.6%);
  --sl--color-surface-100--L: hsl(var(--sl--color-surface-hue), var(--sl--color-surface-sat), 93.3%);
  --sl--color-surface-200--L: hsl(var(--sl--color-surface-hue), var(--sl--color-surface-sat), 87.8%);
  --sl--color-surface-300--L: hsl(var(--sl--color-surface-hue), var(--sl--color-surface-sat), 82.4%);
  --sl--color-surface-400--L: hsl(var(--sl--color-surface-hue), var(--sl--color-surface-sat), 63.1%);
  --sl--color-surface-500--L: hsl(var(--sl--color-surface-hue), var(--sl--color-surface-sat), 46.1%);
  --sl--color-surface-600--L: hsl(var(--sl--color-surface-hue), var(--sl--color-surface-sat), 39.2%);
  --sl--color-surface-700--L: hsl(var(--sl--color-surface-hue), var(--sl--color-surface-sat), 30.2%);
  --sl--color-surface-800--L: hsl(var(--sl--color-surface-hue), var(--sl--color-surface-sat), 16.7%);
  --sl--color-surface-900--L: hsl(var(--sl--color-surface-hue), var(--sl--color-surface-sat), 8.6%);
  --sl--color-surface-950--L: hsl(var(--sl--color-surface-hue), var(--sl--color-surface-sat), 4.7%);

}`,
		'2': `:root {
  --st--color-primary-50: var(--tw--color-indigo-50); 
  --st--color-primary-100: var(--tw--color-indigo-100); 
  --st--color-primary-200: var(--tw--color-indigo-200); 
  --st--color-primary-300: var(--tw--color-indigo-300); 
  --st--color-primary-400: var(--tw--color-indigo-400); 
  --st--color-primary-500: var(--tw--color-indigo-500); 
  --st--color-primary-600: var(--tw--color-indigo-600); 
  --st--color-primary-700: var(--tw--color-indigo-700); 
  --st--color-primary-800: var(--tw--color-indigo-800); 
  --st--color-primary-900: var(--tw--color-indigo-900); 
  --st--color-primary-950: var(--tw--color-indigo-950); 

  --st--color-secondary-50: var(--tw--color-yellow-50); 
  --st--color-secondary-100: var(--tw--color-yellow-100); 
  --st--color-secondary-200: var(--tw--color-yellow-200); 
  --st--color-secondary-300: var(--tw--color-yellow-300); 
  --st--color-secondary-400: var(--tw--color-yellow-400); 
  --st--color-secondary-500: var(--tw--color-yellow-500); 
  --st--color-secondary-600: var(--tw--color-yellow-600); 
  --st--color-secondary-700: var(--tw--color-yellow-700); 
  --st--color-secondary-800: var(--tw--color-yellow-800); 
  --st--color-secondary-900: var(--tw--color-yellow-900); 
  --st--color-secondary-950: var(--tw--color-yellow-950); 
}`
	};

	let presetSlug: PresetSlug = presetsSlugs[0];
	$: editorValue = presetsStartingText[presetSlug];
</script>

<svelte:head>
	<title>CSS Color Palette Editor</title>
	<meta
		name="description"
		content="Online tool to create a CSS color palette using VS Code editor keybindings"
	/>
</svelte:head>

<h1>CSS Color Palette Editor</h1>

<div class="layout">
	<div class="editor-toolbar">
		<div class="editor-preset-selector">
			<label for="editor-preset">Preset</label>
			<select id="editor-preset" bind:value={presetSlug}>
				{#each presetsSlugs as slug}
					<option value={slug}>{slug}</option>
				{/each}
			</select>
		</div>
	</div>
	<div class="editor-wrapper dest">
		<!-- event.detail is the monaco instance. All options are reactive! -->
		<Monaco
			options={{
				language: 'css',
				automaticLayout: true
				// readOnly: true
			}}
			theme="vs-dark"
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
