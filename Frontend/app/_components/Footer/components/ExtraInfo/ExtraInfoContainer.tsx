import { site } from "@/lib/site";
import Link from "next/link";
import ExtraInfoCard from "./ExtraInfoCard";

export default function ExtraInfoContainer({ ExtraInfoList }: { ExtraInfoList: ExtraInfoProp[] }) {
	const currentYear = new Date().getFullYear();
	const siteUrl = site.url;
	const siteTitle = site.title;
	const siteDescription = site.description;
	return (
		<div className="custom-text-primary flex h-full flex-col">
			{/* Links */}
			<div className="flex justify-center gap-4">
				{ExtraInfoList.map((item, i) => (
					<ExtraInfoCard
						key={i}
						ExtraInfo={item}
					/>
				))}
			</div>

			{/* Copyright */}
			{siteUrl && siteTitle && (
				<div className="mt-auto p-4 text-center">
					<span>&copy; {currentYear} </span>
					<ExtraInfoCard ExtraInfo={{ name: siteTitle, href: siteUrl }} />
					{siteDescription && <span> - {siteDescription}</span>}
				</div>
			)}
		</div>
	);
}
