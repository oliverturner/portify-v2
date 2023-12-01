<script lang="ts">
	import "../app.postcss";

	import { browser } from "$app/environment";
	import { onNavigate } from "$app/navigation";

	import { pageNav } from "$lib/stores/ui";
	import Toaster from "$lib/components/toaster.svelte";

	onNavigate((navigation) => {
		if (browser) {
			// Hide mobile nav
			pageNav.set(false);
		}

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
