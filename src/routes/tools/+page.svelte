<script>
	const tools = [{ slug: 'json-to-css-custom-properties' }];
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
				<a href={`/${tool.slug}`}>{tool.slug}</a>
			</li>
		{/each}
	</ul>
</div>
