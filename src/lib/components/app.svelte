<script lang="ts">
	import "../../app.postcss";
</script>

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

		display: flex;
		align-items: center;
		justify-content: space-between;

		padding: 0.5rem 1rem;

		& > .title {
			font-size: var(--font-size-fluid-0);
			font-weight: 600;
			letter-spacing: var(--font-letterspacing-4);
			text-decoration: none;
		}
	}

	.app__rail {
		grid-area: rail;

		display: grid;

		@media (min-width: 768px) {
			overflow-y: auto;
		}
	}

	.app__content {
		grid-area: content;

		@media (min-width: 768px) {
			overflow-y: auto;
		}
	}
</style>
