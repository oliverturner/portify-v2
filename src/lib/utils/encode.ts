const isDeno = () => {
	return typeof window !== "undefined" && "Deno" in window;
};

/**
 * `Buffer.from` is available in Node but missing in production because Deno doesn't include it
 *
 * This method lifted from Lucia, which doesn't expose it publicly
 */
export const encodeBase64 = (data: string | ArrayLike<number> | ArrayBufferLike) => {
	// ORDER IMPORTANT: `buffer` API exists in deno

	// Deno
	if (isDeno()) {
		return typeof data === "string"
			? btoa(data)
			: btoa(String.fromCharCode(...new Uint8Array(data)));
	}

	// Node or Bun
	if (typeof Buffer === "function") {
		const bufferData = typeof data === "string" ? data : new Uint8Array(data);
		return Buffer.from(bufferData).toString("base64");
	}

	if (typeof data === "string") {
		return btoa(data);
	}

	return btoa(String.fromCharCode(...new Uint8Array(data)));
};
