<script lang="ts">
	import type { LayoutData } from "./$types";

	import { page } from "$app/stores";

	import App from "$lib/components/app.svelte";
	import Icon from "$lib/components/icon.svelte";
	import Image from "$lib/components/image.svelte";
	import { prefsPanel } from "$lib/stores/ui";

	import "../../app.postcss";

	export let data: LayoutData;

	const links = [
		{ icon: "icon-playlist", href: "/app/playlists", label: "Playlists" },
		{ icon: "icon-artist", href: "/app/artists", label: "Artists" },
		{ icon: "icon-album", href: "/app/albums", label: "Albums" },
		{ icon: "icon-track", href: "/app/tracks", label: "Tracks" },
	];

	$: currentPath = $page.url.pathname;
	$: isActive = (href: string) => currentPath.startsWith(href);
</script>

<!-- Page Route Content -->

<App>
	<div class="header__controls" slot="header-trail">
		<button class="prefs-btn" title="User preferences" on:click={prefsPanel.toggle}>
			<Image src={data.avatar} alt="User avatar" />
			<span class="sr-only">Preferences</span>
		</button>
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
		z-index: 2;
	}

	.prefs-btn {
		--size: 40px;

		all: unset;

		aspect-ratio: 1;
		overflow: hidden;

		width: var(--size);
		height: var(--size);
		border-radius: var(--size);
		cursor: pointer;
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
