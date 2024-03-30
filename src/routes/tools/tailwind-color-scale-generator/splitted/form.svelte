<script lang="ts">
	import { onMount } from 'svelte';
	import { store_colorScale } from './store-color-scale';

	// ref DOM
	let refForm: HTMLFormElement;

	const handleFormChange = () => {
		const formData = new FormData(refForm);

		const colorName = (formData.get('colorName') ?? '') as string;
		const inputColor = (formData.get('inputColor') ?? '') as string;
		const inputAt500 = formData.get('inputAt500') === 'on';
		const createDefault = formData.get('createDefault') === 'on';

		store_colorScale.setInputs({
			colorName,
			inputAt500,
			inputColor,
			createDefault
		});
	};

	onMount(handleFormChange);
</script>

<form bind:this={refForm} on:submit|preventDefault on:input={handleFormChange}>
	<div>
		<label for="colorName">Color Name</label>
		<input name="colorName" id="colorName" type="text" value="primary" />
	</div>
	<div>
		<input name="inputColor" id="inputColor" type="color" />
		<label for="inputColor">Input Color</label>
	</div>
	<div>
		<input name="inputAt500" id="inputAt500" type="checkbox" />
		<label for="inputAt500">Place Input color at 500</label>
		<span>If enabled your color must be ideal for being at the center of the scale.</span>
	</div>
	<div>
		<input name="createDefault" id="createDefault" type="checkbox" />
		<label for="createDefault">Create DEFAULT grade</label>
		<span>Alias "bg-colorName-500" via "bg-colorName"</span>
	</div>
</form>

<style lang="scss">
	form {
		padding: 2rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		background-color: var(--neutral-50);
		border-radius: var(--border-radius);

		> div:has(input) {
			display: grid;
			align-items: center;
			gap: 5px;
		}

		> div:has(input[type='checkbox'], input[type='color']) {
			display: grid;
			gap: 5px;
			grid-template-columns: auto 1fr;
			> span {
				grid-column: 1/-1;
			}
		}

		label {
			font-weight: 700;
			font-size: 0.8rem;
			line-height: 1;
			opacity: 0.8;
		}

		span {
			font-size: 0.7rem;
			font-style: italic;
			opacity: 0.5;
		}

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
</style>
