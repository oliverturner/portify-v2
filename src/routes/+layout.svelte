<script lang="ts">
	import "../app.postcss";

	import { onNavigate } from "$app/navigation";

	import { pageNav } from "$lib/stores/ui";
	import Toaster from "$lib/components/toaster.svelte";

	onNavigate((navigation) => {
		// Hide mobile nav
		pageNav.set(false);

		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<slot />

<Toaster />
