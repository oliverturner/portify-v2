<script lang="ts">
	import "../app.postcss";

	import { onNavigate } from "$app/navigation";

	import Toaster from "$lib/components/toaster.svelte";

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<Toaster />

<slot />
