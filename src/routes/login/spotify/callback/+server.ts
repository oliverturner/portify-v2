import { auth, spotifyAuth } from "$lib/server/lucia.js";
import { OAuthRequestError } from "@lucia-auth/oauth";
import type { SpotifyUserAuth } from "@lucia-auth/oauth/providers";

async function getUser({
	getExistingUser,
	spotifyUser,
	createUser,
	spotifyTokens,
}: SpotifyUserAuth) {
	const existingUser = await getExistingUser();
	if (existingUser) return existingUser;

	const user = await createUser({
		attributes: {
			username: spotifyUser.display_name!,
			access_token: spotifyTokens.accessToken,
			refresh_token: spotifyTokens.refreshToken,
			access_expires_at: Date.now() + spotifyTokens.accessTokenExpiresIn * 1000,
		},
	});

	return user;
}

export const GET = async ({ url, cookies, locals }) => {
	const session = await locals.auth.validate();
	if (session) {
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/app",
			},
		});
	}

	const storedState = cookies.get("spotify_oauth_state");
	const state = url.searchParams.get("state");
	const code = url.searchParams.get("code");

	// validate state
	if (!storedState || !state || storedState !== state || !code) {
		return new Response(null, {
			status: 400,
		});
	}

	try {
		const userAuth = await spotifyAuth.validateCallback(code);
		const user = await getUser(userAuth);
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {},
		});

		locals.auth.setSession(session);

		return new Response(null, {
			status: 302,
			headers: {
				Location: "/app",
			},
		});
	} catch (err) {
		if (err instanceof OAuthRequestError) {
			// invalid code
			return new Response(null, {
				status: 400,
			});
		}

		return new Response(null, {
			status: 500,
		});
	}
};
