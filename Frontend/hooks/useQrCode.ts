import { generateQrCode } from "@/api/QrCode";
import { useState } from "react";

export default function useQrCode() {
	const [body, setBody] = useState<QrCodeAPIResponse | null>(null);
	const [error, setError] = useState<HTTPValidationError | null>(null);
	const [status, setStatus] = useState<number | null>(null);

	async function create(request: QrCodeAPIRequest) {
		const response = await generateQrCode(request);

		setStatus(response.status);

		if (!response.ok) {
			setBody(null);
			setError(await response.json());
		} else {
			setError(null);
			setBody(await response.json());
		}

		return response;
	}

	return {
		status,
		body,
		error,
		create,
	};
}
