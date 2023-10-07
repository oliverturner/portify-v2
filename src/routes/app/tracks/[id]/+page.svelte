<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;

	console.log({ trackPage: data });
</script>

<h2>{data.track?.name}</h2>
