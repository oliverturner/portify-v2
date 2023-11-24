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
	<div class="page">
		<a class="login bg" href="/login/spotify">
			<div class="login__content">
				<enhanced:img src="../../static/img/splash-1024.png" alt="Splash" />
				<div class="textbox">
					<img class="login__logo square" src="/img/logo-spotify.png" alt="Spotify logo" />
					<Icon id="icon-arrow-up" />
					<p class="title">Click!</p>
				</div>
			</div>
		</a>

		<div class="cta textbox bg">
			<p>
				Logging in lets Portify add purchase links to the tracks in your Spotify playlists. Your
				details are never stored or shared: the sole purpose of the app is to help you support the
				artists you love.
			</p>

			<enhanced:img src="../../static/img/track.png" alt="Track" />

			<p>
				Portify uses Spotify's Web API to add details like the track's key and tempo, while clicking
				the key button toggles between Camelot (useful for harmonic mixing) and musical notation.
			</p>
			<p>
				The play button uses Spotify Connect to play tracks through the app... handy for previewing
				new music, remixes and browsing artist catalogues.
			</p>
		</div>
	</div>
</main>

<style>
	img {
		width: 100%;
		height: min-content;
		object-fit: contain;
	}

	.bg {
		background: var(--textboxBG);
	}

	.textbox {
		padding: var(--size-4);
		line-height: var(--font-lineheight-4);
	}

	.app__content {
		--_content-w: min(468px, 100vw);
		--_content-gap: var(--size-4);
		--_padImage: var(--size-4);
		--textboxBG: var(--surface-4);

		min-height: 100%;
		overflow: hidden auto;

		@media (min-width: 768px) {
			padding-block: var(--_content-gap);
		}

		@media (min-width: 1024px) {
			place-content: center;
		}
	}

	.page {
		--_maxWidth: 768px;
		--_marginInline: auto;

		display: grid;
		gap: var(--_content-gap);

		width: 100%;
		max-width: var(--_maxWidth);
		margin: 0 auto;

		@media (min-width: 1024px) {
			--_maxWidth: 1024px;
			--_marginInline: 0;

			grid-template-columns: 1fr 1fr;
		}
	}

	.login {
		width: var(--_content-w);
		margin-inline: var(--_marginInline);
		text-align: center;

		& > picture {
			padding-inline: var(--_padImage);
		}
	}

	.login__content {
		& .textbox {
			display: grid;
			place-items: start center;
			gap: var(--size-2);

			line-height: 1;
		}
	}

	.login__logo {
		--_wh: 4rem;

		display: block;
		width: var(--_wh);
		height: var(--_wh);
		margin-inline: auto;
		background: none;
	}

	.cta {
		--_content-gap: var(--size-4);
		--textboxBG: var(--surface-6);

		display: grid;
		gap: var(--_content-gap);

		width: var(--_content-w);
		margin-inline: var(--_marginInline);
		text-align: start;

		& img {
			display: block;
			/* max-width: 75%; */
			margin-inline: auto;
		}
	}
</style>
