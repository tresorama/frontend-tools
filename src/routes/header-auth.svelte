<script lang="ts">
	import { page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';
</script>

<div class="header-auth">
	{#if $page.data.session}
		<div class="avatar">
			<a href="/account">View Account</a>
			<span class="avatar__name">
				{$page.data.session.user?.name}
				<br />{$page.data.session.user?.email}
			</span>
			<img src={$page.data.session.user?.image} alt="" class="avatar__img" />
		</div>
	{/if}

	{#if $page.data.session}
		<button on:click={signOut}>Sign Out</button>
	{:else}
		<button on:click={signIn}>Sign In</button>
	{/if}
	<pre class="debug-panel">{JSON.stringify($page.data.session, null, 2)}</pre>
</div>

<style lang="scss">
	.header-auth {
		position: relative;
		display: flex;
		gap: 0.4rem;
		padding: 0.4rem 0;
		align-items: center;
	}

	.avatar {
		display: flex;
		gap: 0.4rem;
		position: relative;

		a {
			position: absolute;
			inset: 0;
			z-index: 10;
			opacity: 0;
		}

		&__name {
			position: absolute;
			top: 0;
			right: calc(100% + 10px);
			font-size: 0.6rem;
			@media (max-width: 900px) {
				display: none;
			}
		}

		&__img {
			width: 2rem;
			height: 2rem;
			border-radius: 20px;
		}
	}

	button {
		font-size: 0.8rem;
	}

	.debug-panel {
		display: none;
		position: absolute;
		top: 100%;
		right: 0;
		background-color: white;
		font-size: 0.8rem;
	}
</style>
