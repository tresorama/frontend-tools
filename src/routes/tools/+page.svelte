<script lang="ts">
	const tools: { slug: string }[] = [
		{ slug: 'json-to-css-custom-properties' },
		{ slug: 'tailwind-color-scale-generator' }
	];
</script>

<svelte:head>
	<title>Tools</title>
	<meta name="description" content="All Tools" />
</svelte:head>

<div class="text-column">
	<h1>All Tools</h1>
	<ul>
		{#each tools as tool}
			<li>
				<article>
					<a href={`/tools/${tool.slug}`}>{tool.slug}</a>
				</article>
			</li>
		{/each}
	</ul>
</div>
