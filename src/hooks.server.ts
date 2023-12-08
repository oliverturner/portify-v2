import { redirect, type Handle } from "@sveltejs/kit";

import { auth } from "$lib/server/lucia";

const protectedRoutes = ["/app", "/api"];

function isProtectedRoute(pathname: string) {
	return protectedRoutes.some((route) => pathname.startsWith(route));
}

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);
	const session = await event.locals.auth.validate();

	if (session) {
		if (
			event.url.pathname.startsWith("/login") ||
			event.url.pathname === "/app" ||
			event.url.pathname === "/"
		) {
			throw redirect(303, "/app/playlists");
		}
	} else {
		if (isProtectedRoute(event.url.pathname)) {
			throw redirect(303, "/");
		}
	}

	return await resolve(event);
};

export const handleError = async (error: Error) => {
	console.error(error);

	return new Response(null, {
		headers: {
			Location: "/",
		},
	});
};
