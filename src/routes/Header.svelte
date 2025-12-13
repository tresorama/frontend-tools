<script lang="ts">
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
	import HeaderAuth from './header-auth.svelte';
	import { dev } from '$app/environment';

	let menuIsOpen = false;

	$: navItems = [
		{ url: '/', label: 'Home', isCurrent: $page.url.pathname === '/' },
		{ url: '/about', label: 'about', isCurrent: $page.url.pathname.startsWith('/about') },
		{ url: '/tools', label: 'tools', isCurrent: $page.url.pathname.startsWith('/tools') },
		{ url: '/account', label: 'account', isCurrent: $page.url.pathname.startsWith('/account') },
		...(!dev
			? []
			: [{ url: '/test', label: 'test', isCurrent: $page.url.pathname.startsWith('/test') }])
	];
</script>

<header class="header">
	<div class="header__inner container">
		<div class="corner">
			<a href="https://kit.svelte.dev">
				<img src={logo} alt="SvelteKit" />
			</a>
		</div>

		<nav>
			<svg viewBox="0 0 2 3" aria-hidden="true">
				<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
			</svg>
			<ul>
				{#each navItems as item, i}
					<li aria-current={item.isCurrent}>
						<a href={item.url}>{item.label}</a>
					</li>
				{/each}
			</ul>
			<svg viewBox="0 0 2 3" aria-hidden="true">
				<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
			</svg>
		</nav>

		<div class="corner auth">
			<HeaderAuth />
		</div>
	</div>
</header>

<style lang="scss">
	.header {
		--ctx--bg-color: var(--foreground);
		--ctx--text-color: var(--background);
		--ctx--text-hover-color: var(--secondary);
		--ctx--accent-color: var(--secondary);

		position: relative;
		padding: 0 var(--section-px);

		&__inner {
			display: flex;
			justify-content: space-between;
		}
	}

	.corner {
		height: 3.5em;
		display: flex;
		align-items: center;

		a {
			display: flex;
			align-items: center;
			width: 100%;
			height: 100%;
		}
		img {
			width: 2em;
			height: 2em;
			object-fit: contain;
		}
	}

	nav {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		justify-content: center;
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--ctx--bg-color);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--ctx--bg-color);
		color: var(--ctx--text-color);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='true']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--ctx--accent-color);
	}

	nav a {
		color: var(--ctx--text-color);
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--ctx--text-hover-color);
	}
</style>
