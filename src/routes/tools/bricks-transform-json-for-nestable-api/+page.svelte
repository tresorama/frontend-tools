<script lang="ts">
	import Monaco from 'svelte-monaco';
	import { copyToClipboard } from './utils/copy-to-clipboard';
	import { transformBricksCode } from './utils/transform-bricks-code';
	import { toast } from 'svelte-sonner';

	// seo
	const seo = {
		title: 'Bricks - Transofrm JSON for Nestable API',
		description:
			'Convert json from Builder > Structure Panel > Element > Right Click > Copy to json ready for Nestable API of custom elements'
	};

	// state
	let inputCode = `{"content":[{"id":"ycnnxo","name":"section","parent":0,"children":["csxcsb"],"settings":{"_padding":{"top":"var(--bce--spacing-xl)","bottom":"var(--bce--spacing-xl)"},"_rowGap":"var(--spacing-md)"}},{"id":"csxcsb","name":"container","parent":"ycnnxo","children":["uzvexd","gfrvbf"],"settings":{"_display":"grid","_gridTemplateColumns":"minmax(0,5fr) minmax(0,7fr)","_gridGap":"var(--bce--spacing-lg)"}},{"id":"uzvexd","name":"block","parent":"csxcsb","children":["cnqbxr","rxlwfa"],"settings":{"_display":"flex","_direction":"column","_justifyContent":"center","_alignItems":"flex-start","_rowGap":"var(--bce--spacing-md)"}},{"id":"cnqbxr","name":"text","parent":"uzvexd","children":[],"settings":{"text":"<h2>Heading</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at dictum metus, sit amet aliquam odio. Sed ut massa nisi.</p>","_cssGlobalClasses":["azwebp"]}},{"id":"rxlwfa","name":"block","parent":"uzvexd","children":["mitmds","lxrtod"],"settings":{"_display":"flex","_direction":"row","_flexWrap":"wrap","_rowGap":"var(--bce--spacing-sm)","_columnGap":"var(--bce--spacing-sm)"}},{"id":"mitmds","name":"button","parent":"rxlwfa","children":[],"settings":{"text":"I am a button","style":"primary"}},{"id":"lxrtod","name":"button","parent":"rxlwfa","children":[],"settings":{"text":"I am a button","style":"primary","outline":true}},{"id":"gfrvbf","name":"block","parent":"csxcsb","children":["ptmpzl"],"settings":[]},{"id":"ptmpzl","name":"image","parent":"gfrvbf","children":[],"settings":{"image":{"id":3513,"filename":"dummy-placeholder-2000x2000-1.jpeg","size":"large","full":"http://test-playground.local/wp-content/uploads/2024/07/dummy-placeholder-2000x2000-1.jpeg","url":"http://test-playground.local/wp-content/uploads/2024/07/dummy-placeholder-2000x2000-1-1024x1024.jpeg"}}}],"source":"bricksCopiedElements","sourceUrl":"https://test-playground.local","version":"1.9.9","globalClasses":[{"id":"azwebp","name":"bce--prose","settings":{"_cssCustom":".bafc--prose :where(p, ul, ol) {\\n    margin-top: 1rem;\\n    margin-bottom: 1rem;\\n}\\n\\n.bafc--prose :where(blockquote, pre) {\\n    margin-top: 1.5rem;\\n    margin-bottom: 1.5rem;\\n}\\n\\n.bafc--prose :where(figure) {\\n    margin-top: 2em;\\n    margin-bottom: 2em;\\n}\\n\\n.bafc--prose :where(figure figcaption) {\\n    margin-top: 1.3em;\\n}\\n\\n.bafc--prose *:first-child,\\n.bafc--prose :where(:where(h2, h3, h4, h5, h6) + *) {\\n    margin-top: 0;\\n}\\n\\n.bafc--prose :where(h1, h2, h3, h4, h5, h6) {\\n    margin-top: 3.5rem;\\n    margin-bottom: 1.25rem;\\n}\\n\\n.bafc--prose :where(li) {\\n    margin-top: .5rem;\\n    margin-bottom: .5rem;\\n}"},"modified":1721686815,"user_id":1,"category":"mdguvj"}],"globalElements":[]}`;
	$: outpuCode = convert(inputCode);

	let status: 'error' | 'success';
	$: status = outpuCode.startsWith('Invalid input code') ? 'error' : 'success';

	function convert(sourceValue: string) {
		try {
			const input = JSON.parse(sourceValue);
			const out = transformBricksCode(input);
			return JSON.stringify(out, null, 2);
		} catch (error) {
			return 'Invalid input code \\n' + (error instanceof Error ? error.message : '');
		}
	}

	// events
	async function handleCopyToClipBoard() {
		if (status === 'error') {
			toast.error('Cannot copy until result is valid');
			return;
		}
		try {
			await copyToClipboard(outpuCode);
			toast.success('Copied to clipboard!');
		} catch (error) {
			toast.error('Could not copy to clipboard because of an error');
			toast.error(error instanceof Error ? error.message : 'Unknown error');
		}
	}
</script>

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
</svelte:head>

<h1>{seo.title}</h1>
<p>{seo.description}</p>

<div class="layout">
	<div class="debug">
		<pre>{JSON.stringify({ inputCode, outpuCode, status }, null, 2)}</pre>
	</div>

	<section>
		<h2>Input</h2>
		<p>Paste here Bricks code</p>
		<div class="editor-wrapper input-code">
			<Monaco
				options={{
					language: 'plain',
					automaticLayout: true
				}}
				theme="vs-dark"
				bind:value={inputCode}
				on:ready={(event) => {
					// event.detail is the monaco instance. All options are reactive!
					console.log('ready', event.detail);
				}}
			/>
		</div>
	</section>
	<section>
		<h2>Output</h2>
		<button type="button" on:click={handleCopyToClipBoard}>Copy to Clipboard</button>
		<p>
			You need to convert this to PHP array before using in Nestable API. Here is a
			<a href="https://jsontophp.com/" target="_blank">converter</a>
			for you.
		</p>
		<div class="editor-wrapper">
			<Monaco
				options={{
					language: 'json',
					automaticLayout: true
				}}
				theme="vs-dark"
				bind:value={outpuCode}
				on:ready={(event) => {
					// event.detail is the monaco instance. All options are reactive!
					console.log('ready', event.detail);
				}}
			/>
		</div>
	</section>
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
		&.input-code {
			height: 12vh;
		}
		@media (min-width: 55rem) {
			height: 35vh;
			&.input-code {
				height: 25vh;
			}
		}
	}
</style>
