<svelte:head>
	<title>Log in | Portify</title>
</svelte:head>

<header class="app__header">
	<p class="title app__title">Portify</p>
</header>

<main>
	<a href="/login/spotify">Sign in with Spotify</a>
</main>

<style>
	main {
		grid-area: 1 / 1 / -1 / -1;

		display: grid;
		place-content: center;

		height: 100%;
	}
</style>
