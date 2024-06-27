<script lang="ts">
	import Monaco from 'svelte-monaco';

	let editorValue = `:root {
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

}`;
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
		grid-auto-rows: 33vh;
		gap: 2rem;
		@media (min-width: 55rem) {
			grid-auto-rows: 75vh;
		}
	}
</style>
