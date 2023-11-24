<script lang="ts">
	import type { AudioTrack } from "$lib/typings/app";
	import type { PageData } from "./$types";

	import Topper from "$lib/components/topper.svelte";
	import Track from "$lib/components/track.svelte";
	import GroupedTrack from "$lib/components/track-grouped.svelte";
	import Pagination from "$lib/components/pagination.svelte";
	import { getInitialPage } from "$lib/utils/api";
	import { tracksPage } from "./store";

	export let data: PageData;

	$: tracksPage.set(data.tracks ?? getInitialPage<AudioTrack>());

	// TODO: set value in the store somehow
	$: isGrouped = false;
	$: imgUrl = data.playlist?.images?.[0]?.url;
	$: title = data.playlist?.name;
	$: showPagination = $tracksPage.total > $tracksPage.limit;

	function onPageChange(props: { curr: number; next: number }) {
		const offset = (props.next - 1) * $tracksPage.limit;
		tracksPage.loadTracks(data.playlist.id, offset);

		return props.next;
	}
</script>

<svelte:head>
	<title>Playlists: {title} | Portify</title>
</svelte:head>

<Topper type="playlist" {imgUrl}>
	<div class="stack">
		<h2>{title}</h2>
		{#if data.playlist.description}
			<div>{@html data.playlist.description}</div>
		{/if}
	</div>
</Topper>

{#if showPagination}
	<Pagination count={$tracksPage.total} perPage={$tracksPage.limit} {onPageChange} />
{/if}

<div class="content">
	<!-- TODO use proper shorthand and componentisation -->
	<ol class="content__items" class:content__items--grouped={isGrouped}>
		{#each $tracksPage.items as track, index (track.id)}
			<li class="content__item">
				{#if isGrouped}
					<GroupedTrack index={index + 1} {track} />
				{:else}
					<Track {track} />
				{/if}
			</li>
		{:else}
			<li>loading...</li>
		{/each}
	</ol>
</div>
