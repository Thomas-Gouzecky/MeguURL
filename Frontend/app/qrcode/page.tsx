import type { Metadata } from "next";
import QRCodePageBody from "./body";

export const metadata: Metadata = {
	title: "MeguQR",
};

export default function QRCode() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-4">
			<QRCodePageBody />
		</div>
	);
}
