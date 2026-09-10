import { generateQrCode } from "@/api/QrCode";
import { useMemo, useState } from "react";
import { CreateQRCodeSVG } from "@/lib/svgGenerator";

export default function useQrCode() {
	const [body, setBody] = useState<QrCodeAPIResponse | null>(null);
	const [error, setError] = useState<HTTPValidationError | null>(null);
	const [status, setStatus] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const QRCode = useMemo(() => {
		if (!body?.matrix || !body?.size) {
			return null;
		}

		return CreateQRCodeSVG({
			size: body.size,
			matrix: body.matrix,
		});
	}, [body]);

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
		QRCode,
		status,
		isLoading,
		body,
		error,
		create,
	};
}
