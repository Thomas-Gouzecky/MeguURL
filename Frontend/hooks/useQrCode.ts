import { generateQrCode } from "@/api/QrCode";
import { useState } from "react";

export default function useQrCode() {
	const [body, setBody] = useState<QrCodeAPIResponse | null>(null);
	const [error, setError] = useState<HTTPValidationError | null>(null);
	const [status, setStatus] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	async function create(request: QrCodeAPIRequest) {
		setIsLoading(true);

		const response = await generateQrCode(request);

		setStatus(response.status);

		if (!response.ok) {
			setBody(null);
			setError(await response.json());
		} else {
			setError(null);
			setBody(await response.json());
		}

		try {
			return response;
		} finally {
			setIsLoading(false);
		}
	}

	return {
		status,
		isLoading,
		body,
		error,
		create,
	};
}
