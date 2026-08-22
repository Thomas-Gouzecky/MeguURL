type RedirectApiResponse = {
	long_url: string;
};

export async function getRedirectUrl(code: string): Promise<GetRedirectUrlResult> {
	try {
		const response = await fetch(`${process.env.BACKEND}/api/urls/${code}`);

		if (response.ok) {
			const data: RedirectApiResponse = await response.json();

			return { success: true, longUrl: data.long_url };
		}

		const errorResponse: GetRedirectUrlErrorResponse = await response.json();

		return {
			success: false,
			status: response.status,
			error: errorResponse,
		};
	} catch (err) {
		console.error("Fetch Failed:", err);
		throw err;
	}
}
