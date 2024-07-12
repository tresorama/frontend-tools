<script>
	import { onMount } from 'svelte';

	let counter = 0;
	function increment() {
		counter++;
	}
	function decrement() {
		counter--;
	}
	function resetCounter() {
		counter = 0;
	}
	onMount(resetCounter);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<p>Counter: {counter}</p>
	<button type="button" on:click={increment}>increment</button>
	<button type="button" on:click={decrement}>decrement</button>
	<button type="button" on:click={resetCounter}>resetCounter</button>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
