<script lang="ts">
	import Icon from "$lib/components/icon.svelte";
</script>

<svelte:head>
	<title>Log in | Portify</title>
</svelte:head>

<header class="app__header">
	<h1 class="app__header__title">Portify</h1>
</header>

<main class="app__content">
	<div class="page">
		<a class="login" href="/login/spotify">
			<enhanced:img
				class="login__hero loaded"
				src="../../static/img/splash-1024.png"
				alt="Splash"
			/>
			<div class="textbox">
				<enhanced:img
					class="login__logo square loaded"
					src="../../static/img/logo-spotify.png"
					alt="Spotify logo"
				/>
				<Icon id="icon-arrow-up" />
				<p class="title">Click!</p>
			</div>
		</a>

		<div class="cta textbox">
			<p>
				Logging in lets Portify add purchase links to the tracks in your Spotify playlists. Your
				details are never stored or shared: the sole purpose of the app is to help you support the
				artists you love.
			</p>

			<enhanced:img src="../../static/img/track.png" alt="Track" class="loaded" />

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

	.textbox {
		display: grid;
		gap: var(--contentGap);

		padding: var(--size-4);
		line-height: var(--font-lineheight-4);
		text-align: start;

		& img {
			display: block;
			margin-inline: auto;
		}
	}

	.app__content {
		--contentWidth: min(468px, 100vw);
		--contentGap: var(--size-4);
		--padImage: var(--size-4);
		--bg: var(--surface-4);

		min-height: 100%;
		overflow: hidden auto;

		@media (min-width: 768px) {
			padding-block: var(--contentGap);
		}

		@media (min-width: 1024px) {
			place-content: start center;

			@media (min-height: 640px) {
				place-content: center;
			}
		}
	}

	.page {
		--_maxWidth: 468px;

		display: grid;
		gap: var(--contentGap);

		max-width: var(--_maxWidth);
		margin: 0 auto;

		@media (min-width: 1024px) {
			--_maxWidth: min(1200px, 75vw);

			grid-template-columns: 50% 50%;
		}
	}

	.login {
		text-align: center;
		background: var(--bg);

		& .textbox {
			--contentGap: var(--size-2);

			place-items: start center;

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
		background: var(--bg);
	}
</style>
