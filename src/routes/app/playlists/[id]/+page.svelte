<script lang="ts">
	import type { PageData } from "./$types";

	import Track from "$lib/components/track.svelte";
	import GroupedTrack from "$lib/components/track-grouped.svelte";
	import { isTrack } from "$lib/utils/data";
	import Cover from "$lib/components/cover.svelte";

	export let data: PageData;
</script>

{#if data.playlist}
	<Cover type="playlist" imgUrl={data.playlist.images[0]?.url} title={data.playlist.name}></Cover>

	<div class="content">
		<ol class="content__items" class:content__items--grouped={data.isGrouped}>
			{#each data.playlist.tracks?.items ?? [] as item, index (item.track.id)}
				{#if isTrack(item.track)}
					<li class="content__item">
						{#if data.isGrouped}
							<GroupedTrack {index} track={item.track} />
						{:else}
							<Track track={item.track} />
						{/if}
					</li>
				{/if}
			{/each}
		</ol>
	</div>
{/if}
