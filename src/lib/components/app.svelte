<script>
	import { enhance } from "$app/forms";
	import { displayPageNav, displayPrefs } from "$lib/stores/ui";

	import Icon from "./icon.svelte";

	const togglePageNav = () => {
		displayPageNav.update(() => !$displayPageNav);
	};
</script>

<header class="app__header">
	<button id="toggle-page-menu" class="square btn--menu" on:click={togglePageNav}>
		<Icon id="icon-menu" />
		<span class="sr-only"></span>
	</button>

	<a href="/app/playlists" class="title app__title">Portify</a>

	<div class="app__header__trail">
		<slot name="header-trail" />
	</div>
</header>

<nav class="app__rail">
	<div class="app__rail__lead">
		<slot name="rail-lead" />
	</div>

	<div class="app__rail__trail">
		<slot name="rail-trail" />
	</div>
</nav>

<div class="app__content">
	<slot />
</div>

<div class="app__prefs" class:displayed={$displayPrefs}>
	<div class="prefs-panel">
		<form method="post" action="?/logout" use:enhance>
			<button class="btn">Sign out</button>
		</form>
	</div>
</div>

<style lang="postcss">
	.app__header,
	.app__rail {
		--_bg: var(--surface-2);
		--_ink: var(--text-1);

		background: var(--_bg);
		color: var(--_ink);
	}

	.app__header {
		grid-area: header;

		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;

		padding: 0.5rem;

		view-transition-name: app__header;

		@media (min-width: 1024px) {
			padding-inline-start: 1rem;
		}
	}

	.app__header__trail {
		@media (min-width: 1024px) {
			margin-left: auto;
		}
	}

	.btn--menu {
		--size: 40px;

		display: grid;
		place-content: center;

		width: var(--size);
		height: var(--size);
		border-color: currentColor;
		border-width: 1px;
		border-radius: var(--size);

		@media (min-width: 1024px) {
			display: none;
		}
	}

	.title {
		font-size: var(--font-size-fluid-0);
		font-weight: 600;
		letter-spacing: var(--font-letterspacing-4);
		text-decoration: none;
	}

	.app__rail {
		--_bg: var(--surface-0);

		grid-area: rail;

		display: grid;

		position: relative;
		z-index: 2;

		view-transition-name: static;
		@media (min-width: 1024px) {
			--_bg: var(--surface-2);
		}
	}

	.app__content {
		grid-area: content;

		position: relative;
		z-index: 1;
		overflow-y: auto;
	}

	.app__prefs {
		--_translateX: 100%;
		--_bg: var(--surface-0);

		position: fixed;
		top: 50px;
		right: 0;
		width: 200px;
		height: calc(100dvh - 50px);
		z-index: 2;

		transform: translateX(var(--_translateX));
		transition: transform 0.25s ease-in-out;

		padding: 1rem;
		background: var(--_bg);

		&.displayed {
			--_translateX: 0;
		}
	}
</style>
