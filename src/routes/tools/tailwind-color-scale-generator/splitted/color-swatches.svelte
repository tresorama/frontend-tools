<script lang="ts">
	import { store_colorScale } from './store-color-scale';
</script>

{#if $store_colorScale}
	<section class="color-swatches">
		{#each Object.entries($store_colorScale.generatedScale) as [key, value]}
			<div class="color-swatch" style:--color={value}>
				<span class="color-swatch__label">{key}</span>
				<span class="color-swatch__box"></span>
			</div>
		{/each}
	</section>
{/if}

<style lang="scss">
	.color-swatches {
		display: grid;
		grid-template-columns: repeat(6, minmax(0, 1fr));
		gap: 10px;

		.color-swatch {
			/* Public Prop*/
			--color: transparent;

			&__label {
				display: block;
				font-size: 0.7rem;
				font-weight: 700;
				opacity: 0.5;
			}
			&__box {
				display: block;
				height: 40px;
				background-color: var(--color);
				border-radius: var(--border-radius);
			}
		}
	}
</style>
