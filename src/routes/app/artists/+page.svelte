<script lang="ts">
	import type { Artist } from "$lib/typings/spotify";
	import type { PageData } from "./$types";

	import ContentItem from "$lib/components/content-item.svelte";

	export let data: PageData;

	const getItemProps = (item: Artist) => ({
		href: `/app/artists/${item.id}`,
		imgUrl: item.images.at(0)?.url,
	});

	$: topArtists = data.artists?.items ?? [];
	$: followedArtists = data.following?.artists.items ?? [];
	$: console.log({ data });
</script>

<div class="content">
	<h2 class="content__title">Top Artists</h2>
	<ol class="content__items content__items--tiled">
		{#each topArtists as artist (artist.id)}
			<ContentItem {...getItemProps(artist)}>
				<span slot="title">{artist.name}</span>
			</ContentItem>
		{/each}
	</ol>
</div>

<div class="content">
	<h2 class="content__title">Followed Artists</h2>
	<ol class="content__items content__items--tiled">
		{#each followedArtists as artist (artist.id)}
			<ContentItem {...getItemProps(artist)}>
				<span slot="title">{artist.name}</span>
			</ContentItem>
		{/each}
	</ol>
</div>
