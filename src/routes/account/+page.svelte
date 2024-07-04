<script lang="ts">
	import { page } from '$app/stores';
</script>
<main>
	<h1>Account</h1>
	{#if !$page.data.session}
		<p>Please login</p>
	{:else}
		<h2>Profile</h2>
		<div class="user-details">
			<span>Name</span>
			<span>{$page.data.session.user?.name}</span>
			<span>Email</span>
			<span>{$page.data.session.user?.email}</span>
		</div>
	{/if}
</main>

<style lang="scss">
	h2 {
		margin: 4rem 0 1rem;
		&:first-of-type {
			margin-top: 0;
		}
	}

	.user-details {
		display: grid;
		grid-template-columns: minmax(5rem, auto) auto;
		justify-content: start;
	}
</style>
