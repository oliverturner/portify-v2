import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();

	if (!session) return;

	return {
		userId: session.user.userId,
		spotifyUsername: session.user.spotifyUsername,
		spotifyAccessToken: session.user.spotifyAccessToken,
	};
};
