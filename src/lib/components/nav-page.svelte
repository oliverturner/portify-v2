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
		grid-template-columns: 1fr 5fr;
		grid-template-areas: "nav content";

		height: 100%;
		overflow: hidden;
	}

	:is(.page__nav, .page__content) {
		overflow-y: auto;
		scrollbar-gutter: auto;
	}

	.page__nav {
		grid-area: nav;

		background-color: var(--surface-7);
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
