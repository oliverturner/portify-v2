<script lang="ts">
	import type { PageData } from "./$types";

	import Cover from "$lib/components/cover.svelte";
	import GroupedTrack from "$lib/components/track-grouped.svelte";
	import { tracksShareArtist } from "$lib/utils/album";

	import Icon from "$lib/components/icon.svelte";

	export let data: PageData;

	$: album = data.album;
	$: tracks = album?.tracks?.items ?? [];
	$: showTrackArtists = tracksShareArtist(album) === false;
</script>

{#if album}
	<Cover type="album" imgUrl={album.images[0]?.url} title={album.name}>
		<svelte:fragment slot="description">
			<dl class="datatable">
				<dt aria-label="Artists"><Icon id="artist" /></dt>
				<dd>
					<ul class="inlineList">
						{#each album.artists as artist}
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
		<ol class="content__items content__items--grouped">
			{#each tracks as track (track.id)}
				<li class="content__item">
					<GroupedTrack index={track.track_number} {track} {showTrackArtists} />
				</li>
			{/each}
		</ol>
	</div>
{/if}
