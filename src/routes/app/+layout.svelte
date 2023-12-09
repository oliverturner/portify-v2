<script lang="ts">
	import type { LayoutData } from "./$types";

	import App from "$lib/components/app/app.svelte";

	export let data: LayoutData;
</script>

<App avatar={data.avatar}>
	<slot />
</App>
