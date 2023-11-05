<script lang="ts">
	import type { AudioTrack } from "$lib/typings/app";
	import type { PageData } from "./$types";

	import Topper from "$lib/components/topper.svelte";
	import Track from "$lib/components/track.svelte";
	import GroupedTrack from "$lib/components/track-grouped.svelte";
	import Pagination from "$lib/components/pagination.svelte";
	import { getInitialPage } from "$lib/utils/api";
	import { tracks } from "./store";

	export let data: PageData;

	$: playlist = data.playlist;
	$: tracks.set(data.tracks ?? getInitialPage<AudioTrack>());
	$: showPagination = $tracks.total > $tracks.limit;
	$: isGrouped = false;

	$: description = playlist?.description;
	$: imgUrl = playlist?.images[0]?.url;
	$: title = playlist?.name;

	function onPageChange(props: { curr: number; next: number }) {
		const offset = (props.next - 1) * $tracks.limit;
		tracks.loadPage(playlist.id, offset);

		return props.next;
	}
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
				<dd>{$tracks.total}</dd>
			</dl>
		</div>
	</Topper>

	{#if showPagination}
		<Pagination count={$tracks.total} perPage={$tracks.limit} {onPageChange} />
	{/if}

	<div class="content">
		<!-- TODO use proper shorthand and componentisation -->
		<ol class="content__items" class:content__items--grouped={isGrouped}>
			{#each $tracks.items as track, index (track.id)}
				<li class="content__item">
					{#if isGrouped}
						<GroupedTrack index={index + 1} {track} />
					{:else}
						<Track {track} />
					{/if}
				</li>
			{/each}
		</ol>
	</div>
{/if}
