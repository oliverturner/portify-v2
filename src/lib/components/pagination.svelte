<script lang="ts">
	import type { ChangeFn } from "@melt-ui/svelte/internal/helpers";

	import { createPagination, melt } from "@melt-ui/svelte";
	import Icon from "./icon.svelte";

	export let count: number;
	export let perPage: number;
	export let onPageChange: ChangeFn<number>;

	$: p = createPagination({ count, perPage, onPageChange });
	$: range = p.states.range;
	$: pages = p.states.pages;
	$: root = p.elements.root;
	$: pageTrigger = p.elements.pageTrigger;
	$: prevButton = p.elements.prevButton;
	$: nextButton = p.elements.nextButton;
</script>

<nav class="pagination title" use:melt={$root}>
	<div class="pagination__controls">
		<button class="arrow" use:melt={$prevButton}>
			<Icon id="icon-arrow-left" size="auto" />
		</button>

		{#each $pages as page (page.key)}
			{#if page.type === "ellipsis"}
				<span>...</span>
			{:else}
				<button use:melt={$pageTrigger(page)}>{page.value}</button>
			{/if}
		{/each}

		<button class="arrow" use:melt={$nextButton}>
			<Icon id="icon-arrow-right" size="auto" />
		</button>
	</div>

	<p class="pagination__status">
		Showing: {$range.start} - {$range.end}
		<span class="sub">of</span>
		{count}
	</p>
</nav>

<style lang="postcss">
	.pagination {
		display: flex;
		align-items: center;
		justify-content: center;

		position: sticky;
		top: 0;
		padding: 0.5rem 1rem;
		background: var(--bg, #111d30);
		z-index: 2;

		@media (min-width: 768px) {
			justify-content: space-between;
		}
	}

	.pagination__controls {
		display: flex;
		align-items: center;
		gap: 0.25rem;

		& button {
			--wh: 2rem;

			width: var(--wh);
			height: var(--wh);
			padding: 0;
			border-radius: var(--wh);
			border-width: 1px;
			box-shadow: none;
			font-family: inherit;
			font-size: 0.9rem;
			font-weight: 200;
			text-align: center;
			text-transform: uppercase;
			letter-spacing: 0.125em;

			&:hover,
			&:focus {
				border-color: currentColor;
				outline: none;
			}
		}

		& [data-selected] {
			border-color: currentColor;
		}
	}

	.pagination__status {
		display: none;

		@media (min-width: 768px) {
			display: block;
		}
	}
</style>
