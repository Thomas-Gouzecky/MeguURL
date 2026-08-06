type PostUrlResponse = {
	success: boolean;
	error?: string;
	urlCode?: string;
};

type ApiPostUrlResponse = {
	code: string;
	ShortUrl: string;
};

export default async function postLongUrl(longUrl: string): Promise<PostUrlResponse> {
	try {
		const response = await fetch(`http://localhost:6767/api/urls/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				long_url: longUrl,
			}),
		});

		if (!response.ok) {
			let urlResponse: PostUrlResponse = { success: false };

			if (response.status == 500) {
				urlResponse.error = "Internal Server Error";
			} else {
				urlResponse.error = "Unknown Error";
			}

			return urlResponse;
		}

		const data: ApiPostUrlResponse = await response.json();

		return { success: true, urlCode: data.code };
	} catch (err) {
		console.error("Fetch Failed:", err);
		throw err;
	}
}
