<script lang="ts">
	import type { PageData } from "./$types";

	import { AppShell, AppBar } from "@skeletonlabs/skeleton";
	import { enhance } from "$app/forms";
	import "../app.postcss";

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from "@floating-ui/dom";
	import { storePopup } from "@skeletonlabs/skeleton";
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	export let data: PageData;
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Portify</strong>
			</svelte:fragment>

			<svelte:fragment slot="trail">
				<p>{data.spotifyUsername}</p>
				<form method="post" action="?/logout" use:enhance>
					<button class="btn btn-sm variant-ghost-surface">Sign out</button>
				</form>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<ul>
			{#each data.playlists.items as item}
				<li>
					<a href="playlists/{item.id}">{item.name}</a>
				</li>
			{/each}
		</ul>
	</svelte:fragment>

	<!-- Page Route Content -->
	<slot />
</AppShell>
