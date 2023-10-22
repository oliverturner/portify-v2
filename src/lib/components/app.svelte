<header class="app__header">
	<a href="/" class="title">Portify</a>

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
</style>
