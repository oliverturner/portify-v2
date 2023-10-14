<script lang="ts">
	import Cover from "$lib/components/cover.svelte";
	import Track from "$lib/components/track.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;

	$: artist = data.artist;
	$: genres = (artist?.genres ?? []).join(", ");
	$: topTracks = data.topTracks?.tracks ?? [];
	$: albums = data.albums?.items ?? [];
	$: appearsOn = data.appearsOn?.items ?? [];
	$: relatedArtists = data.related?.artists ?? [];
</script>

{#if artist}
	<Cover type="artist" imgUrl={artist.images[0]?.url} title={artist.name}>
		<svelte:fragment slot="description">
			{#if genres.length > 0}
				<p class="artist__genres"><span class="label">Genres</span> {genres}</p>
			{/if}
		</svelte:fragment>
	</Cover>
{/if}

<div class="content">
	<h3 class="content__title">Top {topTracks.length} Tracks</h3>
	<ol class="content__items">
		{#each topTracks as track (track.id)}
			<li class="content__item">
				<Track {track} />
			</li>
		{/each}
	</ol>
</div>

<div class="content">
	<h3 class="content__title">Albums</h3>
	{#each albums as album (album.id)}
		<p>{album.name}</p>
	{/each}
</div>

<div class="content">
	<h3 class="content__title">Appears on</h3>
	{#each appearsOn as album (album.id)}
		<p>{album.name}</p>
	{/each}
</div>

<div class="content">
	<h3 class="content__title">Related artists</h3>
	{#each relatedArtists as artist (artist.id)}
		<p>{artist.name}</p>
	{/each}
</div>

<style lang="postcss">
	.artist__genres {
		white-space: nowrap;
		text-transform: capitalize;
	}
</style>
