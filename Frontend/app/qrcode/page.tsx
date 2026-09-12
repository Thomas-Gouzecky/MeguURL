import type { Metadata } from "next";
import QRCodePageBody from "./body";
import WebArt from "../_components/Body/WebArt";
import DefaultGlass from "../_components/DefaultGlass";
import AppDescription from "../_components/Body/AppDescription";
import SectionTitle from "../_components/Body/SectionTitle";

export const metadata: Metadata = {
	title: "MeguQR",
};

export default function QRCode() {
	return (
		<>
			<div className="default-background-image" />
			<div className="flex flex-col gap-8 p-4 scrollbar-none">
				<WebArt text="MeguQR" />
				<DefaultGlass>
					<div className="flex flex-col gap-16">
						<SectionTitle text="Generate your QR code!" />
						<QRCodePageBody />

						<AppDescription />
					</div>
				</DefaultGlass>
			</div>
		</>
	);
}
