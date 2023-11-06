export async function playTrack(id: string) {
	return fetch(`/api/playback/play/${id}`);
}
