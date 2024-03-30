<script lang="ts">
	import { onMount } from 'svelte';
	import Monaco from 'svelte-monaco';
	import { generateColorScale } from './utils/generate-color-scale';

	// ref DOM
	let refForm: HTMLFormElement;

	// state
	let formValues: null | {
		colorName: string;
		inputColor: string;
		inputAt500: boolean;
		createDefault: boolean;
	} = null;

	// derived state
	$: generatedScale = formValues
		? generateColorScale(formValues.inputColor, {
				createDefault: formValues.createDefault,
				inputAt500: formValues.inputAt500
			})
		: null;

	$: editorText =
		formValues && generatedScale
			? JSON.stringify({ [formValues.colorName]: generatedScale }, null, 2)
			: null;

	// listeners
	const handleFormChange = () => {
		const formData = new FormData(refForm);

		const colorName = (formData.get('colorName') ?? '') as string;
		const inputColor = (formData.get('inputColor') ?? '') as string;
		const inputAt500 = formData.get('inputAt500') === 'on';
		const createDefault = formData.get('createDefault') === 'on';

		formValues = {
			colorName,
			inputColor,
			inputAt500,
			createDefault
		};
	};

	// on load
	onMount(handleFormChange);
</script>

<svelte:head>
	<title>Tailwind Color Scale Generator</title>
	<meta
		name="description"
		content="Online tool to generate a Tailwind Color Scale from a base color. Ready to Copy Paste."
	/>
</svelte:head>
<h1>Tailwind Color Scale Generator</h1>

<main class="layout">
	<section class="left-side">
		<!-- Form -->
		<form bind:this={refForm} on:submit|preventDefault on:input={handleFormChange}>
			<div>
				<label for="colorName">Color Name</label>
				<input name="colorName" id="colorName" type="text" value="primary" />
			</div>
			<div>
				<label for="inputColor">Input Color</label>
				<input name="inputColor" id="inputColor" type="color" value="#ff3e00" />
			</div>
			<div>
				<input name="inputAt500" id="inputAt500" type="checkbox" />
				<label for="inputAt500">Place Input color at 500</label>
				<span>
					If <strong>enabled</strong> your color must be ideal for being at the center of the scale.
					Othrwise you get a un-even distributed scale. If <strong>disabled</strong> input color will
					be placed automatically based on lightness, this produce always a balanced scale.
				</span>
			</div>
			<div>
				<input name="createDefault" id="createDefault" type="checkbox" />
				<label for="createDefault">Create DEFAULT grade</label>
				<span>Alias "bg-colorName-500" via "bg-colorName"</span>
			</div>
		</form>

		<!-- Debug -->
		<pre class="debug">{JSON.stringify({ formValues, generatedScale }, null, 2)}</pre>
	</section>

	<section class="right-side">
		<!-- Color Swatches -->
		{#if generatedScale}
			<div class="color-swatches">
				{#each Object.entries(generatedScale) as [key, value]}
					<div class="color-swatch" style:--color={value}>
						<span class="color-swatch__label">{key}</span>
						<span class="color-swatch__box"></span>
					</div>
				{/each}
			</div>
		{/if}

		<!-- Code Editor Output -->
		{#if editorText}
			<div class="editor-wrapper">
				<Monaco
					options={{
						language: 'json',
						automaticLayout: true,
						readOnly: true
					}}
					theme="vs-dark"
					value={editorText}
				/>
			</div>
		{/if}
	</section>
</main>

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
		color: var(--neutral-900);

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

	form {
		padding: 2rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		background-color: var(--neutral-50);
		border-radius: var(--border-radius);

		// Field wrapper
		> div:has(input) {
			display: grid;
			align-items: center;
			gap: 5px;
		}

		// Field wrapper when checkbox or color
		> div:has(input[type='checkbox']) {
			display: grid;
			gap: 5px;
			grid-template-columns: auto 1fr;
			> span {
				grid-column: 1/-1;
			}
		}

		// Field label
		label {
			font-weight: 900;
			font-size: 0.7rem;
			line-height: 1.35;
			color: var(--neutral-800);
		}

		// Field helper text
		span {
			font-size: 0.7rem;
			font-style: italic;
			color: var(--neutral-400);
		}

		// Field input
		input[type='text'] {
			display: block;
			padding: 0.5em;
			border: none;
			background-color: var(--neutral-200);
			border-radius: var(--border-radius);
			border: 1px solid var(--neutral-500);
		}
		input[type='checkbox'] {
			transform: scale(1.8);
		}
	}

	.color-swatches {
		display: grid;
		grid-template-columns: repeat(6, minmax(0, 1fr));
		gap: 10px;

		.color-swatch {
			/* Public Prop */
			--color: transparent;

			&__label {
				display: block;
				font-size: 0.7rem;
				font-weight: 700;
				color: var(--neutral-600);
				line-height: 1.75;
			}
			&__box {
				display: block;
				height: 40px;
				background-color: var(--color);
				border-radius: var(--border-radius);
			}
		}
	}

	.debug {
		margin: 0;
		color: var(--neutral-400);
		background-color: var(--neutral-50);
	}

	.editor-wrapper {
		height: 100%;
		min-height: 30rem;
		border-radius: var(--border-radius);
		overflow: hidden;
	}
</style>
