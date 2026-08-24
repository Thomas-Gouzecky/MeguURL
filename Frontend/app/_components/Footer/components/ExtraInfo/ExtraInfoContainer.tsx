import { site } from "@/lib/site";
import ExtraInfoCard from "./ExtraInfoCard";
import packageJson from "@/package.json";

export default function ExtraInfoContainer({ ExtraInfoList }: { ExtraInfoList: ExtraInfoProp[] }) {
	const currentYear = new Date().getFullYear();
	const siteTitle = site.title;
	const siteDescription = site.description;
	const siteVersion = packageJson.version;
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
			{siteTitle && (
				<div className="mt-auto p-4 text-center">
					<span>&copy; {currentYear} </span>
					<ExtraInfoCard ExtraInfo={{ name: siteTitle, href: "/" }} />
					{siteDescription && <span> - {siteDescription}</span>}
				</div>
			)}

			{/* Version */}
			<div className="absolute bottom-0 right-0 button-padding mx-4 my-3 rounded-lg bg-[#1d1312] text-[#332320] font-bold">
				<span>v{siteVersion}</span>
			</div>
		</div>
	);
}
