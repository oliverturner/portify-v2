<script lang="ts">
	import type { PageData } from "./$types";

	import Track from "$lib/components/track.svelte";
	import { isTrack } from "$lib/utils/data";

	export let data: PageData;
</script>

<ul class="grid">
	{#each data.tracks?.items ?? [] as item}
		{#if isTrack(item.track)}
			<li><Track track={item.track} isGrouped={data.isGrouped} /></li>
		{/if}
	{/each}
</ul>

<style>
	.grid {
		grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
		grid-gap: 1rem;
	}
</style>
