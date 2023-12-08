<script lang="ts">
	import type { PageData } from "./$types";

	import Topper from "$lib/components/topper.svelte";
	import GroupedTrack from "$lib/components/track-grouped.svelte";
	import Icon from "$lib/components/icon.svelte";
	import VendorLinks from "$lib/components/vendor-links.svelte";
	import { getAlbumLinks, tracksShareArtist } from "$lib/utils/album";

	export let data: PageData;

	$: album = data.album;
	$: tracks = album?.tracks?.items ?? [];
	$: showArtists = tracksShareArtist(album) === false;
	$: links = getAlbumLinks(album);
	$: console.log(album.images);
</script>

<svelte:head>
	<title>Album: {album?.name} | Portify</title>
</svelte:head>

{#if album}
	<Topper type="album" imgUrl={album.images[1]?.url}>
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
				<dt aria-label="Release date"><Icon id="icon-calendar" /></dt>
				<dd>{album?.release_date}</dd>
			</dl>

			<VendorLinks {links} />
		</div>
	</Topper>

	<div class="content">
		<ol class="content__items content__items--grouped">
			{#each tracks as track, index (track.id)}
				<li class="content__item">
					<GroupedTrack index={index + 1} {track} {showArtists} />
				</li>
			{/each}
		</ol>
	</div>
{/if}
