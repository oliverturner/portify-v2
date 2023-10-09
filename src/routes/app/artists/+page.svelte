<script lang="ts">
	import type { Artist } from "$lib/typings/spotify";
	import type { LayoutData } from "./$types";

	import ContentItem from "$lib/components/content-item.svelte";

	export let data: LayoutData;

	const getItemProps = (item: Artist) => ({
		href: `/app/artists/${item.id}`,
		imgUrl: item.images.at(0)?.url,
	});
</script>

<h2>Artists</h2>

<div class="content">
	<ol class="content__items">
		{#each data.artists?.items ?? [] as item (item.id)}
			<ContentItem {...getItemProps(item)}>
				<span slot="title">{item.name}</span>
			</ContentItem>
		{/each}
	</ol>
</div>
