<script lang="ts">
	import type { PageData } from "./$types";

	import Topper from "$lib/components/topper.svelte";
	import Image from "$lib/components/image.svelte";
	import Icon from "$lib/components/icon.svelte";
	import Track from "$lib/components/track.svelte";
	import TrackArtists from "$lib/components/track-artists.svelte";
	import TrackLinks from "$lib/components/track-links.svelte";
	import TrackCover from "$lib/components/track-cover.svelte";

	export let data: PageData;

	$: track = data.track;
	$: metadata = data.metadata ?? {};
	$: artists = track?.artists ?? [];
	$: album = track?.album;
	$: imgUrl = album?.images[0]?.url;
	$: tracksViaArtist = data.recommendedArtists?.tracks ?? [];
	$: tracksViaTrack = data.recommendedTracks?.tracks ?? [];
</script>

<svelte:head>
	<title>Track: {track?.name} | Portify</title>
</svelte:head>

{#if track}
	<Topper type="track">
		<TrackCover {track} metadata={metadata[track.id]} slot="cover">
			<Image src={track.album.images[1].url} alt={track.name} />
		</TrackCover>

		<div class="stack">
			<h2 class="title title--light">{track.name}</h2>
			<TrackArtists {artists} />
			<dl class="datatable">
				<dt aria-label="Appears on"><Icon id="icon-album" /></dt>
				<dd><a href="/app/albums/{album?.id}">{album?.name}</a></dd>
				<dt aria-label="Release date"><Icon id="icon-calendar" /></dt>
				<dd>{album?.release_date}</dd>
			</dl>
			<TrackLinks {track} />
		</div>
	</Topper>

	<div class="content">
		<h3 class="content__title">Artist-based Recommendations</h3>
		<ol class="content__items">
			{#each tracksViaArtist as track (track.id)}
				<li class="content__item">
					<Track {track} metadata={metadata[track.id]} />
				</li>
			{/each}
		</ol>
	</div>

	<div class="content">
		<h3 class="content__title">Track-based recommendations</h3>
		<ol class="content__items">
			{#each tracksViaTrack as track (track.id)}
				<li class="content__item">
					<Track {track} metadata={metadata[track.id]} />
				</li>
			{/each}
		</ol>
	</div>
{/if}
