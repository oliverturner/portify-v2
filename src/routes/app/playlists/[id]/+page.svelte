<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<h2>{data.playlist?.name}</h2>

{#each data.playlist?.images ?? [] as image}
	<img src={image.url} alt="Cover" />
{/each}
