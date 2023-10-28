<script lang="ts">
	import type { PageData } from "./$types";

	import Topper from "$lib/components/topper.svelte";
	import Track from "$lib/components/track.svelte";
	import GroupedTrack from "$lib/components/track-grouped.svelte";
	import { isTrack } from "$lib/utils/data";

	export let data: PageData;

	$: playlist = data.playlist;
	$: metadata = data.metadata ?? {};

	$: tracks = playlist?.tracks?.items ?? [];
	$: description = playlist?.description;
	$: imgUrl = playlist?.images[0]?.url;
	$: title = playlist?.name;

	$: console.log({ playlist: { data } });
</script>

{#if data.playlist}
	<Topper type="playlist" {imgUrl} {title}>
		<svelte:fragment slot="description">
			{#if description}
				<div>{@html description}</div>
			{/if}

			<dl class="datatable">
				<dt aria-label="Count">Track count:</dt>
				<dd>{data.playlist.tracks.total}</dd>
			</dl>
		</svelte:fragment>
	</Topper>

	<div class="content">
		<ol class="content__items" class:content__items--grouped={data.isGrouped}>
			{#each tracks as { track }, index (track.id)}
				{#if isTrack(track)}
					<li class="content__item">
						{#if data.isGrouped}
							<GroupedTrack index={index + 1} {track} />
						{:else}
							<Track {track} metadata={metadata[track.id]} />
						{/if}
					</li>
				{/if}
			{/each}
		</ol>
	</div>
{/if}
