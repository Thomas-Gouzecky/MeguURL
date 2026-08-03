import { site } from "@/lib/site";
import Link from "next/link";
import ExtraInfoCard from "./ExtraInfoCard";

export default function ExtraInfoContainer({ ExtraInfoList }: { ExtraInfoList: ExtraInfoProp[] }) {
	const currentYear = new Date().getFullYear();
	const siteUrl = site.url;
	const siteTitle = site.title;
	const siteDescription = site.description;
	return (
		<div>
			<div className="flex justify-center gap-4 rounded-xl">
				{ExtraInfoList.map((item, i) => (
					<ExtraInfoCard
						key={i}
						ExtraInfo={item}
					/>
				))}
			</div>
			{siteUrl && siteTitle && (
				<div>
					<span>&copy; {currentYear} </span>
					<Link href={siteUrl}>{siteTitle}</Link>
					{siteDescription && <span> - {siteDescription}</span>}
				</div>
			)}
		</div>
	);
}
