<script lang="ts">
	import type { PageData } from "./$types";

	import Topper from "$lib/components/topper.svelte";
	import Track from "$lib/components/track.svelte";
	import GroupedTrack from "$lib/components/track-grouped.svelte";
	import { page } from "$app/stores";

	export let data: PageData;

	$: playlist = data.playlist;
	$: tracks = data.tracks ?? [];
	$: tracksPage = data.tracksPage ?? {};
	$: tracksMetadata = data.tracksMetadata ?? {};

	$: description = playlist?.description;
	$: imgUrl = playlist?.images[0]?.url;
	$: title = playlist?.name;
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
				<dd>{tracksPage.total}</dd>
			</dl>
		</div>
	</Topper>

	<div class="content">
		<!-- TODO use proper shorthand and componentisation -->
		<ol class="content__items" class:content__items--grouped={data.isGrouped}>
			{#each tracks as track, index (track.id)}
				<li class="content__item">
					{#if data.isGrouped}
						<GroupedTrack index={index + 1} {track} metadata={tracksMetadata[track.id]} />
					{:else}
						<Track {track} metadata={tracksMetadata[track.id]} />
					{/if}
				</li>
			{/each}
		</ol>
	</div>
{/if}
