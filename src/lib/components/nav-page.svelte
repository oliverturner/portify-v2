<script>
	import { pageNav } from "$lib/stores/ui";
</script>

<div class="page">
	<div class="page__nav" class:displayed={$pageNav}>
		<nav class="page__nav__content">
			<ol class="page__nav__items">
				<slot name="nav-items" />
			</ol>
		</nav>
		<div class="page__nav__footer">
			<slot name="nav-footer" />
		</div>
	</div>
	<div class="page__content">
		<slot />
	</div>
</div>

<style lang="postcss">
	.page {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-areas: "content";

		position: relative;
		height: 100%;
		overflow: hidden;

		@media (min-width: 1024px) {
			grid-template-columns: 260px 1fr;
			grid-template-areas: "nav content";
		}
	}

	:is(.page__nav, .page__content) {
		overflow-y: auto;
		scrollbar-gutter: stable;
	}

	.page__nav {
		--_translate-x: -100%;
		--_width: min(calc(100dvw - 92px), 300px);
		--_height: calc(100dvh - 50px - 70px);
		--_bg: var(--surface-0);

		position: fixed;
		top: 50px;
		left: 0;
		width: var(--_width);
		height: var(--_height);
		background: var(--_bg);
		z-index: 1;

		transform: translateX(var(--_translate-x));
		transition: transform 0.25s ease-in-out;

		@media (min-width: 1024px) {
			--_width: auto;
			--_height: auto;
			--_bg: var(--surface-5);

			grid-area: nav;

			position: static;
			transform: none;
			z-index: initial;
		}

		&.displayed {
			--_translate-x: 0;

			@media (min-width: 768px) {
				--_height: calc(100dvh - 50px);
				--_translate-x: 92px;
			}
		}
	}

	.page__nav__items {
	}

	.page__nav__footer {
		&:empty {
			display: none;
		}
	}

	.page__content {
		grid-area: content;
	}
</style>
