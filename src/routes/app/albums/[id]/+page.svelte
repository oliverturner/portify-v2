<script lang="ts">
	import type { PageData } from "./$types";

	import Topper from "$lib/components/topper.svelte";
	import GroupedTrack from "$lib/components/track-grouped.svelte";
	import Icon from "$lib/components/icon.svelte";
	import { tracksShareArtist } from "$lib/utils/album";
	import AlbumLinks from "$lib/components/album-links.svelte";

	export let data: PageData;

	$: album = data.album;
	$: metadata = data.metadata ?? {};
	$: tracks = album?.tracks?.items ?? [];
	$: showTrackArtists = tracksShareArtist(album) === false;
</script>

<svelte:head>
	<title>Album: {album?.name} | Portify</title>
</svelte:head>

{#if album}
	<Topper type="album" imgUrl={album.images[0]?.url}>
		<div class="stack">
			<h2>{album.name}</h2>
			<dl class="datatable">
				<dt aria-label="Artists"><Icon id="icon-artist" /></dt>
				<dd>
					<ul class="list--inline">
						{#each album.artists as artist}
							<li><a href="/app/artists/{artist.id}">{artist.name}</a></li>
						{/each}
					</ul>
				</dd>
				<dt aria-label="Appears on"><Icon id="icon-album" /></dt>
				<dd><a href="/app/albums/{album?.id}">{album?.name}</a></dd>
				<dt aria-label="Release date"><Icon id="icon-calendar" /></dt>
				<dd>{album?.release_date}</dd>
			</dl>

			<AlbumLinks {album} />
		</div>
	</Topper>

	<div class="content">
		<ol class="content__items content__items--grouped">
			{#each tracks as track (track.id)}
				<li class="content__item">
					<GroupedTrack
						index={track.track_number}
						{track}
						{showTrackArtists}
						metadata={metadata[track.id]}
					/>
				</li>
			{/each}
		</ol>
	</div>
{/if}
