<script lang="ts">
	const links: { url: string; label: string }[] = [
		{ url: 'https://jacopomarrone.com', label: 'Personal Website' },
		{ url: 'https://github.com/tresorama', label: 'Github' },
		{ url: 'https://codepen.io/tresorama', label: 'Codepen' },
		{ url: 'mailto:jacopo.marrone27@gmail.com', label: 'Email' }
	];
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About me" />
</svelte:head>

<div class="text-column">
	<h1>About</h1>

	<p>
		Created by <a href="https://github.com/tresorama">Jacopo Marrone</a>.
	</p>

	<ul>
		{#each links as link}
			<li>
				<a href={link.url}>{link.label}</a>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	ul {
		list-style-type: circle;
		li {
			margin-bottom: 0.5em;
		}
	}
</style>
