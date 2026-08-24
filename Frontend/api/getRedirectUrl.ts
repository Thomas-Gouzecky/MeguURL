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

		return {
			success: false,
			status: 503,
			error: {
				title: "Backend Unavailable",
				status: 503,
				detail: "The backend service is currently unavailable.",
			},
		};
	}
}
