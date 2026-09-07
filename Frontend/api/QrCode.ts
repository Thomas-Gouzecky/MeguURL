export async function generateQrCode(request: QrCodeAPIRequest): Promise<Response> {
	try {
		const response = await fetch(`${process.env.BACKEND}/api/qrcode/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(request),
		});

		return response;
	} catch {
		return new Response(
			JSON.stringify({
				detail: [
					{
						msg: "Backend is currently unavailable",
					},
				],
			}),
			{
				status: 503,
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
	}
}
