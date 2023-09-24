<script lang="ts">
	import type { LayoutData } from "../$types";

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from "@floating-ui/dom";
	import { AppShell, AppBar, storePopup, AppRail, AppRailAnchor } from "@skeletonlabs/skeleton";

	import "../../app.postcss";

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<!-- Page Route Content -->
<AppShell>
	<AppBar slot="header">
		<svelte:fragment slot="lead">
			<a href="/" class="text-xl uppercase">Portify</a>
		</svelte:fragment>
	</AppBar>

	<slot />
</AppShell>
