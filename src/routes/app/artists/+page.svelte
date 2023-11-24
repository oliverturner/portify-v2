<script lang="ts">
	import type { PageData } from "./$types";

	import { getArtistItemProps } from "$lib/utils/artist";

	import ContentItem from "$lib/components/content-item.svelte";

	export let data: PageData;

	$: topArtists = data.artists?.items ?? [];
	$: followedArtists = data.following?.items ?? [];
</script>

<svelte:head>
	<title>Artists | Portify</title>
</svelte:head>

<div class="content">
	<h3 class="content__title">Top Artists</h3>
	<ol class="content__items content__items--tiled">
		{#each topArtists as artist (artist.id)}
			<ContentItem {...getArtistItemProps(artist)}>
				<span slot="title">{artist.name}</span>
			</ContentItem>
		{/each}
	</ol>
</div>

<div class="content">
	<h3 class="content__title">Followed Artists</h3>
	<ol class="content__items content__items--tiled">
		{#each followedArtists as artist (artist.id)}
			<ContentItem {...getArtistItemProps(artist)}>
				<span slot="title">{artist.name}</span>
			</ContentItem>
		{/each}
	</ol>
</div>
