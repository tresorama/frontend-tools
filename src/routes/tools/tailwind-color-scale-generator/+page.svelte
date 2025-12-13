<script lang="ts">
	import { onMount } from 'svelte';
	import Monaco from 'svelte-monaco';
	import { generateColorScale } from './utils/generate-color-scale';
	import { convertJsToCssVariables } from './utils/convert-js-to-css-variables';

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

	$: editorTextJs =
		formValues && generatedScale
			? JSON.stringify({ [formValues.colorName]: generatedScale }, null, 2)
			: null;

	$: editorTextCss = formValues && editorTextJs ? convertJsToCssVariables(editorTextJs) : null;

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

<main class="layout container-sm">
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
		<div class="editors">
			{#if editorTextJs}
				<div class="editor-wrapper">
					<Monaco
						options={{
							language: 'json',
							automaticLayout: true,
							readOnly: true,
							minimap: { enabled: false }
						}}
						theme="vs-dark"
						value={editorTextJs}
					/>
				</div>
			{/if}
			{#if editorTextCss}
				<div class="editor-wrapper">
					<Monaco
						options={{
							language: 'css',
							automaticLayout: true,
							readOnly: true,
							minimap: { enabled: false }
						}}
						theme="vs-dark"
						value={editorTextCss}
					/>
				</div>
			{/if}
		</div>
	</section>
</main>

<style lang="scss">
	.layout {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 1rem;
		color: var(--muted-foreground);

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
		background-color: var(--background);
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

		// Field helper text
		span {
			font-size: var(--text-sm);
			font-style: italic;
			color: var(--muted-foreground);
		}
	}

	.color-swatches {
		display: grid;
		grid-template-columns: repeat(6, minmax(0, 1fr));
		gap: 10px;

		.color-swatch {
			/* Public Prop */
			--color: transparent;
			position: relative;

			&__label {
				position: absolute;
				top: 0;
				left: 0;
				display: block;
				padding: 0.4em 0.6em;
				background: color-mix(in srgb, transparent, var(--background) 95%);
				color: var(--muted-foreground);
				font-size: var(--text-xs);
				line-height: var(--leading-none);
			}
			&__box {
				display: block;
				height: 40px;
				background-color: var(--color);
			}
		}
	}

	.debug {
		margin: 0;
		color: var(--neutral-400);
		background-color: var(--background);
	}

	.editors {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 1rem;

		.editor-wrapper {
			flex: 1;
			height: auto;
			min-height: 20rem;
		}
	}
</style>
