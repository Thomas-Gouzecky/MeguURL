import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "MeguQR",
};

export default function QRCode() {
	return (
		<div>
			<p>This is a QR code section!</p>
		</div>
	);
}
