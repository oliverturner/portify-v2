<script lang="ts">
	import { enhance } from "$app/forms";
	import { pageNav, prefsPanel } from "$lib/stores/ui";

	import MenuBtn from "./btn-menu.svelte";
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
		<div class="prefs-panel">
			<form method="post" action="?/logout" use:enhance>
				<button class="btn">Sign out</button>
			</form>
		</div>
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
		grid-template-rows: 1fr 70px;
		grid-template-areas:
			"content"
			"rail";

		@media (min-width: 768px) {
			grid-template-rows: 1fr;
			grid-template-columns: 92px 1fr;
			grid-template-areas: "rail content";
		}

		position: relative;
		overflow-y: auto;
		z-index: 1;
	}

	.app__content__rail {
		--_bg: var(--surface-0);
		--_ink: var(--text-1);

		grid-area: rail;

		display: grid;

		position: relative;
		background: var(--_bg);
		color: var(--_ink);
		z-index: 3;

		view-transition-name: none;

		@media (min-width: 1024px) {
			--_bg: var(--surface-2);
		}
	}

	.app__content__prefs {
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
