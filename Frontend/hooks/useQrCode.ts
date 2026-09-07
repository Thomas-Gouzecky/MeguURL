import { generateQrCode } from "@/api/QrCode";
import { useState } from "react";

export default function useQrCode() {
	const [status, setStatus] = useState<number>();
	async function create(request: QrCodeAPIRequest) {
		const response = await generateQrCode(request);

		setStatus(response.status);

		return response;
	}

	return {
		status,
		create,
	};
}
