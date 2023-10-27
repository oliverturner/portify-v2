<script lang="ts">
	import type { LayoutData } from "./$types";

	import { onNavigate } from "$app/navigation";
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";

	import Icon from "$lib/components/icon.svelte";
	import App from "$lib/components/app.svelte";
	import { onLoad } from "$lib/utils/image";

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
		<button id="user-prefs-btn">
			<img class="square avatar" src={data.avatar} alt="User avatar" on:load={onLoad} />
		</button>

		<div id="user-prefs-panel">
			<form method="post" action="?/logout" use:enhance>
				<button class="btn">Sign out</button>
			</form>
		</div>
	</div>

	<svelte:fragment slot="rail-lead">
		<nav class="rail__links">
			{#each links as link}
				<a class="rail__link title" class:active={isActive(link.href)} href={link.href}>
					<span class="rail__link__icon"><Icon id={link.icon} size="medium" /></span>
					<span class="rail__link__label">{link.label}</span>
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
		gap: var(--size-2);

		position: relative;
	}

	.avatar {
		--size: 40px;

		width: var(--size);
		height: var(--size);
		border-radius: var(--size);
	}

	.rail__links {
		display: flex;
		justify-content: center;

		@media (min-width: 768px) {
			display: grid;
		}
	}

	.rail__link {
		--font-weight: 400;
		--padding: 0.5rem;

		flex: 1;

		display: grid;
		place-items: center;

		font-size: var(--font-size-0);
		line-height: 1;

		transition: background 0.2s ease-in-out;

		@media (min-width: 768px) {
			--padding: 0;

			aspect-ratio: 1;
			padding: var(--size-2);
		}

		&:hover,
		&:focus {
			outline: none;
			background: var(--brand-3);
		}
		&:active,
		&.active {
			background: var(--brand);
		}
	}

	.rail__link__icon {
		padding: var(--padding);
		padding-bottom: 0;
	}

	.rail__link__label {
		padding: var(--padding);
	}
</style>
