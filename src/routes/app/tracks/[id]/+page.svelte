<script lang="ts">
	import type { PageData } from "./$types";

	import Cover from "$lib/components/cover.svelte";
	import Icon from "$lib/components/icon.svelte";
	import Track from "$lib/components/track.svelte";

	export let data: PageData;

	$: track = data.track;
	$: artists = track?.artists ?? [];
	$: album = track?.album;
	$: imgUrl = album?.images[0]?.url;
	$: tracksViaArtist = data.recommendedArtists?.tracks ?? [];
	$: tracksViaTrack = data.recommendedTracks?.tracks ?? [];
	$: console.log({ imgUrl });
</script>

{#if track}
	<Cover type="track" {imgUrl} title={track.name}>
		<svelte:fragment slot="description">
			<dl class="datatable">
				<dt aria-label="Artists"><Icon id="artist" /></dt>
				<dd>
					<ul class="list--inline">
						{#each artists as artist}
							<li><a href="/app/artists/{artist.id}">{artist.name}</a></li>
						{/each}
					</ul>
				</dd>
				<dt aria-label="Appears on"><Icon id="album" /></dt>
				<dd><a href="/app/albums/{album?.id}">{album?.name}</a></dd>
				<dt aria-label="Release date"><Icon id="calendar" /></dt>
				<dd>{album?.release_date}</dd>
			</dl>
		</svelte:fragment>
	</Cover>

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
