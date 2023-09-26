<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;

	console.log({ playlist_page: JSON.stringify(data.playlist, null, 2) });
</script>

<h2>{data.playlist?.name}</h2>

<!--
{#each data.playlist?.images ?? [] as image}
	<img src={image.url} alt="Cover" />
{/each}
 -->

{#each data.playlist?.tracks.items ?? [] as item}
	<p>{item.track.name}</p>
{/each}
