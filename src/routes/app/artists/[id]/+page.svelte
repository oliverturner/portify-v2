<script lang="ts">
	import type { PageData } from "./$types";

	import { getAlbumItemProps } from "$lib/utils/album";
	import { getArtistNames, getArtistItemProps } from "$lib/utils/artist";

	import Topper from "$lib/components/topper.svelte";
	import Track from "$lib/components/track.svelte";
	import ContentItem from "$lib/components/content-item.svelte";
	import ArtistLinks from "$lib/components/artist-links.svelte";
	import AlbumLinks from "$lib/components/album-links.svelte";

	export let data: PageData;

	$: artist = data.artist;
	$: genres = artist?.genres ?? [];
	$: topTracks = data.topTracks?.tracks ?? [];
	$: topTracksMetadata = data.topTracksMetadata ?? {};
	$: albums = data.albums?.items ?? [];
	$: appearsOn = data.appearsOn?.items ?? [];
	$: relatedArtists = data.relatedArtists?.artists ?? [];
</script>

<svelte:head>
	<title>Artist: {artist?.name} | Portify</title>
</svelte:head>

{#if artist}
	<Topper type="artist" imgUrl={artist.images[0]?.url}>
		<div class="stack">
			<h2>{artist.name}</h2>
			<ArtistLinks {artist} />
			{#if genres.length > 0}
				<p class="artist__genres">
					{#each genres as genre}
						<a href="/app/genres/{genre}"><span>{genre}</span></a>
					{/each}
				</p>
			{/if}
		</div>
	</Topper>
{/if}

{#if topTracks.length > 0}
	<div class="content" id="top-tracks">
		<h3 class="content__title">Top {topTracks.length} Tracks</h3>
		<ol class="content__items">
			{#each topTracks as track (track.id)}
				<li class="content__item">
					<Track {track} metadata={topTracksMetadata[track.id]} />
				</li>
			{/each}
		</ol>
	</div>
{/if}

{#if albums.length > 0}
	<div class="content" id="albums">
		<h3 class="content__title">Albums</h3>
		<ol class="content__items content__items--tiled">
			{#each albums as album (album.id)}
				<ContentItem {...getAlbumItemProps(album)}>
					<svelte:fragment slot="title">
						<span>{album.name}</span>
						<span class="item__artists">{getArtistNames(album.artists)}</span>
					</svelte:fragment>
				</ContentItem>
			{/each}
		</ol>
	</div>
{/if}

{#if appearsOn.length > 0}
	<div class="content">
		<h3 class="content__title" id="appears-on">Appears on</h3>
		<ol class="content__items content__items--tiled">
			{#each appearsOn as album (album.id)}
				<ContentItem {...getAlbumItemProps(album)}>
					<svelte:fragment slot="title">
						<span>{album.name}</span>
						<span class="item__artists">{getArtistNames(album.artists)}</span>
					</svelte:fragment>
				</ContentItem>
			{/each}
		</ol>
	</div>
{/if}

{#if relatedArtists.length > 0}
	<div class="content">
		<h3 class="content__title" id="related-artists">Related artists</h3>
		<ol class="content__items content__items--tiled">
			{#each relatedArtists as artist (artist.id)}
				<ContentItem {...getArtistItemProps(artist)}>
					<span slot="title">{artist.name}</span>
				</ContentItem>
			{/each}
		</ol>
	</div>
{/if}

<style lang="postcss">
	.content {
		box-sizing: border-box;
	}

	.artist__genres {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;

		& a {
			white-space: nowrap;
			text-transform: capitalize;

			&:hover {
				& > span {
					text-decoration: underline;
				}
			}

			&:not(:last-child)::after {
				content: ",";
			}
		}
	}
</style>
