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

<svelte:head>
	<title>Playlists: {playlist?.name} | Portify</title>
</svelte:head>

{#if playlist}
	<Topper type="playlist" {imgUrl}>
		<div class="stack">
			<h2>{title}</h2>
			{#if description}
				<div>{@html description}</div>
			{/if}

			<dl class="datatable">
				<dt aria-label="Count">Track count:</dt>
				<dd>{playlist.tracks.total}</dd>
			</dl>
		</div>
	</Topper>

	<div class="content">
		<ol class="content__items" class:content__items--grouped={data.isGrouped}>
			{#each tracks as { track }, index (track.id)}
				{#if isTrack(track)}
					<li class="content__item">
						{#if data.isGrouped}
							<GroupedTrack index={index + 1} {track} metadata={metadata[track.id]} />
						{:else}
							<Track {track} metadata={metadata[track.id]} />
						{/if}
					</li>
				{/if}
			{/each}
		</ol>
	</div>
{/if}
