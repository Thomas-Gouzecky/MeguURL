type RedirectResponse = {
	longUrl: string;
};

type RedirectApiResponse = {
	long_url: string;
};

export async function getRedirectUrl(code: string): Promise<RedirectResponse> {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}${code}`);

		if (!response.ok) {
			throw new Error(`Failed to fetch URL: ${response.status}`);
		}

		const data: RedirectApiResponse = await response.json();

		return { longUrl: data.long_url };
	} catch (err) {
		console.error("Fetch Failed:", err);
		throw err;
	}
}
