<script lang="ts">
	import { getTrackAudio } from "$lib/utils/track";

	const tempo = 0;
	const arr = Array.from({ length: 12 }, (_, key) => {
		const minor = getTrackAudio({ mode: 0, key, tempo });
		const major = getTrackAudio({ mode: 1, key, tempo });
		return { minor, major };
	});

	const str = JSON.stringify(arr, null, 2);
</script>

<ul>
	{#each arr as { major, minor }}
		<li style="--cell:_{major.keys['camelot']}; --bg:oklch({major.oklch})">
			<span>{major.keys["camelot"]}</span>
		</li>
		<li style="--cell:_{minor.keys['camelot']}; --bg:oklch({minor.oklch})">
			<span>{minor.keys["camelot"]}</span>
		</li>
	{/each}
</ul>

<pre>{str}</pre>

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
