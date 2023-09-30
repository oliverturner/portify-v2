import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();

	if (!session) return;

	return {
		// foo: "bar",
		username: session.user.spotifyUsername,
		// userId: session.user.userId,
		// spotifyAccessToken: session.user.spotifyAccessToken,
	};
};
