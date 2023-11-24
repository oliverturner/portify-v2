<script lang="ts">
	import type { PageData } from "./$types";

	import ContentItem from "$lib/components/content-item.svelte";
	import { getArtistItemProps } from "$lib/utils/artist";
	import { artists } from "./store";

	export let data: PageData;

	$: topArtists = data.topArtists?.items ?? [];
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
		{#each $artists.items as artist (artist.id)}
			<ContentItem {...getArtistItemProps(artist)}>
				<span slot="title">{artist.name}</span>
			</ContentItem>
		{/each}
	</ol>
</div>
