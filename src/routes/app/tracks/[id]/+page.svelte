<script lang="ts">
	import type { AudioTrack } from "$lib/typings/app";
	import type { PageData } from "./$types";

	import Topper from "$lib/components/topper.svelte";
	import Image from "$lib/components/image.svelte";
	import Icon from "$lib/components/icon.svelte";
	import Track from "$lib/components/track.svelte";
	import TrackArtists from "$lib/components/track-artists.svelte";
	import TrackCover from "$lib/components/track-cover.svelte";
	import VendorLinks from "$lib/components/vendor-links.svelte";
	import PlayBtn from "$lib/components/btn-play.svelte";

	import { getTrackLinks } from "$lib/utils/track";
	import { playTrack } from "$lib/utils/player";

	export let data: PageData;

	const track: AudioTrack = data.track;
	const artists = track?.artists ?? [];
	const album = track?.album;
	const tracksViaArtist = data.recommendedArtists ?? [];
	const tracksViaTrack = data.recommendedTracks ?? [];
	const links = getTrackLinks(track);
</script>

<svelte:head>
	<title>Track: {track?.name} | Portify</title>
</svelte:head>

{#if track}
	<Topper type="track">
		<TrackCover {track} slot="cover">
			<Image src={album?.images[1].url} alt={track.name} />
		</TrackCover>

		<div class="row">
			<div class="stack">
				<h2 class="title title--light">{track.name}</h2>
				<TrackArtists {artists} />
				<dl class="datatable">
					<dt aria-label="Appears on"><Icon id="icon-album" /></dt>
					<dd><a href="/app/albums/{album?.id}">{album?.name}</a></dd>
					<dt aria-label="Release date"><Icon id="icon-calendar" /></dt>
					<dd>{album?.release_date}</dd>
				</dl>

				<VendorLinks {links} />
			</div>

			<div class="player">
				<PlayBtn onClick={() => playTrack(track.id)} />
			</div>
		</div>
	</Topper>

	<div class="content">
		<h3 class="content__title">Artist-based Recommendations</h3>
		<ol class="content__items">
			{#each tracksViaArtist as track (track.id)}
				<li class="content__item">
					<Track {track} />
				</li>
			{/each}
		</ol>
	</div>

	<div class="content">
		<h3 class="content__title">Track-based recommendations</h3>
		<ol class="content__items">
			{#each tracksViaTrack as track (track.id)}
				<li class="content__item">
					<Track {track} />
				</li>
			{/each}
		</ol>
	</div>
{/if}

<style>
	.row {
		display: flex;
	}

	.stack {
		flex: 1;
	}

	.player {
		grid-area: 1 / 1 / -1 / -1;
		place-self: end;
	}
</style>
