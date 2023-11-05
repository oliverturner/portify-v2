<script lang="ts">
	import type { ChangeFn } from "@melt-ui/svelte/internal/helpers";

	import { createPagination, melt } from "@melt-ui/svelte";

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

<nav use:melt={$root}>
	<p>Showing items {$range.start} - {$range.end}</p>
	<div>
		<button use:melt={$prevButton}>Prev</button>
		{#each $pages as page (page.key)}
			{#if page.type === "ellipsis"}
				<span>...</span>
			{:else}
				<button use:melt={$pageTrigger(page)}>{page.value}</button>
			{/if}
		{/each}
		<button use:melt={$nextButton}>Next</button>
	</div>
</nav>
