<div class="page">
	<div class="page__nav">
		<div class="page__nav__content">
			<ol>
				<slot name="nav-items" />
			</ol>
		</div>
	</div>
	<div class="page__content">
		<slot />
	</div>
</div>

<style lang="postcss">
	.page {
		display: grid;
		grid-template-columns: 1fr 3fr;
		grid-template-areas: "nav content";

		height: 100%;
		overflow: hidden;
	}

	:is(.page__nav, .page__content) {
		height: 100%;
		overflow-y: auto;
	}

	.page__nav {
		grid-area: nav;

		/* background-color: rgba(var(--color-secondary-500) / 0.18); */
		background-color: rgba(var(--color-secondary-800) / 0.2);
	}

	.page__nav__content {
		padding: 1rem;

		& > ul,
		& > ol {
			display: grid;
			gap: 1rem;
		}
	}

	.page__content {
		grid-area: content;

		padding: 1rem;
	}
</style>
