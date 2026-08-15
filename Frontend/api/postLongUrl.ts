type ApiPostUrlResponse = {
	code: string;
	ShortUrl: string;
};

export default async function postLongUrl(longUrl: string): Promise<PostUrlResponse> {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}`, {
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
