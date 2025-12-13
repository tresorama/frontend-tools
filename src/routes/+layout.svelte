<script>
	import { Toaster } from 'svelte-sonner';
	import Header from './Header.svelte';
	import '../css/styles.css';
</script>

<div class="app">
	<Header />

	<main>
		<div class="container">
			<slot />
		</div>
	</main>

	<footer>
		<div class="container">
			<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
		</div>
	</footer>
</div>
<Toaster expand={true} />

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		padding: 0 var(--section-px);
		& > .container {
			display: flex;
			flex-direction: column;
		}
	}

	footer {
		& > .container {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
		& a {
			font-weight: bold;
		}
	}
</style>
