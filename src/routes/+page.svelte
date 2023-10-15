<div class="page">
	<header class="page__header">
		<a href="/" class="title">Portify</a>
	</header>
	<main>
		<a href="/login/spotify">Sign in with Spotify</a>
	</main>
</div>

<style>
	.page {
		grid-area: 1 / 1 / -1 / -1;

		display: grid;
		grid-template-rows: auto 1fr;

		height: 100%;
	}

	header {
		--_bg: var(--surface-2);
		--_ink: var(--text-1);

		background: var(--_bg);
		color: var(--_ink);
	}

	main {
		display: grid;
		place-content: center;
	}
</style>
