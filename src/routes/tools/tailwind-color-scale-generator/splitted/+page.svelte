<script lang="ts">
	import Form from './form.svelte';
	import Debug from './debug.svelte';
	import ColorSwatches from './color-swatches.svelte';
	import CodeEditorOutput from './code-editor-output.svelte';
	import { store_colorScale } from './store-color-scale';
</script>

<h1>tailwind-color-scale-generator</h1>

<div class="layout">
	<section class="left-side">
		<Form />
		<Debug />
	</section>

	{#if $store_colorScale}
		<section class="right-side">
			<ColorSwatches />
			<CodeEditorOutput />
		</section>
	{/if}
</div>

<style lang="scss">
	:root {
		--border-radius: 5px;
		--neutral-50: #fafafa;
		--neutral-100: #f2f2f2;
		--neutral-200: #e6e6e6;
		--neutral-300: #d1d1d1;
		--neutral-400: #949494;
		--neutral-500: #757575;
		--neutral-600: #545454;
		--neutral-700: #3d3d3d;
		--neutral-800: #242424;
		--neutral-900: #121212;
		--neutral-950: #0a0a0a;
	}
	.layout {
		width: 100%;
		max-width: 1300px;
		margin-left: auto;
		margin-right: auto;
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 1rem;
		@media (min-width: 55rem) {
			grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
		}
		.left-side,
		.right-side {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}
	}
</style>
