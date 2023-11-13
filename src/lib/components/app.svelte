<script lang="ts">
	import { pageNav, prefsPanel } from "$lib/stores/ui";

	import MenuBtn from "./btn-menu.svelte";
	import Preferences from "./preferences.svelte";
</script>

<header class="app__header">
	<MenuBtn onClick={pageNav.toggle} />

	<a href="/app/playlists" class="title app__header__title">Portify</a>

	<div class="app__header__trail">
		<slot name="avatar" />
	</div>
</header>

<div class="app__content">
	<nav class="app__content__rail">
		<div class="app__rail__lead">
			<slot name="rail-lead" />
		</div>

		<div class="app__rail__trail">
			<slot name="rail-trail" />
		</div>
	</nav>

	<slot />

	<div class="app__content__prefs" class:displayed={$prefsPanel}>
		<Preferences />
	</div>
</div>

<style lang="postcss">
	.app__header__trail {
		@media (min-width: 1024px) {
			margin-left: auto;
		}
	}

	.app__content {
		grid-area: content;

		display: grid;
		grid-template-rows: 1fr var(--rail-mobile-h);
		grid-template-areas:
			"content"
			"rail";

		@media (min-width: 768px) {
			grid-template-rows: 1fr;
			grid-template-columns: 92px 1fr;
			grid-template-areas: "rail content";
		}

		position: relative;
		overflow: hidden;
		z-index: 1;
	}

	.app__content__rail {
		--_h: var(--rail-mobile-h);
		--_bg: var(--surface-0);
		--_ink: var(--text-1);

		grid-area: rail;

		display: grid;

		position: relative;
		height: var(--_h);
		background: var(--_bg);
		color: var(--_ink);
		z-index: 3;

		view-transition-name: none;

		@media (min-width: 768px) {
			--_h: initial;
		}

		@media (min-width: 1024px) {
			--_bg: var(--surface-2);
		}
	}

	.app__content__prefs {
		--_translateX: 100%;
		--_bg: var(--surface-0);

		position: fixed;
		top: 0;
		right: 0;
		width: 240px;
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
