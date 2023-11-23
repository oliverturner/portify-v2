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
		<a class="login" href="/login/spotify">
			<enhanced:img src="../../static/img/splash-1024.png" alt="Splash" />

			<img class="login__logo square" src="/img/logo-spotify.png" alt="Spotify logo" />

			<div class="login__cta textbox">
				<p>
					Logging in lets Portify add purchase links to the tracks in your playlists and the artists
					you follow on Spotify
				</p>
			</div>
		</a>

		<div class="cta">
			<enhanced:img src="../../static/img/track.png" alt="Track" />
			<div class="textbox">
				<p>Portify uses Spotify's Web API to add details like the track's key and tempo.</p>
				<p>
					Clicking the key button toggles between Camelot (useful for harmonic mixing) and musical
					key notation.
				</p>
				<p>
					The play button uses Spotify Connect to play tracks through the app... handy for
					previewing new music, remixes and browsing artist catalogues.
				</p>
			</div>
		</div>
	</div>
</main>

<style>
	:global(html, body, .app) {
		overflow: initial;
		height: initial;
	}

	img {
		width: 100%;
		height: min-content;
		object-fit: contain;
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
	}

	.page {
		display: grid;
		align-content: start;
		gap: var(--_content-gap);

		max-width: 768px;
		margin: 0 auto;
	}

	.login {
		display: grid;
		gap: var(--_content-gap);

		width: var(--_content-w);
		margin-inline: auto;
		text-align: center;

		& > picture {
			padding-inline: var(--_padImage);
		}
	}

	.textbox {
		display: grid;
		gap: var(--_content-gap);

		padding: var(--size-4);
		line-height: var(--font-lineheight-4);
		background: var(--textboxBG);
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
		--textboxBG: var(--surface-6);

		display: grid;
		gap: var(--_content-gap);

		width: var(--_content-w);
		margin-inline: auto;
		text-align: start;

		& img {
			display: block;
			max-width: 75%;
			margin-inline: auto;
		}
	}
</style>
