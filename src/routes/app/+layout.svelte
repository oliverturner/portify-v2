<script lang="ts">
	import type { LayoutData } from "./$types";

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from "@floating-ui/dom";
	import { AppShell, AppBar, storePopup, AppRail, AppRailAnchor } from "@skeletonlabs/skeleton";

	import { onNavigate } from "$app/navigation";
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";
	import Icon from "$lib/components/icon.svelte";
	import "../../app.postcss";

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	export let data: LayoutData;

	const links = [
		{ icon: "playlist", href: "/app/playlists", label: "Playlists" },
		{ icon: "artist", href: "/app/artists", label: "Artists" },
		{ icon: "album", href: "/app/albums", label: "Albums" },
		{ icon: "track", href: "/app/tracks", label: "Tracks" },
	];

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

<!-- Page Route Content -->
<AppShell slotPageContent="overflow-hidden">
	<AppBar slot="header">
		<svelte:fragment slot="lead">
			<a href="/" class="text-xl uppercase">Portify</a>
		</svelte:fragment>

		<svelte:fragment slot="trail">
			<p>{data.spotifyUsername}</p>
			<form method="post" action="?/logout" use:enhance>
				<button class="btn btn-sm variant-ghost-surface">Sign out</button>
			</form>
		</svelte:fragment>
	</AppBar>

	<AppRail slot="sidebarLeft">
		{#each links as link}
			<AppRailAnchor href={link.href} selected={$page.url.pathname.startsWith(link.href)}>
				<svelte:fragment slot="lead">
					<Icon id={link.icon} />
				</svelte:fragment>
				<span>{link.label}</span>
			</AppRailAnchor>
		{/each}
	</AppRail>

	<slot />
</AppShell>
