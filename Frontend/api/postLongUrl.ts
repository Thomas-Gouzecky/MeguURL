type PostUrlSuccessResponse = {
	code: string;
	ShortUrl: string;
};

export default async function postLongUrl(longUrl: string): Promise<PostUrlResponse> {
	if (longUrl.trim() === "") {
		const errorResponse: PostUrlErrorResponse = {
			title: "Invalid URL",
			status: 400,
			detail: "Please enter a URL.",
		};

		return { success: false, error: errorResponse };
	}

	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/urls/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				long_url: longUrl,
			}),
		});

		if (!response.ok) {
			const errorResponse: PostUrlErrorResponse = await response.json();

			return { success: false, error: errorResponse };
		}

		const data: PostUrlSuccessResponse = await response.json();

		return { success: true, urlCode: data.code };
	} catch (err) {
		console.error("Fetch Failed:", err);
		throw err;
	}
}
