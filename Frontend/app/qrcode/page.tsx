import type { Metadata } from "next";
import QRForm from "./Form/QRForm";

export const metadata: Metadata = {
	title: "MeguQR",
};

export default function QRCode() {
	return (
		<div>
			<QRForm />
		</div>
	);
}
