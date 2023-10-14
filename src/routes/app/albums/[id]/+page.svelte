<script lang="ts">
	import type { PageData } from "./$types";

	import { onLoad } from "$lib/utils/image";

	export let data: PageData;
</script>

<h2>{data.album?.name}</h2>

<img src={data.album?.images[1].url} alt="Cover art" on:load={onLoad} />
