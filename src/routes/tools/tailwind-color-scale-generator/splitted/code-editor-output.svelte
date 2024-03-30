<script lang="ts">
	import Monaco from 'svelte-monaco';
	import { store_colorScale } from './store-color-scale';

	// derived state
	let editorText = '';
	$: if ($store_colorScale) {
		const { colorName, generatedScale } = $store_colorScale;
		editorText = JSON.stringify({ [colorName]: generatedScale }, null, 2);
	}
</script>

<Monaco
	options={{
		language: 'json',
		automaticLayout: true,
		readOnly: true
	}}
	theme="vs-dark"
	value={editorText}
/>
