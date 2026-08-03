import Link from "next/link";

export default function ExtraInfoCard({ ExtraInfo }: { ExtraInfo: ExtraInfoProp }) {
	return (
		<Link
			className="flex justify-center"
			href={ExtraInfo.href}
		>
			<span>{ExtraInfo.name}</span>
		</Link>
	);
}
