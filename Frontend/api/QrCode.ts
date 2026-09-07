type QrCodeAPIRequest = {
	data: Required<string>;
	error_correction?: string | null;
};

type QrCodeAPIResponse = {
	size: number;
	matrix: string;
};

export async function POST(request: QrCodeAPIRequest): Promise<Response> {
	const response = await fetch(`${process.env.BACKEND}/api/qrcode/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(request),
	});

	return response;
}
