import Link from "next/link";

export default function ExtraInfoCard({ ExtraInfo }: { ExtraInfo: ExtraInfoProp }) {
	return (
		<Link
			href={ExtraInfo.href}
			className="group relative inline-block text-[#CCB14E] hover:text-[#FADA64] transition-all duration-500"
		>
			{ExtraInfo.name}

			<span className="absolute bottom-0 left-1/2 h-0.5 w-2/3 -translate-x-1/2 scale-x-0 bg-gradient-to-r from-transparent via-[#FADA64] to-transparent transition-transform duration-500 group-hover:scale-x-100" />
		</Link>
	);
}
