<script lang="ts">
	import type { LayoutData } from "./$types";

	import { onNavigate } from "$app/navigation";
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";

	import Icon from "$lib/components/icon.svelte";
	import App from "$lib/components/app.svelte";

	import "../../app.postcss";

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

	$: currentPath = $page.url.pathname;
	$: isActive = (href: string) => currentPath.startsWith(href);
</script>

<!-- Page Route Content -->

<App>
	<div class="header__controls" slot="header-trail">
		<p>{data.username}</p>
		<form method="post" action="?/logout" use:enhance>
			<button class="btn btn-sm variant-ghost-surface">Sign out</button>
		</form>
	</div>

	<svelte:fragment slot="rail-lead">
		<nav class="rail__links">
			{#each links as link}
				<a class="title" class:active={isActive(link.href)} href={link.href}>
					<Icon id={link.icon} size="medium" />
					<span>{link.label}</span>
				</a>
			{/each}
		</nav>
	</svelte:fragment>

	<slot />
</App>

<style>
	.header__controls {
		display: flex;
		align-items: center;
		gap: var(--size-1);
	}
	.rail__links {
		display: grid;

		& a {
			display: grid;
			place-items: center;

			aspect-ratio: 1;
			padding: var(--size-2);
			font-size: var(--font-size-0);
			line-height: 1;

			transition: background 0.2s ease-in-out;

			&:hover,
			&.active {
				background: #fff3;
				background: var(--brand-1);
			}
		}
	}
</style>
