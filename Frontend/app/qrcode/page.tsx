import type { Metadata } from "next";
import QRForm from "./Form/QRForm";

export const metadata: Metadata = {
	title: "MeguQR",
};

export default function QRCode() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-4">
			<QRForm />
		</div>
	);
}
