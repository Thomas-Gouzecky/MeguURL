"use client";

import QRForm from "./Form/QRForm";
import useQrCode from "@/hooks/useQrCode";
import QRCodeModal from "./QRCodeImage/QRCodeModal";

export default function QRCodePageBody() {
	const { QRCode, status, isLoading, body, error, create } = useQrCode();
	return (
		<>
			<QRForm
				status={status}
				isLoading={isLoading}
				body={body}
				error={error}
				create={create}
			/>
			<QRCodeModal QRCode={QRCode} />
		</>
	);
}
