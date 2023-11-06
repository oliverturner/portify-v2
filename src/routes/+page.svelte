<script>
	import Icon from "$lib/components/icon.svelte";
</script>

<svelte:head>
	<title>Log in | Portify</title>
</svelte:head>

<header class="app__header">
	<p class="title app__header__title">Portify</p>
</header>

<main class="app__content">
	<a class="page" href="/login/spotify">
		<figure class="page__hero">
			<img src="/img/hacienda.png" alt="Splash" />
			<figcaption class="title">
				<span>Support artists:</span>
				<span>buy their music</span>
			</figcaption>
		</figure>
		<div class="page__content">
			<img class="logo-spotify" src="/img/logo-spotify.png" alt="Spotify logo" />
			<p>
				<span>Logging in adds purchase</span>
				<span>links to your playlists</span>
			</p>
		</div>
	</a>
</main>

<style>
	.app__content {
		@media (min-width: 768px) {
			place-content: center;
		}
	}

	.page {
		display: grid;

		@media (min-width: 768px) {
			display: flex;

			height: 50vh;
			border-radius: 0.5rem;
			overflow: hidden;
		}

		@media (min-width: 1024px) {
			width: 75vw;
		}
	}

	:is(.page__hero, .page__content) {
		@media (min-width: 768px) {
			width: 50%;
		}
	}

	figure {
		grid-area: 1 / 1;

		display: grid;
		text-align: center;

		& > * {
			grid-area: 1 / 1;

			max-width: 100%;
		}

		& img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: top center;
			overflow: hidden;
		}
	}

	figcaption {
		align-self: start;
		justify-self: auto;

		display: grid;
		grid-gap: 0.5rem;

		padding: 1rem;
		font-size: 1.1rem;
		text-align: center;
		background: var(--surface-1);

		@media (min-width: 768px) {
			align-self: end;
			justify-self: start;

			text-align: start;
			font-size: 1.4rem;
		}
	}

	.page__content {
		grid-area: 1 / 1;

		align-self: end;
		justify-self: auto;

		display: flex;
		align-items: center;
		gap: 1rem;

		padding: 1.5rem;
		font-size: 1.2rem;
		line-height: 1.5;
		background: var(--surface-1);

		& span {
			display: block;
		}

		@media (min-width: 768px) {
			align-self: stretch;

			display: grid;
			place-content: center;
			justify-items: center;
			gap: 2rem;

			padding: 2rem;
			text-align: center;
			line-height: 1.6;
			font-size: 1.2rem;
		}
	}

	.logo-spotify {
		--wh: 5rem;

		display: block;
		width: var(--wh);
		height: var(--wh);
	}
</style>
