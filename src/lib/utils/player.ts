export async function playTrack(id: string) {
	await fetch(`/api/playback/play/${id}`);
}
