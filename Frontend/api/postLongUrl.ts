type ApiPostUrlResponse = {
	code: string;
	ShortUrl: string;
};

export default async function postLongUrl(longUrl: string): Promise<PostUrlResponse> {
	const endpoint = process.env.DEPLOYMENT === "k8s" ? "" : (process.env.NEXT_PUBLIC_BACKEND ?? "");
	try {
		if (longUrl.trim() === "") {
			return {
				success: false,
				error: {
					name: "Invalid URL",
					code: 400,
					description: { error: "Please enter a URL." },
				},
			};
		}
		
		const response = await fetch(`${endpoint}/api/urls/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				long_url: longUrl,
			}),
		});

		if (!response.ok) {
			const errorResponse: BackendErrorResponse = await response.json();

			const error: ResponseErrorProp = {
				name: response.statusText,
				code: response.status,
				description: errorResponse,
			};

			return { success: false, error: error };
		}

		const data: ApiPostUrlResponse = await response.json();

		return { success: true, urlCode: data.code };
	} catch (err) {
		console.error("Fetch Failed:", err);
		throw err;
	}
}
