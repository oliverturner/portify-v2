<script lang="ts">
	import type { PageData } from "./$types";

	import Track from "$lib/components/track.svelte";
	import GroupedTrack from "$lib/components/track-grouped.svelte";
	import { isTrack } from "$lib/utils/data";
	import Cover from "$lib/components/cover.svelte";

	export let data: PageData;

	$: playlist = data.playlist;
	$: tracks = playlist?.tracks?.items ?? [];
	$: description = playlist?.description;
	$: imgUrl = playlist?.images[0]?.url;
	$: title = playlist?.name;
</script>

{#if data.playlist}
	<Cover type="playlist" {imgUrl} {title}>
		<svelte:fragment slot="description">
			{#if description}
				<div>{@html description}</div>
			{/if}

			<dl class="datatable">
				<dt aria-label="Count">Track count:</dt>
				<dd>{data.playlist.tracks.total}</dd>
			</dl>
		</svelte:fragment>
	</Cover>

	<div class="content">
		<ol class="content__items" class:content__items--grouped={data.isGrouped}>
			{#each tracks as { track }, index (track.id)}
				{#if isTrack(track)}
					<li class="content__item">
						{#if data.isGrouped}
							<GroupedTrack index={index + 1} {track} />
						{:else}
							<Track {track} />
						{/if}
					</li>
				{/if}
			{/each}
		</ol>
	</div>
{/if}
