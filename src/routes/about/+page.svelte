<script lang="ts">
	// import { getTrackAudio } from "$lib/utils/track";
	import rawNotation from "$lib/constants/raw-notation.json";

	// function reflectConfig() {
	// 	const tempo = 0;
	// 	const arr = Array.from({ length: 12 }, (_, key) => {
	// 		const minor = getTrackAudio({ mode: 0, key, tempo });
	// 		const major = getTrackAudio({ mode: 1, key, tempo });
	// 		return { minor, major };
	// 	});

	// 	return {
	// 		arr,
	// 		str: JSON.stringify(arr, null, 2),
	// 	};
	// }

	function generateConfig() {
		const oklchMinor = (hueIndex: number) => `76% 0.12 ${(hueIndex * 30) % 360}`;
		const oklchMajor = (hueIndex: number) => `69% 0.19 ${(hueIndex * 30) % 360}`;

		const arr = Array.from({ length: 12 }, (_, key) => {
			const offset = 5;
			const hueIndexMinor = parseInt(rawNotation.camelot.minor[key], 10) + offset;
			const hueIndexMajor = parseInt(rawNotation.camelot.major[key], 10) + offset;

			return {
				minor: {
					oklch: oklchMinor(hueIndexMinor),
					keys: {
						camelot: rawNotation.camelot.minor[key],
						musical: rawNotation.musical.minor[key],
					},
				},
				major: {
					oklch: oklchMajor(hueIndexMajor),
					keys: {
						camelot: rawNotation.camelot.major[key],
						musical: rawNotation.musical.major[key],
					},
				},
			};
		});

		return {
			arr,
			str: JSON.stringify(arr, null, 2),
		};
	}

	// const reflected = reflectConfig();
	const { arr, str } = generateConfig();
</script>

<pre>{str}</pre>

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

<style>
	ul {
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
