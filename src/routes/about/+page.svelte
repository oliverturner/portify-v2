<script lang="ts">
	import { getTrackKey } from "$lib/utils/track";

	const tempo = 0;
	const arr = Array.from({ length: 12 }, (_, key) => {
		const minor = getTrackKey("camelot", { mode: 0, key, tempo });
		const major = getTrackKey("camelot", { mode: 1, key, tempo });
		return [minor, major];
	});
</script>

<ul>
	{#each arr as [major, minor]}
		<li style="--cell:_{major.key}; --bg:{major.oklch}"><span>{major.key}</span></li>
		<li style="--cell:_{minor.key}; --bg:{minor.oklch}"><span>{minor.key}</span></li>
	{/each}
</ul>

<style>
	ul {
		grid-area: 1/1/-1/-1;

		display: grid;
		grid-template-columns: repeat(2, 5rem);
		grid-template-areas:
			"_1A  _1B"
			"_2A  _2B"
			"_3A  _3B"
			"_4A  _4B"
			"_5A  _5B"
			"_6A  _6B"
			"_7A  _7B"
			"_8A  _8B"
			"_9A  _9B"
			"_10A _10B"
			"_11A _11B"
			"_12A _12B";

		margin: auto;
	}

	li {
		grid-area: var(--cell);

		padding: 1rem;
		text-align: center;
		background-color: var(--bg);
	}

	span {
		/* mix-blend-mode: difference; */
		color: black;
	}
</style>
