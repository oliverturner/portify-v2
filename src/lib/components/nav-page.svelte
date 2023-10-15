<div class="page">
	<div class="page__nav">
		<nav class="page__nav__content">
			<ol>
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
		scrollbar-gutter: auto;
	}

	.page__nav {
		--translate-x: -100%;

		position: fixed;
		top: 50px;
		left: 0;
		width: min(calc(100dvw - 92px), 300px);
		height: calc(100dvh - 50px);
		transform: translateX(var(--translate-x));
		background-color: var(--surface-0);
		z-index: 1;

		transition: transform 0.25s ease-in-out;

		&.is-open {
			--translate-x: 92px;
		}

		@media (min-width: 1024px) {
			grid-area: nav;

			position: static;
			width: auto;
			height: auto;
			transform: none;
			background-color: var(--surface-4);
			z-index: initial;
		}
	}

	.page__nav__content {
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
