<script lang="ts">
	import Monaco from 'svelte-monaco';
	import generateCSSVariables from 'css-vars-from-json';

	let sourceValue = `{
    "blue": {
        "50": "red",
        "100": "blue"
    }
  }`;
	$: destValue = convert(sourceValue);

	function convert(sourceValue: string) {
		try {
			const input = JSON.parse(JSON.stringify(sourceValue));
			const out = generateCSSVariables(input);
			return `::root {\n${out.replaceAll(';', ';\n')} \n}`;
		} catch (error) {
			return 'error';
		}
	}
</script>

<h1>json-to-css-custom-properties</h1>

<div class="layout">
	<div class="editor-wrapper source">
		<!-- event.detail is the monaco instance. All options are reactive! -->
		<Monaco
			options={{
				language: 'json',
				automaticLayout: true
			}}
			theme="vs-dark"
			on:ready={(event) => console.log(event.detail)}
			bind:value={sourceValue}
		/>
	</div>

	<div class="editor-wrapper dest">
		<!-- event.detail is the monaco instance. All options are reactive! -->
		<Monaco
			options={{
				language: 'css',
				automaticLayout: true,
				readOnly: true
			}}
			theme="vs-dark"
			on:ready={(event) => console.log(event.detail)}
			bind:value={destValue}
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
			grid-template-columns: repeat(2, minmax(0, 1fr));
			grid-auto-rows: 70vh;
		}
	}
</style>
